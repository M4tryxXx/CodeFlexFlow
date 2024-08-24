"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendInvitationEmail,
} from "./mailer";
import { auth } from "auth";
import {
  registerUserDb,
  deleteUserById,
  updateUser,
  saveQualification,
  updateQualification,
  saveExperience,
  updateExperience,
  deleteQualificationById,
  deleteExperienceById,
  getQualificationById,
  getExperienceById,
  getAllInvites,
  createInvitation,
  getInvitesByUserId,
  deleteInviteById,
  findUserByEmail,
  getUsers,
  findUserById,
  updateInvite,
} from "./myDb";
const bcrypt = require("bcrypt");
import cuid2 from "cuid";
import { user } from "@nextui-org/react";

export const redirectUser = async () => {
  return redirect("/home");
};

export const getUsersData = async () => {
  const result = await getUsers();
  if (result) {
    return result;
  }
  revalidatePath("/home/admin/users");
  redirect("/home/admin/users");
};

export async function authenticate(formData: FormData) {
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
  redirect("/home");
}

export const userId = async () => {
  const currentSession = await auth();
  let userEmail: any;
  if (currentSession && currentSession.user) {
    userEmail = currentSession.user.email;
  }
  const currentUser = await findUserByEmail(userEmail);
  return currentUser;
};

export async function registerUser(data: object | any) {
  const { email, username } = data;
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;

  const response = await registerUserDb(data);
  //console.log(response);
  if (response) {
    await sendWelcomeEmail(email, username);
    revalidatePath("/home/admin/users");
    redirect("/login");
  } else {
    return "Something went wrong";
  }
}

export const handleDelete = async (id: string) => {
  await deleteUserById(id);
  revalidatePath("/home/admin/users");
  redirect("/home/admin/users");
};

export const handleDeleteInvite = async (id: string) => {
  await deleteInviteById(id);
  revalidatePath("/home/dashboard");
  redirect("/home/dashboard");
};

export const handleEditUser = async (data: FormData) => {
  const itemId: any = data.get("itemId");
  redirect(`/home/admin/users/${itemId}`);
};

export const handleEditQualification = async (data: FormData) => {
  const qualificationId: any = data.get("qualificationId");
  redirect(`/home/dashboard/qualification/${qualificationId}`);
};

export const editUser = async (data: any) => {
  data.updatedAt = new Date().toISOString();
  const response = await updateUser(data);
  if (response) {
    revalidatePath("/home/admin/users");
    redirect("/home/admin/users");
  } else {
    return "Something went wrong";
  }
};

export const updateInviteById = async (id: any) => {
  const updatedAt = new Date(Date.now()).toISOString();
  const data = {
    id: id,
    updatedAt: updatedAt,
    opened: true,
  };
  const response = await updateInvite(data);
  if (response) {
    revalidatePath("/home/dashboard");
  } else {
    return "Something went wrong";
  }
};

export const updateUserPassword = async (data: any) => {
  data.updatedAt = new Date().toISOString();
  const { password } = data;
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  data.resetToken = cuid2();
  const response = await updateUser(data);
  if (response) {
    redirect("/login");
  } else {
    return "Something went wrong";
  }
};

// Experience
export async function addExperience(data: any) {
  const response = await await saveExperience(data);
  if (!response) {
    return "Something went wrong";
  } else {
    revalidatePath("/home/dashboard/experience");
    redirect("/home/dashboard/experience");
  }
}

//qualification
export async function addQualification(data: any) {
  const response = await saveQualification(data);
  if (!response) {
    return "Something went wrong";
  } else {
    revalidatePath("/home/dashboard/qualification");
    redirect("/home/dashboard/qualification");
  }
}

export const editQualification = async (data: any) => {
  const response = await updateQualification(data);
  if (response) {
    revalidatePath("/home/dashboard/qualification");
    redirect("/home/dashboard/qualification");
  } else {
    return "Something went wrong";
  }
};

export const deleteQualification = async (id: string) => {
  const result = await deleteQualificationById(id);
  revalidatePath("/home/dashboard/qualification");
  redirect("/home/dashboard/qualification");
};

export const editExperience = async (data: any) => {
  const response = await updateExperience(data);
  if (response) {
    revalidatePath("/home/dashboard/experience");
    redirect("/home/dashboard/experience");
  } else {
    return "Something went wrong";
  }
};

export const deleteExperience = async (id: string) => {
  await deleteExperienceById(id);
  revalidatePath("/home/dashboard/experience");
  redirect("/home/dashboard/experience");
};

export const sendPasswordChangeLink = async (email: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return "User not found!";
  }
  const expiryToken = new Date(Date.now() + 1800000).toISOString();
  const token = cuid2();
  const data = {
    id: user.id,
    resetToken: token,
    resetTokenExpiry: expiryToken,
  };

  const response = await updateUser(data);
  if (!response) {
    return "Something went wrong";
  }
  await sendResetPasswordEmail(email, token, user.username);
  redirect("/login");
};

export const sendInvitationLink = async (
  user: any,
  email: String,
  name: String
) => {
  const invitations = await getAllInvites();
  const expiresAt = new Date(Date.now() + 604800000).toISOString();
  const invitation = `CV-${invitations.length + 10000}`;
  const data = {
    id: invitation,
    userId: user.id,
    expiresAt: expiresAt,
    destinationEmail: email,
    destinationName: name,
  };

  const response = await createInvitation(data);
  if (!response) {
    return "Something went wrong";
  }
  await sendInvitationEmail(email, response, user);
  revalidatePath("/home/dashboard");
  redirect("/home/dashboard");
};

export const userData = async () => {
  const currentSession = await auth();
  let userEmail: any;
  if (currentSession && currentSession.user) {
    userEmail = currentSession.user.email;
  }
  const currentUser = await findUserByEmail(userEmail);
  if (!currentUser) {
    throw new Error("User not found");
  }
  const userExperience = await getExperienceById(currentUser.id);
  const userQualification = await getQualificationById(currentUser.id);
  const userInvites = await getInvitesByUserId(currentUser.id);
  return {
    user: currentUser,
    experience: userExperience,
    qualifications: userQualification,
    Invites: userInvites,
  };
};

export const userDataById = async (id: string) => {
  const user = await findUserById(id);
  const userExperience = await getExperienceById(id);
  const userQualification = await getQualificationById(id);
  const userInvites = await getInvitesByUserId(id);
  return {
    user: user,
    experience: userExperience,
    qualifications: userQualification,
    Invites: userInvites,
  };
};
