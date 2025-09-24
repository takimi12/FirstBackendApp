import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from "typeorm";
import type { Cart } from "./cart.js";
import { Cart as CartEntity } from "./cart.js";

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  GHOST = "ghost",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  externalId!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GHOST,
  })
  role!: UserRole;

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart!: Cart;
}
