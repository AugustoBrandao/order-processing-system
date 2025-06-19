import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'], // configurado no docker-compose.yml
        queue: 'payment_queue', // apenas ouve a fila payment_queue
        queueOptions: {
          durable: true,
        }
      }
    }

    );

  await app.listen();

  Logger.log(
    `🚀 Microserviço de Payment-Service está ouvindo a fila payment_queue`,
  );
}

bootstrap();
