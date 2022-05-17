import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import  AppWithRedux  from '../AppWithRedux';
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]

    } as ComponentMeta<typeof AppWithRedux>;



export const AppWithReduxExample = ()=>{
   return (
        <AppWithRedux />
   )};



