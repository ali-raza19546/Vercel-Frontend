import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddPostMutation } from "../store/TanStackSlice";
import { handleError, handleSuccess } from "../utils/utils.js";
import { Loader } from "lucide-react";

function PostCreate() {
  // let { user } = JSON.parse(localStorage.getItem("userInfo"));
  const [addPost, { isSuccess, isError, isLoading }] = useAddPostMutation();
  const [file, setFile] = useState(null);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const handleOnChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("tags", postData.tags);
    formData.append("image", file);
    try {
      let data = await addPost(formData).unwrap();
      if (data.success) {
        setPostData({
          title: "",
          content: "",
          tags: "",
        });
        handleSuccess(data.message);
        navigate("/postlist");
      }
    } catch (e) {
      handleError(e.data.message);
    }
  };
  return (
    <div className="   sm:mx-0 mx-auto flex flex-col md:p-8">
      {/* send image then use enctype in form */}
      <form
        className="flex flex-col font-serif sm:w-full createPst md:w-1/2 md:mx-auto  sm:p-5 md:mt-20"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="title" className="text-lg  font-serif">
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Catchy title"
          onChange={handleOnChange}
          className="border py-1.5 px-2 rounded-sm mb-4"
        />

        <label htmlFor="title" className="text-lg  font-serif">
          Content
        </label>
        <textarea
          type="text"
          name="content"
          onChange={handleOnChange}
          placeholder="Tell us more about it."
          className="border py-1.5 px-2 rounded-sm mb-4"
        ></textarea>

        <label htmlFor="title" className="text-lg  font-serif">
          Image
        </label>
        <input
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files[0])}
          className="border py-1.5 px-2 rounded-sm mb-4"
        />

        <label htmlFor="title" className="text-lg  font-serif">
          Tags
        </label>
        <input
          type="text"
          name="tags"
          onChange={handleOnChange}
          placeholder="Tags with space"
          className="border py-1.5 px-2 rounded-sm mb-4"
        />
        <button
          type="submit"
          className=" w-15 shadow-sm submitBtn md:mt-3 px-2 shadow-black py-1 bg-blue-500 cursor-pointer rounded-md hover:bg-blue-400 duration-300"
          disabled={isLoading}
        >
          {isLoading ? `Adding... ${(<Loader />)}` : "Add"}
        </button>
      </form>
    </div>
  );
}

export default PostCreate;
