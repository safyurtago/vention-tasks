export class User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  hashed_password: string;
  hashed_refresh_token: string;
  photo_url: string;
  is_active: boolean;
  activation_link: string;
}
