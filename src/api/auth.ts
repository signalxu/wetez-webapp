import { post } from '../lib/fetcher';
import { removeUserSession } from '../lib/storage';
import useSWRMutation from 'swr/mutation'

export const Register = async(data:{
  reCaptchaToken: string
  email:string
  password: string
}) => {
  const res = await post('/v1/register',data)
  return res
}

export const SendVerifyEmail = async (data:{
  reCaptchaToken: string
  email:string
}) => {
  const res = await post('/v1/send_verify_email',data)
  return res
}

export const VerifyEmail = async (data:{
  token:string
}) => {
  const {
    sessionId: sessionId,
    expire: expire,
  } = await post('/v1/verify_email',{
    token: data.token,
  })
  
  localStorage.setItem("Authorization", sessionId);
  localStorage.setItem("expire", expire);
}

export type verifyEmail = {
  sessionId: string,
  expire: number,
}

export const verifyEmailFunc:(url:string,{arg}:{arg:{token:string}}) => Promise<verifyEmail> = async(url,{arg}) => {
  const res = await post(url,arg)
  return res
}

export const useVerifyEmail = () => {
  
  const{ data, trigger, isMutating ,error } = useSWRMutation('/v1/verify_email',verifyEmailFunc)
  return {
    trigger,
    isMutating,
    data,
    error,
  }
}

export const SignIn = async(data:{
  reCaptchaToken: string
  email:string
  password: string
}) => {
  const {
    sessionId: sessionId,
    expire: expire,
  } = await post('/v1/auth/login',{
    reCaptchaToken: data.reCaptchaToken,
    email:data.email,
    password: data.password,
  })
  
  localStorage.setItem("Authorization", sessionId);
  localStorage.setItem("expire", expire);
}

export const LogOut = async(data:{
}) => {
  const res = await post('/v1/auth/logout',data)
  removeUserSession()
  return res
}

export const ChangeName = async(data:{
  name: string
}) => {
  const res = await post('/v1/update_name',data)
  return res
}

export const SendEmailCode = async(data:{
  email: string,
  reCaptchaToken: string,
}) => {
  const res = await post('/v1/send_update_email',data)
  return res
}

export const ChangeEmail = async(data:{
  email: string,
  oldEmailVerifyCode: string,
  newEmailVerifyCode: string,
}) => {
  const res = await post('/v1/update_email',data)
  return res
}

export const ChangePassword = async(data:{
  reCaptchaToken: string,
  oldPassword: string,
  newPassword: string,
}) => {
  const res = await post('/v1/user/change_password',data)
  return res
}

export const SendEmailLink = async(data:{
  email: string,
  reCaptchaToken: string,
}) => {
  const res = await post('/v1/send_forget_password',data)
  return res
}

export const ResetPassword = async(data:{
  token: string,
  newPassword: string,
}) => {
  const res = await post('/v1/reset_password',data)
  return res
}

export type resetKey = {
  newApiKey: string,
  reCaptchaToken: string,
}

export const resetKeyFunc:(url:string,{arg}:{arg:{reCaptchaToken: string}}) => Promise<resetKey> = async(url,{arg}) => {
  const res = await post(url,arg)
  return res
}

export const useResetKey = () => {
  
  const{ data, trigger,error } = useSWRMutation('/v1/user/reset_api_key',resetKeyFunc)
  return {
    trigger,
    loading: !error && !data,
    data,
    error,
  }
}