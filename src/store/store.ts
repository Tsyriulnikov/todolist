import {combineReducers, createStore} from 'redux';
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer=combineReducers({
    tasks:tasksReducer,
    todolist:todolistsReducer,
})


/*
type AppRootState= {
todoLists:Array<TodoListType>
tasks:TasksStateType
}
Вместо этого  - rootReducerType
*/
export type AppRootStateType = ReturnType<typeof rootReducer>
export const store=createStore(rootReducer);

// @ts-ignore
window.store=store;