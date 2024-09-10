import { Link } from "@nextui-org/react"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { Button } from "../../components/button"
import { useLazyCurrentQuery, useLoginMutation } from "../../serveces/userApi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../../components/error-message"

type LoginType = {
  email: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Login: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [login, { isLoading }] = useLoginMutation()
  const [error, setError] = useState("")
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const navigate = useNavigate()

  const onSubmit = async (data: LoginType) => {
    try {
      await login(data).unwrap()
      await triggerCurrentQuery()
      navigate("/")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="email"
        required="Поля для ввода обязательны!"
        placeholder="Эл.почта"
        type="email"
      />
      <Input
        control={control}
        name="password"
        label="password"
        type="password"
        placeholder="Пароль"
        required="Поля для ввода обязательны!"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Нет аккаунта?{" "}
        <Link onPress={() => setSelected("registration")}>
          Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" color="primary" fullWidth isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
}
