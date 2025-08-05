import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { Category } from "../entities/category.entity";

@Controller("/categoria")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    /*Controller buscar todos*/
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Category[]>{
        return this.categoryService.findAll();
    }

    /*Controller buscar por ID*/
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise<Category>{
        return this.categoryService.findById(id);
    }

    /*Controller buscar por descricao*/
    @Get('/categoria/:categoria')
    @HttpCode(HttpStatus.OK)
    findByAllCategoria(@Param('categoria')categoria:string):Promise<Category[]>{
        return this.categoryService.findAllByCategoria(categoria);
    }

    /*Controller criar categoria*/
    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() category: Category): Promise<Category>{
        return this.categoryService.create(category);
    }

    /*Controller atualiza categoria*/
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()category: Category): Promise<Category>{
        return this.categoryService.update(category);
    }

    /*Controller deleta categoria*/
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.categoryService.delete(id);
    }
}

