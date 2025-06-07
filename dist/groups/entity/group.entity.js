"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
class Group {
    id;
    name;
    members;
    expenses;
    createdAt;
    updatedAt;
    constructor(id, name, members, expenses) {
        this.id = id;
        this.name = name;
        this.members = members;
        this.expenses = expenses;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.Group = Group;
//# sourceMappingURL=group.entity.js.map