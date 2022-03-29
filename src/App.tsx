import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskObjectType = {
    [key:string]:Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskObjectType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    // let [todolists, setTodolists] = useState<Array<todolistsType>>([
    //     {id: v1(), title: 'What to learn', filter: 'all'},
    //     {id: v1(), title: 'What to buy', filter: 'completed'},
    // ])
    //
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    //  let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(todoListId: string, taskId: string) {
        // let filteredTasks = tasks.filter(t => t.id !== id);
        // setTasks(filteredTasks);
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})
    }

    function addTask(todoListId: string, title: string) {
        let newTasks = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListId]: [newTasks, ...tasks[todoListId]]});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        });
    }


    // let tasksForTodolist = tasks;

    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }
    //
    function changeFilter(todoListId: string, value: FilterValuesType,) {
        setTodolists(todolists.map((el) => todoListId === el.id ? {...el, filter: value} : el))
        // setTodolists(value);
    }

    const removeTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
    }

    return (
        <div className="App">
            {todolists.map(el => {
                    let tasksForTodolist = tasks[el.id];
                    if (el.filter === "active") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={el.id}
                        todoListId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                    />
                }
            )}
        </div>
    );
}

export default App;
