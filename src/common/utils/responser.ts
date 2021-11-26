export class Responser<T> {
  public readonly success;
  public readonly message;
  public readonly data: T;
  public readonly status;
  constructor(success, message, result?: T, status = null) {
    this.success = success;
    this.message = message;
    this.data = result;
    this.status = status;
  }
}
