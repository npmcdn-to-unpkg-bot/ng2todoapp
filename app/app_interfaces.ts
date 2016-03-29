export interface UnitT {

}
export interface UnitTL{
	listName: string;
	listDesc: string;
	priority: number;
	addedOn: Date;
	colorCode: string;
	isActive?: boolean;
	tasksKeys: string[];
	tasks: any;
	key: string;
	tempTask?: string;
	type: listType;
}

export interface newTaskList {
	listName: string;
	listDesc: string;
	type: listType;
}
export interface editTaskList{
	active: boolean;
	taskList: UnitTL;
}
export interface listMeta {
	id:string;
	listId:string;
	listName: string;
}
export enum listType { public, private };//public is 0 and private is 1
export enum listMode { none, add, edit };
export class modalOptions {
	title: string;
	body: string;
	type: modalType;
	prompt: modalPromptType;
}
export enum modalType {success,info,danger,warning}
export enum modalPromptType {alert,confirm}