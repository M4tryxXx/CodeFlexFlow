"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut, auth } from "../../auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";

import {
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendInvitationEmail,
  sendContactMeEmail,
  sendNotificationEmail,
} from "./mailer";
import {
  saveUserDb,
  deleteUserById,
  updateUser,
  saveExperience,
  saveQualification,
  updateQualification,
  updateExperience,
  deleteQualificationById,
  deleteExperienceById,
  selectQualifications,
  getExperienceById,
  getAllInvites,
  createInvitation,
  getInvitesByuser_id,
  deleteInvite,
  selectUserPasswordToken,
  updateInvite,
  inviteSerial,
  updateSerial,
  selectUserFull,
  selectUserLogIn,
  selectUserAccount,
  selectAllUsers,
  send_message,
  mark_message,
  delete_message,
  getConversation,
} from "./myDb";
const bcrypt = require("bcrypt");
import { createId as cuid2 } from "@paralleldrive/cuid2";

/**
 *
 *
 *
 *
 *
 * @param formData
 * @authenticates the user
 *
 *
 *
 *
 */
export async function authenticate(formData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
  // revalidatePath("/home");
  redirect("/home");
}

/**
 *
 *
 *
 *
 * @param path
 * @redirects the user to the path
 *
 *
 *
 */
export const redirectUser = async (path) => {
  return redirect(path);
};

export const revalidatePathCustom = async (path) => {
  revalidatePath(path);
};

/**
 *
 *
 *
 *
 * @param data
 * @returns all the users
 *
 *
 *
 */

export const getUsersData = async () => {
  const result = await selectAllUsers();
  if (result) {
    return result;
  }
  revalidatePath("/home/admin/users");
  redirect("/home/admin/users");
};

export const getLoggedUserFull = async (email) => {
  const currentUser = await selectUserFull(undefined, email);
  return currentUser;
};

export const getUserFull = async (id, email, username) => {
  if (id) {
    return await selectUserFull(id);
  } else if (email) {
    return await selectUserFull(undefined, email);
  }
  return await selectUserFull(undefined, undefined, username);
};

export const getLoggedUser = async (email) => {
  const currentUser = await selectUserLogIn(undefined, email);
  //console.log(currentUser);
  return currentUser;
};

export async function registerUser(data) {
  const { email, username } = data;
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;

  const response = await saveUserDb(data);

  // console.log(response);
  if (response) {
    await sendWelcomeEmail(email, username);
    await sendContactMeEmail(email, username, " Just created an account :)!");
    await send_message({
      subject: "Welcome",
      message: "Welcome to the CV App",
      to_user_id: response.id,
      from: "Admin",
    });
    revalidatePath("/home/admin/users");
    redirect("/login");
  } else {
    return "Something went wrong";
  }
}

export const handleDelete = async (id) => {
  await deleteUserById(id);
  revalidatePath("/home/admin/users");
  redirect("/home/admin/users");
};

export const handleDeleteAccount = async (id) => {
  await deleteUserById(id);
  await signOut();
  revalidatePath("/home/admin/users");
  redirect("/login");
};

export const handleDeleteInvite = async (id, location) => {
  await deleteInvite(id);
  if (location === "dashboard") {
    revalidatePath("/home/dashboard");
    redirect("/home/dashboard");
  } else {
    revalidatePath("/home/admin");
    redirect("/home/admin");
  }
};

export const handleEditUser = async (data) => {
  const itemId = data.get("itemId");
  redirect(`/home/admin/users/${itemId}`);
};

export const handleEditQualification = async (data) => {
  const qualificationId = data.get("qualificationId");
  redirect(`/home/dashboard/qualification/${qualificationId}`);
};

/**
 *
 * @param data
 * @returns
 */
