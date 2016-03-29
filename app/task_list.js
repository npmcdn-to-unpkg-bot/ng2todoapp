System.register(['angular2/core', './todo_utility'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, todo_utility_1;
    var TaskList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_utility_1_1) {
                todo_utility_1 = todo_utility_1_1;
            }],
        execute: function() {
            TaskList = (function () {
                function TaskList() {
                    this.editTL = new core_1.EventEmitter();
                    this.appUtil = new todo_utility_1.TodoUtils();
                }
                TaskList.prototype.askForNewTask = function () {
                    $("#addtask" + this.unitTL.key).slideDown();
                };
                TaskList.prototype.dismissNewTask = function () {
                    var _this = this;
                    $("#addtask" + this.unitTL.key).slideUp(400, function () {
                        if (_this.unitTL)
                            _this.unitTL.tempTask = "";
                    });
                };
                TaskList.prototype.delegateEditTL = function () {
                    this.editTL.next(this.unitTL);
                };
                TaskList.prototype.addTask = function () {
                    //0:public, 1:private
                    if (this.unitTL && this.unitTL.tempTask) {
                        this.appUtil.addTask(this.unitTL.tempTask, this.unitTL.key, this.unitTL.type);
                        this.dismissNewTask();
                    }
                };
                TaskList.prototype.deleteTask = function (tkey) {
                    this.appUtil.deleteTask(tkey, this.unitTL.key, this.unitTL.type);
                };
                TaskList.prototype.deleteTaskList = function () {
                    this.appUtil.deleteTaskList(this.unitTL.key, this.unitTL.type);
                };
                TaskList.prototype.updateTaskStatus = function (taskKey, event) {
                    var status = event;
                    this.appUtil.updateTaskStatus(status, taskKey, this.unitTL.key, this.unitTL.type);
                };
                __decorate([
                    //TL : taskList
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TaskList.prototype, "unitTL", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], TaskList.prototype, "editTL", void 0);
                TaskList = __decorate([
                    core_1.Component({
                        selector: 'task-list',
                        templateUrl: './partials/task_list.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], TaskList);
                return TaskList;
            }());
            exports_1("TaskList", TaskList);
        }
    }
});
//# sourceMappingURL=task_list.js.map