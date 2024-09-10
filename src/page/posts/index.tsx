import React from "react"
import { useGetAllPostsQuery } from "../../serveces/postApi"
import { CreatePost } from "../../components/create-post"
import { Card } from "../../components/card"

const Posts = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              id,
              author,
              authorId,
              comments,
              content,
              createdAt,
              likeByUser,
              likes,
            }) => (
              <Card
                key={id}
                name={author.name ?? ""}
                avatarUrl={author.avatarUrl ?? ""}
                createdAt={createdAt}
                content={content}
                authorId={authorId}
                likesCount={likes.length}
                commentsCount={comments.length}
                id={id}
                likedByUser={likeByUser}
                cardFor="post"
              />
            ),
          )
        : null}
    </>
  )
}

export default Posts
