import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'

import { ConversationsService } from '@/modules/conversations/conversations.service'
import { JoiningInformation } from '@/interfaces/messages/join-information'

@Injectable()
export class MessagesService {
  constructor(private readonly conversationsService: ConversationsService) {}

  async joinConversation(socket: Socket, joining: JoiningInformation) {
    const conversation = await this.conversationsService.getById(joining.conversationId)
    if (!conversation) return

    socket.emit('message', { user: 'admin', text: 'Say hi to your friend' })
    socket.broadcast
      .to(joining.conversationId)
      .emit('message', { user: 'admin', text: `${joining.user.name}, has joined!` })

    return conversation
  }
}
