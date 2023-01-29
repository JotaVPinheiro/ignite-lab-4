import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    super({
      client: {
        clientId: 'notifications',
        brokers: [configService.getOrThrow('KAFKA_BROKER')],
        sasl: {
          mechanism: configService.getOrThrow(
            'KAFKA_SASL_MECHANISM',
          ) as 'scram-sha-256',
          username: configService.getOrThrow('KAFKA_SASL_USERNAME'),
          password: configService.getOrThrow('KAFKA_SASL_PASSWORD'),
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
