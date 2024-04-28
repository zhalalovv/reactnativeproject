import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import QRScannerScreen from './QRScannerScreen';  // Убедитесь, что QRScannerScreen импортирован правильно

const ActivityScreen = () => {
  const [activity, setActivity] = useState('');
  const [previousActivity, setPreviousActivity] = useState('');
  const [scannerVisible, setScannerVisible] = useState(false);

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

  const handleQRCodeScanned = (data) => {
    console.log('Scanned data:', data);
    setActivity(data);
    setScannerVisible(false);  // Закрыть сканер после сканирования
  };

  return (
    <View style={styles.container}>
      <Text style={styles.activityText}>Случайная активность: {activity}</Text>
      <TouchableOpacity style={styles.button} onPress={fetchRandomActivity}>
        <Text style={styles.buttonText}>Перейти к следующей активности</Text>
      </TouchableOpacity>
      {previousActivity && (
        <TouchableOpacity style={styles.button} onPress={() => setActivity(previousActivity)}>
          <Text style={styles.buttonText}>Вернуться к предыдущей активности</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={() => setScannerVisible(true)}>
        <Text style={styles.buttonText}>Сканировать QR код</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={scannerVisible}
        onRequestClose={() => {
          setScannerVisible(false);
        }}
      >
        <QRScannerScreen onCodeDetected={handleQRCodeScanned} />
      </Modal>
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
});

export default ActivityScreen;
