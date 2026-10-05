export interface UserResponse {
  id: number;
  email: string;
  avatar: string | null;
  github_username: string | null;
  github_name: string | null;
  github_authenticated: boolean;
}