import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { account, database } from "../appwrite/config";
import { ID, Query } from "appwrite";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  CircleStackIcon
} from '@heroicons/react/24/solid'; 

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const { register, handleSubmit, reset } = useForm();

  // Fetch todos from the database
  const fetchDocuments = useCallback(async (userId) => {
    try {
      const { documents } = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [
          Query.equal("userId", userId),
          Query.orderDesc("createdAt") // Order by recently added
        ]
      );
      setTodoList(documents);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      const user = await account.get();
      fetchDocuments(user.$id);
    };
    loadTodos();
  }, [fetchDocuments]);

  // Add a new todo task
  const onSubmit = async (data) => {
    const { todo } = data;
    if (!todo.trim()) return;

    const user = await account.get();
    const userId = user.$id;

    try {
      await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        ID.unique(),
        { 
          todo, 
          userId, 
          createdAt: new Date().toISOString() // Add createdAt field
        }
      );
      fetchDocuments(userId);
      reset();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a single todo task
  const deleteTask = async (documentId) => {
    try {
      await database.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        documentId
      );
      const user = await account.get();
      fetchDocuments(user.$id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Delete selected tasks
  const deleteSelectedTasks = async () => {
    try {
      await Promise.all(
        selectedTasks.map((documentId) =>
          database.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            documentId
          )
        )
      );
      const user = await account.get();
      fetchDocuments(user.$id);
      setSelectedTasks([]);
    } catch (error) {
      console.error("Error deleting selected tasks:", error);
    }
  };

  // Delete all tasks
  const deleteAllTasks = async () => {
    try {
      await Promise.all(
        todoList.map((todo) =>
          database.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            todo.$id
          )
        )
      );
      const user = await account.get();
      fetchDocuments(user.$id);
      setSelectedTasks([]);
    } catch (error) {
      console.error("Error deleting all tasks:", error);
    }
  };

  // Start editing a specific task
  const startEditing = (todo) => {
    setEditingId(todo.$id);
    setEditingText(todo.todo);
  };

  // Save the edited task
  const saveTask = async () => {
    if (!editingText.trim()) return;

    try {
      await database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        editingId,
        { todo: editingText }
      );
      const user = await account.get();
      fetchDocuments(user.$id);
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle task selection
  const handleSelectTask = (documentId) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(documentId)
        ? prevSelected.filter((id) => id !== documentId)
        : [...prevSelected, documentId]
    );
  };

  // Handle select all tasks
  const handleSelectAll = () => {
    setSelectedTasks((prevSelected) =>
      prevSelected.length === todoList.length
        ? []
        : todoList.map((todo) => todo.$id)
    );
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-lg rounded-lg p-6">
        <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-6">
          Todo List
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center mb-6">
          <input
            className="flex-grow border border-gray-300 rounded-l-lg py-3 px-4 text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 ease-in-out"
            type="text"
            placeholder="Add a new task"
            {...register("todo", { required: true })}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-6 rounded-r-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            <PlusIcon className="w-5 h-5 inline" />
            Add Task
          </button>
        </form>
        {todoList.length > 0 && (
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedTasks.length === todoList.length}
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </div>
        )}
        <div className="text-center text-gray-600 text-lg font-medium">
          {todoList.map((todo) => (
            <div
              key={todo.$id}
              className="flex justify-between items-center p-2 border-b border-gray-200"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedTasks.includes(todo.$id)}
                onChange={() => handleSelectTask(todo.$id)}
              />
              {editingId === todo.$id ? (
                <>
                  <input
                    className="flex-grow border border-gray-300 rounded-l-lg py-3 px-4 text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 ease-in-out"
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 ml-2"
                    onClick={saveTask}
                  >
                    <CheckIcon className="w-5 h-5 inline" />
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 ml-2"
                    onClick={() => {
                      setEditingId(null);
                      setEditingText("");
                    }}
                  >
                    <XMarkIcon className="w-5 h-5 inline" />
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.todo}</span>
                  <div>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 ml-2"
                      onClick={() => startEditing(todo)}
                    >
                      <PencilSquareIcon className="w-5 h-5 inline" />
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
                      onClick={() => deleteTask(todo.$id)}
                    >
                      <TrashIcon className="w-5 h-5 inline" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        {todoList.length > 0 && selectedTasks.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              className={`text-lg font-semibold py-3 px-6 rounded transition duration-200 ease-in-out flex justify-center items-center ${
                selectedTasks.length === todoList.length
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
              }`}
              onClick={selectedTasks.length === todoList.length ? deleteAllTasks : deleteSelectedTasks}
              disabled={selectedTasks.length === 0}
            >
              {selectedTasks.length === todoList.length ? (
                <>
                  <CircleStackIcon className="w-5 h-5 inline" />
                  Delete All
                </>
              ) : (
                <>
                  <TrashIcon className="w-5 h-5 inline" />
                  Delete Selected Tasks
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
