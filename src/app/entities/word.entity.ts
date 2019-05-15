import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Rainbow} from './rainbow.entity';

@Entity()
export class Word {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    label: string;

    @Column()
    translation: string;

    @ManyToOne(type => Rainbow, rainbow => rainbow.words)
    rainbow: Rainbow;
}
