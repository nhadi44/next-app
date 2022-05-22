import db from "../../../../libs/db";

export default async function handle(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const { id } = req.query;
  const find = await db("post").where({ id });
  res.status(200).json({
    status: "success",
    data: find,
  });
}
