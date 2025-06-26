"use client";

import { useState } from "react";
import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddTodo = async (title: string) => {
    // TodoListコンポーネントが自動的に更新されるので、
    // ここでは何もしません
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Todo アプリ</h1>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              更新
            </button>
          </div>

          <AddTodoForm onAdd={handleAddTodo} />
          <TodoList key={refreshKey} />
        </div>
      </div>
    </div>
  );
}
