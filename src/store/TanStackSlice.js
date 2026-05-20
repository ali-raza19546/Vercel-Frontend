import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// URl Backend Fetch http://localhost:8080/post/allPosts
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend-sm-liard.vercel.app",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/post/allPosts",
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: (formData) => ({
        url: "/post/addPost",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/delete/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPosts", undefined, (draft) => {
            return draft.filter((post) => post._id !== id);
          }),
        );
      },
      invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
  }),
});
export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } =
  postApi;
