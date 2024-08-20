//import getServerSession from "next-auth";
import { auth } from "auth";
import { findUserByEmail, getUsers } from "./myDb";


const currentSession = await auth();
console.log(currentSession);
let userEmail: any;
if (currentSession && currentSession.user) {
  userEmail = currentSession.user.email;
}
 const currentUser = await findUserByEmail(userEmail);
 export const userActivId = currentUser?.id;
 const allRegUsers = await getUsers();
