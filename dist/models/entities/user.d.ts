import type { Cart } from "./cart.js";
export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    GHOST = "ghost"
}
export declare class User {
    id: string;
    externalId: string;
    role: UserRole;
    cart: Cart;
}
//# sourceMappingURL=user.d.ts.map