import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessageDto } from './dto/message.dto';
import { AsyncApi, AsyncApiSub } from 'nestjs-asyncapi';
import { Socket } from 'socket.io';
import { FeedService } from './feed.service';
import { Inject } from '@nestjs/common';

@AsyncApi()
@WebSocketGateway()
export class FeedGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor( 
    @Inject(FeedService) private readonly feed: FeedService
  ) {}

  @AsyncApiSub({
    channel: 'message-feed',
    description: 'Request the prioritized message feed.',
    message: {
      payload: MessageDto,
    }
  })
  @SubscribeMessage('message-feed')
  async handleRequestFeed(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { precision?: number },
  ): Promise<void> {
    try {
      for await (const message of this.feed.getMessageFeed(payload?.precision)) {
        if (!socket.connected) { 
          console.log(`Client ${socket.id} disconnected.`);
          break;
        }

        socket.emit('message', message);
      }

      if (socket.connected) {
        socket.emit('feed-end', { message: 'Feed finished successfully.' });
      } else {
        socket.emit('feed-end', { message: 'Feed cancelled by client.' });
      }

    } catch (error) {
      console.error(`Error in feed for ${socket.id}:`, error);
      socket.emit('feed-end', { message: 'Feed ended with an error.' });
    }
  }

  @SubscribeMessage('stop-feed')
  handleFeedStop(@ConnectedSocket() socket: Socket): void {
    console.log(`Client ${socket.id} requested to stop feed.`);
    socket.disconnect(); 
  }

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
    this.feed.stopFeed();
  }
}
