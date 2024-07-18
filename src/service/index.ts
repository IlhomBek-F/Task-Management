import { TaskModel } from "../core/models/task-model";

export async function getTasks() {
    try {
        const tasks = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getTasksFromStorage())
            }, 2000)
        })
        return tasks
    } catch (error) {
        console.log(error)
    }
}

export async function saveTask(data: TaskModel) {
    try {
        const res = await new Promise((resolve, reject) => {
            const tasks = getTasksFromStorage();
            addTasksToStorage(tasks)
            resolve([...tasks, data])
        })

        return res
    } catch (error) {
        console.log(error)
    }
}

export async function updateTask(task: TaskModel) {
    try {
        const data = await new Promise((resolve, reject) => {
            const tasks = getTasksFromStorage()?.map((t: TaskModel) => t.id === task.id ? { ...task } : t);
            addTasksToStorage(tasks)
            resolve(tasks)
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteTask(id: number) {
    try {
        const data = await new Promise((resolve, reject) => {
            const tasks = getTasksFromStorage()
                ?.filter((task: TaskModel) => task.id !== id);
            addTasksToStorage(tasks)

            setTimeout(() => {
                resolve(tasks)
            }, 2000)
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function completeTask(id: number) {
    try {
        const data = await new Promise((resolve, reject) => {
            const tasks = getTasksFromStorage()?.
                map((task: TaskModel) => task.id === id ? { ...task, completed: !task.completed } : task);
            addTasksToStorage(tasks)
            resolve(tasks)
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

function addTasksToStorage(tasks: TaskModel[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function getTasksFromStorage(): TaskModel[] {
    return JSON.parse(localStorage.getItem('tasks') ?? '[]')
}