// src/whatsapp/dto/whatsapp-webhook.dto.ts
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

// Based on the structure of a WhatsApp webhook for a text message
// See: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components#messages-object

class TextDto {
  @IsString()
  @IsNotEmpty()
  body: string;
}

class MessageObjectDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @ValidateNested()
  @Type(() => TextDto)
  text: TextDto;

  @IsString()
  @IsNotEmpty()
  type: 'text';
}

class ProfileDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

class ContactDto {
    @ValidateNested()
    @Type(() => ProfileDto)
    profile: ProfileDto;

    @IsString()
    @IsNotEmpty()
    wa_id: string;
}

class ValueDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageObjectDto)
  messages: MessageObjectDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts: ContactDto[];
}

class ChangeDto {
  @ValidateNested()
  @Type(() => ValueDto)
  value: ValueDto;

  @IsString()
  @IsNotEmpty()
  field: 'messages';
}

class EntryDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChangeDto)
  changes: ChangeDto[];
}

export class WhatsappWebhookDto {
  @IsString()
  @IsNotEmpty()
  object: 'whatsapp_business_account';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntryDto)
  entry: EntryDto[];
}
