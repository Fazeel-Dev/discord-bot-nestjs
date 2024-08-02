import { IsOptional, IsString } from 'class-validator';

export class CommonParamsDto {
    @IsString()
    @IsOptional()
    version?: string = '1';
}