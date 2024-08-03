import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Adding unique IDs for every API requests.
    req.headers['unique_id'] = v4();

    // If Request hit with a no access_token, means user is not logged in.
    if (!req?.headers?.['authorization']) req.headers['unique_id'] += '-NL';

    next();
  }
}
