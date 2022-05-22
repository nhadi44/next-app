import db from "../../../libs/db";
import bcrypt from "bcryptjs";

export default async function handle(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const passwordhash = bcrypt.hashSync(password, salt);

  const register = await db("users").insert({
    email,
    password: passwordhash,
  });

  const registerUser = await db("users").where({ id: register }).first();

  res.status(200).json({
    status: "success",
    message: "User registered successfully",
    data: registerUser,
  });
}
