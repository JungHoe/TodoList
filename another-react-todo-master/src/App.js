import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';
import Sort from './components/listSort';
import moment from 'moment';
import { empty } from 'rxjs';
import MakeModal from './components/MakeModal';
import axios from 'axios';
import { faAssistiveListeningSystems } from '@fortawesome/free-solid-svg-icons';



const colors = ['#343a40', '#ff0000', '#ff9900', '#ffff00', '#008000', '#0033cc', '#000066', '#ff3399'];

class App extends Component {
  componentDidMount() {
    axios.get('http://localhost:8080/').then(response => {
      this.id = response.data.totalCnt;
      const todoLists = response.data.todoList.map(a => {
        if (a.checked === 'N') {
          a.checked = false;
        } else {
          a.checked = true;
        }
        return {
          id: a.id,
          text: a.text,
          checked: a.checked,
          color: a.color,
          image: a.image,
          moment: moment(a.moment).format('LLL'),
          useyn: a.useYn,
          updateYn: false,
        };
      });
      const newState = Object.assign({}, this.state, {
        todos: todoLists,
      });
      this.setState(newState);
    });
  }

  state = {
    test: 0,
    getRemoveId: 0,
    modalIsOpen: false,
    input: empty,
    todos: [],
    color: '#343a40',
    sortName: '오름차순',
    flag: true,
    uploading: false,
    image: null,
    imgSrc: '',
  };

  onChangeImg = e => {
    this.setState({
      image: e.target.files
    });
    
    let file = e.target.files[0]
    let reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.setState({
        imgSrc: reader.result
      })
    }
  } 

  handleChange = e => {
    this.setState({
      input: e.target.value, // input 의 다음 바뀔 값
    });
  };

  handleCreate = () => {
    const { input, todos, color, flag } = this.state;
    let fileName = null;
    
    if (input === empty) {
      alert('내용을 입력하여 주세요!');
      return;
    }
    
    const formData = new FormData()
    formData.append("id", this.id+1)
    formData.append("text", input)
    formData.append("color", color)

    if(this.state.image != null){
      const files = Array.from(this.state.image);
      formData.append("fileName", files[0].name)
      formData.append("image", files[0], files[0].name)
      fileName = this.id+1+'_'+files[0].name;
    }

    axios.post('http://localhost:8080/insert',
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}}
    ).then(
      this.setState({
        input: empty,
        image: null,
        imgSrc: '',
        todos: todos
          .concat({
            id: ++this.id,
            text: input,
            checked: false,
            color,
            moment: moment().format('LLL'),
            updateYn: false,
            image: fileName,
          })
          .sort((a, b) => {
            var leftArray = a.id
            var rightArray = b.id

            if (flag) {
              return leftArray < rightArray ? -1 : leftArray > rightArray ? 1 : 0;
            } else {
              return leftArray < rightArray ? 1 : leftArray > rightArray ? -1 : 0;
            }
          }
          ),
          
      }),
      window.location.reload()
    );
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
    let checked;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    if (selected.checked === true) {
      checked = 'N';
    } else {
      checked = 'Y';
    }

    axios({
      method: 'PATCH',
      url: 'http://localhost:8080/checked',
      params: {
        id: selected.id,
        checked: checked,
      },
    });

    const nextTodos = [...todos]; // 배열을 복사 기존의 값들을 복사하고, checked 값을 덮어쓰기
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

    axios({
      method: 'DELETE',
      url: 'http://localhost:8080/delete',
      params: {
        id: id,
      },
    });

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
      sortName: this.state.sortName === '오름차순' ? '내림차순' : '오름차순',
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
    let checked;
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];
    if (selected.checked === true) {
      checked = 'Y';
    } else {
      checked = 'N';
    }
    if (updateText === '') {
      nextTodos[index] = {
        ...selected,
        color: updateColor,
        updateYn: false,
      };

      axios({
        method: 'patch',
        url: 'http://localhost:8080/todoitem',
        params: {
          id: id,
          text: selected.text,
          color: updateColor,
          checked: checked,
        },
      });
    } else {
      nextTodos[index] = {
        ...selected,
        text: updateText,
        color: updateColor,
        updateYn: false,
      };
      axios({
        method: 'patch',
        url: 'http://localhost:8080/todoitem',
        params: {
          id: id,
          text: updateText,
          color: updateColor,
          checked: checked,
        },
      });
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
  handleOndrop = (pictureFiles, pictureDataURLs) =>{
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles),
      upload:pictureDataURLs
  });
  }

  render() {
    const { input, todos, color, sortName, modalIsOpen, imgSrc} = this.state;
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
      onChangeImg,
    } = this;

    return (
      <TodoListTemplate
        form={<Form value={input} onKeyPress={handleKeyPress} onChange={handleChange} 
        onCreate={handleCreate} color={color} onChangeImg={onChangeImg} imgSrc={imgSrc}/>}
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
