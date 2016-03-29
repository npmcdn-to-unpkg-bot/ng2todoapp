System.register(['angular2/core', './todo_utility', './app_interfaces'], function(exports_1, context_1) {
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
    var core_1, todo_utility_1, app_interfaces_1;
    var EditTaskList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_utility_1_1) {
                todo_utility_1 = todo_utility_1_1;
            },
            function (app_interfaces_1_1) {
                app_interfaces_1 = app_interfaces_1_1;
            }],
        execute: function() {
            EditTaskList = (function () {
                function EditTaskList() {
                    this.doneEdit = new core_1.EventEmitter();
                }
                EditTaskList.prototype.getTitle = function () {
                    var type = "";
                    if (this.mtl) {
                        if (this.mtl.type == app_interfaces_1.listType.public) {
                            type = "Public";
                        }
                        else if (this.mtl.type == app_interfaces_1.listType.private) {
                            type = "Private";
                        }
                    }
                    return "Editing " + type + " Task List";
                };
                EditTaskList.prototype.dismiss = function (status) {
                    this.doneEdit.next(status);
                };
                EditTaskList.prototype.saveTaskList = function () {
                    if (!EditTaskList.appUtil) {
                        EditTaskList.appUtil = new todo_utility_1.TodoUtils();
                    }
                    EditTaskList.appUtil.updateTaskList(this.mtl);
                    this.dismiss(true);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], EditTaskList.prototype, "mtl", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditTaskList.prototype, "doneEdit", void 0);
                EditTaskList = __decorate([
                    core_1.Component({
                        selector: 'edit-task-list',
                        templateUrl: './partials/manage_task_list.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], EditTaskList);
                return EditTaskList;
            }());
            exports_1("EditTaskList", EditTaskList);
        }
    }
});
//# sourceMappingURL=edit_task_list.js.map