import React, { createContext, ReactNode, useState, useContext } from 'react'

import * as AuthSession from 'expo-auth-session'
import { CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPE, CDN } from '../config'

import { api } from '../services/api'

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
}

export const AuthContext = createContext({} as AuthContextData)

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string
    expires_in: string
    scope: string
    token_type: string
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

  async function signIn() {
    setIsLoading(true)

    const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

    const { type, params } = (await AuthSession.startAsync({
      authUrl
    })) as AuthorizationResponse

    if (type === 'success') {
      api.defaults.headers.Authorization = `${params.token_type} ${params.access_token}`

      const { data: userInfo } = await api.get<UserResponse>('/users/@me')

      const [firstName] = userInfo.username.split(' ')
      const avatar = userInfo.avatar
        ? `${CDN}/avatars/${userInfo.id}/${userInfo.avatar}.png`
        : `${CDN}/embed/avatars/${Number(userInfo.discriminator) % 5}.png`

      setUser({
        id: userInfo.id,
        username: userInfo.username,
        firstName,
        avatar,
        email: userInfo.email,
        token: params.access_token
      })
    }

    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
