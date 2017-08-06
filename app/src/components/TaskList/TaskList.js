import React from 'react';
import FlipMove from 'react-flip-move'; //animations

import TaskItem from '../tasklist/tasklist';
import './tasklist.css';

export default ({tasks, handleEdit, handleDelete}) => ( // event handlers
  <div className='TaskList clearfix'>
    <FlipMove duration={350} easing='ease-in-out' enterAnimation='accordionHorizontal'>
      {tasks.map(task => <TaskItem
        task={task}
        key={task._id}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />)}
    </FlipMove>
  </div>
)