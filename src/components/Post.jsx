import axios from "axios";
import React, { useRef, useState } from "react";
import {
  Share2,
  MessageCircle,
  Heart,
  Delete,
  Loader,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDeletePostMutation } from "../store/TanStackSlice";
import { handleError, handleSuccess } from "../utils/utils.js";

function Post({ post }) {
  let loginUser = JSON.parse(localStorage.getItem("userInfo")) || {};
  let token = localStorage.getItem("token");
  const [deletePost, { isError, isSuccess, isLoading }] =
    useDeletePostMutation();
  const dispatch = useDispatch();
  let { username = "Unknown", _id } = post.user || {};

  // jo bhi owner he usko apni post pr cross dikhna chaiey post ki id bhi aur user ki id bhi he
  const [isLike, setIsLike] = useState(post?.likes?.includes(_id));
  const [likeCount, setLikeCount] = useState(post?.likeCount);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploaded, setUploaded] = useState("");

  const handlePostLikes = async () => {
    try {
      let { data } = await axios.post(
        `https://backend-sm-liard.vercel.app/post/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setLikeCount(data.likeCount);
      setIsLike(data.like);
    } catch (e) {
      handleError(e.response.data.message);
    }
  };

  // Handle delete Post
  const handleDelete = async (postId) => {
    try {
      {
        isLoading && (
          <h3>
            <Loader2 size={15} className="animate-spin duration-300" />
          </h3>
        );
      }
      await deletePost(postId).unwrap();
    } catch (e) {
      handleError(e.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Post Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden relative ">
        {/* Post Header */}
        <div className="container flex flex-col ">
          <div className="flex items-center gap-4 px-4 py-3  ">
            <div className=" bg-zinc-400 rounded-full  w-13 h-13 overflow-hidden flex items-center justify-center">
              <img
                src={post.user?.profileImage || "/default-avatar.png"}
                alt="profile"
                className="w-full postImgPf  h-full bg-contain bg-center"
              />
            </div>
            <div>
              <h2 className="font-bold text-lg capitalize">{username}</h2>
              <p className="text-sm text-gray-500">
                <i>
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </i>
              </p>
            </div>
          </div>
          <div className="ml-5 mb-3">
            <h2 className="font-semibold text-lg">{post.title}</h2>
          </div>
        </div>

        {/* Post Image */}
        <div className="w-full">
          <img
            src={post.image}
            alt="post"
            className="w-full h-50 sm:h-70 md:h-100 object-cover bg-center shadow-md shadow-zinc-200"
          />
        </div>

        {/* Delete Post  */}
        {loginUser?.user?.id === _id && (
          <div className="absolute top-8 right-2 text-red-400">
            {isLoading ? (
              <p>
                <Loader2 size={15} className="animate-spin duration-300" />
              </p>
            ) : (
              <span
                className="text-2xl cursor-pointer"
                onClick={() => {
                  handleDelete(post._id);
                }}
              >
                <Delete size={20} />
              </span>
            )}
          </div>
        )}

        {/* Post Content */}

        <div className="p-4">
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
          <span>{post.tags.map((tag) => `#${tag}`)}</span>

          {/* Post Actions */}
          <div className="flex items-center justify-between mt-5 border-t pt-4">
            <button
              className="flex items-center gap-0 text-gray-600 hover:text-red-500 transition"
              onClick={handlePostLikes}
            >
              {isLike ? (
                <>
                  <span>❤ {likeCount}</span>
                  <p className="likesCom">Like</p>
                </>
              ) : (
                <>
                  <span>🤍 {likeCount}</span>
                  <p className="likesCom">Like</p>
                </>
              )}
            </button>

            <button className="flex items-center gap-0 text-gray-600 hover:text-blue-500 transition">
              <MessageCircle size={22} />
              <span className="likesCom">Comment</span>
            </button>

            <button className="flex items-center gap-0 text-gray-600 hover:text-green-500 transition">
              <Share2 size={22} />
              <span className="likesCom">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
