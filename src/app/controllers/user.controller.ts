import {
    Context, dependency, HttpResponseBadRequest, HttpResponseCreated, HttpResponseNoContent, Post, ValidateBody
} from '@foal/core';
import {getRepository} from 'typeorm';
import {User} from '../entities';
import {Generator} from '../services';
import {MailerService} from '../services/mailer.service';
import {environment} from '../../environments/environment';

const userSchema = {
    additionalProperties: false,
    properties: {
        email: {type: 'string', maxLength: 255},
        password: {type: 'string', minLength: 8},
        pseudo: {type: 'string', minLength: 5, maxLength: 255},
        tou: {type: 'boolean'}
    },
    required: ['email', 'password', 'pseudo', 'tou'],
    type: 'object',
};

export class UserController {
    @dependency
    mailer: MailerService;

    @Post('/registration')
    @ValidateBody(userSchema)
    async registration(ctx: Context) {
        if (!ctx.request.body.tou) {
            return new HttpResponseBadRequest('You must accept therm of use.');
        }

        let user = new User();
        user.email = ctx.request.body.email;
        user.pseudo = ctx.request.body.pseudo;
        await user.setPassword(ctx.request.body.password);
        user.token = Generator.generateToken();

        user = await getRepository(User).save(user);

        const subject = 'Validate your registration';
        const content = `<a href="${environment.frontHost}/users/validation/${user.token}">Validate registration</a>`;
        this.mailer.sendEmail(user, subject, content);

        delete user.password;
        delete user.token;

        return new HttpResponseCreated(user);
    }

    @Post('/validation/:token')
    async validation(ctx: Context) {
        const user = await getRepository(User).findOne(
            {
                where: {token: ctx.request.params.token}
            }
        );

        if (!user) {
            return new HttpResponseNoContent();
        }

        user.isActivated = true;
        // SQLite have some problems with nullable
        user.token = '';
        await getRepository(User).save(user);

        return new HttpResponseNoContent();
    }
}
