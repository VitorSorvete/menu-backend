import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsInt, isInt, IsPositive, IsUUID, Validate, ValidateNested } from "class-validator";

export class CreateOrderItemDto {
    @IsUUID()
    productId: string;

    @IsInt()
    @IsPositive()
    quantity: number;
}

export class CreateOrderDto {
    @IsUUID()
    spotId: string;

    @IsArray()
    @ArrayMaxSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}