// src/prioengine/dto/scored-message.dto.ts
import { MessageDto } from '../../feed/dto/message.dto';

export class ScoredMessage {
  score: number;
  message: MessageDto;
}
