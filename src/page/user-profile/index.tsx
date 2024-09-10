import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../serveces/userApi"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../serveces/followsApi"
import { GoBack } from "../../components/go-back"
import { BASE_URL } from "../../constants"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { ProfileInfo } from "../../components/profile-info"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { CountInfo } from "../../components/count-info"
import { EditProfile } from "../../components/edit-profile"

export const UserProfile = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetUser())
  }, [dispatch])

  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const currentUser = useSelector(selectCurrent)
  const [unfollowUser] = useUnfollowUserMutation()
  const [followUser] = useFollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const { data } = useGetUserByIdQuery(id ?? "")

  if (!data) {
    return null
  }
  const handleFollow = async () => {
    try {
      if (id) {
        data.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap()

        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
        onClose()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      User profile
      <GoBack />
      <div className="flex items-center gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5">
          <Image
            className="border-4 border-white"
            width={200}
            height={200}
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
          />
          <div className="flex flex-col text-2xl font-bold gap-4 item-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onClick={() => onOpen()}>
                Pедактировать
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Местоположение" info={data.location} />
          <ProfileInfo
            title="Дата рождения"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo title="Подписчики" count={data.followers.length} />
            <CountInfo title="Подписки" count={data.following.length} />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  )
}
