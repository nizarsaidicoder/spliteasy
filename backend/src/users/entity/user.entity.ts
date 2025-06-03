export class User
{
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  )
  {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
