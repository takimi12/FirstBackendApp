import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import type { Cart } from "./cart.js"; // tylko typ
import { Cart as CartEntity } from "./cart.js"; // faktyczna klasa
import { Product } from "./product.js";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => CartEntity, (cart) => cart.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cartId" })
  cart!: Cart;

  @ManyToOne(() => Product, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "productId" })
  product!: Product;

  @Column({ default: 1 })
  quantity!: number;
}
