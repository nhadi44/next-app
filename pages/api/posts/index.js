import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const auth = await authorization(req, res);
  console.log(auth);
  
  const post = await db("post").select("id", "title", "content", "created_at");

  res.status(200).json({
    status: "success",
    message: "Posts index page",
    data: post,
  });
}
