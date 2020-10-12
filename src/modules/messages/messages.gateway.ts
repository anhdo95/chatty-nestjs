import { Logger, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  GatewayMetadata,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { MessagesService } from './messages.service'
import { WsJwtGuard } from '@/guards/ws-jwt-auth.guard'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'
import { ConversationResponseDto } from '@/modules/conversations/dtos/conversation.dto'
import { WsUser } from '@/decorators/ws-user.decorator'
import { MessageRequestDto, MessageResponseDto } from './dtos/message.dto'
import { Message } from '@/database/entities/message.entity'

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
  constructor(private readonly messagesService: MessagesService) {}

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

  // @UseGuards(WsJwtGuard)
  @SubscribeMessage('join')
  async handleJoinConversation(
    @MessageBody() conversationId: number,
    @ConnectedSocket() client: Socket,
    @WsUser() user: LoggedInUser
  ): Promise<ConversationResponseDto | undefined> {
    return this.messagesService.joinConversation(client, {
      conversationId,
      // user
    })
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() message: MessageRequestDto,
    @ConnectedSocket() client: Socket,
    @WsUser() user: LoggedInUser,
  ): Promise<void> {
    console.log('user', user)
    message.userId = user.userId
    return this.messagesService.sendMessage(client, message)
  }
}
