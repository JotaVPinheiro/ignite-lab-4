import { SendNotification } from '@app/use-cases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from '@infra/messaging/kafka/controllers/notifications.controller';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification, ConfigService],
  controllers: [NotificationsController],
})
export class MessagingModule {}
