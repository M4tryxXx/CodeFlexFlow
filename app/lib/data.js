//import getServerSession from "next-auth";
import { auth } from "auth";
import { selectUserLogIn, selectAllUsers } from "./myDb";

const currentSession = await auth();
////console.log(currentSession);
let userEmail;
if (currentSession && currentSession.user) {
  userEmail = currentSession.user.email;
}
const currentUser = await selectUserLogIn(undefined, userEmail);
export const session_user_id = currentUser?.id;
const allRegUsers = await selectAllUsers();
