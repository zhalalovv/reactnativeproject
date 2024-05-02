import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const savedPassword = await AsyncStorage.getItem(username);
            if (savedPassword === password) {
                await AsyncStorage.setItem('userToken', 'true');
                navigation.navigate('Activity');
            } else {
                Alert.alert('Ошибка входа', 'Неверное имя пользователя или пароль');
            }
        } catch (error) {
            Alert.alert('Ошибка входа', 'Произошла ошибка при попытке входа: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Имя пользователя"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.registrationText}>Нет аккаунта? Зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        width: '80%',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    registrationText: {
        marginTop: 10,
        color: 'blue',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
