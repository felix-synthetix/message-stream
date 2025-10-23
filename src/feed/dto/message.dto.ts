// src/feed/dto/message.dto.ts

import { ApiProperty } from '@nestjs/swagger';

class ConversationDto {
  @ApiProperty({
    description: 'The unique identifier for the conversation or thread.',
    example: 'thread-abc-789',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the conversation (e.g., Email subject, chat room name).',
    example: 'Project Phoenix Launch',
  })
  name: string;
}

class ParticipantDto {
  @ApiProperty({
    description: 'The unique identifier for the participant.',
    example: 'user-5678',
  })
  id: string;

  @ApiProperty({
    description: 'The display name of the participant.',
    example: 'Alice',
  })
  name: string;

  @ApiProperty({
    description: 'The handle of the participant (e.g., email, twitter handle, phone number).',
    example: 'alice@example.com',
  })
  handle: string;

  @ApiProperty({
    description: 'URL to the participant\'s avatar image.',
    example: 'https://example.com/avatars/alice.png',
  })
  avatarUrl?: string;
}

class AttachmentDto {
  @ApiProperty({
    description: 'The unique identifier for the attachment.',
    example: 'attachment-xyz',
  })
  id: string;

  @ApiProperty({
    description: 'The type of the attachment.',
    example: 'document',
    enum: ['document', 'image', 'video', 'audio'],
  })
  type: string;

  @ApiProperty({
    description: 'The name of the file.',
    example: 'launch_plan.docx',
  })
  fileName: string;

  @ApiProperty({
    description: 'The URL to access the attachment.',
    example: 'https://example.com/docs/launch_plan.docx',
  })
  url: string;

  @ApiProperty({
    description: 'The size of the attachment in bytes.',
    example: 45024,
  })
  size?: number;
}

class ContentDto {
  @ApiProperty({
    description: 'The plain text content of the message.',
    example: 'Hey team, let\'s sync up about the launch.',
  })
  text: string;

  @ApiProperty({
    description: 'The HTML content of the message, primarily for emails.',
    example: '<body><p>Hey team, let\'s sync up about the launch.</p></body>',
  })
  html?: string;

  @ApiProperty({
    description: 'A list of attachments included in the message.',
    type: () => [AttachmentDto],
  })
  attachments?: AttachmentDto[];
}

export class MessageDto {
  @ApiProperty({
    description: 'The unique identifier for the message.',
    example: 'unique-message-id-12345',
  })
  id: string;

  @ApiProperty({
    description: 'The ISO 8601 timestamp of when the message was sent.',
    example: '2025-10-23T10:00:00Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'The source channel of the message.',
    example: 'email',
    enum: ['email', 'sms', 'twitter_dm', 'slack', 'whatsapp'],
  })
  channel: string;

  @ApiProperty({
    description: 'The conversation the message belongs to.',
    type: () => ConversationDto,
  })
  conversation: ConversationDto;

  @ApiProperty({
    description: 'The sender of the message.',
    type: () => ParticipantDto,
  })
  sender: ParticipantDto;

  @ApiProperty({
    description: 'The content of the message.',
    type: () => ContentDto,
  })
  content: ContentDto;

  @ApiProperty({
    description: 'Source-specific metadata. The key should be the channel name.',
    example: { email: { messageIdHeader: '<CAO12345@mail.gmail.com>' } },
    type: 'object',
    additionalProperties: true,
  })
  metadata?: Record<string, any>;
}
