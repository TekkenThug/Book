import { ApiErrorDto, ApiMessageDto } from '@/data/dto';
import { getReasonPhrase } from 'http-status-codes';

export const createSuccessDoc = <T>({
  code,
  message,
  dto,
}: {
  code: number;
  dto?: T;
  message?: string;
}) => {
  if (dto) {
    return {
      description: getReasonPhrase(code),
      type: dto,
    };
  } else {
    return {
      description: getReasonPhrase(code),
      type: ApiMessageDto,
      example: {
        message,
      },
    };
  }
};

export const createErrorDoc = (statusCode: number, message?: string) => {
  return {
    description: getReasonPhrase(statusCode),
    type: ApiErrorDto,
    example: {
      message: message ?? getReasonPhrase(statusCode),
      statusCode,
      error: getReasonPhrase(statusCode),
    },
  };
};
