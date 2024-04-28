import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

const QRScannerScreen = ({ onCodeDetected }) => {
    const handleBarCodeRead = ({ type, data }) => {
        if (data !== null) {
            console.log(`QR code detected: ${data}`);
            onCodeDetected(data);
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.preview}
                onBarCodeRead={handleBarCodeRead}
                barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.capture}
                >
                    <Text style={{ fontSize: 14 }}> СКАНИРОВАТЬ </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});

export default QRScannerScreen;
