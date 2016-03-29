import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {TodoUtils} from './todo_utility';
import {enableProdMode} from "angular2/core";
import {listType, UnitTL, editTaskList} from './app_interfaces';
import {AddTaskList} from './add_task_list';
import {EditTaskList} from './edit_task_list';
import {TaskList} from './task_list'
enableProdMode();




@Component({
    selector: 'todo-app',
    templateUrl: './partials/app.html',
    directives: [AddTaskList, EditTaskList, TaskList]
})
export class App {
    appRef:Firebase = new Firebase('https://ng2todoapp.firebaseio.com');
    userRef: Firebase;
    authData: FirebaseAuthData;
    appUtil: TodoUtils;
    taskListEdit: editTaskList = {
        active:false,
        taskList: undefined
    }
    privateTaskLists ;
    publicTaskLists ;
    isRefreshActive: boolean = false;
    publicKeytoAdd: string;
	constructor(){
        this.appRef.onAuth((updatedAuthData: FirebaseAuthData) => { this.authDataHandler(updatedAuthData) });
        this.autoRefresh(1000);
	}

    private autoRefresh(ms:number){
        if(!this.isRefreshActive){
            this.isRefreshActive = true;
            setTimeout(() => { 
                this.isRefreshActive = false;
                this.autoRefresh(ms); 
            }, ms)
        }
        
    }
    togglePublicKey(){
        $("#addPublicKeyContainer").slideToggle(400, 'swing',()=>{
            this.publicKeytoAdd = "";
        });
    }
    addPTLtoCollection(){
        if (this.publicKeytoAdd){
            this.appUtil.addPublicListToCollection(this.publicKeytoAdd);
            this.togglePublicKey();
        }
    }
    addList(){
        $("#addNewTaskList").modal("show");
    }
    //Related to retrival and display
    editTL(tl: UnitTL) {
        this.taskListEdit.taskList = tl;
        this.taskListEdit.active = true;
        $("#EditTaskList").modal("show");
    }
    showShareId(key:string){
        this.publicKeytoAdd = key;
        $('#publicKeyShare').modal('show');
    }
    hideShareID(){
        this.publicKeytoAdd = "";
        $('#publicKeyShare').modal('hide');

    }
    doneEditing(status:boolean){
        this.taskListEdit.taskList = undefined;
        this.taskListEdit.active = false;
        $("#EditTaskList").modal("hide");
    }
    getKeys(reqListType: listType):string[] {
        if (reqListType == listType.public){
            if(this.publicTaskLists){
                return Object.keys(this.publicTaskLists);
            }
            return [];
        }else if(reqListType == listType.private){
            if (this.privateTaskLists) {
                return Object.keys(this.privateTaskLists);
            }
            return [];
        }
        return [];
    }


    //Login Related Functions
    authDataHandler(authData:FirebaseAuthData){
        this.authData = authData;
        if(authData){
            this.userRef = this.appRef.child("/users/" + this.authData.uid);
            this.appUtil = new TodoUtils(this.authData.uid);

            if (!this.privateTaskLists) this.privateTaskLists = {};
            if (!this.publicTaskLists) this.publicTaskLists = {};

            this.appUtil.populateLists(this.privateTaskLists, listType.private)();
            this.appUtil.populateLists(this.publicTaskLists, listType.public)();
            
            //console.log(authData)
        }else{
            this.userRef = undefined;
            this.appUtil = undefined;
            this.privateTaskLists = undefined;
            this.publicTaskLists = undefined;

        }

    }

    loginWith(provider:string){
        this.appRef.authWithOAuthPopup("google", (error, authData: FirebaseAuthData) =>{
            if(error){
                console.log(error)
            }
            this.authDataHandler(authData);
        });
    }
    logOut() {
        this.appRef.unauth();
    }
    //End of Login Related Functions
}