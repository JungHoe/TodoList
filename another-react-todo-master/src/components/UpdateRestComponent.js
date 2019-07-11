import React, { Component } from 'react';
import axios from 'axios';
export default function restUpdate(id,text,color) {
  axios({
    method:"patch",
    url:"http://localhost:8080/todoitem",
    params:{
      id:id,
      text:text,
      color:color
    }
  })

  return null
}


