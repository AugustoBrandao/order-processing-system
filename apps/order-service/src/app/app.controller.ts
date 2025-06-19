import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, PAYMENT_CLIENT } from '../constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(PAYMENT_CLIENT) private readonly paymentRMQClient: ClientProxy,
    @Inject(NOTIFICATION_CLIENT) private readonly notificationRMQClient: ClientProxy
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  // No api-gateway, a gente fez um emit de uma mensagem com Route Key order-created
  // Estilo request/response -> requisição e resposta
  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    // Simular um pedido processado
    console.log('[Order service] Received new order: ', order);

    // Enviar uma mensagem para payment_queue e notification_queue
    // Não receber uma resposta
    this.paymentRMQClient.emit('process-payment', order);
    this.notificationRMQClient.emit('order-created', order);
  }
}
