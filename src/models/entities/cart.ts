import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import type { User } from "./user.js"; // tylko typ
import { User as UserEntity } from "./user.js"; // faktyczna klasa do dekoratora
import type { CartItem } from "./cartItem.js";
import { CartItem as CartItemEntity } from "./cartItem.js";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // 🔹 Relacja do User
  @OneToOne(() => UserEntity, (user) => user.cart, { onDelete: "CASCADE" })
  @JoinColumn()
  user!: User;

  // 🔹 Relacja do CartItem
  @OneToMany(() => CartItemEntity, (item) => item.cart, { cascade: true })
  items!: CartItem[];
}
