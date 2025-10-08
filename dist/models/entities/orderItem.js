var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, } from "typeorm";
import { Order as OrderEntity } from "./order.js";
import { Product } from "./product.js";
let OrderItem = class OrderItem {
    id;
    order;
    orderId;
    product;
    productId;
    name;
    quantity;
    price;
    total;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: "CASCADE" }),
    JoinColumn({ name: "orderId" }),
    __metadata("design:type", Function)
], OrderItem.prototype, "order", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    ManyToOne(() => Product, { onDelete: "CASCADE", eager: true }),
    JoinColumn({ name: "productId" }),
    __metadata("design:type", Product)
], OrderItem.prototype, "product", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], OrderItem.prototype, "productId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], OrderItem.prototype, "name", void 0);
__decorate([
    Column({ default: 1 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    Column("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    Column("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "total", void 0);
OrderItem = __decorate([
    Entity()
], OrderItem);
export { OrderItem };
//# sourceMappingURL=orderItem.js.map