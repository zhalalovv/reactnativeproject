import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistrationScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (username.trim() === '' || password.trim() === '') {
            Alert.alert('Пожалуйста, введите имя пользователя и пароль');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Пароли не совпадают');
            return;
        }

        try {
            const existingUser = await AsyncStorage.getItem(username);
            if (existingUser) {
                Alert.alert('Пользователь с таким именем уже зарегистрирован');
                return;
            }

            await AsyncStorage.setItem(username, password);
            Alert.alert('Пользователь успешно зарегистрирован');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Ошибка при регистрации пользователя:', error.message);
        }
    };

    const handleLoginNavigation = () => {
        navigation.navigate('Login');
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
            <TextInput
                style={styles.input}
                placeholder="Подтвердите пароль"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLoginNavigation}>
                <Text style={styles.loginText}>Уже зарегистрированы? Войти</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    loginText: {
        marginTop: 10,
        color: 'blue',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
