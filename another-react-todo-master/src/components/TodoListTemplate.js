import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import './TodoListTemplate.css';

const element = <FontAwesomeIcon icon={faCalendarCheck} />;

const TodoListTemplate = ({ form, palette, children }) => {
  return (
    <main className="todo-list-template">
      <div className="title">
        {element}
        &nbsp;Todo-List
      </div>
      <section className="palette-wrapper">{palette}</section>
      <section className="form-wrapper">{form}</section>
      <section className="todos-wrapper">{children}</section>
    </main>
  );
};

export default TodoListTemplate;
