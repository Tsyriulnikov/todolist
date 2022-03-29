import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = {
    id: string
    nameTodoList: string
    filter: FilterValuesType
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()
    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, nameTodoList: "What to learn", filter: "all"},
        {id: todoListId2, nameTodoList: "What to buy", filter: "all"}
    ])

    let [tasksObj, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Rom", isDone: false},
            {id: v1(), title: "Vodka", isDone: true}
        ]
    });


    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }


    function changeFilter(todoListId: string, value: FilterValuesType) {
        let todolList = todoLists.map((tl) => todoListId === tl.id ? {...tl, filter: value} : tl)
        setTodoLists(todolList)
    }

    const removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(t => t.id != todoListId);
        setTodoLists(filteredTodoList);
        delete tasksObj[todoListId];
        setTasks(tasksObj)


    }

    return (
        <div className="App">
            {todoLists.map(tl => {

                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }


                    return <Todolist title={tl.nameTodoList}
                                     key={tl.id}
                                     id={tl.id}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                                     removeTodoList={removeTodoList}
                    />
                }
            )}
        </div>
    );
}

export default App;
