import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { RNCamera } from 'react-native-camera';


const ActivityScreen = () => {
  const [activity, setActivity] = useState('');
  const [previousActivity, setPreviousActivity] = useState('');

  useEffect(() => {
    fetchRandomActivity();
  }, []);

  const fetchRandomActivity = async () => {
    try {
      const response = await fetch('https://www.boredapi.com/api/activity/');
      const data = await response.json();
      setPreviousActivity(activity);
      setActivity(data.activity);
    } catch (error) {
      console.error('Ошибка при получении активности:', error);
    }
  };

  const handlePreviousActivity = () => {
    setActivity(previousActivity);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/timoha.jpg')} // Путь к вашему изображению
        style={styles.image}
      />
      {activity &&
        <QRCode style={styles.qrcode}
          value={activity}
        />}
      <Text style={styles.activityText}>Случайная активность: {activity}</Text>
      <TouchableOpacity style={styles.button} onPress={fetchRandomActivity}>
        <Text style={styles.buttonText}>Перейти к следующей активности</Text>
      </TouchableOpacity>
      {previousActivity ? (
        <TouchableOpacity style={styles.button} onPress={handlePreviousActivity}>
          <Text style={styles.buttonText}>Вернуться к предыдущей активности</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.noPreviousActivityText}>Нет предыдущей активности</Text>
      )}
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
  activityText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noPreviousActivityText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
  },
  image: {
    width: 300, // Укажите нужную ширину
    height: 300,
    marginBottom: 20, // Укажите нужную высоту
  },
  qrcode: {
    size: 200,
    marginBottom: 15,
  }
});

export default ActivityScreen;
