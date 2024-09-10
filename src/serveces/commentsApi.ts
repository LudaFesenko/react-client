import { Comment } from "../app/types"
import { api } from "./api"

export const commentsApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: newComment => ({
        url: "/comments",
        method: "POST",
        body: newComment,
      }),
    }),
    deleteComment: builder.mutation<void, string>({
      query: id => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentsApi

export const {
  endpoints: { createComment, deleteComment },
} = commentsApi
