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
import EventBus from 'vertx3-eventbus-client';



const colors = ['#343a40', '#ff0000', '#ff9900', '#ffff00', '#008000', '#0033cc', '#000066', '#ff3399'];

class App extends Component {

  constructor(){
    super();
    this.state = {
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
      imgSrc: null,
    }
  }

  id;
  eventBus = new EventBus('http://192.168.0.108:8080/eventbus')

  componentDidMount() {
    this.eventBus.onopen = () =>{
      this.eventBus.registerHandler('todos', (error, message) => {
        console.log(message)
        if(this.id >= JSON.parse(message.body).id) {
          console.log("수정 or 본인글 진입")
          if(JSON.parse(message.body).useYn === 'Y'){
            console.log("수정 진입")
            const index = this.state.todos.findIndex(todo => todo.id === JSON.parse(message.body).id)
            const selected = this.state.todos[index];
            const nextTodos = [...this.state.todos];
            let check = false;
            if (JSON.parse(message.body).checked === 'Y') {
              check = true;
            }
            nextTodos[index] = {
              ...selected,
              text: JSON.parse(message.body).text,
              checked: check,
              color: JSON.parse(message.body).color,
              moment: moment(JSON.parse(message.body).moment).format('LLL'),
              updateYn: false,
              image: JSON.parse(message.body).image,
            };
            this.setState({
              todos: nextTodos,
            });
          }else{
            console.log("삭제 진입")
            let todos = this.state.todos;
            this.setState({
              todos: todos.filter(todo => todo.id !== JSON.parse(message.body).id)
            })
          }
        } else {
          console.log("새로운 입력진입");
          let todos = this.state.todos;
          let check = false;
          if (JSON.parse(message.body).checked === 'Y') {
            check = true;
          }
          this.id = JSON.parse(message.body).id;
          this.setState({
            todos: todos
              .concat({
                id: JSON.parse(message.body).id,
                text: JSON.parse(message.body).text,
                checked: check,
                color: JSON.parse(message.body).color,
                moment: moment(JSON.parse(message.body).moment).format('LLL'),
                useYn: JSON.parse(message.body).useYn,
                updateYn: false,
                image: JSON.parse(message.body).image,
              })
          })
        }
      })
    }


    axios.get('http://192.168.0.108:8080/api/get')
      .then(response => {
        console.log(response.data)
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
            useYn: a.useYn,
            updateYn: false,
          };
        });
        const newState = Object.assign({}, this.state, {
          todos: todoLists,
        });
        this.setState(newState);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeImg = e => { 
    this.setState({
      image: e.target.files
    });
    

    if(e.target.value !== null && e.target.value !== ""){
      let file = e.target.files[0]
      let reader = new FileReader();
  
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        this.setState({
          imgSrc: reader.result
        })
      }
    }
  } 

  imgOnClick = e => {
    e.target.value = null;
    this.setState({
      image: null,
      imgSrc: null,
    })
  }

  handleChange = e => {
    this.setState({
      input: e.target.value, // input 의 다음 바뀔 값
    });
  };

  handleCreate = () => {
    const { input, todos, color, flag, imgSrc } = this.state;
 
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
    }

    axios.post('http://192.168.0.108:8080/api/insert',
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}}
    ).then(
      this.setState({
        input: empty,
        image: null,
        imgSrc: null,
        todos: todos
          .concat({
            id: ++this.id,
            text: input,
            checked: false,
            color,
            moment: moment().format('LLL'),
            updateYn: false,
            image: imgSrc,
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
      method: 'post',
      url: 'http://192.168.0.108:8080/api/checked',
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
      method: 'post',
      url: 'http://192.168.0.108:8080/api/delete',
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
  handleUpdate = (id, updateText, updateColor,updateImg,image) => {
    console.log(updateImg);
    let checked;
    const formData = new FormData();
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];

    if (selected.checked === true) {
      checked = 'Y';
    } else {
      checked = 'N';
    }
 
    nextTodos[index] = {
      ...selected,
      text: updateText,
      color: updateColor,
      updateYn: false,
      image:updateImg,
    };
 
    formData.append("id",id)
    formData.append("text", updateText)
    formData.append("color", updateColor)
    formData.append("checked", checked)
 
    if(image===''){
    formData.append("action","notImgUpdated")
    }
    else if(image===null){
    formData.append("action","imgDeleted")
    }else{
        formData.append("action","insertImage")
        const files = Array.from(image);
        formData.append("fileName", files[0].name)
        formData.append("image", files[0], files[0].name)
    }

    axios({
      method: 'post',
      url: 'http://192.168.0.108:8080/api/todoitem',
      data:formData,
    });

    this.setState({
      todos: nextTodos,
    });
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
      imgOnClick
    } = this;

    return (
      <TodoListTemplate
        form={<Form value={input} onKeyPress={handleKeyPress} onChange={handleChange} 
        onCreate={handleCreate} color={color} onChangeImg={onChangeImg} imgSrc={imgSrc} imgOnClick={imgOnClick}/>}
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
