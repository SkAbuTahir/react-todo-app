import { useEffect, useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import Navbar from './components/navbar'
import { MdDelete } from "react-icons/md";
import './App.css'


function App() {
  const [showall, setshowall] = useState(false)
  const [saveOrUpdate, setsaveOrUpdate] = useState("Save")
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState([])
  const [editIndex, setEditIndex] = useState(null);


  function handleShowall() {
    setshowall(!showall)
  }

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


  const handleChange = (e) => setInput(e.target.value);
  function handleEdit(index) {
    setInput(todos[index].text);
    setEditIndex(index);
    setsaveOrUpdate("Update");
  }
  function handleAdd() {
  if (input.trim() === "") return;

  if (saveOrUpdate === "Update" && editIndex !== null) {
    const updatedTodos = [...todos];
    updatedTodos[editIndex].text = input;
    setTodos(updatedTodos);
    setEditIndex(null);
    setsaveOrUpdate("Save");
  } else {
    setTodos([{ text: input, completed: false }, ...todos]); // latest at top
  }

  setInput("");
}



  // function handleAdd(i) {

  //   if (input.trim() !== "") {
  //     setTodos([...todos, { text: input, completed: false, index:`${i}` }])
  //     setInput("");
  //     setsaveOrUpdate("Save");
  //   }
  // }
  // function handleEdit(index) {
  //   setInput(todos[index].text);
  //   // setTodos(todos.filter((item, i) => i !== index));
  //   setTodos(todos.map((item, i) => { if (todos.index == i) { return { ...todos, text: input } } return null }));
  //   setsaveOrUpdate("Update")

  // }
  const handleDelete = (index) => {
    setTodos(todos.filter((item, i) => i !== index));
  }
  function handleCheckboxChange(index) {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    ))
  }




  return (
    <>

      <Navbar />
      <div className=' container min-h-[80vh] md:container md:mx-auto my-5 rounded-xl p-7 bg-violet-100' >
        <div className="addtodo">
          <h2 className="text-lg font-bold ">Add a todo</h2>
          <input onChange={handleChange} value={input} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} type="text" className=' bg-white border border-gray-300 rounded-lg px-4 py-2 my-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder-gray-400 text-gray-700 shadow-sm transition-all duration-200' placeholder='Enter your todo...' />
          <button onClick={handleAdd} className='hover:shadow-md px-2 py-1 text-white font-bold rounded-md m-6 bg-violet-500 hover:bg-violet-700 '  > {saveOrUpdate}</button>
        </div>

        <div className="addtodo">
          <div className="settings flex">
            <input type="checkbox" checked={showall} onChange={handleShowall} />
            <label className='ml-2'>Show completed</label>
          </div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className="m-5 text-blue-200">No todos to display</div>}
            <ul className='flex-col '>
              {todos.map((todo, index) => {
                return (showall || !todo.completed) &&

                  <li key={index} className="todo flex w-1/2 justify-between">
                    <div className="flex gap-5 my-1.5">

                      <input type="checkbox" checked={todo.completed} onChange={() => handleCheckboxChange(index)} />
                      <div className={` overflow-clip   ${todo.completed ? 'line-through' : ''}`}>{todo.text}</div>
                    </div>
                    <div className="buttons flex justify-between">
                      <button onClick={() => handleEdit(index)} className='max-h-8 hover:shadow-lg bg-violet-500 text-white font-bold p-1 px-1.5 hover:bg-violet-700 mx-3 rounded-md'><MdModeEdit /> </button>
                      <button onClick={() => handleDelete(index)} className='max-h-8  hover:shadow-lg bg-violet-500 text-white font-bold p-1 px-1.5 hover:bg-violet-700 rounded-md'><MdDelete /></button>
                    </div>
                  </li>
              })}
            </ul>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
