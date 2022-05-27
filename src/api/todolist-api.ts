import axios, {AxiosResponse} from "axios";


type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type BaseRespnseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErroe: string[]
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': 'fe698d58-4d10-4f41-a217-bc0f632c98e5'}
})
export const todolistApi = {

    getTodos: () => {
        return instance.get<Array<TodoType>>(`todo-lists`)
    },

    createTodo: () => {
        // return instance.post<BaseRespnseType>(`todo-lists`,
        return instance.post<any,AxiosResponse<BaseRespnseType<{ item: TodoType }>>,{title:string}>(`todo-lists`,
            {title: "newTodolist"})
    },

    deleteTodo: () => {
        const todolistId = '04dd9a51-d2f7-498b-b7af-8b0003314600';
        return instance.delete<BaseRespnseType>(`todo-lists/${todolistId}`)
    },

    updateTodo: () => {
        const todolistId = '04dd9a51-d2f7-498b-b7af-8b0003314600'
        return instance.put<BaseRespnseType<{ item: TodoType }>>(`todo-lists/${todolistId}`, {title: 'REACT>>>>>>>>>'})
    }
}