import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {TodoUtils} from './todo_utility';
import {listType, UnitTL, editTaskList} from './app_interfaces'

@Component({
	selector: 'task-list',
	templateUrl: './partials/task_list.html'
})
export class TaskList {//TL : taskList
	@Input() unitTL:UnitTL;
    @Output() editTL = new EventEmitter<UnitTL>();
	appUtil: TodoUtils = new TodoUtils();

	askForNewTask() {
        $("#addtask" +this.unitTL.key).slideDown();
    }
    dismissNewTask() {
        $("#addtask" + this.unitTL.key).slideUp(400,()=>{
            if(this.unitTL)
                this.unitTL.tempTask = "";
        });
    }
    delegateEditTL(){
        this.editTL.next(this.unitTL);
    }

	addTask() {
        //0:public, 1:private
        if (this.unitTL && this.unitTL.tempTask){
            this.appUtil.addTask(this.unitTL.tempTask, this.unitTL.key, this.unitTL.type);
            this.dismissNewTask();
        }
    }
    deleteTask(tkey: string) {
        this.appUtil.deleteTask(tkey, this.unitTL.key, this.unitTL.type);
    }

    deleteTaskList() {
        this.appUtil.deleteTaskList(this.unitTL.key, this.unitTL.type);
    }
    updateTaskStatus(taskKey:string,event) {
        var status: boolean = event;
        this.appUtil.updateTaskStatus(status,taskKey,this.unitTL.key,this.unitTL.type)
    }
}