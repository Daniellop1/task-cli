#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const jsonTaskCollection_1 = require("./models/jsonTaskCollection");
const exampleData_1 = require("./exampleData");
let collection = new jsonTaskCollection_1.JsonTaskCollection("Dglobal", exampleData_1.tasks);
let showCompleted = true;
function displayTaskList() {
    console.log(`${collection.userName} Tasks ` +
        `(${collection.getTaskCounts().incomplete} tasks to do)`);
    collection.getTaskItems(showCompleted).forEach(task => task.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Complete"] = "Complete Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Purge"] = "Remove Complete Tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
async function promptAdd() {
    console.clear();
    const answers = await inquirer_1.default.prompt({
        type: "input",
        name: "add",
        message: "Enter task:"
    });
    if (answers["add"] !== "") {
        collection.addTask(answers["add"]);
    }
    promptUser();
}
async function promptComplete() {
    console.clear();
    const answers = await inquirer_1.default.prompt({
        type: "checkbox",
        name: "complete",
        message: "Mark Task Complete",
        choices: collection.getTaskItems(showCompleted).map(item => ({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    });
    let completedTasks = answers["complete"];
    collection
        .getTaskItems(true)
        .forEach(item => collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined));
    promptUser();
}
async function promptUser() {
    console.clear();
    displayTaskList();
    const answers = await inquirer_1.default.prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands)
    });
    switch (answers["command"]) {
        case Commands.Toggle:
            showCompleted = !showCompleted;
            promptUser();
            break;
        case Commands.Add:
            promptAdd();
            break;
        case Commands.Complete:
            if (collection.getTaskCounts().incomplete > 0) {
                promptComplete();
            }
            else {
                promptUser();
            }
            break;
        case Commands.Purge:
            collection.removeComplete();
            promptUser();
            break;
    }
}
promptUser();
