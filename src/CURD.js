import React, { useRef, useState } from 'react'
import './CURD.css'

export default function CURD() {
    const list =[
        {
            id:1,
            name:"Kamal",
            age:"22"
        },
        {
            id:2,
            name:"Nimal",
            age:"24"
        },
    ]
    const [lists,setList] =useState(list);
    const [update,setUpdate]=useState(-1);
  return (
    <div className='curd'>
        <div>
            <AddList setList={setList}/>
        <form onSubmit={handleSubmit}>
        <table>
            <caption>Student Details</caption>
            <tr>
                <th>Name</th>
                <th>Age</th>
            </tr>
            {
                lists.map((current)=>(
                    update === current.id ? <EditList current={current} lists={lists} setList={setList}/> :
                    <tr>
                    <td>{current.name}</td>
                    <td>{current.age}</td>
                    <td>
                        <button className='edit' onClick={()=>handleEdit(current.id)}>Edit</button>
                        <button className='delete' type='button' onClick={()=>handleDelete(current.id)}>Delete</button>
                    </td>
                    </tr>
                )

                )
            }
        </table>
        </form>
        </div>
    </div>
  )

  function handleDelete(id){
    const newlist =list.filter((li)=>li.id !==id)
    setList(newlist);
  }

  function handleEdit(id){
    setUpdate(id)
  }
  function handleSubmit(e){
    e.preventDefault();
    const name=e.target.elements.name.value;
    const age=e.target.elements.age.value;
    const newlist=  lists.map((li)=>(
        li.id ===update ?{...li,name:name,age:age} : li
    ))

    setList(newlist)
    setUpdate(-1)
  }

}

function EditList({current,lists,setList}){
    function handInputname(e){
        e.preventDefault();
        const name =e.target.name;
        const value =name.value;
        const newlist=  lists.map((li)=>(
            li.id ===current.id ?{...li,name:value} : li
        ))

        setList(newlist)
    }
    function handInputage(e){
        e.preventDefault();
        const age =e.target.name;
        const value =age.value;
        const newlist=  lists.map((li)=>(
            li.id ===current.id ?{...li,age:value} : li
        ))

        setList(newlist)
    }
    return(
        <tr>
            <td><input type="text" onChange={handInputname} name='name' value={current.name}/></td>
            <td><input type="text" onChange={handInputage} name='age' value={current.age}/></td>
            <td><button type='submit'>Update</button></td>
        </tr>
    )

}

function AddList({setList}){
    const nameRef =useRef();
    const ageRef =useRef();
    function handleSubmit(e){
        e.preventDefault();
        const name=e.target.elements.name.value;
        const age=e.target.elements.age.value;
        const newlist={
            id:3,
            name,
            age
        }
        setList((prevList)=>{
            return prevList.concat(newlist)
        })
        nameRef.current.value="";
        ageRef.current.value="";

    }
    return(
        <form className='addForm' onSubmit={handleSubmit}>
            <input type='text' name="name" placeholder='Enter Name' ref={nameRef}/>
            <input type='text' name="age" placeholder='Enter age' ref={ageRef}/>
            <button type='submit'>Add</button>
        </form>
    )
}