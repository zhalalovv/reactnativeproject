import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch } from 'react-redux';
import { setQRData, setActivity } from '../redux/actions';
import { useNavigation } from '@react-navigation/native';

export default function QRScannerScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    };

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        dispatch(setQRData(data));
        dispatch(setActivity(data));
        navigation.navigate('Activity');
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.maintext}>{scanned ? 'Scanned!' : 'Not yet scanned'}</Text>
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        textAlign: 'center',
    },
});
