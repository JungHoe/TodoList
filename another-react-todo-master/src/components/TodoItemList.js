import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
  render() {
    const { todos, onToggle, onRemove, onUpdateSet, onUpdate, openModal, colors } = this.props;

    const todoList = todos.map(({ id, text, checked, color, moment, image, updateYn }) => (
      <TodoItem
        id={id}
        text={text}
        checked={checked}
        color={color}
        colors={colors}
        image={image}
        onToggle={onToggle}
        onRemove={onRemove}
        onUpdateSet={onUpdateSet}
        onUpdate={onUpdate}
        moment={moment}
        key={id}
        updateYn={updateYn}
        openModal={openModal}
      />
    ));

    return <div>{todoList}</div>;
  }
}

export default TodoItemList;
