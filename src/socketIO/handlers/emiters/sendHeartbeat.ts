import { IHeartbeat, dateUtils } from "pong-shared-deps"
import socketService from '../../services/socketService';

const sendHeartbeat = async () => {
  const { now } = dateUtils;
  const heartbeat: IHeartbeat = {
    user_id: -1,
    created_at: now(),
  };
  console.log(heartbeat)
  socketService.emit('heartbeat', heartbeat);
};

export default sendHeartbeat;
