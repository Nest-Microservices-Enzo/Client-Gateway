import {  Body, Controller , Get, Inject, Param  , Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {  firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';



@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client:ClientProxy,
  ) {}

@Post()
createProduct(@Body() createProductDto:CreateProductDto){
  return this.client.send({cmd:'create_product'},createProductDto)
}

@Get()
findAllProducts(@Query() paginationDto : PaginationDto){
 return this.client.send({cmd:'find_all_products'},paginationDto )
}

@Get(':id')
async findOne(@Param('id') id: string){

  try {
    const product = await firstValueFrom(
      this.client.send({cmd:'find_one_product'},{id})
    ); 
    return product;
  } catch (error) {
    throw new RpcException(error);
  }
}




}
