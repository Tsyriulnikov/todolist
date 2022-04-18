import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTasksAC, ChangeStatusTasksAC, ChangeTitleTasksAC, RemoveTasksAC, tasksReducer} from "./tasks-reducer";

test("Remove task function", ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let startTasks:TasksStateType = ({
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    const endTasks = tasksReducer(startTasks, RemoveTasksAC("1",todolistId1))
    // expect(Object.keys(endTasks).length).toBe(1)
     expect(endTasks[todolistId1].length).toBe(1)
})

test("Add tasks functions", ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let startTasks:TasksStateType = ({
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    const endTasks = tasksReducer(startTasks, AddTasksAC("newtitle",todolistId1))

    expect(endTasks[todolistId1].length).toBe(3)
})


test(" Change status tasks functions", ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let startTasks:TasksStateType = ({
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    const endTasks = tasksReducer(startTasks,  ChangeStatusTasksAC("1", false, todolistId1))

    expect(endTasks[todolistId1][0].isDone).toBe(false)
})

test(" Change task title functions", ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTitle = "MatirialUI"
    let startTasks:TasksStateType = ({
          [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    const endTasks = tasksReducer(startTasks,  ChangeTitleTasksAC("1", newTitle, todolistId1))

    expect(endTasks[todolistId1][0].title).toBe(newTitle)
})