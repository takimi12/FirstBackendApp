var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, } from "typeorm";
import { User } from "./user.js";
import { OrderItem as OrderItemEntity } from "./orderItem.js";
let Order = class Order {
    id;
    user;
    userId;
    customerName;
    customerEmail;
    subtotal;
    tax;
    total;
    items;
    orderDate;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, { onDelete: "CASCADE" }),
    JoinColumn({ name: "userId" }),
    __metadata("design:type", User)
], Order.prototype, "user", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "customerName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "customerEmail", void 0);
__decorate([
    Column("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Order.prototype, "subtotal", void 0);
__decorate([
    Column("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Order.prototype, "tax", void 0);
__decorate([
    Column("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "orderDate", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
Order = __decorate([
    Entity()
], Order);
export { Order };
//# sourceMappingURL=order.js.map