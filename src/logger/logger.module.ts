// src/logger/logger.module.ts
import { Module, Global } from '@nestjs/common';
import { MyLogger } from './logger.service';

@Global() // optional: makes logger available globally
@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
