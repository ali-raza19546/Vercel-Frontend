import React from "react";
import axios from "axios";
import Post from "../components/Post";
import { useGetPostsQuery } from "../store/TanStackSlice";
import { Loader2 } from "lucide-react";

function PostList() {
  const { data: allPosts, isLoading, isError } = useGetPostsQuery();

  return (
    <>
      {isLoading && (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Loader2 size={30} className="animate-spin duration-300" />
        </div>
      )}

      <div className="w-full px-9 py-4 overflow-auto">
        {allPosts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

export default PostList;
