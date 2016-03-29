import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {TodoUtils} from './todo_utility';
import {listType, newTaskList, listMode, UnitTL} from './app_interfaces'

@Component({
    selector: 'edit-task-list',
    templateUrl: './partials/manage_task_list.html'
})
export class EditTaskList {
    @Input() mtl: UnitTL;
    @Output() doneEdit = new EventEmitter<boolean>();
    static appUtil: TodoUtils;

    
    getTitle() {
        var type: string = "";
        if (this.mtl) {
            if (this.mtl.type == listType.public) {
                type = "Public";
            } else if (this.mtl.type == listType.private) {
                type = "Private";
            }
        }

        return "Editing " + type + " Task List";
    }
    dismiss(status:boolean){
        this.doneEdit.next(status)
    }
    saveTaskList() {
        if (!EditTaskList.appUtil) {
            EditTaskList.appUtil = new TodoUtils();
        }
        EditTaskList.appUtil.updateTaskList(this.mtl);
        this.dismiss(true);
    }

}