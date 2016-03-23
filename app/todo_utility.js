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
                    this.appRef = new Firebase('https://ng2todoapp.firebaseio.com');
                    this.userId = userId;
                    this.userRef = this.appRef.child('/users/' + userId);
                }
                TodoUtils.prototype.populateLists = function (listsObjVar, type) {
                    var listMetaRef, listsRef;
                    if (type == app_interfaces_1.listType.private) {
                        //For private lists
                        listMetaRef = this.userRef.child('/privateListsMeta');
                        listsRef = this.userRef.child('/privateLists');
                    }
                    else if (type == app_interfaces_1.listType.public) {
                        listMetaRef = this.userRef.child('/publicListsMeta');
                        listsRef = this.appRef.child('/public/publicLists');
                    }
                    var handlerForKey = function (key, listsRef, listObjVar) {
                        return function () {
                            console.log('on val init for ' + key);
                            listsRef.child('/' + key).on("value", function (tasksSnap) {
                                var taskList = tasksSnap.val();
                                console.log('on value called for ' + key, taskList);
                            });
                        };
                    };
                    listMetaRef.on("value", function (metaSnap) {
                        var data = metaSnap.val();
                        console.log('on value called for [public,private] = ' + type);
                        if (data) {
                            var key;
                            for (key in data) {
                                if (!listsObjVar[key]) {
                                    listsObjVar[key] = {};
                                }
                                var intKey;
                                var tempList = data[key];
                                var listObj = listsObjVar[key];
                                for (intKey in data[key]) {
                                    listObj[intKey] = tempList[intKey];
                                }
                                listObj.isActive = false;
                                if (!listObj.tasks)
                                    listObj.tasks = {};
                                //Add a eventListeer to every key if required
                                handlerForKey(key, listsRef, listObj)();
                            }
                        }
                    });
                };
                TodoUtils.prototype.addTaskList = function (taskListType, listName, listDesc) {
                    var listUrl = "";
                    var listMetaUrl = "";
                    if (taskListType == app_interfaces_1.listType.private) {
                        listUrl = "/users/" + this.userId + "/privateLists";
                        listMetaUrl = "/users/" + this.userId + "/privateListsMeta";
                    }
                    else if (taskListType == app_interfaces_1.listType.public) {
                        listUrl = "/public/publicLists";
                        listMetaUrl = "/users/" + this.userId + "/publicListsMeta";
                    }
                    //Pushing  NoData to taskList
                    var taskListRef = this.appRef.child(listUrl).push("NoData");
                    var taskListId = taskListRef.toString();
                    taskListId = taskListId.slice(taskListId.lastIndexOf('/') + 1, taskListId.length);
                    //Adding the taskListId to taskListIds holder
                    var listMeta = {};
                    var d = new Date();
                    listMeta[taskListId] = {
                        listName: listName,
                        listDesc: listDesc,
                        addedOn: d.getTime(),
                        priority: 0,
                        colorCode: '#333'
                    };
                    this.appRef.child(listMetaUrl).update(listMeta);
                    if (taskListType == app_interfaces_1.listType.public) {
                        var publicListEntry = {};
                        publicListEntry[taskListId] = { listName: listName, listDesc: listDesc };
                        this.appRef.child("/public/publicListsMeta").update(publicListEntry);
                    }
                };
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