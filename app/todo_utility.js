System.register(['./app_interfaces'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_interfaces_1;
    var TodoUtils;
    return {
        setters:[
            function (app_interfaces_1_1) {
                app_interfaces_1 = app_interfaces_1_1;
            }],
        execute: function() {
            TodoUtils = (function () {
                function TodoUtils(userId) {
                    if (userId) {
                        TodoUtils.userId = userId;
                        TodoUtils.userRef = TodoUtils.appRef.child('/users/' + userId);
                    }
                }
                TodoUtils.prototype.deleteTask = function (taskKey, taskListkey, type) {
                    if (type == app_interfaces_1.listType.public) {
                        TodoUtils.appRef.child("/public/publicLists/" + taskListkey + "/" + taskKey).remove();
                    }
                    else if (type == app_interfaces_1.listType.private) {
                        TodoUtils.userRef.child("/privateLists/" + taskListkey + "/" + taskKey).remove();
                    }
                };
                TodoUtils.prototype.updateTaskStatus = function (status, tkey, tlkey, type) {
                    var ref;
                    if (type == app_interfaces_1.listType.public) {
                        ref = TodoUtils.appRef.child('/public/publicLists/' + tlkey + '/' + tkey + '/isDone');
                    }
                    else if (type == app_interfaces_1.listType.private) {
                        ref = TodoUtils.userRef.child('/privateLists/' + tlkey + '/' + tkey + '/isDone');
                    }
                    ref.set(status);
                };
                TodoUtils.prototype.updateTaskList = function (updatedTL) {
                    var ref;
                    if (updatedTL.type == app_interfaces_1.listType.private) {
                        ref = TodoUtils.userRef.child('/privateListsMeta/' + updatedTL.key);
                    }
                    else if (updatedTL.type == app_interfaces_1.listType.public) {
                        ref = TodoUtils.userRef.child('/publicListsMeta/' + updatedTL.key);
                    }
                    ref.update({
                        listName: updatedTL.listName,
                        listDesc: updatedTL.listDesc,
                        addedOn: updatedTL.addedOn,
                        priority: updatedTL.priority,
                        colorCode: updatedTL.colorCode
                    });
                };
                TodoUtils.prototype.deleteTaskList = function (taskListKey, type) {
                    if (type == app_interfaces_1.listType.public) {
                        TodoUtils.userRef.child("/publicListsMeta/" + taskListKey).remove();
                    }
                    else if (type == app_interfaces_1.listType.private) {
                        TodoUtils.userRef.child("/privateListsMeta/" + taskListKey).remove();
                        TodoUtils.userRef.child("/privateLists/" + taskListKey).remove();
                    }
                };
                TodoUtils.prototype.populateLists = function (listsObjVar, type) {
                    return function () {
                        var listMetaRef, listsRef;
                        if (type == app_interfaces_1.listType.private) {
                            //For private lists
                            listMetaRef = TodoUtils.userRef.child('/privateListsMeta');
                            listsRef = TodoUtils.userRef.child('/privateLists');
                        }
                        else if (type == app_interfaces_1.listType.public) {
                            listMetaRef = TodoUtils.userRef.child('/publicListsMeta');
                            listsRef = TodoUtils.appRef.child('/public/publicLists');
                        }
                        var handlerForKey = function (key, listsRef, listObjVar) {
                            return function () {
                                listsRef.child('/' + key).on("value", function (tasksSnap) {
                                    var taskList = tasksSnap.val();
                                    if (typeof (taskList) !== "object" || taskList === null || taskList === undefined) {
                                        listObjVar.tasks = {};
                                        listObjVar.tasksKeys = [];
                                    }
                                    else {
                                        listObjVar.tasks = taskList;
                                        listObjVar.tasksKeys = Object.keys(taskList);
                                    }
                                });
                            };
                        };
                        listMetaRef.on("value", function (metaSnap) {
                            var data = metaSnap.val();
                            if (data) {
                                var key, needHandler;
                                for (key in data) {
                                    if (key in listsObjVar) {
                                        needHandler = false;
                                    }
                                    else {
                                        listsObjVar[key] = {};
                                        needHandler = true;
                                    }
                                    var intKey;
                                    var tempList = data[key];
                                    var listObj = listsObjVar[key];
                                    for (intKey in data[key]) {
                                        listObj[intKey] = tempList[intKey];
                                    }
                                    listObj.isActive = false;
                                    listObj.tempTask = "";
                                    listObj.key = key;
                                    listObj.type = type;
                                    //Add a eventListeer to every key if required
                                    if (needHandler) {
                                        handlerForKey(key, listsRef, listObj)();
                                    }
                                }
                                //Remove the keys from listsObjVar that are not in data
                                for (key in listsObjVar) {
                                    if (!(key in data)) {
                                        delete listsObjVar[key];
                                        listsRef.child('/' + key).off("value");
                                    }
                                }
                            }
                        });
                    };
                };
                TodoUtils.prototype.addTask = function (task, key, type) {
                    var ref;
                    if (type == app_interfaces_1.listType.private) {
                        ref = TodoUtils.userRef.child('/privateLists/' + key);
                    }
                    else if (type == app_interfaces_1.listType.public) {
                        ref = TodoUtils.appRef.child('/public/publicLists/' + key);
                    }
                    var d = new Date();
                    ref.push({ task: task, isDone: false, addedOn: d.getTime() });
                };
                TodoUtils.prototype.addTaskList = function (taskListType, newTask) {
                    var listUrl = "";
                    var listMetaUrl = "";
                    if (taskListType == app_interfaces_1.listType.private) {
                        listUrl = "/users/" + TodoUtils.userId + "/privateLists";
                        listMetaUrl = "/users/" + TodoUtils.userId + "/privateListsMeta";
                    }
                    else if (taskListType == app_interfaces_1.listType.public) {
                        listUrl = "/public/publicLists";
                        listMetaUrl = "/users/" + TodoUtils.userId + "/publicListsMeta";
                    }
                    //Pushing  NoData to taskList
                    var taskListRef = TodoUtils.appRef.child(listUrl).push("NoData");
                    var taskListId = taskListRef.toString();
                    taskListId = taskListId.slice(taskListId.lastIndexOf('/') + 1, taskListId.length);
                    //Adding the taskListId to taskListIds holder
                    var listMeta = {};
                    var d = new Date();
                    listMeta[taskListId] = {
                        listName: newTask.listName,
                        listDesc: newTask.listDesc,
                        addedOn: d.getTime(),
                        priority: 0,
                        colorCode: '#333'
                    };
                    TodoUtils.appRef.child(listMetaUrl).update(listMeta);
                    if (taskListType == app_interfaces_1.listType.public) {
                        var publicListEntry = {};
                        publicListEntry[taskListId] = { listName: newTask.listName, listDesc: newTask.listDesc };
                        TodoUtils.appRef.child("/public/publicListsMeta").update(publicListEntry);
                    }
                };
                TodoUtils.prototype.addPublicListToCollection = function (key) {
                    TodoUtils.appRef.child('/public/publicListsMeta/' + key).once("value", function (snap) {
                        var data = snap.val();
                        var d = new Date();
                        TodoUtils.userRef.child('/publicListsMeta/' + key).set({
                            listName: data.listName,
                            listDesc: data.listDesc,
                            addedOn: d.getTime(),
                            priority: 0,
                            colorCode: '#333'
                        });
                    });
                };
                TodoUtils.appRef = new Firebase('https://ng2todoapp.firebaseio.com');
                return TodoUtils;
            }());
            exports_1("TodoUtils", TodoUtils);
        }
    }
});
/*		Explanation of data store
--------------------------------------------------
# 2 container : users.userID and public
# both have taskList and taskListMeta
# users.userID will have addtional profile and publicList

An Id will be generated by pushing taskList with 'NoData'
This Id will be used to add Meta and publicList


*/ 
//# sourceMappingURL=todo_utility.js.map