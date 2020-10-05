import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { AuthService } from '@/modules/auth/auth.service'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'

@Injectable()
export class WsJwtGuard implements CanActivate {
  private logger: Logger = new Logger(WsJwtGuard.name)

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient()
      
      const bearerToken: string = client.handshake?.headers?.authorization
      if (!bearerToken) return false

      const user: LoggedInUser = await this.authService.verifyUser(bearerToken.split(' ')[1])
      client.request.user = user

      return !!user
    } catch (err) {
      throw new WsException(err.message)
    }
  }
}
