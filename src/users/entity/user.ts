export class User {
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
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updatePassword(newPassword: string) {
    this.password = newPassword;
    this.updatedAt = new Date();
  }
  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  updateUsername(newUsername: string) {
    this.username = newUsername;
    this.updatedAt = new Date();
  }
  updateFirstName(newFirstName: string) {
    this.firstName = newFirstName;
    this.updatedAt = new Date();
  }
  updateLastName(newLastName: string) {
    this.lastName = newLastName;
    this.updatedAt = new Date();
  }
}
