//@ts-ignore
import { io, Socket } from 'socket.io-client';
import { Dimensions } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { SERVER_URL } from '@env';
import { playerPaddlePostion } from '@/store/actions/gameActions';
import GameDimensions from '@/types/GameDimensions';
import store from '@/store/store';

let socket: Socket;

const socketIOClient = {
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

    socket.on('sendGame', (game: any) => {
      console.log('Received game data:', game);
      // Handle game data, update Redux store or local state
    });
  },

  sendGameDimensions: (): void => {
    const { width, height } = Dimensions.get('window');
    const dimensions: GameDimensions = { width, height };
    socketIOClient.gameDimensions = dimensions;
    console.log('Sending game dimensions:', dimensions); // Debugging log
    socket.emit('gameDimensions', dimensions);
  },

  startDeviceMotionUpdates: (): void => {
    const { gameDimensions } = socketIOClient;
    const paddleHeight = 100;
    DeviceMotion.setUpdateInterval(100); // Update interval in ms

    DeviceMotion.addListener((motionData) => {
      if (motionData.accelerationIncludingGravity) {
        const middle = (gameDimensions.height / 2) - (paddleHeight / 2);
        const position = middle + (motionData.accelerationIncludingGravity.z * 100);

        // Apply low-pass filter for smoother movement
        const smoothedPosition = socketIOClient.alpha * position + (1 - socketIOClient.alpha) * socketIOClient.previousPosition;
        socketIOClient.previousPosition = smoothedPosition;

        // Clamp the smoothed position to ensure the paddle stays within the screen bounds
        const clampedPosition = Math.max(0, Math.min(smoothedPosition, gameDimensions.height - paddleHeight));

        // console.log(clampedPosition);
        store.dispatch(playerPaddlePostion(clampedPosition));
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

export default socketIOClient;
