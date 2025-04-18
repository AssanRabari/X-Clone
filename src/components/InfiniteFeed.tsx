"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";

const fetchPosts = async (pageParams: number, userProfileId: string) => {
  const response = await fetch(
    "http://localhost:3000/api/posts?cursor=" +
      pageParams +
      "&user=" +
      userProfileId
  );

  return response.json();
};
const InfiniteFeed = ({ userProfileId }: { userProfileId?: string }) => {
  const { data, error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 2 }) =>
      fetchPosts(pageParam, userProfileId as string),
    initialPageParam: 2,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 2 : undefined,
  });

  if (error) return "Something went wrong!";
  if (status === "pending") return "Loading...";

  console.log("Infinite feed posts", data);

  const allPosts = data?.pages?.flatMap((page) => page.post) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts?.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h1>Posts are loading</h1>}
      endMessage={<h1>All posts loaded</h1>}
    >
      {allPosts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteFeed;
