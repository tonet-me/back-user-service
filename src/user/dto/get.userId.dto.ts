import { IsDefined, IsString } from 'class-validator';
export class UserIdDTO {
  @IsString()
  @IsDefined()
  readonly _id: string;
}
