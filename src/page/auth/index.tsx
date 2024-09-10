import React, { useState } from "react"
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react"
import { Login } from "../../features/user/login"
import { Register } from "../../features/user/register"

export const Auth = () => {
  const [selected, setSelected] = useState("login")
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="lg"
              selectedKey={selected}
              onSelectionChange={key => setSelected(key as string)}
            >
              <Tab title="Вход" key="login">
                Вход ✅
                <Login setSelected={setSelected} />
              </Tab>
              <Tab title="Регистрация" key="register">
                Регистрация 😻
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
