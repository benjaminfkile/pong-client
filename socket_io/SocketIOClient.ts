import { io, Socket } from 'socket.io-client';
import { Dimensions } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { SERVER_URL } from '@env';
import GameDimensions_I from '@/app/interfaces/GameDimensions_I';
import store from '@/store';
import { updatePaddlePosition } from '@/store/actions/paddleActions';

let socket: Socket;

const socketIOMessage = {
  gameDimensions: { width: 0, height: 0 },
  previousPosition: 0,
  alpha: 0.3,

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
    socketIOMessage.startDeviceMotionUpdates();
  },

  sendGameDimensions: (): void => {
    const { width, height } = Dimensions.get('window');
    const dimensions: GameDimensions_I = { width, height };
    socketIOMessage.gameDimensions = dimensions;
    console.log('Sending game dimensions:', dimensions); // Debugging log
    socket.emit('gameDimensions', dimensions);
  },

  startDeviceMotionUpdates: (): void => {
    const { gameDimensions } = socketIOMessage;
    const paddleHeight = 100;
    DeviceMotion.setUpdateInterval(100); // Update interval in ms

    DeviceMotion.addListener((motionData) => {
      if (motionData.accelerationIncludingGravity) {
        const middle = (gameDimensions.height / 2) - (paddleHeight / 2);
        const position = middle + (motionData.accelerationIncludingGravity.z * 100);

        // Apply low-pass filter for smoother movement
        const smoothedPosition = socketIOMessage.alpha * position + (1 - socketIOMessage.alpha) * socketIOMessage.previousPosition;
        socketIOMessage.previousPosition = smoothedPosition;

        // Clamp the smoothed position to ensure the paddle stays within the screen bounds
        const clampedPosition = Math.max(0, Math.min(smoothedPosition, gameDimensions.height - paddleHeight));

        // console.log(clampedPosition);
        store.dispatch(updatePaddlePosition(clampedPosition));
      } else {
        console.log("no data");
      }
    });
  },

  disconnect: (): void => {
    if (socket) {
      socket.disconnect();
    }
  },
};

export default socketIOMessage;
