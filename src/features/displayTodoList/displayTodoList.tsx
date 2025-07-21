"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import TodoCard from "@/components/ui/todoCard";
import type { Todo } from "@/types/todo";
import { TODO_ENDPOINT } from "@/constant/endpoint";
import { useDisplayTodoList } from "./hook";

interface DisplayTodoListProps {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export default function DisplayTodoList({
  todos,
  setTodos,
}: DisplayTodoListProps) {
  const {
    selectedTodos,
    sortKey,
    setSortKey,
    sortedTodos,
    handleSelect,
    handleAllDelete,
    handleDelete,
    handleEdit,
  } = useDisplayTodoList(todos, setTodos);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(TODO_ENDPOINT.LIST);
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, [setTodos]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Todo List</h2>
      <div className="flex justify-end mb-4 items-center">
        <p className="text-sm text-gray-500 mr-4">
          {selectedTodos.length} / {todos.length} 件選択しています
        </p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleAllDelete}
        >
          削除
        </button>
      </div>
      <div className="flex justify-end mb-4 items-center">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-blue-200 transition font-semibold appearance-none"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="name">名前順</option>
          <option value="created_at">作成日順</option>
          <option value="updated_at">更新日順</option>
        </select>
      </div>
      <ul className="space-y-4 max-w-md mx-auto pl-0">
        {sortedTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            isSelected={selectedTodos.includes(todo.id)}
            onSelect={() => handleSelect(todo.id)}
            onDelete={() => handleDelete(todo.id)}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}
