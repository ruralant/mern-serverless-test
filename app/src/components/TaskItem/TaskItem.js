import React from 'react';
import './TaskItem.css';

export default class TaskItem extends React.Component {
  render() {
    const {
      task,
      handleEdit,
      handleDelete
    } = this.props;
    return (
      <div className="TaskItem clearfix">
        <div className="col-sm-9 TaskItem__content">
          <h4>{task.author}</h4>
          <p>{task.content}</p>
        </div>
        <div className="col-sm-3 TaskItem__control">
          <span
            className="glyphicon glyphicon-edit"
            onClick={handleEdit.bind(this, task._id)}
          />
          <span
            className="glyphicon glyphicon-remove"
            onClick={handleDelete.bind(this, task._id)}
          />
        </div>
      </div>
    )
  }
}