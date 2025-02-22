import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
import { TokenService } from '@/modules/tokens/token.service';
import { EVENTS } from './rooms.data';

/**
 * TODO: Make CORS resolution
 */

@WebSocketGateway(8030, {
  cors: {
    origin: '*',
  },
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private service: RoomsService,
    private tokenService: TokenService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(EVENTS.SEND_CHAT_MESSAGE)
  async handleEvent(socket: Socket, message: string) {
    const { roomId, token } = await this.extractHandshakePayload(socket);

    if (!roomId || !token) {
      return;
    }

    const answer = await this.service.serializeMessage(+token.sub, message);

    this.server.to(roomId).emit(EVENTS.RECEIVE_CHAT_MESSAGE, answer);

    void this.service.addMessageToChat(+roomId, token.sub, answer);
  }

  handleConnection(socket: Socket) {
    void this.connectToRoom(socket);
  }

  handleDisconnect(socket: Socket) {
    void this.leaveFromRoom(socket);
  }

  private async connectToRoom(socket: Socket) {
    const { roomId, token } = await this.extractHandshakePayload(socket);

    if (!roomId) {
      socket.disconnect();
      return;
    }

    if (!token) {
      socket.disconnect();
      return;
    }

    if (!(await this.service.getById(+roomId, token.sub, false))) {
      socket.disconnect();
      return;
    }

    await socket.join(roomId);

    void this.service.addParticipantToRoom(+roomId, token.sub);
    this.server.to(roomId).emit(EVENTS.ENTER_IN_ROOM, token.sub);
  }

  private async leaveFromRoom(socket: Socket) {
    const { roomId, token } = await this.extractHandshakePayload(socket);

    if (!roomId || !token) {
      return;
    }

    void this.service.deleteParticipantFromRoom(+roomId, token.sub);
    this.server.to(roomId).emit(EVENTS.LEAVE_FROM_ROOM, token.sub);
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
