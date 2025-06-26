"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]); // Todo一覧の状態（ステート）
  const [newTitle, setNewTitle] = useState(""); // 新規追加するTodoのタイトル入力値

  // コンポーネント初期描画時にTodo一覧を取得
  useEffect(() => {
    // /api/todos からTodo一覧を取得
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data); // 取得したデータをステートに保存
      })
      .catch((err) => {
        console.error("Failed to fetch todos:", err);
      });
  }, []); // 空の依存配列により、初回マウント時のみ実行

  // 新しいTodoを追加するハンドラ関数
  const addTodo = async () => {
    if (!newTitle.trim()) {
      return; // タイトルが空白の場合は何もしない
    }
    try {
      // APIに新規TodoデータをPOST送信
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`); // エラーハンドリング
      }
      const createdTodo = await res.json(); // 作成されたTodo（APIのレスポンス）
      setTodos((prev) => [...prev, createdTodo]); // 現在のTodo一覧に新しいTodoを追加
      setNewTitle(""); // 入力欄をクリア
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  return (
    <main className="p-4">
      {/* Todo入力フォーム */}
      <div className="mb-4 flex gap-2">
        <input
          className="border p-2 flex-1"
          type="text"
          placeholder="Todoを入力"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4" onClick={addTodo}>
          追加
        </button>
      </div>

      {/* Todo一覧表示 */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="p-2 border-b flex items-center">
            <span className="flex-1">{todo.title}</span>
            {/* 将来的にcompletedを切り替えるチェックボックスなどを配置可能 */}
            {todo.completed ? (
              <span className="text-green-600">✅完了</span>
            ) : (
              <span className="text-gray-500">未完了</span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
