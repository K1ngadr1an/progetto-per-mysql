import express, { application, Request, Response } from "express";
import { createClient, createPool } from "@vercel/postgres";
const client = createClient({
  connectionString:
    "postgres://default:mBTJF53zlrex@ep-lucky-band-a4yjirfl.us-east-1.aws.neon.tech:5432/verceldb",
});
const app = express();
const port = 3000;
const server = express.json();
app.use(server);

app.get("/posts", function (request: Request, response: Response) {
  response.status(200).json([]);
});

app.get(
  "/posts/:idPost",
  async function (request: Request, response: Response) {
    await client.connect();
    const res = await client.query("SELECT * FROM posts");
    response.status(201).json(res.rows);
  }
);

app.post("/posts/create", async (req: Request, res: Response) => {
  const query = "INSERT INTO posts (title, content) VALUES ($1, $2)";
  const values = [req.body.title, req.body.content];
  await client.query(query, values);
  const database = "SELECT * FROM posts";
  const result = await client.query(database);
  res.status(201).json(result.rows);
});

app.put("/posts/:idPost", function (request: Request, response: Response) {
  return response.status(200).json({
    id: request.body.id,
    title: request.body.title,
    content: request.body.content,
  });
});
app.delete("/posts/:idpost", function (request: Request, response: Response) {
  return response.status(200).json({
    message: `Post ${request.params.idPost} deleted`,
  });
});

app.listen(port, function () {
  console.log(`server is running on http://localhost:${port}`);
});
