import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { getTasks } from "../service";
import DialogElem from "../shared/Dialog";
import Form from "../shared/Form";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

function TaskTable() {
    const toast = useRef<Toast>(null);
    const [tasks, setTask] = useState([] as any);
    const [show, setShow] = useState({show: false, data: null});

    useEffect(() => {
       getTasks()
        .then((data: any) => setTask(data))
        .catch(console.log)
    }, [])

    const handleUpdateClick = (data: any) => {
        const updatedTasks = tasks.map((task: any) => {
            return data.id === task.id ? {...data} : task
        });
        
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Task updated', life: 2000 });
        setTask(updatedTasks); 
        setShow({show: false, data: null})  
    }

    const handleComplete = (data: any) => {
        const updatedTasks = tasks.map((task: any) => task.id === data.id ? {...task, complete: !task.complete} : task);

        if(!data.complete) {
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Task completed', life: 1000 });
        }

        setTask(updatedTasks)
    }

    const handleDeleteTask = (deletedTaskId: number) => {
        setTask(tasks.filter((task: any) => task.id !== deletedTaskId))
     }

    const columnActions = (data: any) => {
      return (
        <>
        <Button icon="pi pi-check-circle" rounded text severity={data.complete ? 'success' : 'secondary'} onClick={() => handleComplete(data)}/>
        <Button icon="pi pi-pencil" rounded text onClick={() => setShow({show: true, data})}/>
        <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" onClick={() => deleteConfirm(data.id)}/>
        </>
      )
    }

    const deleteConfirm = (deletedTaskId: number) => {
        confirmDialog({
            message: 'Do you want to delete this task?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            draggable: false,
            accept: () => handleDeleteTask(deletedTaskId),
            reject: () => setShow({show: false, data: null})
        });
    };

    const footer = `In total there are ${tasks ? tasks.length : 0} tasks.`;

    return (
        <>
        <Toast ref={toast} />
        <DataTable value={tasks} footer={tasks.length && footer || ''} emptyMessage={'No available tasks'}
                 dataKey="id">
                <Column field="assign" header="Assigned"></Column>
                <Column field="dueTo" header="Due To"></Column>
                <Column field="task" header="Task"></Column>
                <Column field=""  headerStyle={{width: '180px'}} 
                body={columnActions}
                ></Column>
         </DataTable>
        {show.show && (
            <DialogElem header={'Update task'}>
              <Form 
                edit={true} 
                updatingValue={show.data}
                handleUpdateClick={handleUpdateClick}
                handleCancelClick={() => setShow({show: false, data: null})}
              />
           </DialogElem>
        )}
        </>
    )
}

export default TaskTable