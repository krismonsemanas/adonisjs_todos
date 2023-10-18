interface BaseResponse {
  meta: {
    status: number
    message: any
  }
  data: any
}

export default class ApiResponseFormatter {
  protected static response: BaseResponse = {
    meta: {
      status: 404,
      message: null,
    },
    data: null,
  }

  public static success(data: any, message: any | null, status = 200) {
    this.response.meta.message = message
    this.response.meta.status = status
    this.response.data = data

    return this.response
  }

  public static error(message: any | null, status = 400) {
    this.response.data = null
    this.response.meta.message = message
    this.response.meta.status = status

    return this.response
  }
}
