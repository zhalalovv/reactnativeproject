import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSelector, useDispatch } from 'react-redux';
import { setActivity, setPreviousActivity } from './actions';

const ActivityScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { activity, previousActivity } = useSelector(state => state);

  useEffect(() => {
    if (!activity) {
      fetchRandomActivity();
    }
  }, []);

  const fetchRandomActivity = async () => {
    try {
      const response = await fetch('https://www.boredapi.com/api/activity/');
      const data = await response.json();
      dispatch(setPreviousActivity(activity));
      dispatch(setActivity(data.activity));
    } catch (error) {
      console.error('Ошибка при получении активности:', error);
    }
  };

  return (
    <View style={styles.container}>
      {activity && (
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={activity}
            size={200}
            color="black"
            backgroundColor="white"
          />
        </View>
      )}
      <Text style={styles.activityText}>Случайная активность: {activity}</Text>
      <TouchableOpacity style={styles.button} onPress={fetchRandomActivity}>
        <Text style={styles.buttonText}>Перейти к следующей активности</Text>
      </TouchableOpacity>
      {previousActivity && (
        <TouchableOpacity style={styles.button} onPress={() => dispatch(setActivity(previousActivity))}>
          <Text style={styles.buttonText}>Вернуться к предыдущей активности</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QRScanner')}>
        <Text style={styles.buttonText}>Сканировать QR код</Text>
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
  qrCodeContainer: {
    marginBottom: 15,
  }
});

export default ActivityScreen;
