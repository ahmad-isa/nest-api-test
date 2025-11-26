import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} //sama aja kayak call this.appService = appService (through dependency injection)

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
