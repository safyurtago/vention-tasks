import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MessageModule } from './message.module';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MessageModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://ixcybbsv:aTKDIxRxcMXuNP3ZbPVRaJYwFbOkWqEz@crow.rmq.cloudamqp.com/ixcybbsv',
        ],
        queue: 'message_queue',
        queueOptions: {
          durable: false,
        }
      },
    },
  );
  app.listen();
}
bootstrap();
