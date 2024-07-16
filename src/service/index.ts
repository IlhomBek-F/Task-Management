
export async function getTasks() {
    try {
        const tasks = await new Promise((resolve, reject) => {
            const data = JSON.parse(localStorage.getItem('tasks') || '[]');
            resolve(data)
        })
        return tasks
    } catch (error) {
        console.log(error)
    }
}

export async function saveTask(data: any) {
    try {
        const tasks = await new Promise((resolve, reject) => {
            const task = JSON.parse(localStorage.getItem('tasks') || '[]');
            localStorage.setItem('tasks', JSON.stringify([...task, data]));
            resolve(task)
        })
        return tasks
    } catch (error) {
        console.log(error)
    }
}