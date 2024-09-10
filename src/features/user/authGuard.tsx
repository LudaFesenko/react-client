import React from "react"

import { Spinner } from "@nextui-org/react"
import { useCurrentQuery } from "../../serveces/userApi"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner className="flex items-center " />
  }

  return children
}
