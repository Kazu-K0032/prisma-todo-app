import prisma from "@/lib/prisma";

export default async function Posts() {
  // const posts = await prisma.post.findMany({
  //   include: {
  //     author: true,
  //   },
  // });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Todo
      </h1>
      <div>
        <h2>タスクの登録</h2>
        <form action="/todo/new" method="post">
          <input type="text" name="title" placeholder="タスク名" />
          <button type="submit">登録</button>
        </form>
      </div>
    </div>
  );
}
