// src/api/loginAccount.ts

export async function loginAccount(username: string, password: string): Promise<Response> {
  return fetch("https://guessthepromt.store/api/v1/accounts/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}
