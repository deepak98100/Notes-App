import React, { useEffect, useState } from 'react'

const getLocalItems = () => {
   let list = localStorage.getItem('lists');

   if (list) {
      return JSON.parse(localStorage.getItem('lists'));
   } else {
      return [];
   }
}

function TaskList() {
   

   const [item, setItem] = useState('');
   const [todo, setTodo] = useState(getLocalItems());
   const [toggleSubmit, setToggleSubmit] = useState(true);
   const [isEditItem, setIsEditItem] = useState(null);

   const addItem = () => {
      if (!item) {} else if (item && !toggleSubmit) {
         setTodo(
            todo.map((elm) => {
               if (elm.id === isEditItem) {
                  return { ...elm, name: item }
               }
               return elm;
            })
         )
         setToggleSubmit(true);
         setItem('');
         setIsEditItem(null);
      } else {
         const allInputData = { id: new Date().getTime().toString(), name: item }
         setTodo([...todo, allInputData]);
         setItem('');
      }
   }

   const deleteItem = (index) => {
      const deleteThisData = confirm('⚠️ Do you want to delete this record');
      if(deleteThisData) {
         const updatedTodo = todo.filter((elm) => {
            return index !== elm.id;
         });
   
         setTodo(updatedTodo);
      } else {}
   }

   const editItem = (id) => {
      let newEditItem = todo.find((elm) => {
         return elm.id === id;
      });
       setToggleSubmit(false);
       setItem(newEditItem.name);
       setIsEditItem(id);
   }

   const removeAll = () => {
      const deleteAllData = confirm('⚠️ Do you want to delete all records');
       if(deleteAllData) {
         setTodo([]);
       } else {
         setTodo([...todo]);
       }
   }

   useEffect(() => {
      localStorage.setItem('lists', JSON.stringify(todo))
   }, [todo]);

  return (
    <>
      <div className='bg-emerald-400 p-3 max-w-sm mx-auto rounded-md mt-28'>
         <h1 className='text-6xl my-2'> 📃 </h1>
         <h1 className='font-bold text-xl my-2'> Task Manager </h1>
         <div className='flex gap-1 justify-center'>
            <div>
            <input id='text' type="search" placeholder='✍️ Add Tasks Here...' className='px-2 py-1 border border-black rounded-md my-2.5' value={ item } onChange={(e) => setItem(e.target.value)} />
            </div>

            {
               toggleSubmit ?  <button onClick={ addItem } className='my-2 bg-slate-200 rounded-full px-1.5 cursor-pointer hover:bg-lime-300'> ➕ </button> :  <div onClick={ addItem } className='my-2 bg-slate-700 rounded-full pt-1.5 px-1.5 cursor-pointer hover:bg-slate-500'> 📝 </div>
            }

         </div>

         <div className=''>
            {
               todo.map((elm) => {
                  return (
                     <div key={ elm.id } className='bg-blue-600 px-2 py-1 text-white rounded-md mx-14 my-2 flex justify-between' style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <h3 className='text-left my-1'> 📂 { elm.name } </h3>
                  <div className='flex gap-1'>
                  <p onClick={() => editItem(elm.id)} className='cursor-pointer bg-gray-800 h-fit w-fit px-1 pb-0.5 rounded-full hover:bg-slate-600'> 📝 </p>
            <p onClick={() => deleteItem(elm.id)} className='bg-gray-800 h-fit w-fit px-2 pb-0.5 rounded-full hover:bg-red-700 hover:text-white cursor-pointer'> x </p>
                  </div>
               </div>
                  )
               })
            }
            </div>

         <div>
            <button onClick={ removeAll } className='bg-black font-semibold text-white p-2 rounded-md hover:bg-gray-800 mt-4'> Remove All </button>
         </div>
         </div>
    </>
  )
}

export default TaskList
