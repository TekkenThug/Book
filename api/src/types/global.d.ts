import { TokenTypes } from '@/data/enums';

export declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: number;
        iat: number;
        type: TokenTypes;
        exp: number;
      };
    }
  }
}
