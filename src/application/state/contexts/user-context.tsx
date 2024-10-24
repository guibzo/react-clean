import { User } from '@/infra/@types/entities/User'
import { ClientCookiesAdapter } from '@/infra/cache/ClientCookiesAdapter'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type UserContextType = {
  user: User | undefined
  setUser: (user: User) => void
}

const defaultUserContext: UserContextType = {
  user: undefined,
  setUser: () => {},
}

export const UserContext = createContext<UserContextType>(defaultUserContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const cookies = new ClientCookiesAdapter()

  const [user, setUser] = useState<User>()

  useEffect(() => {
    const userData = cookies.get('user') as User | null

    if (userData) {
      setUser(userData)
    }
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
