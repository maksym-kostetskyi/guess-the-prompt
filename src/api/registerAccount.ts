// src/api/registerAccount.ts

export async function registerAccount(username: string, password: string): Promise<Response> {
  return fetch("https://guessthepromt.store/api/v1/accounts/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}
