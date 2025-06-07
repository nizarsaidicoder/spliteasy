"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const create_expense_category_dto_1 = require("./dto/create-expense-category.dto");
const expense_categories_service_1 = require("./expense-categories.service");
let ExpenseCategoriesController = class ExpenseCategoriesController {
    expenseCategoriesService;
    constructor(expenseCategoriesService) {
        this.expenseCategoriesService = expenseCategoriesService;
    }
    createOne(createExpenseCategoryDto) {
        return this.expenseCategoriesService.createOne(createExpenseCategoryDto);
    }
    getAll() {
        return this.expenseCategoriesService.getAll();
    }
    getById(id) {
        return this.expenseCategoriesService.getById(id);
    }
    updateOne(id, updateExpenseCategoryDto) {
        return this.expenseCategoriesService.updateOne(id, updateExpenseCategoryDto);
    }
    deleteOne(id) {
        return this.expenseCategoriesService.deleteOne(id);
    }
    getByName(name) {
        return this.expenseCategoriesService.getByName(name);
    }
};
exports.ExpenseCategoriesController = ExpenseCategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expense_category_dto_1.CreateExpenseCategoryDto]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "createOne", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_expense_category_dto_1.CreateExpenseCategoryDto]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "getByName", null);
exports.ExpenseCategoriesController = ExpenseCategoriesController = __decorate([
    (0, common_1.Controller)('expense-categories'),
    __metadata("design:paramtypes", [expense_categories_service_1.ExpenseCategoriesService])
], ExpenseCategoriesController);
//# sourceMappingURL=expense-categories.controller.js.map