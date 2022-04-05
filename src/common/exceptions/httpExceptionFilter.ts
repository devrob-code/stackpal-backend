import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private validationErrorResponse;

  private isValidationError(exception: HttpException): boolean {
    const response: unknown = exception?.getResponse();

    if (typeof response === 'object') {
      this.validationErrorResponse = response;

      return true;
    }

    return false;
  }

  private handleValidationException(response) {
    const { statusCode, error, message } = this.validationErrorResponse;

    return response.status(statusCode).json({
      status: statusCode,
      message: Array.isArray(message)
        ? message.map((error: any) => error.constraints)
        : message,
      name: error,
    });
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const status: number = exception.getStatus();

    if (this.isValidationError(exception)) {
      return this.handleValidationException(response);
    }

    response.status(status).json({
      status: exception.getStatus(),
      message: exception.message,
      name: exception.name,
    });
  }
}