export const editUser = async (userPersonalInfo, userAccount, userSocial) => {
  //console.log(userPersonalInfo, userAccount, userSocial);
  if (userPersonalInfo) {
    userPersonalInfo.updated_at = new Date(Date.now());
    const response = await updateUser(userPersonalInfo);
    //console.log(response);
    if (response) {
      revalidatePath("/home/admin/users");
      redirect("/home/admin/users");
    } else {
      return "Something went wrong";
    }
  } else if (userAccount) {
    userAccount.updated_at = new Date(Date.now());
    const response = await updateUser(undefined, userAccount);
    if (response) {
      revalidatePath("/home/admin/users");
      redirect("/home/admin/users");
    } else {
      return "Something went wrong";
    }
  } else if (userSocial) {
    const response = await updateUser(undefined, undefined, userSocial);
    if (response) {
      revalidatePath("/home/admin/users");
      redirect("/home/admin/users");
    } else {
      return "Something went wrong";
    }
  }
};

// export const editProfile = async (
//   userAccount?: UserType,
//   userPersonalInfo?: PersonalInfoType,
//   userSocials?: SocialType
// ) => {
//   if (userAccount) {
//     userAccount.updated_at = new Date(Date.now());
//     //console.log(data);
//     const response = await updateUser(userAccount);
//     if (response) {
//       revalidatePath("/home/dashboard/profile");
//       redirect("/home/dashboard/profile");
//     } else {
//       return "Something went wrong";
//     }
//   }
// };

export const updateInviteById = async (id) => {
  const updated_at = new Date(Date.now());
  const data = {
    id: id,
    opened_at: updated_at,
    opened: true,
  };
  const response = await updateInvite(data);
  if (response) {
    return response;
  } else {
    return null;
  }
};

export const updateUserDbPassword = async (data) => {
  data.updated_at = new Date(Date.now());
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  data.reset_token = cuid2();
  const response = await updateUser(undefined, data);
  if (response) {
    redirect("/login");
  } else {
    return "Something went wrong";
  }
};

// Experience
export async function addExperience(data) {
  const response = await saveExperience(data);
  if (!response) {
    return "Something went wrong";
  } else {
    revalidatePath("/home/dashboard/experiences");
    redirect("/home/dashboard/experiences");
  }
}

//qualification
export async function addQualification(data) {
  const response = await saveQualification(data);
  if (!response) {
    return "Something went wrong";
  } else {
    revalidatePath("/home/dashboard/qualifications");
    redirect("/home/dashboard/qualifications");
  }
}

export const editQualification = async (data) => {
  const response = await updateQualification(data);
  if (response) {
    revalidatePath("/home/dashboard/qualifications");
    redirect("/home/dashboard/qualifications");
  } else {
    return "Something went wrong";
  }
};

export const deleteQualification = async (id) => {
  const result = await deleteQualificationById(id);
  revalidatePath("/home/dashboard/qualifications");
  // redirect("/home/dashboard/qualifications");
};

export const editExperience = async (data) => {
  const response = await updateExperience(data);
  if (response) {
    revalidatePath("/home/dashboard/experiences");
    redirect("/home/dashboard/experiences");
  } else {
    return "Something went wrong";
  }
};

export const deleteExperience = async (id) => {
  await deleteExperienceById(id);
  revalidatePath("/home/dashboard/experiences");
  // redirect("/home/dashboard/experiences");
};

export const sendPasswordChangeLink = async (email) => {
  const user = await selectUserLogIn(undefined, email);
  if (!user) {
    return "User not found!";
  }
  const expiryToken = new Date(Date.now() + 1800000);
  const token = cuid2();
  const data = {
    id: user.id,
    reset_token: token,
    reset_token_expiry: expiryToken,
  };

  const response = await updateUser(undefined, data);
  if (!response) {
    return "Something went wrong";
  }
  await sendResetPasswordEmail(email, token, user.username);
  revalidatePath("/login");
  redirect("/login");
};

