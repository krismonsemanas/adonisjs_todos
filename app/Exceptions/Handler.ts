/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponseFormatter from 'App/Helpers/ApiResponseFormatter'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  private NOT_FOUND_ERRORS = ['E_ROUTE_NOT_FOUND', 'E_ROW_NOT_FOUND']

  public async handle(error: any, context: HttpContextContract) {
    if (context.request.wantsJSON()) {
      /**
       * Handle validation error
       * @code E_VALIDATION_FAILURE
       */
      if (error.code === 'E_VALIDATION_FAILURE') {
        return context.response.status(422).json(ApiResponseFormatter.error(error.messages, 422))
      }

      /**
       * Handle authorization error
       */
      if (error.code === 'E_UNAUTHORIZED_ACCESS') {
        return context.response.unauthorized(ApiResponseFormatter.error(error.message, 401))
      }

      /**
       * Handle route not found
       * @code array NOT_FOUND_ERRORS
       */
      if (this.NOT_FOUND_ERRORS.includes(error.code)) {
        return context.response.status(404).json(ApiResponseFormatter.error(error.message, 404))
      }

      /**
       * Handle internal server error
       * @code ECONNREFUSED
       */
      if (error.code === 'ECONNREFUSED') {
        return context.response.status(500).json(ApiResponseFormatter.error(error.message, 500))
      }
    }

    return super.handle(error, context)
  }
}
