import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    morgan('[HTTP] :method :url :status - :response-time ms', {
      skip: (req) => req.method === 'OPTIONS',
    })(req, res, next);
  }
}
