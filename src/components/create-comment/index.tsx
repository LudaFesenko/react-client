import React from "react"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../serveces/postApi"

import { Controller, useForm } from "react-hook-form"
import { Button, Textarea } from "@nextui-org/react"
import { ErrorMessage } from "../error-message"
import { IoMdCreate } from "react-icons/io"
import { useParams } from "react-router-dom"
import { useCreateCommentMutation } from "../../serveces/commentsApi"

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>()
  const [createComment] = useCreateCommentMutation()

  const [getPostById] = useLazyGetPostByIdQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.post?.message as string

  const onSumbit = handleSubmit(async data => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap()
        setValue("comment", "")
        await getPostById(id).unwrap()
      }
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <form onSubmit={onSumbit} className="flex-grow">
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{ required: "Обязательное поле" }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Напишите ваш комментарий"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="primary"
        type="submit"
        endContent={<IoMdCreate />}
        className="flex-end"
      >
        ответить
      </Button>
    </form>
  )
}
