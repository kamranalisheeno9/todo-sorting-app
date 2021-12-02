import { useState } from 'react';
import './App.css';
import TodoApp from './todoApp/todo'
function App() {
  const [input,setInput]=useState("")
  const [date,setDate]=useState("")
  const [todos,setTodos]=useState([])
  const [completionTime,setCompletionTime]=useState("")
  const [editTodo,setEditTodo]=useState(null)
  return (
    <div className="App">
     <TodoApp input={input} setInput={setInput} date={date} setDate={setDate} completionTime={completionTime} setCompletionTime={setCompletionTime} todos={todos} setTodos={setTodos} editTodo={editTodo} setEditTodo={setEditTodo} />
    </div>
  );
}

export default App;
