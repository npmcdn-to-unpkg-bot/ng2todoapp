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
    var core_1, todo_utility_1, core_2, app_interfaces_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (todo_utility_1_1) {
                todo_utility_1 = todo_utility_1_1;
            },
            function (app_interfaces_1_1) {
                app_interfaces_1 = app_interfaces_1_1;
            }],
        execute: function() {
            core_2.enableProdMode();
            App = (function () {
                function App() {
                    var _this = this;
                    this.appRef = new Firebase('https://ng2todoapp.firebaseio.com');
                    this.taskListName = "";
                    this.taskListDesc = "";
                    this.appRef.onAuth(function (updatedAuthData) { _this.authDataHandler(updatedAuthData); });
                }
                //Related to retrival and display
                App.prototype.getKeys = function (reqListType) {
                    if (reqListType == app_interfaces_1.listType.public) {
                        if (this.publicTaskLists) {
                            return Object.keys(this.publicTaskLists);
                        }
                        return [];
                    }
                    else if (reqListType == app_interfaces_1.listType.private) {
                        if (this.privateTaskLists) {
                            return Object.keys(this.privateTaskLists);
                        }
                        return [];
                    }
                    return [];
                };
                //Functions Related to main app
                App.prototype.addTaskList = function (reqType) {
                    if (reqType === 1)
                        reqType = app_interfaces_1.listType.private; //1=private, 0 public
                    else
                        reqType = app_interfaces_1.listType.public;
                    this.taskListName = this.taskListName.trim();
                    this.taskListDesc = this.taskListDesc.trim();
                    if (this.taskListName.length > 0 && this.taskListDesc.length > 0) {
                        this.appUtil.addTaskList(reqType, this.taskListName, this.taskListDesc);
                        this.taskListName = "";
                        this.taskListDesc = "";
                    }
                };
                //Login Related Functions
                App.prototype.authDataHandler = function (authData) {
                    this.authData = authData;
                    if (authData) {
                        this.userRef = this.appRef.child("/users/" + this.authData.uid);
                        this.appUtil = new todo_utility_1.TodoUtils(this.authData.uid);
                        if (!this.privateTaskLists)
                            this.privateTaskLists = {};
                        if (!this.publicTaskLists)
                            this.publicTaskLists = {};
                        this.appUtil.populateLists(this.privateTaskLists, app_interfaces_1.listType.private);
                        this.appUtil.populateLists(this.publicTaskLists, app_interfaces_1.listType.public);
                        console.log(authData);
                    }
                    else {
                        this.userRef = undefined;
                        this.appUtil = undefined;
                        this.privateTaskLists = undefined;
                        this.publicTaskLists = undefined;
                    }
                };
                App.prototype.loginWith = function (provider) {
                    var _this = this;
                    this.appRef.authWithOAuthPopup("google", function (error, authData) {
                        if (error) {
                            console.log(error);
                        }
                        _this.authDataHandler(authData);
                    });
                };
                App.prototype.logOut = function () {
                    this.appRef.unauth();
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'todo-app',
                        templateUrl: './partials/app.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], App);
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=todo_app.js.map