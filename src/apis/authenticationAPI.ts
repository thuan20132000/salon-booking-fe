import axiosInstance from './base';


export type loginType = {
  username: string;
  password: string;
};

export type loginResponseType = {
  access: string;
  refresh: string;
};

const login = async (user: loginType): Promise<loginResponseType> => {
  try {
    const response = await axiosInstance.post(`/login/`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authenticationAPI = {
  login
};