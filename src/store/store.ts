import {combineReducers, compose, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer=combineReducers({
    tasks:tasksReducer,
    todolist:todolistsReducer,
})
//Для DEVTools  Redux
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//


/*
type AppRootState= {
todoLists:Array<TodoListType>
tasks:TasksStateType
}
Вместо этого  - см. ниже
*/
export type AppRootStateType = ReturnType<typeof rootReducer>
export const store=createStore(rootReducer, composeEnhancers());

// @ts-ignore
window.store=store;