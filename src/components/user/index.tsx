import { User as UserNextUi } from "@nextui-org/react"
import { BASE_URL } from "../../constants"
type Props = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}
export const User: React.FC<Props> = ({
  name = "",
  avatarUrl = "",
  className = "",
  description = "",
}) => {
  return (
    <div>
      <UserNextUi
        name={name}
        description={description}
        avatarProps={{ src: `${BASE_URL}${avatarUrl}` }}
        className={className}
      />
    </div>
  )
}
