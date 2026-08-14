export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  admin: {
    id: string;
    name: string;
    email: string;
  };
}