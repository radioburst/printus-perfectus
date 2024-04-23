import sqlite3 from "better-sqlite3";
import { nanoid } from "nanoid";

export const db = sqlite3("/data/tokens.db", { readonly: false });
db.prepare(
  "CREATE TABLE IF NOT EXISTS tokens(id VARCHAR NOT NULL, valid_until DATE NOT NULL);"
).run();

export const selectAllValidTokens = () =>
  db
    .prepare(
      `SELECT id, valid_until FROM tokens WHERE valid_until > DATE('now') ORDER BY valid_until DESC`
    )
    .iterate();

export const insertToken = (validUntil: Date) => {
  const id = nanoid();
  db.prepare(`INSERT INTO tokens (id, valid_until) VALUES (?, ?)`).run(
    id,
    validUntil.toISOString()
  );
  return id;
};

export const deleteToken = (id: string) => {
  db.prepare(`DELETE FROM tokens WHERE id=?`).run(id);
};

export const isTokenValid = (token: string) => {
  return !![...selectAllValidTokens()].find(({ id }) => id === token);
};
