"use client";

import { useEffect, useState, useMemo } from "react";
import TodoCard from "@/components/ui/todoCard";
import { Todo } from "@/types/todo";

type DisplayTodoListProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export default function DisplayTodoList({
  todos,
  setTodos,
}: DisplayTodoListProps) {
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [sortKey, setSortKey] = useState<string>("name");

  // 並び替えロジック
  const sortedTodos = useMemo(() => {
    const arr = [...todos];
    if (sortKey === "name") {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortKey === "created_at") {
      arr.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortKey === "updated_at") {
      arr.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    }
    return arr;
  }, [todos, sortKey]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todo/list");
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, [setTodos]);

  // 選択したTodoを追加・削除する関数
  const handleSelect = (todoId: number) => {
    setSelectedTodos((prev) =>
      prev.includes(todoId)
        ? prev.filter((id) => id !== todoId)
        : [...prev, todoId]
    );
  };

  const handleAllDelete = async () => {
    await fetch("/api/todo/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedTodos }),
    });
    // フロント側のリストも即時更新
    setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]);
  };

  // 選択したTodoを削除する関数
  const handleDelete = async (todoId: number) => {
    await fetch("/api/todo/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [todoId] }),
    });
    // リアルタイムでリストから削除
    setTodos(todos.filter((todo) => todo.id !== todoId));
    setSelectedTodos((prev) => prev.filter((id) => id !== todoId));
  };

  // 選択したTodoを編集する関数
  const handleEdit = async (updated: Todo) => {
    const res = await fetch("/api/todo/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const newTodo = await res.json();
    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) => (todo.id === newTodo.id ? newTodo : todo))
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Todo List</h2>
      <div className="flex justify-end mb-4 items-center">
        <p className="text-sm text-gray-500 mr-4">
          {selectedTodos.length} / {todos.length} 件選択しています
        </p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => handleAllDelete()}
        >
          削除
        </button>
      </div>
      <div className="flex justify-end mb-4 items-center">
        <select
          className="
            border border-gray-300
            rounded-lg
            px-4 py-2
            bg-white
            text-gray-800
            shadow
            focus:outline-none
            focus:ring-2 focus:ring-blue-200
            transition
            font-semibold
            appearance-none
          "
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
