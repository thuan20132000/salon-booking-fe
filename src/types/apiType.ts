

export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
}

export type APIErrorType = {
  message: string;
  code: string;
  status: number;
}