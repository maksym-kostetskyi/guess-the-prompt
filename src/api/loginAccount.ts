export async function loginAccount(
  username: string,
  password: string
): Promise<{ access_token: string }> {
  const res = await fetch("https://guessthepromt.store/api/v1/accounts/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error("Помилка входу");
  }
  return res.json();
}
