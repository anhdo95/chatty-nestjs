import { ConversationType } from '@/database/entities/conversation.entity'

export interface NewConversation {
  name: string
  ownerId?: string
  type?: ConversationType
  userIds: string[]
  coverPhoto: string
}
