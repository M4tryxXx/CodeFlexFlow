"use client";

import {
  authenticate,
  registerUser,
  addQualification,
  editQualification,
  addExperience,
  editExperience,
  editUser,
  handleDelete,
  sendPasswordChangeLink,
  updateUserPassword,
} from "@/app/lib/actions";
import toast from "react-hot-toast";
import z from "zod";
import { findUserByUsername, findUserByEmail } from "./myDb";
import { comparePassword } from "./server-side-utils";
import {
  verifyEmailSchema,
  verifyUsernameSchema,
  addQualificationSchema,
  editQualificationSchema,
  addExperienceSchema,
  editUserSchema,
  registerUserSchema,
  editExperienceSchema,
  updateUserPasswordSchema,
} from "./zod-schemas";
import { sendWelcomeEmail } from "./mailer";
import { updateLogin } from "../lib/myDb";

export const editUserSide = async (data: any) => {
  let obj: any = {};

  for (const [key, value] of Object.entries(data)) {
    if (value) {
      obj[key] = value;
    }
  }
  if (Object.keys(obj).length < 3) {
    toast.error("The forms are empty!", { duration: 4000 });
    return;
  }
  const dataToUpdate = editUserSchema.safeParse(obj);
  if (!dataToUpdate.success) {
    let errorMessage = "";
    dataToUpdate.error.errors.forEach((issue) => {
      errorMessage =
        errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
    });
    toast.error(errorMessage, { duration: 5000 });
    return;
  }
  const response = await editUser(dataToUpdate.data);
  if (response === "Something went wrong") {
    toast.error("Something went wrong!", { duration: 5000 });
    return;
  }
  toast.success("Details has been succesfully updated!");
};

export const deleteUserSide = async (id: string) => {
  try {
    await handleDelete(id);
    toast.success("User has been deleted!", { duration: 4000 });
  } catch (error: any) {
    toast.error(error);
  }
};

export const loginUserSide = async (
  username: any,
  password: any,
  loginFrom: any
) => {
  const credentials: { [key: string]: any } = {
    username: username,
    password: password,
  };
  const parsedCredentials = z
    .object({ username: z.string(), password: z.string().min(6) })
    .safeParse(credentials);
  if (parsedCredentials.success) {
    const { username, password } = parsedCredentials.data;
    const user = await findUserByUsername(username);
    //console.log(user);
    if (!user) {
      //
      throw "Username not found!";
    }
    const passwordsMatch = await comparePassword(password, user.password);

    if (!passwordsMatch) {
      throw "Wrong password!";
    }
    let formData = new FormData();

    for (let key in credentials) {
      formData.append(key, credentials[key]);
    }
    authenticate(formData);
    updateLogin(user.id, {
      lastLogin: new Date(Date.now()).toISOString(),
      lastLoginFrom: loginFrom,
    });
  }
};

export const checkUsernameLive = async (username: string) => {
  const checkUsername = await findUserByUsername(username);
  if (checkUsername) {
    toast.error(`${username} is already in use!`, { duration: 4000 });
    return true;
  }
  const verifyUsername = { username: username };
  const data = verifyUsernameSchema.safeParse(verifyUsername);
  if (!data.success) {
    toast.error("This is not a valid username!");
    return "not valid entry";
  }
  if (!checkUsername && username.length > 3 && data.success) {
    return false;
  }
};

export const checkEmailLive = async (email: string) => {
  const checkEmail = await findUserByEmail(email);
  if (checkEmail) {
    toast.error(`${email} is already in use!`, { duration: 5000 });
    return true;
  }

  const verifyEmail = { email: email };
  const data = verifyEmailSchema.safeParse(verifyEmail);
  if (!data.success) {
    toast.error("This is not a valid email address!", { duration: 5000 });

    return "not valid entry";
  }
  if (!checkEmail && email.length > 5 && data.success) {
    return false;
  }
};

export const checkUserEmail = async (email: string) => {
  const checkEmail = await findUserByEmail(email);
  if (checkEmail) {
    return true;
  }
  return false;
};

