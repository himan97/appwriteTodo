import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useForm } from "react-hook-form";
import { account, database } from "../appwrite/config";
import { ID, Query } from "appwrite";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  CircleStackIcon,
} from "@heroicons/react/24/solid";
import SkeletonLoader from './SkeletonLoader';

const TodoItem = memo(({ todo, onEdit, onDelete, onSelect, isSelected, isEditing, editingText, onEditingTextChange, onSave, onCancelEdit }) => {
  return (
    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition duration-150 ease-in-out hover:bg-gray-100">
      <div className="flex items-center flex-1 mr-4">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
          checked={isSelected}
          onChange={() => onSelect(todo.$id)}
        />
        {isEditing ? (
          <input
            className="ml-3 flex-1 border-b-2 border-indigo-500 bg-transparent py-1 px-2 text-gray-700 focus:outline-none"
            type="text"
            value={editingText}
            onChange={(e) => onEditingTextChange(e.target.value)}
          />
        ) : (
          <span className={`ml-3 ${isSelected ? 'line-through text-gray-500' : 'text-gray-700'}`}>
            {todo.todo}
          </span>
        )}
      </div>
      <div className="flex items-center">
        {isEditing ? (
          <>
            <button
              className="text-green-600 hover:text-green-800 mr-2 focus:outline-none"
              onClick={onSave}
            >
              <CheckIcon className="w-5 h-5" />
            </button>
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={onCancelEdit}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <button
              className="text-indigo-600 hover:text-indigo-800 mr-2 focus:outline-none"
              onClick={() => onEdit(todo)}
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
            <button
              className="text-red-600 hover:text-red-800 focus:outline-none"
              onClick={() => onDelete(todo.$id)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </li>
  );
});

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  const fetchDocuments = useCallback(async (userId) => {
    setIsLoading(true);
    try {
      const { documents } = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [
          Query.equal("userId", userId),
          Query.orderDesc("createdAt"),
        ]
      );
      setTodoList(documents);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      const user = await account.get();
      fetchDocuments(user.$id);
    };
    loadTodos();
  }, [fetchDocuments]);

  const onSubmit = useCallback(async (data) => {
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
          createdAt: new Date().toISOString(),
        }
      );
      fetchDocuments(userId);
      reset();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }, [fetchDocuments, reset]);

  const deleteTask = useCallback(async (documentId) => {
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
  }, [fetchDocuments]);

  const deleteSelectedTasks = useCallback(async () => {
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
  }, [selectedTasks, fetchDocuments]);

  const deleteAllTasks = useCallback(async () => {
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
  }, [todoList, fetchDocuments]);

  const startEditing = useCallback((todo) => {
    setEditingId(todo.$id);
    setEditingText(todo.todo);
  }, []);

  const saveTask = useCallback(async () => {
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
  }, [editingId, editingText, fetchDocuments]);

  const handleSelectTask = useCallback((documentId) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(documentId)
        ? prevSelected.filter((id) => id !== documentId)
        : [...prevSelected, documentId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedTasks((prevSelected) =>
      prevSelected.length === todoList.length
        ? []
        : todoList.map((todo) => todo.$id)
    );
  }, [todoList]);

  const memoizedTodoList = useMemo(() => todoList, [todoList]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-3xl font-bold text-white">Todo List</h1>
        </div>
        <div className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center mb-6"
          >
            <input
              className="flex-grow border-2 border-gray-300 rounded-l-lg py-2 px-4 mr-0 text-gray-700 focus:outline-none focus:border-indigo-500 transition duration-200"
              type="text"
              placeholder="Add a new task"
              {...register("todo", { required: "Task cannot be empty" })}
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              type="submit"
            >
              <PlusIcon className="w-5 h-5 inline-block" />
              <span className="ml-2 hidden sm:inline-block">Add Task</span>
            </button>
          </form>
          
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {memoizedTodoList.length > 0 && (
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      checked={selectedTasks.length === memoizedTodoList.length}
                      onChange={handleSelectAll}
                    />
                    <span className="ml-2 text-gray-700">Select All</span>
                  </div>
                  {selectedTasks.length > 0 && (
                    <button
                      className="text-red-600 hover:text-red-800 font-medium transition duration-150 ease-in-out"
                      onClick={selectedTasks.length === memoizedTodoList.length ? deleteAllTasks : deleteSelectedTasks}
                    >
                      {selectedTasks.length === memoizedTodoList.length ? 'Delete All' : 'Delete Selected'}
                    </button>
                  )}
                </div>
              )}
              <ul className="space-y-2">
                {memoizedTodoList.map((todo) => (
                  <TodoItem
                    key={todo.$id}
                    todo={todo}
                    onEdit={startEditing}
                    onDelete={deleteTask}
                    onSelect={handleSelectTask}
                    isSelected={selectedTasks.includes(todo.$id)}
                    isEditing={editingId === todo.$id}
                    editingText={editingText}
                    onEditingTextChange={setEditingText}
                    onSave={saveTask}
                    onCancelEdit={() => {
                      setEditingId(null);
                      setEditingText("");
                    }}
                  />
                ))}
              </ul>
              {memoizedTodoList.length === 0 && (
                <p className="text-center text-gray-500 mt-6">No tasks yet. Add a new task to get started!</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Todo);