import axios from "axios"

export const deppiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export const nextApi = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})