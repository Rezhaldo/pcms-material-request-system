import { Type } from 'class-transformer';
import { ArrayMinSize, IsDateString, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateMaterialDto } from './create-material.dto';

export class CreateRequestDto {

    @IsDateString()
    requestDate: string;

    @IsString()
    @IsNotEmpty({ message: "Requester is required" })
    @MinLength(3, { message: "Requester must be at least 3 characters long" })
    requester: string;


    @IsString()
    @IsNotEmpty({ message: "Department is required" })
    department: string;

    @ValidateNested({ each: true })
    @Type(() => CreateMaterialDto)
    @ArrayMinSize(1)
    materials: CreateMaterialDto[];

}