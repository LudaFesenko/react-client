import { api } from "./api"

export const followsApi = api.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation<void, { followingId: string }>({
      query: body => ({
        url: "/follow",
        method: "POST",
        body,
      }),
    }),
    unfollowUser: builder.mutation<void, string>({
      query: userId => ({
        url: `/unfollow/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnfollowUserMutation } = followsApi

export const {
  endpoints: { followUser, unfollowUser },
} = followsApi
