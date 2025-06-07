"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    username;
    firstName;
    lastName;
    email;
    password;
    createdAt;
    updatedAt;
    constructor(id, username, firstName, lastName, email, password) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map