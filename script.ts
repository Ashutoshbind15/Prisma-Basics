import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// a3039bb2-5c1b-4e2f-87fb-c7d4900ca827-> uid

const createUser = async (ip: { name: string; email: string }) => {
  await prisma.user.create({
    data: {
      name: ip.name,
      email: ip.email,
    },
  });
};

const createPost = async (ip: { uid: string; desc: string }) => {
  const p = await prisma.post.create({
    data: {
      desc: ip.desc,
      authorId: ip.uid,
    },
  });

  console.log(p);
};

async function main() {
  const u = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  const posts = u[0].posts;
  console.log(posts);
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
