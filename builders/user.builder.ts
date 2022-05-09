import { User } from "../models/user.model";

export class UserBuilder {
  username = "standard_user";
  password = "secret_sauce";
  static new(): UserBuilder {
    return new UserBuilder();
  }
  withUsername(username: string) {
    this.username = username;
  }
  build(): User {
    return new User(this.username, this.password);
  }
}
