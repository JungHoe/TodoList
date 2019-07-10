import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';
import Sort from './components/listSort';
import moment from 'moment';
import axios from 'axios';
import { empty } from 'rxjs';
import MakeModal from './components/MakeModal';

const colors = ['#343a40', '#9c36b5', '#ffd43b', '#e03131'];

class App extends Component {
  id = 3; // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    getRemoveId: 0,
    modalIsOpen: false,
    input: empty,
    todos: [
      {
        id: 0,
        text: 'use Git',
        checked: false,
        color: '#343a40',
        moment: moment()
          .subtract(1, 'days')
          .calendar(),
        updateYn: false,
      },
      {
        id: 1,
        text: '밥먹기',
        checked: true,
        color: '#343a40',
        moment: moment()
          .subtract(2, 'days')
          .calendar(),
        updateYn: false,
      },
      {
        id: 2,
        text: '집가기',
        checked: false,
        color: '#343a40',
        moment: moment()
          .subtract(3, 'days')
          .calendar(),
        updateYn: false,
      },
    ],
    color: '#343a40',
    sortName: '오름차순↑',
    flag: true,
  };

  handleChange = e => {
    this.setState({
      input: e.target.value, // input 의 다음 바뀔 값
    });
  };

  handleCreate = () => {
    const { input, todos, color, flag } = this.state;
    if (input === empty) {
      alert('내용을 입력하여 주세요!');
      return;
    }
    this.setState({
      input: empty,
      todos: todos
        .concat({
          id: this.id++,
          text: input,
          checked: false,
          color,
          moment: moment().format('LLL'),
          updateYn: false,
        })
        .sort((a, b) => {
          var leftArray = a.id;
          var rightArray = b.id;

          if (flag) {
            return leftArray < rightArray ? -1 : leftArray > rightArray ? 1 : 0;
          } else {
            return leftArray < rightArray ? 1 : leftArray > rightArray ? -1 : 0;
          }
        }),
    });
  };

  handleKeyPress = e => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      if (e.shiftKey === true) {
      } else {
        this.handleCreate();
        e.preventDefault();
      }
    }
  };

  handleToggle = id => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked,
    };

    this.setState({
      todos: nextTodos,
    });
  };

  handleRemove = id => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id),
    });
  };

  handleSelectColor = color => {
    this.setState({
      color,
    });
  };

  handleSort = () => {
    const { todos, flag } = this.state;

    this.setState({
      sortName: this.state.sortName === '오름차순↑' ? '내림차순↓' : '오름차순↑',
      todos: todos.sort((a, b) => {
        var leftArray = a.id;
        var rightArray = b.id;

        if (flag) {
          return leftArray < rightArray ? 1 : leftArray > rightArray ? -1 : 0;
        } else {
          return leftArray < rightArray ? -1 : leftArray > rightArray ? 1 : 0;
        }
      }),
      flag: !this.state.flag,
    });
    console.log(todos);
  };

  // 수정모드 전환
  handleUpdateSet = id => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];

    const nextTodos = [...todos];
    if (this.state.todos[index].checked) {
      this.setState({
        todos: (todos[index].checked = false),
      });
    }

    nextTodos[index] = {
      ...selected,
      updateYn: true,
    };

    this.setState({
      todos: nextTodos,
    });
  };

  // 수정완료
  handleUpdate = (id, updateText, updateColor) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];

    if (updateText === '') {
      nextTodos[index] = {
        ...selected,
        color: updateColor,
        updateYn: false,
      };
    } else {
      nextTodos[index] = {
        ...selected,
        text: updateText,
        color: updateColor,
        updateYn: false,
      };
    }

    this.setState({
      todos: nextTodos,
    });
    console.log('update이벤트 속 컬러' + updateColor);
    console.log('현재컬러' + todos[index].color);
  };

  openModal = id => {
    this.setState({ modalIsOpen: true, getRemoveId: id });
  };

  closeModal = () => {
    const { getRemoveId } = this.state;
    this.handleRemove(getRemoveId);
    this.setState({ modalIsOpen: false });
  };
  cancleModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { input, todos, color, sortName, modalIsOpen } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor,
      handleSort,
      handleUpdateSet,
      handleUpdate,
      openModal,
      closeModal,
      cancleModal,
    } = this;

    return (
      <TodoListTemplate
        form={<Form value={input} onKeyPress={handleKeyPress} onChange={handleChange} onCreate={handleCreate} color={color} />}
        palette={<Palette colors={colors} selected={color} onSelect={handleSelectColor} />}
      >
        <Sort ascSort={handleSort} nowSort={sortName} />

        <TodoItemList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onUpdateSet={handleUpdateSet}
          onUpdate={handleUpdate}
          openModal={openModal}
          colors={colors}
        />
        <MakeModal modalIsOpen={modalIsOpen} closeModal={closeModal} cancleModal={cancleModal} />
      </TodoListTemplate>
    );
  }
}

export default App;
