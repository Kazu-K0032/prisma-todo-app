"use client";
import { useState, useEffect } from "react";
import RegisterTodo from "@/features/registerTodo/registerTodo";
import DisplayTodoList from "@/features/displayTodoList/displayTodoList";
import { Todo } from "@/types/todo";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 初回取得
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/todo/list");
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  // 追加用
  const addTodo = (todo: Todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Todoリスト</h1>
      <div className="w-full max-w-md flex flex-col gap-8">
        <RegisterTodo onAdd={addTodo} />
        <DisplayTodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}
