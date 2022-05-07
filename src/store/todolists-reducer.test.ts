import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC,
    todolistsReducer
} from "./todolists-reducer";
let todolistId1:string;
let todolistId2:string;
let startState: Array<TodolistType>
beforeEach(()=> {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ];
})

test("correct todolist should be removed", () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    //
    // let startState: Array<TodolistType> = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ];

    // const endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todolistId1})
    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

});

test("add todolist", () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    const todoListTitle = 'NewTodoLIst'
    // let startState: Array<TodolistType> = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ];

    // const endState = todolistsReducer(startState, {type: "ADD-TODOLIST", title: todoListTitle})
    const endState = todolistsReducer(startState, addTodoListAC(todoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todoListTitle);

});
test("change todolist title", () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    const todoListTitle = 'NewTodoLIst'
    // let startState: Array<TodolistType> = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ];

    // const endState = todolistsReducer(startState, {type: "CHANGE-TITLE-TODOLIST", id:todolistId2 ,title: todoListTitle})
    const endState = todolistsReducer(startState, changeTitleTodoListAC(todoListTitle,todolistId2))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(todoListTitle);

});


test("change todolist filter", () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    const todoListFilter = 'active'
    // let startState: Array<TodolistType> = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "active"}
    // ];

    // const endState = todolistsReducer(startState, {type: "CHANGE-FILTER-TODOLIST", id:todolistId2 ,filter: 'active'})
    const endState = todolistsReducer(startState, changeFilterTodoListAC(todoListFilter,todolistId2))

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe(todoListFilter);
    expect(endState[0].filter).toBe('all');

});