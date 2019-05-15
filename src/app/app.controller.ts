import {controller} from '@foal/core';

import {RainbowController, UserController} from './controllers';

export class AppController {
    subControllers = [
        controller('/api/rainbows', RainbowController),
        controller('/api/users', UserController)
    ];
}
