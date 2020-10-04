import { Logger, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  GatewayMetadata,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { WsJwtGuard } from '@/guards/ws-jwt-auth.guard'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'
import { ConversationsService } from '@/modules/conversations/conversations.service'

const wsOptions: GatewayMetadata = {
  handlePreflightRequest: (req: Request, res: Response) => {
    const headers: any = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Credentials': true,
    }
    res.writeHead(200, headers)
    res.end()
  },
}

@WebSocketGateway(wsOptions)
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly conversationsService: ConversationsService,
  ) {}

  private readonly logger: Logger = new Logger('MessagesGateway')

  afterInit() {
    this.logger.log('Init')
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join')
  handleUserJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): any {
    function getMessage(user: any, text: string) {
      return { id: client.id, user, text }
    }

    const user: LoggedInUser = client.request.user
    this.conversationsService.create({
      ownerId: user.userId,
      userIds: [],
      name: room,
      coverPhoto: '',
    })

    client.emit('message', getMessage('admin', `Welcome to the room ${room}`))

    return { user: { room } }
  }
}
