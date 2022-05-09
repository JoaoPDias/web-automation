export class User {
  private _username: string;
  private _password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }
}
