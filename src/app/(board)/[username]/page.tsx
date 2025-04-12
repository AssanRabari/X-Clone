import Feed from "@/components/Feed";
import Image from "@/components/Image";
import { prisma } from "@/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });
  
  if(!user) return notFound
  
  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href="/">
          <Image path="X-Clone/icons/back.svg" alt="back" w={24} h={24} />
        </Link>
        <h1 className="font-bold text-lg">Test User</h1>
      </div>
      <div className="">
        <div className="relative w-full">
          <div className="w-full aspect-[3/1] relative">
            <Image
              path="X-Clone/general/cover.jpg"
              alt=""
              w={600}
              h={200}
              tr={true}
            />
          </div>
          <div className="w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            <Image
              path="X-Clone/general/user.png"
              alt=""
              w={100}
              h={100}
              tr={true}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2 p-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image path="X-Clone/icons/more.svg" alt="more" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image path="X-Clone/icons/explore.svg" alt="more" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image path="X-Clone/icons/message.svg" alt="more" w={20} h={20} />
          </div>
          <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
            Follow
          </button>
        </div>
        {/* USER DETAILS */}
        <div className="p-4 flex flex-col gap-2">
          <div className="">
            <h1 className="text-2xl font-bold">Test User</h1>
            <span className="text-textGray text-sm">@testUser</span>
          </div>
          <p>Test user testing</p>
          <div className="flex gap-4 text-textGray text-[15px]">
            <div className="flex items-center gap-2">
              <Image
                path="X-Clone/icons/userLocation.svg"
                alt="location"
                w={20}
                h={20}
              />
              <span>USA</span>
            </div>
            <div className="flex items-center gap-2">
              <Image path="X-Clone/icons/date.svg" alt="date" w={20} h={20} />
              <span>Joined May 2021</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">100</span>
              <span className="text-textGray text-[15px]">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">100</span>
              <span className="text-textGray text-[15px]">Followings</span>
            </div>
          </div>
        </div>
      </div>
      <Feed userProfileId={user?.id} />
    </div>
  );
};

export default UserPage;
