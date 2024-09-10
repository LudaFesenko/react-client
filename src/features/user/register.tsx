import { useForm } from "react-hook-form"
import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { useRegisterMutation } from "../../serveces/userApi"
import { useState } from "react"
import { Link } from "@nextui-org/react"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../../components/error-message"

export type RegisterType = {
  name: string
  email: string
  password: string
}

export type Props = {
  setSelected: (value: string) => void
}

export const Register: React.FC<Props> = ({ setSelected }) => {
  const { handleSubmit, control } = useForm<RegisterType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState("")

  const onSubmit = async (data: RegisterType) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        label="Name"
        type="text"
        control={control}
        required="Поле обязательное!"
      />
      <Input
        control={control}
        name="email"
        label="Email"
        required="Поле обязательное!"
        type="email"
      />
      <Input
        control={control}
        name="password"
        label="Password"
        type="password"
        required="Поле обязательное!"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Уже есть аккаунт? Войти{" "}
        </Link>
      </p>
      <Button type="submit" fullWidth isLoading={isLoading}>
        Зарегистрироваться
      </Button>
    </form>
  )
}
