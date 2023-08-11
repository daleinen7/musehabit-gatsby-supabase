export interface User {
  id: string;
  email: string;
}

export interface Profile {
  id: string;
  user_id: string;
  user_name: string;
  shame: string;
  zip_code: number | null;
}
