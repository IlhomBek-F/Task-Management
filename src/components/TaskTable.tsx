import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import DialogElem from "./shared/Dialog";
import Form from "./shared/Form";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Skeleton } from "primereact/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { AsyncThunkMap } from "../redux/slices/taskSlice";
import { StateModel } from "../core/models/state-model";
import { AsyncThunkType } from "../core/enums/async-thunk-type";
import { TaskModel } from "../core/models/task-model";
import { Tooltip } from "primereact/tooltip";
import '../styles/data-table.css';

function TaskTable() {
    const dispatch = useDispatch<any>();
    const  loading = useSelector((state: StateModel) => state.loading);
    const  tasks = useSelector((state: StateModel) => state.tasks);
    const [dialogState, setShow] = useState({visible: false, data: null});
    const toast = useRef<Toast>(null);

    useEffect(() => {
        dispatch(AsyncThunkMap.get(AsyncThunkType.FETCH_TASKS)());
    }, [])

    const handleUpdateClick = (data: TaskModel) => {
        dispatch(AsyncThunkMap.get(AsyncThunkType.UPDATE_TASK)(data))
        .unwrap(unwrapResult)
        .then(() => {
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Task updated', life: 2000 });
            setShow({visible: false, data: null})
        })
    }

    const handleComplete = (data: TaskModel) => {
        dispatch(AsyncThunkMap.get(AsyncThunkType.COMPLETE_TASK)(data.id))
        .unwrap(unwrapResult)
        .then(() => {
            if(!data.completed) {
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Task completed', life: 1000 });
            }
        })
    }

    const columnActions = (data: any) => {
      return (
        <>
        <Button icon="pi pi-check-circle" rounded text severity={data.completed ? 'success' : 'secondary'} onClick={() => handleComplete(data)}/>
        <Button icon="pi pi-pencil" rounded text onClick={() => setShow({visible: true, data})}/>
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
            accept: () => dispatch(AsyncThunkMap.get(AsyncThunkType.DELETE_TASK)(deletedTaskId)),
            reject: () => setShow({visible: false, data: null})
        });
    };

    const footer = `In total there are ${tasks ? tasks.length : 0} tasks.`;
    const skeleton = loading && <Skeleton />
    return (
        <>
        <Toast ref={toast} />
        <DataTable value={tasks} footer={!loading && tasks.length && footer || ''} emptyMessage={'No available tasks'}
                 paginator={tasks.length > 5} rows={5}
                 dataKey="id">
                <Column field="assign" header="Assigned" body={skeleton}></Column>
                <Column field="dueTo" header="Due To" body={skeleton}></Column>
                <Column field="task" header="Task" body={({task}) => {

                    return skeleton || <>
                    <Tooltip target='.tooltip' style={{width: '540px'}}></Tooltip>
                    <p data-pr-tooltip={task} 
                       data-pr-hidedelay={100}
                       data-pr-position="bottom" 
                       className={`${task?.length > 41 ? 'tooltip' : ''} ellipsis`}>{task}
                    </p>
                </>
                }}
                ></Column>
                <Column field=""  headerStyle={{width: '180px'}} 
                body={loading && <Skeleton /> || columnActions}
                ></Column>
         </DataTable>
        {dialogState.visible && (
            <DialogElem header={'Update task'}>
              <Form 
                edit={true} 
                updatingValue={dialogState.data}
                handleUpdateClick={handleUpdateClick}
                handleCancelClick={() => setShow({visible: false, data: null})}
              />
           </DialogElem>
        )}
        </>
    )
}

export default TaskTable