import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect
} from 'react'

import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { STORAGE_USER } from '../configs/storage'

import { api } from '../services/api'

const { CLIENT_ID } = process.env
const { REDIRECT_URI } = process.env
const { RESPONSE_TYPE } = process.env
const { SCOPE } = process.env
const { CDN } = process.env

export type User = {
  id: string
  username: string
  firstName: string
  avatar: string
  email?: string
  token: string
}

type AuthContextData = {
  user: User
  isLoading: boolean
  signIn(): Promise<void>
  signOut(): Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string
    expires_in?: string
    scope?: string
    token_type?: string
    error?: string
  }
}

type UserResponse = {
  id: string
  username: string
  discriminator: string
  email?: string
  avatar?: string
  locale: string
  flags: number
  public_flags: number
  mfa_enabled: boolean
  verified: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function loadUserData() {
      const data = await AsyncStorage.getItem(STORAGE_USER)

      if (data) {
        const loggedUser = JSON.parse(data) as User

        api.defaults.headers.Authorization = `Bearer ${loggedUser.token}`

        setUser(loggedUser)
      }
    }

    loadUserData()
  }, [])

  async function signIn() {
    setIsLoading(true)

    try {
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = (await AuthSession.startAsync({
        authUrl
      })) as AuthorizationResponse

      if (type === 'success' && !params.error && params.access_token) {
        api.defaults.headers.Authorization = `${params.token_type} ${params.access_token}`

        const { data: userInfo } = await api.get<UserResponse>('/users/@me')

        const [firstName] = userInfo.username.split(' ')
        const avatar = userInfo.avatar
          ? `${CDN}/avatars/${userInfo.id}/${userInfo.avatar}.png`
          : `${CDN}/embed/avatars/${Number(userInfo.discriminator) % 5}.png`

        const userData = {
          id: userInfo.id,
          username: userInfo.username,
          firstName,
          avatar,
          email: userInfo.email,
          token: params.access_token
        }

        await AsyncStorage.setItem(STORAGE_USER, JSON.stringify(userData))
        setUser(userData)
      }
    } catch {
      throw new Error('Não foi possível fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(STORAGE_USER)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