export const registerFunction = async (data: any) => {
  const passwordElement = document.getElementById("password");
  const usernameElement = document.getElementById("username");
  const emailElement = document.getElementById("email");
  const confirmPasswordElement = document.getElementById("password2");
  const { username, password, email, confirmPassword } = data;
  if (username.length < 3) {
    if (usernameElement) {
      usernameElement.style.border = "solid 2px red";
    }
    toast.error("Username must not be empty!", { duration: 5000 });
    return;
  }
  if (password.length < 8) {
    if (passwordElement) {
      passwordElement.style.border = "solid 2px red";
    }
    toast.error("Password must contain at least 8 characters!", {
      duration: 5000,
    });
    return "Password must contain at least 8 characters!";
  }
  if (email.length < 5) {
    if (emailElement) {
      emailElement.style.border = "solid 2px red";
    }
    toast.error("Email field must contain at least 5 charcaters!", {
      duration: 5000,
    });
    return;
  }
  if (password !== confirmPassword) {
    if (confirmPasswordElement && passwordElement) {
      confirmPasswordElement.style.border = "solid 2px red";
      passwordElement.style.border = "solid 2px red";
    }
    toast.error("Passwords do not match!", { duration: 5000 });
    return "Passwords do not match!";
  }

  const dataToRegister = registerUserSchema.safeParse(data);
  if (!dataToRegister.success) {
    let errorMessage = "";
    dataToRegister.error.errors.forEach((issue) => {
      errorMessage =
        errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      const element = document.getElementById(`${issue.path[0]}`);
      if (element) {
        element.style.border = "solid 2px red";
      }
    });
    throw errorMessage;
  }
  const response = await registerUser(dataToRegister.data);

  if (response) {
    toast.error("Registration Failed, please try again!!", { duration: 5000 });
    return;
  }

  toast.success("Registration successful, You can log in now!", {
    duration: 5000,
  });
};

export async function addDataUserSide(data: any) {
  let obj: any = {};
  for (let [key, value] of Object.entries(data)) {
    if (value) {
      obj[key] = value;
    }
  }
  const keys = Object.keys(obj);
  if (keys.length === 1) {
    toast.error("No changes was made!");
    return;
  }
  if (keys[0] === "name") {
    let dataToUpdate = addQualificationSchema.safeParse(obj);
    if (!dataToUpdate.success) {
      let errorMessage = "";
      dataToUpdate.error.errors.forEach((issue: any) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage);
      return;
    }
    const response = await addQualification(obj);
    if (response === "Something went wrong") {
      toast.error("Something went wrong!");
      return;
    }
    toast.success("Qualification added!");
  } else if (keys[0] === "company") {
    let dataToUpdate = addExperienceSchema.safeParse(obj);
    if (!dataToUpdate.success) {
      let errorMessage = "";
      dataToUpdate.error.errors.forEach((issue: any) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage);
      return;
    }
    const response = await addExperience(obj);
    if (response === "Something went wrong") {
      toast.error("Something went wrong!");
      return;
    }
    toast.success("Experience added!", { duration: 5000 });
  }
}

export async function editDataUserSide(data: any) {
  let obj: any = {};
  for (let [key, value] of Object.entries(data)) {
    if (value) {
      obj[key] = value;
    }
  }
  const keys = Object.keys(obj);

  if (keys.length === 1) {
    toast.error("No changes was made!");
    return;
  }
  if (keys[0] === "editQualification") {
    let dataToUpdate = editQualificationSchema.safeParse(obj);
    if (!dataToUpdate.success) {
      let errorMessage = "";
      dataToUpdate.error.errors.forEach((issue: any) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage);
      return;
    }

    const response = await editQualification(dataToUpdate.data);
    if (response === "Something went wrong") {
      toast.error("Something went wrong!");
      return;
    }
    toast.success("Qualification updated!");
  } else if (keys[0] === "editExperience") {
    let dataToUpdate = editExperienceSchema.safeParse(obj);
    if (!dataToUpdate.success) {
      let errorMessage = "";
      dataToUpdate.error.errors.forEach((issue: any) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage);
      return;
    }
    const response = await editExperience(dataToUpdate.data);
    if (response === "Something went wrong") {
      toast.error("Something went wrong!");
      return;
    }
    toast.success("Experience updated!", { duration: 5000 });
  }
}

export const updatePassword = async (data: any) => {
  const passwordElement = document.getElementById("password");
  const confirmPasswordElement = document.getElementById("password2");
  const { password, confirmPassword, id } = data;

  if (password.length < 8) {
    if (passwordElement) {
      passwordElement.style.border = "solid 2px red";
    }
    toast.error("Password must contain at least 8 characters!", {
      duration: 5000,
    });
    return "Password must contain at least 8 characters!";
  }
  if (password !== confirmPassword) {
    if (confirmPasswordElement && passwordElement) {
      confirmPasswordElement.style.border = "solid 2px red";
      passwordElement.style.border = "solid 2px red";
    }
    toast.error("Passwords do not match!", { duration: 5000 });
    return "Passwords do not match!";
  }

  const dataToRegister = updateUserPasswordSchema.safeParse(data);
  if (!dataToRegister.success) {
    let errorMessage = "";
    dataToRegister.error.errors.forEach((issue) => {
      errorMessage =
        errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      const element = document.getElementById(`${issue.path[0]}`);
      if (element) {
        element.style.border = "solid 2px red";
      }
    });
    throw errorMessage;
  }
  const response = await updateUserPassword({ id: id, password: password });

  if (response) {
    toast.error("Update Failed, please try again!!", { duration: 5000 });
    return "Update Failed, please try again!";
  }

  toast.success("Update successful, You can log in now!", {
    duration: 5000,
  });
};
