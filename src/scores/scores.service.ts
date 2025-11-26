import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Score } from './entities/score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ScoresService {

  constructor(
    @InjectRepository(Score)
    private readonly scoresRepository: Repository<Score>,
  ) {}

  create(data: CreateScoreDto, userName:string): Score {
    
    const createdScore = this.scoresRepository.create({...data, name: userName})
    this.scoresRepository.save(createdScore);

    return createdScore;
  }

  findAll() {
     return this.scoresRepository.find({
      order: { score: 'DESC' },
      take: 10,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
