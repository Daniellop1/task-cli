"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const TaskItem_1 = require("./models/TaskItem");
exports.tasks = [
    new TaskItem_1.TaskItem(1, "Buy Flowers"),
    new TaskItem_1.TaskItem(2, "Get Shoes"),
    new TaskItem_1.TaskItem(3, "task three"),
    new TaskItem_1.TaskItem(4, "task four", true)
];
