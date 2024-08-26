
export type UserType = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
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

export type StaffType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role: UserRolesType;
  level: UserLevelType;
  start_date: Date;
  job_title: string;
  birth_date: Date;
  insurance_number: string;
  address: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};

