import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import './App.css'

function App() {

  const [todos, setTodos] = useState([])

  //Состояния для отслеживания подсчетов
  const [allTodos, setAllTodos] = useState(0)
  const [allComplete, setAllComplete] = useState(0)

  useEffect(() => {
    setAllComplete(todos.filter(todo => todo.done === true).length)
  }, [todos])

  //Добавление задач
    const putTodo = (value) => {
        if(value){
          setTodos([...todos, {id: Date.now(), text: value, done: false}])
          setAllTodos(allTodos + 1)
        }else{
            alert('Введите вашу задачу')
        }
    }


    //Функция выполнения todo !!
    const toggleTodo = (id) => {
      setTodos(todos.map((todo) => {
          if(todo.id !== id) return todo;

          return {
            ...todo,
            done: !todo.done
          }
      }))
    }

    //Функция удаления todo !!
    const deleteTodo = (id) => {
      setTodos(todos.filter(todo => todo.id !== id))
      setAllTodos(allTodos - 1)
    }

    const clearTodos = () => {
      setTodos([])
      setAllTodos(0)
    }

  return (
    <div className="wrapper">
        <div className="container">
            <h1 className="title">TodoList</h1>
            <Form
             putTodo={putTodo} 
            />
            <ul className="todos">
                {todos.map(todo => 
                    <li className={todo.done ? "todo done" : "todo"} key={todo.id} onClick={() => {
                      toggleTodo(todo.id)
                      if(todo.done){
                        setAllComplete(allComplete - 1)

                      }else{
                        setAllComplete(allComplete + 1)
                      }
                      }}>
                        {todo.text}
                        <img src="./delete.png" alt="" className="delete" onClick={(e) => {
                            e.stopPropagation()
                            window.confirm("Подтвердите удаление");

                            setTimeout(() => {
                              deleteTodo(todo.id)
                            }, 1000)
                        }}/>
                    </li>
                  )}
                  <div className="info">
                        <span>ALL todos: {allTodos}</span>
                        <span>Complete: {allComplete}</span>
                  </div>
                  <button className="btn" onClick={clearTodos}>Clear ALL</button>
            </ul>
        </div>
    </div>
  );
}

export default App;
