import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AppWithRedux } from '../AppWithRedux';
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    } as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux {...args} />;


export const AppWithReduxExample = ()=>{
    return <AppWithRedux />
};




