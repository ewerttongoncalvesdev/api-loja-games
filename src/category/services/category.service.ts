import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entities/category.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class CategoryService {
    findAllByDescricao(descricao: string): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ){}

    /*Busca todos as categorias*/
    async findAll(): Promise<Category []>{
        return await this.categoryRepository.find({
            relations: {
                product: true
            }
        });
    }

    async findById(id: number): Promise<Category> {
        let category = await this.categoryRepository.findOne({
            where:{
                id
            },
            relations: {
                product: true
            }
        });

        if(!category)
            throw new HttpException ('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        return category;
    }

    /*Busca por categoria*/
    async findAllByCategoria(categoria: string): Promise<Category[]>{
        return await this.categoryRepository.find({
            where:{
                categoria: ILike(`%{categoria}%`)
            },
            relations:{
                product: true
            }
        });
    }

    /*Criar Categoria nova*/
    async create(categoria: Category): Promise<Category> {
        return await this.categoryRepository.save(categoria);
    }

    /*Atualiza categoria*/
    async update (categoria: Category): Promise<Category>{
        await this.findById(categoria.id);

        return await this.categoryRepository.save(categoria);
    }

    /*Deleta categoria*/
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.categoryRepository.delete(id);
    }


}