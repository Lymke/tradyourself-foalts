import {Context, Get, HttpResponseNotFound, HttpResponseOK, Post, ValidateBody } from '@foal/core';
import {getRepository} from 'typeorm';
import {Rainbow} from '../entities';

export class RainbowController {
    @Get('/')
    async getList() {
        const rainbows = await getRepository(Rainbow).find();
        return new HttpResponseOK(rainbows);
    }

    @Get('/:id')
    async getOne(ctx: Context) {
        const rainbow = await getRepository(Rainbow).findOne({
            relations: ['words'],
            where: {id: ctx.request.params.id}
        });

        if (!rainbow) {
            return new HttpResponseNotFound({message: 'This rainbow doesn\'t exist'});
        }
        rainbow.words.map(w => delete w.translation);

        return new HttpResponseOK(rainbow);
    }

    @Post('/:id/validate')
    @ValidateBody({
        additionalProperties: false,
        type: 'array',
        items: {
            additionalProperties: false,
            properties: {
                id: { type: 'string' },
                answer: { type: 'string' },
            },
            required: [ 'id', 'answer' ],
            type: 'object'
        }
    })
    async validate(ctx: Context) {
        // Get the rainbow
        const rainbow = await getRepository(Rainbow).findOne({
            relations: ['words'],
            where: {id: ctx.request.params.id}
        });

        if (!rainbow) {
            return new HttpResponseNotFound({message: 'This rainbow doesn\'t exist'});
        }

        // Validate the words
        return new HttpResponseOK(rainbow.correctAnwers(ctx.request.body));
    }
}
