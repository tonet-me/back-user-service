import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UserIdDTO {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;
}
