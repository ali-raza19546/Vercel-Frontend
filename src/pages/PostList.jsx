import React from "react";
import axios from "axios";
import Post from "../components/Post";
import { useGetPostsQuery } from "../store/TanStackSlice";

function PostList() {
  const { data: allPosts } = useGetPostsQuery();

  return (
    <div className="w-full px-9 py-4 overflow-auto">
      {allPosts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
