
export type UserType = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  username?: string;
  phone_number?: string;
};

export type UserRolesType = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
};

export type UserLevelType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type EmployeeType = {
  id?: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  nickname?: string;
  username?: string;
  phone_number?: string;
  avatar?: string;
  email?: string;
  role?: UserRolesType;
  level?: UserLevelType;
  start_date?: Date;
  job_title?: string;
  birth_date?: Date;
  insurance_number?: string;
  address?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  employee_note?: string;
  description?: string;
};

export type CustomerType = UserType & {

}

