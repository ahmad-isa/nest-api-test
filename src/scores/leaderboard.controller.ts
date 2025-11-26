import { Controller, Get, UseGuards } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@UseGuards(ThrottlerGuard)
@Controller() 
export class LeaderboardController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get('leaderboard')
  findAll() {
    return this.scoresService.findAll();
  }
}
