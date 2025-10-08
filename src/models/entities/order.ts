import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from "typeorm";
  import { User } from "./user.js";
  import type { OrderItem } from "./orderItem.js";
  import { OrderItem as OrderItemEntity } from "./orderItem.js";
  
  @Entity()
  export class Order {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: User;
  
    @Column()
    userId!: string;
  
    @Column()
    customerName!: string;
  
    @Column()
    customerEmail!: string;
  
    @Column("decimal", { precision: 10, scale: 2 })
    subtotal!: number;
  
    @Column("decimal", { precision: 10, scale: 2 })
    tax!: number;
  
    @Column("decimal", { precision: 10, scale: 2 })
    total!: number;
  
    @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
    items!: OrderItem[];
  
    @CreateDateColumn()
    orderDate!: Date;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }