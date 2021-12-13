import * as Cache from 'node-cache';

export class NodeCache {
  private static readonly nodeCache = new Cache();

  static async addRegisterWithEmail(email: string, code: number) {
    return this.nodeCache.set(
      `emailRegister-${email.toLowerCase()}`,
      code,
      600,
    );
  }

  static deleteRegisterWithEmail(email: string) {
    return this.nodeCache.del(`emailRegister-${email.toLowerCase()}`);
  }

  static getValueRegisterWithEmail(email: string) {
    return this.nodeCache.get(`emailRegister-${email.toLowerCase()}`);
  }

  static async addForgetPasswordCode(email: string, code: number) {
    return this.nodeCache.set(
      `forgetPassword-${email.toLowerCase()}`,
      code,
      480,
    );
  }

  static deleteForgetPasswordCode(email: string) {
    return this.nodeCache.del(`forgetPassword-${email.toLowerCase()}`);
  }

  static getValueForgetPasswordCode(email: string) {
    return this.nodeCache.get(`forgetPassword-${email.toLowerCase()}`);
  }
}
