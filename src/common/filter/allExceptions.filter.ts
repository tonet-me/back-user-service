import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { of } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    let status: number;
    let errorName: string = '';
    let message: string = '';
    if (exception instanceof MongoError) {
      status = this.mongodbExceptions(exception);
    } else if (exception instanceof HttpException) {
      const error: any = exception.getResponse().valueOf();
      message = error?.message;
      status = exception.getStatus();
    } else status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception?.message) {
      errorName = exception.message;
    }
    return of({
      success: false,
      message: errorName,
      data: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      },
    });
  }

  private mongodbExceptions(exception: MongoError): number {
    const err = this.mongodbErrorHandler(exception);
    exception.message = err.message;
    return 409;
  }

  private mongodbErrorHandler(err: MongoError) {
    let path;
    err.message &&
      (path = err.message.replace(/^.+index: (.+)_\d+ dup key.+$/, '$1'));
    let value;
    err.message &&
      (value = err.message.replace(
        /^.+ dup key: \{\s:\s\"?([^\"\s]+).+$/,
        '$1',
      ));
    return {
      message: '{0} is expected to be unique.'.replace('{0}', path),
      field: path,
      value: value,
      code: 409,
    };
  }
}
