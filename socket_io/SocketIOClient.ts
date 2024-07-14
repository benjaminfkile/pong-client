import { io, Socket } from 'socket.io-client';
import { Dimensions } from 'react-native';
import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';
import { SERVER_URL } from '@env';
import GameDimensions_I from '@/app/interfaces/GameDimensions_I';

let socket: Socket;

const socketIOMessage = {
  init: (): void => {
    socket = io(SERVER_URL);

    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('message', (message: string) => {
      console.log('Received message:', message);
    });

    socketIOMessage.sendGameDimensions();
    socketIOMessage.startTiltAngleUpdates();
  },

  sendGameDimensions: (): void => {
    const { width, height } = Dimensions.get('window');
    const dimensions: GameDimensions_I = { width, height };
    console.log('Sending game dimensions:', dimensions); // Debugging log
    socket.emit('gameDimensions', dimensions);
  },

  startTiltAngleUpdates: (): void => {
    Accelerometer.setUpdateInterval(10); // Update interval in ms

    Accelerometer.addListener((accelerometerData: AccelerometerMeasurement) => {
      const pitch = socketIOMessage.calculatePitch(accelerometerData);
      console.log('Sending tilt angle:', pitch); // Debugging log
      socket.emit('tiltAngle', pitch);
    });
  },

  calculatePitch: ({ x, y, z }: AccelerometerMeasurement): number => {
    // Assuming the device is in landscape mode, adjust the axis accordingly
    // In landscape mode, y-axis is up/down and z-axis is forward/backward
    return Math.atan2(-x, Math.sqrt(y * y + z * z)) * (180 / Math.PI);
  },

  disconnect: (): void => {
    if (socket) {
      socket.disconnect();
    }
  },
};

export default socketIOMessage;
