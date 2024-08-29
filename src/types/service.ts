
export type NailServiceType = {
  id?: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
  category?: NailServiceCategoryType;
};

export type NailServiceCategoryType = {
  name: string;
  description?: string;
  is_online_booking?: boolean;
  is_check_in?: boolean;
};