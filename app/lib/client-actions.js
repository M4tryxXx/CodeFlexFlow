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
  updateUserDbPassword,
  handleDeleteAccount,
  sendMessage,
  getMessages,
} from "./actions";
import toast from "react-hot-toast";
import z from "zod";
import { selectUserLogIn } from "./myDb";
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
  updateUserDbPasswordSchema,
  PersonalInfoSchema,
  EditSocialData,
  sendMessageSchema,
} from "./zod-schemas";
import { updateUserDbOnLogin } from "./myDb";

// export const editUserSide = async (data: any) => {
//   let obj: any = {};

//   for (const [key, value] of Object.entries(data)) {
//     if (value) {
//       obj[key] = value;
//     }
//   }
//   if (Object.keys(obj).length < 3) {
//     toast.error("The forms are empty!", { duration: 4000 });
//     return;
//   }
//   const dataToUpdate = editUserSchema.safeParse(obj);
//   if (!dataToUpdate.success) {
//     let errorMessage = "";
//     dataToUpdate.error.errors.forEach((issue) => {
//       errorMessage =
//         errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
//     });
//     toast.error(errorMessage, { duration: 5000 });
//     return;
//   }
//   const response = await editUser(dataToUpdate.data);
//   if (response === "Something went wrong") {
//     toast.error("Something went wrong!", { duration: 5000 });
//     return;
//   }
//   toast.success("Details has been succesfully updated!");
// };

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * @param userPersonalInfo
 * @param userAccount
 * @param userSocial
 * @returns
 *
 *
 *
 *
 *
 *
 */
