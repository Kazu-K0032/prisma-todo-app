import { PrismaClient } from "@prisma/client";
import {
  addSampleData,
  addSampleDataList,
  deleteSampleData,
  getSampleData,
  getSampleDataByContext,
  updateSampleData,
} from "./seeders/sampleTableSeeder";

const prisma = new PrismaClient();

export async function main() {
  console.log("🌱 シードデータを挿入中...");
  // Create ===============================
  // addSampleData("sample1", "context1");
  // addSampleDataList([
  //   { name: "hoge1", context: "foo1" },
  //   { name: "hoge2", context: "foo2" },
  //   { name: "hoge3", context: "foo3" },
  // ]);

  // Read ===============================
  // 単体データ
  // const sample = await getSampleData(1);
  // 複数データ
  // const samples = await getSampleData();
  // console.log(sample);
  // console.log(samples);
  // contextに「foo」を含むデータを取得する
  // const fooSamples = await getSampleDataByContext();
  // console.log(fooSamples);

  // Update ===============================
  // let sample = await getSampleData(1);
  // console.log(sample);
  // await updateSampleData(1, "sampleNext");
  // console.log(sample);

  // Delete ===============================
  // await deleteSampleData(5);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("シード処理中にエラーが発生しました:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
