import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";

/* Configura tabela produto da loja de games */
@Entity({name: "tb_produto"})
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string

    @UpdateDateColumn()
    lancamento: Date

    @ManyToOne(() => Category, (category)=> category.product, {
        onDelete: "CASCADE"
    })
    category: Category
}