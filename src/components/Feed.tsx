import React from "react";
import Post from "./Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import InfiniteFeed from "./InfiniteFeed";

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  const { userId } = await auth();

  if (!userId) return;

  const whereCondition = userProfileId
    ? { parentPostId: null, userId: userProfileId }
    : {
        parentPostId: null,
        userId: {
          in: [
            userId,
            ...(
              await prisma.follow.findMany({
                where: { followerId: userId },
                select: { followerId: true },
              })
            ).map((follow) => follow.followerId),
          ],
        },
      };
  const posts = await prisma.post.findMany({
    where: whereCondition,
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="">
      {posts.map((post) => (
        <div key={post.id}>
          <Post />
          FROM SERVER
        </div>
      ))}
      <InfiniteFeed userProfileId={userProfileId} />
    </div>
  );
};

export default Feed;
