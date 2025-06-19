import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    console.log('[Notification Service] Payload Succeed', order);
  }

  @MessagePattern('payment-succeed')
  handlePaymentSucceed(@Payload() order: any) {
    console.log('[Notification Service] Payment Succeed! Order: ', order);
  }
}
