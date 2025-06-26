import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prismaクライアント（シングルトンインスタンス）をインポート

// GETリクエストハンドラ: 全Todoのリストを取得
export async function GET() {
  const todos = await prisma.todo.findMany(); // DBからTodoテーブルの全レコードを取得
  return NextResponse.json(todos); // JSON形式でレスポンスを返す（ステータス200）
}

// POSTリクエストハンドラ: 新しいTodoを追加
export async function POST(req: Request) {
  const body = await req.json(); // リクエストボディからJSONデータを取得
  const todo = await prisma.todo.create({
    // Prismaを使ってTodoレコードを新規作成
    data: {
      title: body.title, // 受け取ったtitleをセット
      // completedとcreatedAtはスキーマでデフォルト値が設定されているため指定不要
    },
  });
  return NextResponse.json(todo, { status: 201 }); // 作成したTodoをJSONで返し、201 Createdを指定
}
