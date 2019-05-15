import {createController, getHttpMethod, getPath} from '@foal/core';
import {strictEqual} from 'assert';
import {UserController} from './user.controller';

describe('UserController', () => {
    let controller: UserController;

    before(async () => {
        controller = createController(UserController);
    });

    describe('Tests for UserController', () => {
        it('should handle requests at POST /registration.', () => {
            strictEqual(getHttpMethod(UserController, 'registration'), 'POST');
            strictEqual(getPath(UserController, 'registration'), '/registration');
        });

        it('should handle requests at POST /validation/:token', () => {
            strictEqual(getHttpMethod(UserController, 'validation'), 'POST');
            strictEqual(getPath(UserController, 'validation'), '/validation/:token');
        });
    });
});