export const editUserAccount = async (
  userPersonalInfo,
  userAccount,
  userSocial
) => {
  if (userPersonalInfo) {
    let obj = {};

    for (const [key, value] of Object.entries(userPersonalInfo)) {
      if (value) {
        obj[key] = value;
      }
    }
    if (Object.keys(obj).length < 2) {
      toast.error("The forms are empty!", { duration: 4000 });
      return;
    }
    const dataToUpdate = PersonalInfoSchema.safeParse(obj);
    if (!dataToUpdate.success) {
      let errorMessage = "";
      dataToUpdate.error.errors.forEach((issue) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage, { duration: 5000 });
      return;
    }

    //console.log(dataToUpdate.data);
    const updated_at = new Date(Date.now());
    dataToUpdate.data.updated_at = updated_at;
    const response = await editUser(dataToUpdate.data);
    if (response === "Something went wrong") {
      toast.error("Something went wrong!", { duration: 5000 });
      return;
    }
  } else if (userAccount) {
    let obj = {};

    for (const [key, value] of Object.entries(userAccount)) {
      if (value) {
        obj[key] = value;
      }
    }
    if (Object.keys(obj).length < 2) {
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

    const updated_at = new Date(Date.now());
    dataToUpdate.data.updated_at = updated_at;
    //console.log(dataToUpdate.data);
    const response = await editUser(undefined, dataToUpdate.data);
    if (response === "Something went wrong") {
      toast.error("Something went wrong!", { duration: 5000 });
      return;
    }
  } else if (userSocial) {
    let obj = {};

    for (const [key, value] of Object.entries(userSocial)) {
      if (value) {
        obj[key] = value;
      }
    }
    if (Object.keys(obj).length < 2) {
      toast.error("The forms are empty!", { duration: 4000 });
      return;
    }
    const dataToUpdate = EditSocialData.safeParse(obj);
    if (!dataToUpdate.success) {
      let errorMessage = "";
      dataToUpdate.error.errors.forEach((issue) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage, { duration: 5000 });
      return;
    }

    //console.log(dataToUpdate.data);
    const response = await editUser(dataToUpdate.data);
    if (response === "Something went wrong") {
      toast.error("Something went wrong!", { duration: 5000 });
      return;
    }
  }

  toast.success("Details has been succesfully updated!");
};

/**
 *
 *
 *
 *
 *
 * @param id
 * @param method
 *
 *
 *
 *
 *
 */

export const deleteUserSide = async (id, method) => {
  if (method === "admin") {
    try {
      await handleDelete(id);
      toast.success("User has been deleted!", { duration: 4000 });
    } catch (error) {
      toast.error(error);
    }
  }
  if (method === "account") {
    try {
      await handleDeleteAccount(id);
      toast.success("User has been deleted!", { duration: 4000 });
    } catch (error) {
      toast.error(error);
    }
  }
};

export const loginUserSide = async (username, password, loginFrom) => {
  const credentials = {
    username: username,
    password: password,
  };
  const parsedCredentials = z
    .object({ username: z.string(), password: z.string().min(6) })
    .safeParse(credentials);
  if (parsedCredentials.success) {
    const { username, password } = parsedCredentials.data;
    const user = await selectUserLogIn(undefined, undefined, username);
    ////console.log(user);
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

    await authenticate(formData);

    updateUserDbOnLogin({
      id: user.id,
      lastLogin: new Date(Date.now()),
      lastLogin_from: loginFrom,
    });
  }
};

export const checkUsernameLive = async (username) => {
  const checkUsername = await selectUserLogIn(undefined, undefined, username);
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

export const checkEmailLive = async (email) => {
  const checkEmail = await selectUserLogIn(undefined, email, undefined);
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

export const checkUserEmail = async (email) => {
  const checkEmail = await selectUserLogIn(undefined, email, undefined);
  if (checkEmail) {
    return true;
  }
  return false;
};

export const registerFunction = async (data) => {
  const passwordElement = document.getElementById("password");
  const usernameElement = document.getElementById("username");
  const emailElement = document.getElementById("email");
  const confirmPasswordElement = document.getElementById("password2");
  const { username, password, email, confirmPassword } = data;
  if (email.length < 5) {
    if (emailElement) {
      emailElement.style.border = "solid 2px red";
    }
    toast.error("Email field must contain at least 5 charcaters!", {
      duration: 5000,
    });
    return;
  }
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

export async function addDataUserSide(data) {
  //Initialize an empty object
  let obj = {};
  for (let [key, value] of Object.entries(data)) {
    if (value) {
      obj[key] = value;
    }
  }

  //Get the keys of the obj object
  const keys = Object.keys(obj);
  if (keys.length === 1) {
    toast.error("No changes was made!");
    return;
  }

  //Check if the first key in the keys array is "school" as this would mean that the user is trying to add a qualification
  if (keys[0] === "school") {
    let dataToUpdate = addQualificationSchema.safeParse(obj);
    if (!dataToUpdate.success) {
      let errorMessage = "";
      dataToUpdate.error.errors.forEach((issue) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage);
      return;
    }
    //console.log(obj);
    const response = await addQualification(obj);
    if (response === "Something went wrong") {
      toast.error("Something went wrong!");
      return;
    }
    toast.success("Qualification added!");
  }

  //Check if the first key in the keys array is "company" as this would mean that the user is trying to add an experience
  else if (keys[0] === "company") {
    let dataToUpdate = addExperienceSchema.safeParse(obj);
    if (!dataToUpdate.success) {
      let errorMessage = "";
      dataToUpdate.error.errors.forEach((issue) => {
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

export async function editDataUserSide(data) {
  //Initialize an empty object
  let obj = {};

  //Iterate through the data object and add the key value pairs to the obj object
  for (let [key, value] of Object.entries(data)) {
    if (value) {
      obj[key] = value;
    }
  }

  //Get the keys of the obj object
  const keys = Object.keys(obj);

  //Check if the keys array has only one element
  if (keys.length === 1) {
    toast.error("No changes was made!");
    return;
  }

  //Check if the first key in the keys array is "school" as this would mean that the user is trying to edit a qualification
  if (keys[0] === "editQualification") {
    let dataToUpdate = editQualificationSchema.safeParse(obj);
    if (!dataToUpdate.success) {
      let errorMessage = "";
      dataToUpdate.error.errors.forEach((issue) => {
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
  }

  //Check if the first key in the keys array is "company" as this would mean that the user is trying to edit an experience
  else if (keys[0] === "editExperience") {
    let dataToUpdate = editExperienceSchema.safeParse(obj);
    if (!dataToUpdate.success) {
      let errorMessage = "";
      dataToUpdate.error.errors.forEach((issue) => {
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

export const updatePassword = async (data) => {
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

  const dataToRegister = updateUserDbPasswordSchema.safeParse(data);
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
  const response = await updateUserDbPassword({ id: id, password: password });

  if (response) {
    toast.error("Update Failed, please try again!!", { duration: 5000 });
    return "Update Failed, please try again!";
  }

  toast.success("Update successful, You can log in now!", {
    duration: 5000,
  });
};

export const getUserLocation = () => {
  const response = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/")[1];
  return response;
};

export const sendUserMessage = async (data) => {
  // const dest_email = data.email;
  // const name = data.name;
  // const from = data.from;
  const dataToSend = sendMessageSchema.safeParse(data);
  if (!dataToSend.success) {
    let errorMessage = "";
    dataToSend.error.errors.forEach((issue) => {
      errorMessage =
        errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
    });
    toast.error(errorMessage, { duration: 5000 });
    return;
  }

  const response = await sendMessage(dataToSend.data);

  if (!response) {
    toast.error("Failed to send message, please try again!", {
      duration: 5000,
    });
    return null;
  }
  return response;
};

export const getUserMessagesUserSide = async (userId) => {
  const response = await getMessages(userId);
  if (!response) {
    toast.error("Failed to get messages, please try again!", {
      duration: 5000,
    });
    return null;
  }
  return response;
};
