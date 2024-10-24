"use server";
import bcrypt from "bcrypt";
export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  "use server";
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
}
