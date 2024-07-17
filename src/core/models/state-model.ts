import { TaskModel } from "./task-model";

export interface StateModel {
    tasks: TaskModel[],
    selectedStatus: number,
    loading: boolean
}