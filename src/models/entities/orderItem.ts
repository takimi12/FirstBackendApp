import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import type { Order } from "./order.js";
  import { Order as OrderEntity } from "./order.js";
  import { Product } from "./product.js";
  
  @Entity()
  export class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: "CASCADE" })
    @JoinColumn({ name: "orderId" })
    order!: Order;
  
    @Column()
    orderId!: string;
  
    @ManyToOne(() => Product, { onDelete: "CASCADE", eager: true })
    @JoinColumn({ name: "productId" })
    product!: Product;
  
    @Column()
    productId!: string;
  
    @Column()
    name!: string;
  
    @Column({ default: 1 })
    quantity!: number;
  
    @Column("decimal", { precision: 10, scale: 2 })
    price!: number;
  
    @Column("decimal", { precision: 10, scale: 2 })
    total!: number;
  }