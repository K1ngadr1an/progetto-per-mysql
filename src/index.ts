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

app.get("/posts", async function (request: Request, response: Response) {
  await client.connect();
  const res = await client.query("SELECT * FROM posts");
  response.status(201).json(res.rows);
});

app.get("/posts/:idPost", function (request: Request, response: Response) {
  response.status(200).json({ id: request.params.idPost });
});
app.post("/posts", function (request: Request, response: Response) {
  const resp = client.query(
    `INSERT INTO posts (title, content) VALUES ('${request.body.title}', '${request.body.content}')`
  );
  response.status(200).json({});
});

app.put("/posts/:idPost", function (request: Request, response: Response) {
const resp = client.query(
    
)
  });
});

app.delete(
  "/posts/idpost",
  async function (request: Request, response: Response) {
    await client.connect();
    const res = await client.query(
      `DELETE FROM posts WHERE id =${request.body.id} `
    );
    response.status(201).json({ message: ` delete ${res.rows}` });
  }
);

app.listen(port, function () {
  console.log(`server is running on http://localhost:${port}`);
});
