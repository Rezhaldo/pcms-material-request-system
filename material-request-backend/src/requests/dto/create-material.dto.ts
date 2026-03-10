import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMaterialDto {

    @IsString()
    @IsNotEmpty({ message: 'Material description is required' })
    materialDescription: string;

    @IsString()
    materialType: string;

    @IsNumber()
    @Min(1, { message: 'Quantity must be at least 1' })
    quantity: number;

    @IsString()
    @IsNotEmpty({ message: 'Unit is required' })
    unit: string;

    @IsNumber()
    @Min(0.01, { message: 'Unit price must be greater than 0' })
    unitPrice: number;

    @IsString()
    supplier: string;
}