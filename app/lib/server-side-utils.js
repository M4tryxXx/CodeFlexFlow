"use server";
import bcrypt from "bcrypt";
export async function comparePassword(password, hashedPassword) {
  "use server";
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
}
