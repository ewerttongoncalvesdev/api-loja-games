import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoryService } from "../../category/services/category.service";
import { error } from "console";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private categoryService: CategoryService
    ) { }

    /*Buscar todos */
    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    /* Buscar por ID */
    async findById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: {
                id
            }
        });

        if (!product)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return product;
    }

    /*Buscar por nome*/
    async findAllByNome(nome: string): Promise<Product[]>{
        return await this.productRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            }
        });
    }

    /*Criar produto*/
    async create (product: Product): Promise<Product>{
        if (!product.category || !product.category.id){
            throw new HttpException ('Categoria não informada ou invalida!', HttpStatus.NOT_FOUND)
        }

        await this.categoryService.findById(product.category.id)

        return await this.productRepository.save(product);
    }

    /*Atualiza produto*/
    async update(product: Product): Promise<Product>{
        await this.findById(product.id)

        await this.categoryService.findById(product.category.id)

        return await this.productRepository.save(product);
    }

    /*Deleta produto*/
    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)

        return await this.productRepository.delete(id)
    }


}