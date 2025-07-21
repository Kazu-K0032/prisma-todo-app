import { useState, useMemo } from "react";
import type { Todo } from "@/types/todo";
import { TODO_ENDPOINT } from "@/constant/endpoint";

export const useDisplayTodoList = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [sortKey, setSortKey] = useState<string>("name");

  /**
   * ソートされたTodoリストを返す
   * @returns ソートされたTodoリスト
   */
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

  /**
   * 選択されたTodoを追加または削除する
   * @param todoId 選択されたTodoのID
   */
  const handleSelect = (todoId: number) => {
    setSelectedTodos((prev) =>
      prev.includes(todoId)
        ? prev.filter((id) => id !== todoId)
        : [...prev, todoId]
    );
  };

  /**
   * 選択されたすべてのTodoを削除する
   */
  const handleAllDelete = async () => {
    await fetch(TODO_ENDPOINT.DELETE, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedTodos }),
    });
    setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]);
  };

  /**
   * 選択されたTodoを削除する
   * @param todoId 削除するTodoのID
   */
  const handleDelete = async (todoId: number) => {
    await fetch(TODO_ENDPOINT.DELETE, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [todoId] }),
    });
    setTodos(todos.filter((todo) => todo.id !== todoId));
    setSelectedTodos((prev) => prev.filter((id) => id !== todoId));
  };

  /**
   * 'Todo'を編集する
   * @param updated 編集後のTodo
   */
  const handleEdit = async (updated: Todo) => {
    const res = await fetch(TODO_ENDPOINT.UPDATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const newTodo = await res.json();
    setTodos((prev) =>
      prev.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
    );
  };

  return {
    selectedTodos,
    setSelectedTodos,
    sortKey,
    setSortKey,
    sortedTodos,
    handleSelect,
    handleAllDelete,
    handleDelete,
    handleEdit,
  };
};
