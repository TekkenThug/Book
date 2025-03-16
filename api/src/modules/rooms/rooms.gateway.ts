import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsException,
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
export class RoomsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    private service: RoomsService,
    private tokenService: TokenService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.use((socket, next) => {
      const { roomId, token } = this.extractHandshakePayload(socket);

      if (!roomId) {
        next(new WsException('Room not exist'));
        return;
      }

      if (!token) {
        next(new WsException('Token not exist'));
        return;
      }

      this.service
        .getById(+roomId, token.sub, false)
        .then((res) => {
          if (res) {
            next();
          } else {
            next(new WsException('Room not found'));
          }
        })
        .catch(() => {
          next(new WsException('Room not found'));
        });
    });
  }

  async handleConnection(socket: Socket) {
    const { roomId, token } = this.extractHandshakePayload(socket);

    await socket.join(roomId!);

    const newUser = await this.service.addParticipantToRoom(
      +roomId!,
      token!.sub,
    );
    this.server.to(roomId!).emit(EVENTS.ENTER_IN_ROOM, newUser);
  }

  handleDisconnect(socket: Socket) {
    const { roomId, token } = this.extractHandshakePayload(socket);

    void this.service.deleteParticipantFromRoom(+roomId!, token!.sub);
    this.server.to(roomId!).emit(EVENTS.LEAVE_FROM_ROOM, token!.sub);
  }

  @SubscribeMessage(EVENTS.SEND_CHAT_MESSAGE)
  async handleEvent(socket: Socket, message: string) {
    const { roomId, token } = this.extractHandshakePayload(socket);

    if (!roomId || !token) {
      return;
    }

    const answer = await this.service.serializeMessage(+token.sub, message);

    this.server.to(roomId).emit(EVENTS.RECEIVE_CHAT_MESSAGE, answer);

    void this.service.addMessageToChat(+roomId, token.sub, answer);
  }

  @SubscribeMessage(EVENTS.PEER_NEW_USER)
  handlePeerNewUser(socket: Socket, id: string) {
    const { roomId, token } = this.extractHandshakePayload(socket);

    if (!roomId || !token) {
      return;
    }

    socket.broadcast.to(roomId).emit(EVENTS.PEER_NEW_USER, id);
  }

  @SubscribeMessage(EVENTS.PEER_TOGGLE_DEVICE)
  handlePeerDeviceToggle(
    socket: Socket,
    options: { id: number; device: 'audio' | 'video'; state: boolean },
  ) {
    const { roomId, token } = this.extractHandshakePayload(socket);

    if (!roomId || !token) {
      return;
    }

    socket.broadcast.to(roomId).emit(EVENTS.PEER_TOGGLE_DEVICE, options);
  }

  private extractHandshakePayload(socket: Socket) {
    const token =
      !socket.handshake.query?.token ||
      Array.isArray(socket.handshake.query?.token)
        ? null
        : this.tokenService.verifyTokenSync(socket.handshake.query.token);
    const roomId = socket.handshake.query?.room_id ?? null;

    return {
      roomId,
      token,
    };
  }
}
