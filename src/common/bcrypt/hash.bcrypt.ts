import * as bcrypt from 'bcrypt';

export class Hash {
  private static readonly saltOrRounds = 5;

  static async add(password: string) {
    return bcrypt.hash(password, this.saltOrRounds);
  }

  static compare(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}
