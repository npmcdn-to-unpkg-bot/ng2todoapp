import {listType, newTaskList,UnitTL} from './app_interfaces'
export class TodoUtils {
	static appRef = new Firebase('https://ng2todoapp.firebaseio.com');
	static userRef: Firebase;
	static userId: string;
	constructor(userId?: string) {
		if(userId){
			TodoUtils.userId = userId;
			TodoUtils.userRef = TodoUtils.appRef.child('/users/' + userId);
		}
	}

	public deleteTask(taskKey: string, taskListkey: string, type:listType) {
		if(type == listType.public){
			TodoUtils.appRef.child("/public/publicLists/" + taskListkey + "/" + taskKey).remove();
		}else if(type == listType.private){
			TodoUtils.userRef.child("/privateLists/" + taskListkey + "/" + taskKey).remove();
		}
	}
	public updateTaskStatus(status: boolean, tkey: string, tlkey: string, type: listType) {
		var ref: Firebase;
		if(type == listType.public){
			ref = TodoUtils.appRef.child('/public/publicLists/' + tlkey + '/' + tkey + '/isDone');
		}else if(type == listType.private){
			ref = TodoUtils.userRef.child('/privateLists/' + tlkey + '/' + tkey + '/isDone');
		}
		ref.set(status);
	}
	public updateTaskList(updatedTL:UnitTL){
		var ref: Firebase;
		if(updatedTL.type == listType.private){
			ref = TodoUtils.userRef.child('/privateListsMeta/' + updatedTL.key);
		}else if(updatedTL.type == listType.public){
			ref = TodoUtils.userRef.child('/publicListsMeta/' + updatedTL.key);
		}
		ref.update({
			listName: updatedTL.listName,
			listDesc: updatedTL.listDesc,
			addedOn: updatedTL.addedOn,
			priority: updatedTL.priority,
			colorCode: updatedTL.colorCode
		})
	}
	public deleteTaskList(taskListKey:string,type:listType){
		if (type == listType.public) {
			TodoUtils.userRef.child("/publicListsMeta/" + taskListKey).remove();
		} else if (type == listType.private) {
			TodoUtils.userRef.child("/privateListsMeta/" + taskListKey).remove();
			TodoUtils.userRef.child("/privateLists/" + taskListKey).remove();
		}
	}
	public populateLists(listsObjVar, type: listType):Function {
		return function(){
			var listMetaRef: Firebase, listsRef: Firebase;
			if (type == listType.private) {
				//For private lists
				listMetaRef = TodoUtils.userRef.child('/privateListsMeta');
				listsRef = TodoUtils.userRef.child('/privateLists');
			} else if (type == listType.public) {
				listMetaRef = TodoUtils.userRef.child('/publicListsMeta');
				listsRef = TodoUtils.appRef.child('/public/publicLists');
			}

			var handlerForKey = function(key: String, listsRef: Firebase, listObjVar) {
				return function() {
					listsRef.child('/' + key).on("value", (tasksSnap) => {
						var taskList = tasksSnap.val();
						if (typeof (taskList) !== "object" || taskList === null || taskList === undefined) {
							listObjVar.tasks = {};
							listObjVar.tasksKeys = [];
						} else {
							listObjVar.tasks = taskList;
							listObjVar.tasksKeys = Object.keys(taskList);
						}
						
					})
				};
			}

			listMetaRef.on("value", (metaSnap) => {
				var data = metaSnap.val();
				if (data) {
					var key: string, needHandler: boolean;
					for (key in data) {
						if (key in listsObjVar) {
							needHandler = false;
						} else {
							listsObjVar[key] = {};
							needHandler = true;
						}
						var intKey: string;
						var tempList = data[key];
						var listObj = listsObjVar[key];
						for (intKey in data[key]) {
							listObj[intKey] = tempList[intKey]
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
					for (key in listsObjVar){
						if(!(key in data)){
							delete listsObjVar[key];
							listsRef.child('/' + key).off("value");
						}
					}
				}
			})
		}


	}
	public addTask(task:string,key:string,type:listType){
		var ref: Firebase;
		if(type==listType.private){
			ref = TodoUtils.userRef.child('/privateLists/' + key);
		}else if(type==listType.public){
			ref = TodoUtils.appRef.child('/public/publicLists/' + key)
		}
		var d: Date = new Date();
		ref.push({task:task,isDone:false,addedOn:d.getTime()})
	}
	public addTaskList(taskListType: listType, newTask: newTaskList) {
		var listUrl: string = "";
		var listMetaUrl: string = "";
		if (taskListType == listType.private) {
			listUrl = "/users/" + TodoUtils.userId + "/privateLists";
			listMetaUrl = "/users/" + TodoUtils.userId + "/privateListsMeta";
		} else if (taskListType == listType.public) {
			listUrl = "/public/publicLists";
			listMetaUrl = "/users/" + TodoUtils.userId + "/publicListsMeta";
		}
		//Pushing  NoData to taskList
		var taskListRef: Firebase = TodoUtils.appRef.child(listUrl).push("NoData");
		var taskListId: string = taskListRef.toString();
		taskListId = taskListId.slice(taskListId.lastIndexOf('/') + 1, taskListId.length);

		//Adding the taskListId to taskListIds holder
		var listMeta = {};
		var d: Date = new Date();
		listMeta[taskListId] = {
			listName: newTask.listName,
			listDesc: newTask.listDesc,
			addedOn: d.getTime(),
			priority: 0,
			colorCode: '#333'
		}
		TodoUtils.appRef.child(listMetaUrl).update(listMeta);

		if (taskListType == listType.public) {
			var publicListEntry = {};
			publicListEntry[taskListId] = { listName: newTask.listName, listDesc: newTask.listDesc };
			TodoUtils.appRef.child("/public/publicListsMeta").update(publicListEntry);

		}
	}

	public addPublicListToCollection(key:string){
		TodoUtils.appRef.child('/public/publicListsMeta/' + key).once("value", (snap) => {
			var data = snap.val();
			var d: Date = new Date();
			TodoUtils.userRef.child('/publicListsMeta/' + key).set({
				listName: data.listName,
				listDesc: data.listDesc,
				addedOn: d.getTime(),
				priority: 0,
				colorCode: '#333'
			});

		});
	}
}

/*		Explanation of data store
--------------------------------------------------
# 2 container : users.userID and public
# both have taskList and taskListMeta
# users.userID will have addtional profile and publicList

An Id will be generated by pushing taskList with 'NoData'
This Id will be used to add Meta and publicList


*/