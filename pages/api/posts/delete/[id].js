import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";

export default async function handle(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();
  const auth = await authorization(req, res);

  const { id } = req.query;

  const deleteData = await db("post").where({ id }).del();

  if (!deleteData) return res.status(404).end();

  res.status(200).json({
    status: "success",
    message: "Posts delete page",
    data: deleteData,
  });
}
