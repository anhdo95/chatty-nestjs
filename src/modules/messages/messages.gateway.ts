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
import { WsJwtGuard } from '@/guards/ws-jwt-auth.guard'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'
import { ConversationsService } from '@/modules/conversations/conversations.service'
import { ConversationResponseDto } from '@/modules/conversations/dtos/conversation.dto'
import { WsUser } from '@/decorators/ws-user.decorator'

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
  constructor(private readonly conversationsService: ConversationsService) {}

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
  async handleJoinConversation(
    @MessageBody() conversationId: string,
    @ConnectedSocket() client: Socket,
    @WsUser() user: LoggedInUser
  ): Promise<ConversationResponseDto | undefined> {
    const conversation = await this.conversationsService.getById(conversationId)
    if (!conversation) return

    client.emit('message', { user: 'admin', text: 'Welcome to the room'})
    client.broadcast
      .to(conversationId)
      .emit('message', { user: 'admin', text: `${user.name}, has joined!` })
      
    return conversation
  }
}
