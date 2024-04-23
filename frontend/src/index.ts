import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import {
  insertToken,
  selectAllValidTokens,
  deleteToken,
  isTokenValid,
} from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

const ULTRA_GEHEIM_PASSWORT = process.env.PAROLE;

app.get("/admin", async (req, res) => {
  const parole = req.query.parole ?? "--";
  if (parole !== ULTRA_GEHEIM_PASSWORT) res.status(403).end("Forbidden.");
  else res.sendFile("/admin.html", { root: __dirname });
});

app.put("/token", async (req, res) => {
  try {
    const parole = req.query.parole;
    const validUntil = new Date(Number(req.query.validUntil));
    if (parole !== ULTRA_GEHEIM_PASSWORT) res.status(403).end("Forbidden.");
    else res.send(insertToken(validUntil));
  } catch (e) {
    res
      .status(500)
      .end(e instanceof Error ? e.message : "Internal Server Error.");
  }
});

app.get("/token", async (req, res) => {
  try {
    const parole = req.query.parole;
    if (parole !== ULTRA_GEHEIM_PASSWORT) res.status(403).end("Forbidden.");
    else res.json([...selectAllValidTokens()]);
  } catch (e) {
    res
      .status(500)
      .end(e instanceof Error ? e.message : "Internal Server Error.");
  }
});

app.delete("/token", async (req, res) => {
  try {
    const parole = req.query.parole;
    const id = req.query.id as string;
    if (parole !== ULTRA_GEHEIM_PASSWORT || !id)
      res.status(403).end("Forbidden.");
    else res.json(deleteToken(id));
  } catch (e) {
    res
      .status(500)
      .end(e instanceof Error ? e.message : "Internal Server Error.");
  }
});

app.get("/", async (req, res) => {
  res.status(403).end("Forbidden.");
});

const OCTO_API_KEY = "22086594422248D6931165995442F7F0";

app.get("/api/printer", async (req, res) => {
  const fetchReq = await fetch(
    `http://10.0.0.4/api/printer?apikey=${OCTO_API_KEY}`
  );
  const json = await fetchReq.json();
  res.json(json);
});

app.get("/api/job", async (req, res) => {
  const fetchReq = await fetch(
    `http://10.0.0.4/api/job?apikey=${OCTO_API_KEY}`
  );
  const json = await fetchReq.json();
  res.json(json);
});

app.get("/:id/cam1", async (req, res) => {
  const id = req.params.id as string;
  if (!id || !isTokenValid(id)) res.status(403).end("Forbidden.");

  const fetchReq = await fetch(`http://10.0.0.4/webcam3/?action=stream`);

  [...fetchReq.headers.entries()].forEach(([key, value]) => {
    res.set(key, value);
  });
  fetchReq.body?.pipe(res);
});

app.get("/:id/cam2", async (req, res) => {
  const id = req.params.id as string;
  if (!id || !isTokenValid(id)) res.status(403).end("Forbidden.");

  const fetchReq = await fetch(`http://10.0.0.4/webcam/?action=stream`);

  [...fetchReq.headers.entries()].forEach(([key, value]) => {
    res.set(key, value);
  });
  fetchReq.body?.pipe(res);
});

/*app.get("/:id/cam3", async (req, res) => {
  const id = req.params.id as string;
  if (!id || !isTokenValid(id)) res.status(403).end("Forbidden.");

  const fetchReq = await fetch(`http://10.0.0.4/webcam2/?action=stream`);

  [...fetchReq.headers.entries()].forEach(([key, value]) => {
    res.set(key, value);
  });
  fetchReq.body?.pipe(res);
});*/

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id as string;
    if (!id || !isTokenValid(id)) res.status(403).end("Forbidden.");
    else res.sendFile("/index.html", { root: __dirname });
  } catch (e) {
    res
      .status(500)
      .end(e instanceof Error ? e.message : "Internal Server Error.");
  }
});

app.use("/assets", express.static(path.join(__dirname, "../assets")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
