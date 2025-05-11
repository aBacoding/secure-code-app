export interface Option {
  label: string;
  value: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  country: string;
  avatar: string | null;
}
