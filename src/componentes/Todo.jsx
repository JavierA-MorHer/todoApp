import React, { useState } from "react";

export const Todo = ({ todo, onUpdate, onDelete }) => {

  const [isEdit, setIsEdit] = useState(false);
  const [newValue, setnewValue] = useState( todo.title );
  const [clicked, setClicked] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault();
  }

  const handleChange = ({target})=>{
    setnewValue(target.value);
  }

  const changeClick=()=>{
    setIsEdit(true)
  }

  const handleClick =()=>{
    if(newValue === '') return alert('No puede estar vacio');
    onUpdate(todo.id, newValue);
    setIsEdit(false)
  }


  function TodoElement() {
    return(
        <div className="todo">
            <span className="title" onClick={ ()=> setClicked(!clicked)}>
                {todo.title}
            </span>
            <button className="btn edit" onClick={changeClick}>Editar</button>
            <button className="btn delete" onClick={ (e)=> onDelete(todo.id) }>Realizado</button>
        </div>
    )
  }

  return (
    <>
      { 
        isEdit 
        ? <form className="form"  onSubmit={handleSubmit}>
            <input className=" input input-editar" type="text" onChange={handleChange} value={newValue}/>
            <button className="btn edit" onClick={handleClick}>Actualizar</button>
        </form> 
        : <TodoElement />}

    </>
  );
};
