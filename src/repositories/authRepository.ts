const REGISTER_ENDPOINT = "register";

export default class AuthRepository {
  private readonly apiRoot: string;

  constructor(apiRoot: string) {
    this.apiRoot = apiRoot;
  }

  register(email: string, password: string, name: string): Promise<Response> {
    const body = {
      email,
      password,
      name
    };
    const url = new URL(REGISTER_ENDPOINT, this.apiRoot);

    return fetch(url.href, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
}
