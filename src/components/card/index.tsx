import { useState } from "react"
import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as CardNextUi,
  Spinner,
} from "@nextui-org/react"
import {
  useLikePostMutation,
  useUnLikePostMutation,
} from "../../serveces/likesApi"
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../serveces/postApi"

import { useDeleteCommentMutation } from "../../serveces/commentsApi"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { User } from "../user"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { RiDeleteBinLine } from "react-icons/ri"
import { Typography } from "../typography"
import { MetaInfo } from "../meta-info"
import { IconBaseProps } from "react-icons"
import { FcDislike } from "react-icons/fc"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { FaRegComment } from "react-icons/fa"
import { ErrorMessage } from "../error-message"
import { hasErrorField } from "../../utils/has-error-field"

export type Props = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likedByUser?: boolean
}

export const Card: React.FC<Props> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation()

  const [unlikePost] = useUnLikePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()

  const [error, setError] = useState("")
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrent)

  const refetchPost = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap()
        break

      case "current-post":
        await triggerGetAllPosts().unwrap()
        break

      case "comment":
        await triggerGetPostById(id).unwrap()
        break

      default:
        throw new Error('Не верный аргумент cardFor"')
    }
  }

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap()
          await refetchPost()
          break

        case "current-post":
          await deletePost(id).unwrap()
          navigate("/")
          break

        case "comment":
          await deleteComment(commentId).unwrap()
          await refetchPost()
          break

        default:
          throw new Error("Не верный cardFor")
      }
    } catch (error) {
      console.log(error)
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }
  //

  const handleClick = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap()
      if (cardFor === "current-post") {
        await triggerGetPostById(id).unwrap()
      }
      if (cardFor === "post") {
        await triggerGetAllPosts().unwrap()
      }
    } catch (error) {
      console.log(error)
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }
  //

  return (
    <CardNextUi className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`} className="flex justify-between w-full">
          <User
            name={name}
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
            className="text-small font-semibold leading-non text-default-600"
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>

      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>

      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleClick}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </CardNextUi>
  )
}
