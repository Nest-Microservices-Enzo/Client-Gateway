import { IsEnum, IsOptional } from "class-validator"
import { PaginationDto } from "src/common"
import { OrderSatusList, OrderStatus } from "../enum/order.enum"

export class OrderPAginationDto extends PaginationDto {

    @IsOptional()
    @IsEnum(OrderSatusList,{
        message:`Valid statuss are ${OrderSatusList}`
    })
    status:OrderStatus
}