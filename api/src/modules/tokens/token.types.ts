import { TokenTypes } from '@/data/enums';

export type JWTToken = {
  sub: number;
  iat: number;
  type: TokenTypes;
  exp: number;
};
