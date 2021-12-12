import * as Cache from 'node-cache';

export class NodeCache {
  private static readonly nodeCache = new Cache();

  static async addRegisterWithEmail(email: string, code: number) {
    return this.nodeCache.set(`emailRegister-${email}`, code, 600);
  }

  static deleteRegisterWithEmail(email: string) {
    return this.nodeCache.del(`emailRegister-${email}`);
  }

  static getValueRegisterWithEmail(email: string) {
    return this.nodeCache.get(`emailRegister-${email}`);
  }

  static async addForgetPasswordCode(email: string, code: number) {
    return this.nodeCache.set(`forgetPassword-${email}`, code, 480);
  }

  static deleteForgetPasswordCode(email: string) {
    return this.nodeCache.del(`forgetPassword-${email}`);
  }

  static getValueForgetPasswordCode(email: string) {
    return this.nodeCache.get(`forgetPassword-${email}`);
  }
}
