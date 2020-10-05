import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConversationInfoController } from './conversation-info.controller'
import { ConversationInfoService } from './conversation-info.service'
import { ConversationInfo } from '@/database/entities/conversation-info.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ConversationInfo])],
  controllers: [ConversationInfoController],
  providers: [ConversationInfoService],
  exports: [ConversationInfoService],
})

export class ConversationInfoModule {}
