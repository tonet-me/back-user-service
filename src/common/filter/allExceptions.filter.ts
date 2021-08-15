import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { of } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status: number;
    let message: string = '';
    console.log('exception is: ', exception);
    if (exception instanceof MongoError) {
      status = this.mongodbExceptions(exception);
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception?.message) {
      message = exception.message;
    }
    return of({
      success: false,
      message: '',
      data: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      },
    });
    response.status(status).json({
      success: false,
      message: '',
      data: {
        status: '',
        jwt: '',

        // statusCode: status,
        // // timestamp: new Date().toISOString(),
        // path: request.url,
        // message,
      },
    });
  }

  private mongodbExceptions(exception: MongoError): number {
    const err = this.mongodbErrorHandler(exception);
    console.log('mongodb error: ', err);
    exception.message = err.message;
    return 409;
  }
  // private internalError(exception: InternalServerErrorException): number {
  //   return exception instanceof HttpException
  //     ? exception.getStatus()
  //     : HttpStatus.INTERNAL_SERVER_ERROR;
  // }
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
