import axiosInstance from "../axios/axios";

export const authTutor = () =>{
  return axiosInstance("tutorJwtToken").get('/tutor/auth')
}

export const tutorLogin = (loginData) => {
  return axiosInstance("tutorJwtToken").post('/tutor/login' ,{...loginData} )
}

export const changePassword = (data ) => {
  return axiosInstance("tutorJwtToken").put(`/tutor/change-password` ,{...data} )
}
