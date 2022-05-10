import { User } from "../models/user.model";

/*
The Builder Pattern can be used to mitigate the object creation process and centralizes this operation in one file.
It allows new fields to be added without compromising other code parts, because we can set default values for them.
*/
export class UserBuilder {
  private username = "standard_user";
  private password = "secret_sauce";

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
