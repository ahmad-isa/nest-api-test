import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dtos/create-car.dto';
import { randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Car as CarSchemaClass } from './schemas/car.schema';
import { Model, Types } from 'mongoose';
import { UpdateCarDto } from './dtos/update-car.dto';
import { DefaultResponse } from './interfaces/default-response.interface';
import { Paginated } from './interfaces/paginated.interface';

@Injectable()
export class CarsService {
    constructor(
        @InjectModel(CarSchemaClass.name) private carModel: Model<Car>,
    ) {}
    
    private cars: Car[] = [];

    async findAll(page: number = 1, perpage: number = 10): Promise<Paginated<Car>> {
        if(page < 0) page = 1;

        if(perpage < 0) perpage = 10;

        const skip = (page - 1) * perpage;

        const items = await this.carModel
        .find({})
        .skip(skip)
        .limit(perpage)
        .exec();

        const total = await this.carModel.countDocuments({});

        return {
            status: 200,
            items,
            page,
            perpage,
            total
        }
    }

    async find(id: string): Promise<Car | null>{
        const car = this.carModel.findById(id).exec();
        if (!car){
            throw new NotFoundException('Car not found')
        }

        return car;
    }

    async delete(id:string): Promise<DefaultResponse> {

        const car = await this.find(id);
        if (!car){
            throw new NotFoundException('Car not found')
        }

        await this.carModel.deleteOne({ _id: id });
        return {
            status: 200, 
            message: "Data deletion successful"
        }
        
    }

    create(data:CreateCarDto): Car{
        const newCar: Car = {
            id: randomUUID(),
            name: data.name,
            description:data.description,
            power: data.power,
            torque: data.torque,
            bodytype: data.bodytype,
            drivetrain: data.drivetrain
        }

        this.carModel.create(data)
        return newCar;
    }

    async update(id: string, data:UpdateCarDto): Promise<Car> {

        const updatedCar = await this.carModel.findByIdAndUpdate(
            id,                     // filter
            { $set: data },         // update
            { new: true },          // return the updated document
        ).exec();

        if (!updatedCar) {
            throw new NotFoundException(`Car with id ${id} not found`);
        }

        return updatedCar;
    }

    
}
