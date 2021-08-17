import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';

export class VisibleInfoDTO {
  @IsMongoId()
  @IsOptional()
  readonly _id: string;

  @IsBoolean()
  @IsOptional()
  readonly mobileVisible: boolean;

  @IsBoolean()
  @IsOptional()
  readonly emailVisible: boolean;
}
