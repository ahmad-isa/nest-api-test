import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Drivetrain } from './enums/drivetrain.enum';
import { BodyType } from './enums/bodytype.enum';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { Car } from './interfaces/car.interface';
import { DefaultResponse } from './interfaces/default-response.interface';
import { Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAllCars(
        @Query('page') page : number = 1,
        @Query('perpage') perpage: number = 10
    ){
        return this.carsService.findAll(page, perpage);
    }

    @Get(':id')
    find(@Param('id') id: string) {
        return this.carsService.find(id);
    }

    @Put(':id')
    async updateCar(
        @Param('id') id :string, 
        @Body() data: UpdateCarDto
    ): Promise<Car>{

        if (!Types.ObjectId.isValid(id)) {
                    throw new NotFoundException(`Invalid car id: ${id}`);
        }

        return this.carsService.update(id, data);
    }

    @Delete(':id')
    async deleteCar(
        @Param('id') id :string
    ): Promise<DefaultResponse>{
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException(`Invalid car id: ${id}`);
        }
        return this.carsService.delete(id);
    }


    @Post()
    createCar(
       @Body() dto: CreateCarDto
    ){
          return this.carsService.create(dto);
    }
}
