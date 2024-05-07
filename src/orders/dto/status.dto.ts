import { IsEnum, IsOptional } from 'class-validator';
import { OrderSatusList, OrderStatus,  } from '../enum/order.enum';



export class StatusDto {


  @IsOptional()
  @IsEnum( OrderSatusList, {
    message: `Valid status are ${ OrderSatusList }`
  })
  status: OrderStatus;

}