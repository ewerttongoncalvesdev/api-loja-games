import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";


@Entity({name: "tb_categoria"})

export class Category{
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    categoria: string

    @OneToMany(() => Product, (product) => product.category)
    product: Product[]
}