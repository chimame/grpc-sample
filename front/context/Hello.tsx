import { createContext } from 'react'
import { GreeterClient } from '../proto/helloworld_pb_service'

const client = new GreeterClient(`http://0.0.0.0:8080`)

export const HelloContext = createContext({ client })

type Props = {
  children: React.ReactNode;
}

export const HelloProvider = ({ children }: Props) => {
  return (
    <HelloContext.Provider value={{ client }}>
      {children}
    </HelloContext.Provider>
  )
}
