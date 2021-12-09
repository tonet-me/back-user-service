import {
  IsDefined,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UserCompleteProfileWithEmailDTO {
  @IsDefined()
  @IsMongoId()
  readonly _id: string;

  @IsDefined()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsUrl()
  readonly photo: string;
}
