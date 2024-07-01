import React from 'react';

const Todo = () => {
 
 

  return (
   <>
   <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-xl">
        <h1 className="text-center text-2xl font-bold mb-4">Todo List</h1>
        <div className="bg-white shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4 flex ">
          
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight rounded-tl-xl rounded-bl-xl focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Add a new task"
              
              
            />
             <button
              className="w-[150px] bg-green-500 hover:bg-green-700 text-white font-bold  text-lg rounded-tr-xl rounded-br-xl focus:outline-none focus:shadow-outline"
              
            >
              Add Task
            </button>
        
         
         
        </div>
      </div>
      </div>
      </>
   
  );
};

export default Todo;
