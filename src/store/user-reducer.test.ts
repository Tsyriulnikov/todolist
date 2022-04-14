import {userReducer} from "./user-reducer";

test('Test reducer increment only age', ()=>{
    const  startState = {age:20,childrenCount:26, name:'Dimych'}
    const endState = userReducer(startState,{type:'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(26)
    });

test('userReducer should increment only childrenCount', ()=>{
    const startState={age:20,childrenCount:2, name:'Dimych'}
    const endState = userReducer(startState,{type:'INCREMENT-CHILDREN-COUNT'})
expect(endState.childrenCount).toBe(3)
expect(endState.age).toBe(20)
});

test('userReducer should change name of user', ()=>{
    const startState={age:20,childrenCount:2, name:'Dimych'}
   const newName = 'Viktor'
    const endState = userReducer(startState,{type:'CHANGE-NAME',name:newName})
    expect(endState.name).toBe(newName)
    expect(endState.age).toBe(20)
});