
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
  is_selected?: boolean;
};

export type NailServiceCategoryType = {
  id?: number;
  name: string;
  description?: string;
  is_online_booking?: boolean;
  is_check_in?: boolean;
};
