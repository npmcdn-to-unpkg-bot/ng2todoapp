import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {TodoUtils} from './todo_utility';
import {listType, newTaskList, listMode, UnitTL} from './app_interfaces'

@Component({
	selector:'add-task-list',
	templateUrl: './partials/manage_task_list.html'
})
export class AddTaskList{
	//mtl:manage task list
	mtl: newTaskList = {
        listName: "",
        listDesc: "",
        type:listType.private
    };
    static appUtil: TodoUtils;
    mode = listMode.add;
    getTitle(){
		return "Adding Task Lsit";
    }
    changeHandler(type){
		this.mtl.type = type;
    }
    dismiss(status:boolean){
        $('#addNewTaskList').modal('hide');
    }
    saveTaskList() {
    	console.log(this.mtl)
		if (!AddTaskList.appUtil) {
			AddTaskList.appUtil = new TodoUtils();
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

    }
}