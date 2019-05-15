import {createController, getHttpMethod, getPath} from '@foal/core';
import {strictEqual} from 'assert';
import {RainbowController} from './rainbow.controller';

describe('RainbowController', () => {
    let controller: RainbowController;

    before(async () => {
        controller = createController(RainbowController);
    });

    describe('Tests for RainbowController', () => {
        it('should handle requests at GET /.', () => {
            strictEqual(getHttpMethod(RainbowController, 'getList'), 'GET');
            strictEqual(getPath(RainbowController, 'getList'), '/');
        });

        it('should handle requests at GET /:id.', () => {
            strictEqual(getHttpMethod(RainbowController, 'getOne'), 'GET');
            strictEqual(getPath(RainbowController, 'getOne'), '/:id');
        });

        it('should handle requests at POST /:id/validate.', () => {
            strictEqual(getHttpMethod(RainbowController, 'validate'), 'POST');
            strictEqual(getPath(RainbowController, 'validate'), '/:id/validate');
        });
    });
});
