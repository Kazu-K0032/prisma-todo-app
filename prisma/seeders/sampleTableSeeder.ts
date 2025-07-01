import prisma from "@/lib/prisma";

// Sampleテーブルにデータを追加する
const addSampleData = async (name: string, context: string) => {
  await prisma.sample.create({
    data: {
      name: name,
      context: context,
    },
  });
};

// Sampleテーブルに複数のデータを追加する
const addSampleDataList = async (
  addDataList: { name: string; context: string }[]
) => {
  await prisma.sample.createMany({
    data: addDataList,
  });
};

// Read ===============================
const getSampleData = async (id?: number) => {
  if (id) {
    const sample = await prisma.sample.findUnique({
      where: {
        id: id,
      },
    });
    return sample;
  } else {
    const samples = await prisma.sample.findMany();
    return samples;
  }
};

/**contextに「foo」を含むデータを取得する */
const getSampleDataByContext = async () => {
  const samples = await prisma.sample.findMany({
    where: {
      context: { contains: "foo" },
    },
  });
  return samples;
};

// Update ===============================
const updateSampleData = async (
  id: number,
  name?: string,
  context?: string
) => {
  if (name) {
    await prisma.sample.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }
  if (context) {
    await prisma.sample.update({
      where: {
        id: id,
      },
      data: {
        context: context,
      },
    });
  }
};

// delete ===============================
const deleteSampleData = async (id: number) => {
  await prisma.sample.delete({
    where: {
      id: id,
    },
  });
};

export {
  addSampleData,
  addSampleDataList,
  getSampleData,
  getSampleDataByContext,
  updateSampleData,
  deleteSampleData,
};
