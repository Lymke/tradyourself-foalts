import {createApp} from '@foal/core';
import * as request from 'supertest';
import {createConnection, getConnection} from 'typeorm';

import {AppController} from '../app/app.controller';

describe('The server', () => {
    let app;

    before(async () => {
        await createConnection();
        app = createApp(AppController);
    });

    after(() => getConnection().close());

    it('should return a 200 status on GET /api/rainbows requests.', () => {
        return app.get('/api/rainbows', function(req, res) {
            res.status(200).json({ name: 'john' });
        });
    });
});
