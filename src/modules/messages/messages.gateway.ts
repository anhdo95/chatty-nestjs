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
  @WebSocketServer() server: Server
  private logger: Logger = new Logger('MessagesGateway')

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
  handleUserJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket): any {
    function getMessage(user: any, text: string) {
      return { id: client.id, user, text }
    }

    console.log('client.request', client.request.user)


    client.emit('message', getMessage('admin', `${data.name} welcome to the room ${data.room}`))

    return { user: data }
  }

  @SubscribeMessage('messages')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    const event = 'messages'
    return { event, data }
  }
}
