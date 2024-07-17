import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTask, getTasks, saveTask, completeTask as completeT, updateTask } from "../service";
import { StateModel } from "../core/models/state-model";
import { TaskModel } from "../core/models/task-model";
import { AsyncThunkType } from "../core/enums/async-thunk-type";

const initialState = {
    tasks: [{} as TaskModel],
    selectedStatus: 2,
    loading: false,
}

export const AsyncThunkMap = new Map<AsyncThunkType, any>([
    [AsyncThunkType.FETCH_TASKS, createAsyncThunk(AsyncThunkType.FETCH_TASKS, getTasks)],
    [AsyncThunkType.ADD_TASK, createAsyncThunk(AsyncThunkType.ADD_TASK, saveTask)],
    [AsyncThunkType.DELETE_TASK, createAsyncThunk(AsyncThunkType.DELETE_TASK, deleteTask)],
    [AsyncThunkType.UPDATE_TASK, createAsyncThunk(AsyncThunkType.UPDATE_TASK, updateTask)],
    [AsyncThunkType.COMPLETE_TASK, createAsyncThunk(AsyncThunkType.COMPLETE_TASK, completeT)]
])

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        filterByDate: (state, { payload }) => {
            const data = JSON.parse(localStorage.getItem('tasks') || '[]');
            state.tasks = data.filter((task: TaskModel) => task.dueTo === payload)
        },

        filterByStatus: ((state, { payload }) => {
            const data = JSON.parse(localStorage.getItem('tasks') || '[]');
            state.selectedStatus = payload;
            if (payload === 2) {
                state.tasks = data;
                return;
            }

            state.tasks = data.filter((task: TaskModel) => task.completed === Boolean(payload))
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(AsyncThunkMap.get(AsyncThunkType.FETCH_TASKS).pending, (state: StateModel) => {
            state.loading = true;
        }).addCase(AsyncThunkMap.get(AsyncThunkType.FETCH_TASKS).fulfilled, (state: StateModel, { payload }) => {
            state.loading = false;
            state.tasks = payload;
        }).addCase(AsyncThunkMap.get(AsyncThunkType.FETCH_TASKS).rejected, (state: StateModel) => {
            state.loading = false;
        })

        builder.addCase(AsyncThunkMap.get(AsyncThunkType.ADD_TASK).fulfilled, (state: StateModel, { payload }) => {
            state.tasks = payload
        })

        builder.addCase(AsyncThunkMap.get(AsyncThunkType.DELETE_TASK).pending, (state: StateModel) => {
            state.loading = true
        }).addCase(AsyncThunkMap.get(AsyncThunkType.DELETE_TASK).fulfilled, (state: StateModel, { payload }) => {
            state.tasks = payload;
            state.loading = false;
        }).addCase(AsyncThunkMap.get(AsyncThunkType.DELETE_TASK).rejected, (state: StateModel) => {
            state.loading = false;
        })

        builder.addCase(AsyncThunkMap.get(AsyncThunkType.COMPLETE_TASK).fulfilled, (state: StateModel, { payload }) => {
            state.tasks = payload;
        }).addCase(AsyncThunkMap.get(AsyncThunkType.COMPLETE_TASK).rejected, (state: StateModel, { payload, dispatch }) => {
            state.tasks = payload;
            dispatch(filterByStatus(state.selectedStatus))
        })

        builder.addCase(AsyncThunkMap.get(AsyncThunkType.UPDATE_TASK).fulfilled, (state: StateModel, { payload }) => {
            state.tasks = payload
        })
    }
})


export const { filterByDate, filterByStatus } = taskSlice.actions;
export default taskSlice.reducer