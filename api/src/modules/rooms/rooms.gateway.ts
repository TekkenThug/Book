import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
import { TokenService } from '@/modules/tokens/token.service';

/**
 * TODO: Make CORS resolution
 */

@WebSocketGateway(8030, {
  cors: {
    origin: '*',
  },
})
export class RoomsGateway implements OnGatewayConnection {
  constructor(
    private service: RoomsService,
    private tokenService: TokenService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat-message')
  async handleEvent(socket: Socket, message: string) {
    const { roomId, token } = await this.extractHandshakePayload(socket);

    if (!roomId || !token) {
      return;
    }

    const answer = await this.service.serializeMessage(+token.sub, message);

    this.server.to(roomId).emit('chat-receive', answer);

    this.service.addMessageToChat(+roomId, token.sub, answer);
  }

  handleConnection(socket: Socket) {
    this.connectToRoom(socket);
  }

  private async connectToRoom(socket: Socket) {
    const roomId = socket.handshake.query.room_id;
    const token = socket.handshake.query.token;

    if (!roomId) {
      socket.disconnect();
      return;
    }

    if (!token) {
      socket.disconnect();
      return;
    }

    const tokenInfo = await this.tokenService.verifyToken(token as string);

    if (!tokenInfo) {
      socket.disconnect();
      return;
    }

    if (!this.service.getById(tokenInfo.sub, +(roomId as string))) {
      socket.disconnect();
      return;
    }

    socket.join(roomId);
  }

  private async extractHandshakePayload(socket: Socket) {
    const token =
      !socket.handshake.query?.token ||
      Array.isArray(socket.handshake.query?.token)
        ? null
        : await this.tokenService.verifyToken(socket.handshake.query.token);
    const roomId = socket.handshake.query?.room_id ?? null;

    return {
      roomId,
      token,
    };
  }
}
