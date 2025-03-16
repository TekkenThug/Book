import { ApiErrorDto, ApiMessageDto } from '@/data/dto';
import { getReasonPhrase } from 'http-status-codes';

export const createSuccessDoc = <T>(
  statusCode: number,
  dto: T,
  message?: string,
) => {
  return {
    description: message ?? getReasonPhrase(statusCode),
    type: dto,
  };
};

export const createMessageCod = (
  statusCode: number,
  message: string,
  description?: string,
) => {
  return {
    description: description ?? getReasonPhrase(statusCode),
    type: ApiMessageDto,
    example: {
      message,
    },
  };
};

export const createErrorDoc = (
  statusCode: number,
  message?: string,
  description?: string,
) => {
  return {
    description: description ?? message ?? getReasonPhrase(statusCode),
    type: ApiErrorDto,
    example: {
      message: message ?? getReasonPhrase(statusCode),
      statusCode,
      error: getReasonPhrase(statusCode),
    },
  };
};
