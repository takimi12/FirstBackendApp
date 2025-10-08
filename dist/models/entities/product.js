var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, } from "typeorm";
let Product = class Product {
    id;
    name;
    description;
    price;
    stock;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Column({ length: 150, default: "" }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    Column("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    Column({ default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ type: "timestamptz", nullable: true }),
    __metadata("design:type", Date)
], Product.prototype, "deletedAt", void 0);
Product = __decorate([
    Entity()
], Product);
export { Product };
//# sourceMappingURL=product.js.map