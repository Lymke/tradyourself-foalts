import {encryptPassword} from '@foal/core';
import {UserWithPermissions} from '@foal/typeorm';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User extends UserWithPermissions {
    @PrimaryGeneratedColumn()
    id: number;
​
    // todo: remove nullable
    @Column({unique: true, nullable: true})
    email: string;

    // todo: remove nullable
    @Column({unique: true, nullable: true})
    pseudo: string;
​
    // todo: remove nullable
    @Column({nullable: true})
    password: string;

    @Column({unique: true, nullable: true})
    token: string;

    @Column({nullable: true})
    isActivated: boolean;

    @Column({nullable: true})
    createdAt: Date;

    constructor() {
        super();
        this.isActivated = false;
        this.createdAt = new Date();
    }

    async setPassword(password: string) {
        this.password = await encryptPassword(password);
    }
}

export {Group, Permission} from '@foal/typeorm';
