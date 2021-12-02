import React, { useEffect } from 'react';
import './todo.css'
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-date-picker';
import { AiFillCheckCircle,AiFillDelete,AiFillEdit } from 'react-icons/ai';
const Todo = ({ input, setInput, todos, setTodos, editTodo, setEditTodo, completionTime, setCompletionTime, date, setDate }) => {


    const onInputChange = (event) => {
        setInput(event.target.value)
    }
    const onInputChangeCompletion = (event) => {
        setCompletionTime(event.target.value)
    }
    
    const updateTodo = (title, id, completed,completion,date) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? { title, id, completed,completion,date } : todo
        );
        setTodos(newTodo)
        setEditTodo("")
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!editTodo) {
            todos.sort((a, b) => a[1] - b[-1])
            setTodos([...todos, { id: uuidv4(), title: input, completed: false, completion: completionTime, date: date == "" ? "" : `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` }]);

            setInput("");
            setCompletionTime("");
            setDate("");

        } else {
            updateTodo(input, editTodo.id, editTodo.completed,editTodo.completion,editTodo.date)
        }
    }
    const handleDelete = ({ id }) => {
        setTodos(todos.filter((todo) => todo.id != id))
    }
    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if (item.id === todo.id) {
                    return { ...item, completed: !item.completed }
                }
                return item
            })
        )
        console.log(todos)
    }

    const handleEdit = ({ id }) => {
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo)
        console.log(todos)
    }

    
    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("")
        }

    }, [setInput, editTodo])

    let sortedTodosCompletion = todos.sort((a, b) =>b.completion-a.completion);
    let sortedTodos = todos.sort((a, b) => new Date(...a.date.split('/').reverse())-new Date(...b.date.split('/').reverse()));
    return (
        <div className="background">
            <div className="todo-container">
            <h1>Todo App</h1>
            <form onSubmit={onFormSubmit}>
                <input
                    type="text"
                    placeholder="Enter Item"
                    className="input-ui"
                    value={input}
                    required
                    onChange={onInputChange}
                /><br />
                <input
                    type="text"
                    placeholder="Compeltion Time ( Minutes )"
                    className="input-ui"
                    onKeyPress={
                        (event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }

                    }
                    value={completionTime}
                    onChange={onInputChangeCompletion}
                /><br />
                <DatePicker
                className="input-ui calender-ui"
        onChange={setDate}
        value={date}
        minDate={new Date()}
      />
               <br />
                <div className="btn-container">
                <button className="input-btn" type="submit">
                    {editTodo ? "Ok" : "Add"}
                </button>
                </div>
            </form>
            <div>
                <div className="todo-list">
                    
                    {todos.map((todo) => {
                       
                                    return (
                                      
                                        <div className="each-todo" key={todo.id}>
                                            <input className={todo.completed ?"todo-name todo-done" :"todo-name"} type="text" value={todo.title} onChange={(event) => event.preventDefault()} />
                                            <button className="delete-btn" onClick={() => handleDelete(todo)}><AiFillDelete /></button>
                                            <button className="edit-btn" onClick={() => handleEdit(todo)}><AiFillEdit /></button>
                                            <button className="complete-btn" onClick={() => handleComplete(todo)} ><AiFillCheckCircle /></button>
                                            <p className="time-date"> {todo.completion} Minutes <span> {todo.date =="" ? "" : todo.date } </span></p>
                                            
                                        </div>
                                    )
                            
                        
                    })}
                </div>
            </div>
        </div>
        </div>
    );
}

export default Todo;