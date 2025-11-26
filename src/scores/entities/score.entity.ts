import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 50 })
    name: string;

    @Column()
    score:number;

}