export const sendInvitationLink = async (user, email, name) => {
  let invitationCode;
  const serial = await inviteSerial();
  //console.log(serial);
  const expires_at = new Date(Date.now() + 604800000);
  if (serial) {
    invitationCode = `CV-${serial.id + 10000}`;
  }
  //console.log(invitationCode, user.username, expires_at, email, name);

  const data = {
    id: invitationCode,
    user_id: user.id,
    expires_at: expires_at,
    user_userName: user.username,
    destination_email: email,
    at_company_name: name,
  };
  let response;
  try {
    response = await createInvitation(data);
    await sendInvitationEmail(email, response, user);

    if (response && serial) {
      await updateSerial({ id: serial.id + 1 });
    }
  } catch (error) {
    console.log(error);
    return "Something went wrong";
  }

  revalidatePath("/home/dashboard");
  // redirect("/home/dashboard");
};

export const shareInvitationLink = async (
  user,
  email,
  name,
  invitationCode
) => {
  //console.log(serial);
  const expires_at = new Date(Date.now() + 604800000);
  const cv_id = `CV-${invitationCode + 10000}`;
  const data = {
    id: cv_id,
    user_id: user.id,
    expires_at: expires_at,
    user_userName: user.username,
    destination_email: email,
    at_company_name: name,
  };
  let response;
  try {
    response = await createInvitation(data);
    if (response) {
      await updateSerial({ id: invitationCode + 1 });
      revalidatePath("/home/dashboard");
      return response;
    }
  } catch (error) {
    console.log(error);
    return "Something went wrong";
  }
};

export const allInvites = async () => {
  try {
    const invites = await getAllInvites();
    return invites;
  } catch (err) {
    return "Something went wrong";
  }
};

export const userData = async () => {
  const currentSession = await auth();
  let userEmail;
  if (currentSession && currentSession.user) {
    userEmail = currentSession.user.email;
  }
  const currentUser = await selectUserFull(undefined, userEmail);
  if (!currentUser) {
    throw new Error("User not found");
  }

  return currentUser;
};

export const userDataById = async (id) => {
  const user = await selectUserFull(id);

  return user;
};

export async function sendContactEmail(formData) {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const { email, name, message } = rawFormData;
  try {
    await sendContactMeEmail(email, name, message);
  } catch (error) {
    throw error;
  }
  revalidatePath("/home/dashboard");
}

export const sendMessage = async (data) => {
  const response = await send_message(data);
  revalidatePath("/home/dashboard/profile/messages");
  revalidatePath("/home", "layout");
  if (response) {
    return response;
  }

  return "Something went wrong";
};

export const mark_message_read = async (id, notification) => {
  const response = await mark_message(id, notification);
  revalidatePath("/home/dashboard/profile/messages");
  revalidatePath("/home");
  if (response) {
    revalidatePath("/home/dashboard/profile/messages");
    revalidatePath("/home/admin/users");
  } else {
    return "Something went wrong";
  }
};

export const delete_message_read = async (id) => {
  const response = await delete_message(id);
  if (response) {
    revalidatePath("/home/dashboard/profile/messages");
    revalidatePath("/home/admin/users");
    return response;
  } else {
    return "Something went wrong";
  }
};

export const getMessages = async (id) => {
  const response = await getConversation(id);
  if (response) {
    revalidatePath("/home/dashboard/profile/messages");
    revalidatePath("/home/admin/users");
    return response;
  } else {
    return null;
  }
};

export const notificationEmail = async (email, name, message, link) => {
  const response = await sendNotificationEmail(email, name, message, link);
  if (response !== undefined) {
    revalidatePath("/home/dashboard/profile/messages");
    return response;
  } else {
    return "Something went wrong";
  }
};

export const handleUnreadNotificationsList = async (notifications, userId) => {
  if (notifications.length === 0) {
    console.log("No unread messages");
    return;
  }

  const message = `You have ${notifications.length} unread messages \n Marking them as read now!`;
  console.log(message);
  const response = await mark_message(userId, notifications);

  if (response) {
    revalidatePath("/home");
    revalidatePath("/home/dashboard/profile/messages");
    revalidatePath("/home", "layout");
    return response;
  } else {
    return "Something went wrong";
  }
};
