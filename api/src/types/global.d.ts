export declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: number;
        iat: number;
        type: 'access';
        exp: number;
      };
    }
  }
}
