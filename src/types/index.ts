export interface UserUpdate {
  firstName?: string
  lastName?: string
  email?: string
}

export interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  avatar: string
  role: string
  isVerified: boolean
}

export interface UserCreate {
  email: string
  password: string
  firstName: string
  lastName: string
  isVerified?: boolean
}

export interface userLogin {
  email: string
  password: string
}

export interface genre {
  _id: string
  name: string
}

export interface cast {
  _id: string
  name: string
  avatarPath: string
}

export interface Movie {
  _id: string
  title: string
  overview: string
  posterPath: string 
  backdropPath: string
  imdbRating: number
  trailerUrl: string
  isDisplay: boolean
  genres: genre[]
  casts: cast[]
}
