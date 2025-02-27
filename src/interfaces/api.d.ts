
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface APIErrorType {
  message: string;
  code: string;
  status: number;
}