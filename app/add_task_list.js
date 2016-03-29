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
    var AddTaskList;
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
            AddTaskList = (function () {
                function AddTaskList() {
                    //mtl:manage task list
                    this.mtl = {
                        listName: "",
                        listDesc: "",
                        type: app_interfaces_1.listType.private
                    };
                    this.mode = app_interfaces_1.listMode.add;
                }
                AddTaskList.prototype.getTitle = function () {
                    return "Adding Task Lsit";
                };
                AddTaskList.prototype.changeHandler = function (type) {
                    this.mtl.type = type;
                };
                AddTaskList.prototype.dismiss = function (status) {
                    $('#addNewTaskList').modal('hide');
                };
                AddTaskList.prototype.saveTaskList = function () {
                    console.log(this.mtl);
                    if (!AddTaskList.appUtil) {
                        AddTaskList.appUtil = new todo_utility_1.TodoUtils();
                    }
                    this.mtl.listName = this.mtl.listName.trim();
                    this.mtl.listDesc = this.mtl.listDesc.trim();
                    if (this.mtl.listName.length > 0 && this.mtl.listDesc.length > 0) {
                        AddTaskList.appUtil.addTaskList(this.mtl.type, this.mtl);
                        this.mtl.listName = "";
                        this.mtl.listDesc = "";
                        this.dismiss(true);
                    }
                    //
                };
                AddTaskList = __decorate([
                    core_1.Component({
                        selector: 'add-task-list',
                        templateUrl: './partials/manage_task_list.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], AddTaskList);
                return AddTaskList;
            }());
            exports_1("AddTaskList", AddTaskList);
        }
    }
});
//# sourceMappingURL=add_task_list.js.map