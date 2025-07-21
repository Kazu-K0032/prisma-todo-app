import React, { useState } from "react";
import { Todo } from "@/types/todo";
import EditModal from "@/features/editModal/editModal";

interface TodoCardProps {
  todo: Todo;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onEdit: (updated: Todo) => void; // コールバックを追加
}

export default function TodoCard({
  todo,
  isSelected,
  onSelect,
  onDelete,
  onEdit,
}: TodoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <li
        onClick={onSelect}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          flex flex-row items-center gap-4
          p-5
          rounded-2xl
          bg-gray-50
          shadow-lg
          border
          border-gray-100
          transition
          ${todo.is_completed ? "bg-green-100" : "bg-gray-50"}
          hover:shadow-xl
          hover:-translate-y-1
          hover:cursor-pointer
          relative
        `}
        style={{ listStyle: "none" }}
      >
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          className="accent-green-500 w-5 h-5"
        />
        <div className="flex-1">
          {isHovered && todo.description && (
            <div className="absolute top-0 left-0 mb-2 px-2 py-1 bg-gray-100 border border-gray-200 rounded text-sm text-gray-700 shadow">
              {todo.description}
            </div>
          )}
          <span
            className={`font-semibold text-lg ${
              todo.is_completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.title}
          </span>
          <div className="text-xs text-gray-500 mt-2">
            最終編集:{" "}
            {todo.updated_at ? new Date(todo.updated_at).toLocaleString() : "-"}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:cursor-pointer"
        >
          編集
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:cursor-pointer"
        >
          削除
        </button>
      </li>
      {isEditOpen && (
        <EditModal
          todo={todo}
          onClose={() => setIsEditOpen(false)}
          onSave={(updated) => {
            onEdit(updated);
            setIsEditOpen(false);
          }}
        />
      )}
    </>
  );
}
