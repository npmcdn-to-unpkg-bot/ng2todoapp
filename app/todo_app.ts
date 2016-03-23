import {Component} from 'angular2/core';
import {TodoUtils} from './todo_utility';
import {enableProdMode} from "angular2/core";
import {listType} from './app_interfaces'
enableProdMode();




@Component({
    selector: 'todo-app',
    templateUrl: './partials/app.html'
})
export class App {
    appRef:Firebase = new Firebase('https://ng2todoapp.firebaseio.com');
    userRef: Firebase;
    authData: FirebaseAuthData;
    appUtil: TodoUtils;
    taskListName:string = "";
    taskListDesc: string = "";

    privateTaskLists ;
    publicTaskLists ;
	constructor(){
        this.appRef.onAuth((updatedAuthData: FirebaseAuthData) => { this.authDataHandler(updatedAuthData) });
	}
    //Related to retrival and display
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
    //Functions Related to main app
    addTaskList(reqType:number){
        if (reqType === 1) reqType = listType.private;//1=private, 0 public
        else reqType = listType.public;
        this.taskListName = this.taskListName.trim();
        this.taskListDesc = this.taskListDesc.trim();
        if(this.taskListName.length > 0 && this.taskListDesc.length > 0){
            this.appUtil.addTaskList(reqType, this.taskListName, this.taskListDesc);
            this.taskListName = "";
            this.taskListDesc = "";
        }

    }


    //Login Related Functions
    authDataHandler(authData:FirebaseAuthData){
        this.authData = authData;
        if(authData){
            this.userRef = this.appRef.child("/users/" + this.authData.uid);
            this.appUtil = new TodoUtils(this.authData.uid);

            if (!this.privateTaskLists) this.privateTaskLists = {};
            if (!this.publicTaskLists) this.publicTaskLists = {};

            this.appUtil.populateLists(this.privateTaskLists, listType.private);
            this.appUtil.populateLists(this.publicTaskLists, listType.public);
            console.log(authData)
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