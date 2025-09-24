var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from "typeorm";
import { Cart as CartEntity } from "./cart.js";
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["EDITOR"] = "editor";
    UserRole["GHOST"] = "ghost";
})(UserRole || (UserRole = {}));
let User = class User {
    id;
    externalId;
    role;
    cart;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "externalId", void 0);
__decorate([
    Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GHOST,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    OneToOne(() => CartEntity, (cart) => cart.user),
    __metadata("design:type", Function)
], User.prototype, "cart", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=user.js.map