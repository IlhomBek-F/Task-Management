import { TaskModel } from "../core/models/task-model";

export async function getTasks() {
    try {
        const tasks = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = JSON.parse(localStorage.getItem('tasks') || '[]');
                resolve(data)
            }, 2000)
        })
        return tasks
    } catch (error) {
        console.log(error)
    }
}

export async function saveTask(data: TaskModel) {
    try {
        const tasks = await new Promise((resolve, reject) => {
            const task = JSON.parse(localStorage.getItem('tasks') || '[]');
            localStorage.setItem('tasks', JSON.stringify([...task, data]));
            resolve([...task, data])
        })

        return tasks
    } catch (error) {
        console.log(error)
    }
}

export async function updateTask(task: TaskModel) {
    try {
        const data = await new Promise((resolve, reject) => {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
                ?.map((t: TaskModel) => {
                    return t.id === task.id ? { ...task } : t
                });;

            localStorage.setItem('tasks', JSON.stringify(tasks));
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
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
                ?.filter((task: TaskModel) => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(tasks));

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
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
                ?.map((task: TaskModel) => task.id === id ? { ...task, completed: !task.completed } : task);

            localStorage.setItem('tasks', JSON.stringify(tasks));
            resolve(tasks)
        })
        return data
    } catch (error) {
        console.log(error)
    }
}