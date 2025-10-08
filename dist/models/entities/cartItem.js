var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Cart as CartEntity } from "./cart.js"; // faktyczna klasa
import { Product } from "./product.js";
let CartItem = class CartItem {
    id;
    cart;
    product;
    quantity;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], CartItem.prototype, "id", void 0);
__decorate([
    ManyToOne(() => CartEntity, (cart) => cart.items, { onDelete: "CASCADE" }),
    JoinColumn({ name: "cartId" }),
    __metadata("design:type", Function)
], CartItem.prototype, "cart", void 0);
__decorate([
    ManyToOne(() => Product, { onDelete: "CASCADE", eager: true }),
    JoinColumn({ name: "productId" }),
    __metadata("design:type", Product)
], CartItem.prototype, "product", void 0);
__decorate([
    Column({ default: 1 }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
CartItem = __decorate([
    Entity()
], CartItem);
export { CartItem };
//# sourceMappingURL=cartItem.js.map