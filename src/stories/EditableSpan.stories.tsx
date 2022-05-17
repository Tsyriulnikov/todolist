import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {EditableSpan } from '../EditableSpan';
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        onChange: { description: 'value Editablespan changed' },
        value:{
            defaultValue:'HTML',
            description:'Start value EditableSpan'
        }
    },
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;


export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange:action("Value EditableSpan Changed")
};



