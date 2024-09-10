import React from "react"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../serveces/postApi"
import { Controller, useForm } from "react-hook-form"
import { Button, Textarea } from "@nextui-org/react"
import { ErrorMessage } from "../error-message"
import { IoMdCreate } from "react-icons/io"

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation()

  const [triggerAllPosts] = useLazyGetAllPostsQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.post?.message as string

  const onSubmit = handleSubmit(async data => {
    try {
      await createPost({ content: data.post }).unwrap()
      setValue("post", "")
      await triggerAllPosts().unwrap()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <form onSubmit={onSubmit} className="flex-grow">
      <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{ required: "Обязательное поле" }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="О чем думаeте?"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="success"
        type="submit"
        endContent={<IoMdCreate />}
        className="flex-end"
      >
        Добавить пост
      </Button>
    </form>
  )
}
