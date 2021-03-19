import axios from 'axios'
import Swal from 'sweetalert2'

export const apiHelper = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000
})

export const redirectToOriginalUrl = async (shortUrl) => {
  const res = await apiHelper.get(`/${shortUrl}`)
  return res.data.originalUrl
}