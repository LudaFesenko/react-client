import { Button as ButtonModel } from "@nextui-org/react"

type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  type?: "button" | "submit" | "reset"
  className?: string
  fullWidth?: boolean
  isLoading?: boolean
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}

export const Button: React.FC<Props> = ({
  children,
  icon,
  type,
  className,
  fullWidth,
  color,
  isLoading,
}) => {
  return (
    <ButtonModel
      startContent={icon}
      size="lg"
      type={type}
      variant="light"
      className={className}
      fullWidth={fullWidth}
      color={color}
      isLoading={isLoading}
    >
      {children}
    </ButtonModel>
  )
}
