import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity";


@Controller("/product")
export class ProductController {
    constructor(private readonly productService: ProductService){}

    /*Controller buscar todos*/
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Product[]>{
        return this.productService.findAll();
    }

    /*Controller buscar por ID*/
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise<Product>{
        return this.productService.findById(id);
    }

    /*Controller buscar por nome*/
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByAllNome(@Param('nome')nome: string):Promise<Product[]>{
        return this.productService.findAllByNome(nome);
    }

    /*Controller criar produto*/
    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() product: Product): Promise<Product>{
        return this.productService.create(product);
    }

    /*Controller atualiza produto*/
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()product: Product): Promise<Product>{
        return this.productService.update(product);
    }

    /*Controller deleta produto*/
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.productService.delete(id);
    }
}