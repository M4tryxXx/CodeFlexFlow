"use server";

import prisma from "./prisma-cache";
import { sendWelcomeEmail } from "./mailer";
import {
  UserType,
  PersonalInfoType,
  EditEducationType,
  InviteType,
  UpdateInviteType,
  SocialType,
  CreateUserType,
  CreateEducationType,
} from "./types";

// Set debug to true to see the log messages in the console
const debug = true;

/**
 * Account querries
 *
 *
 * Create
 ************************
 *
 * @saveUserDb
 *
 * Register user to the database
 */

export const saveUserDb = async (data: CreateUserType) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query saveUserDb in myDb line 31... "
    );
  }
  try {
    const response = await prisma.user.create({
      data: data,
    });

    await prisma.user_personal_info.create({
      data: {
        user_id: response.id,
        email: data.email,
      },
    });

    await prisma.user_settings.create({
      data: {
        user_id: response.id,
      },
    });

    await prisma.user_socials.create({
      data: {
        user_id: response.id,
      },
    });

    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 *
 * Select
 *
 * @selectUserLogIn
 *
 *   Get user for log in *
 **/

export const selectUserLogIn = async (
  id?: string,
  email?: string,
  username?: string
) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query selectUserLogIn in myDb line 93... "
    );
  }

  try {
    let user;
    if (id) {
      if (debug) {
        console.log("selectUserLogIn id: ...");
      }
      user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          role: true,
          lastLogin_from: true,
        },
      });
    } else if (username) {
      if (debug) {
        console.log("selectUserLogIn username: ...");
      }
      user = await prisma.user.findUnique({
        where: {
          username: username,
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          role: true,
          lastLogin_from: true,
        },
      });
    } else if (email) {
      if (debug) {
        console.log("selectUserLogIn email: ...");
      }
      user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          role: true,
          lastLogin_from: true,
        },
      });
    }
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return user;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 *
 *
 * @selectUserAccount
 *
 *
 * Get user account by id or username or email from the database
 *
 *
 */
export const selectUserAccount = async (
  id?: string,
  email?: string,
  username?: string
) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query selectUserAccount in myDb line 192... "
    );
  }
  try {
    let user;
    if (id) {
      if (debug) console.log("selectUserAccount: id: ", id);
      user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          settings: true,
          notifications: true,
          sent_notifications: true,
        },
      });
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request completed in ${duration} ms`);
      }
      return user;
    } else if (username) {
      if (debug) console.log("selectUserAccount: username: ", username);
      user = await prisma.user.findUnique({
        where: {
          username: username,
        },
        include: {
          settings: true,
          notifications: true,
          sent_notifications: true,
        },
      });
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request completed in ${duration} ms`);
      }
      return user;
    } else if (email) {
      if (debug) console.log("selectUserAccount: email: ", email);
      user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          settings: true,
          notifications: true,
          sent_notifications: true,
        },
      });
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request completed in ${duration} ms`);
      }
      return user;
    }
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 *
 * @selectUserFullLoggedIn
 *
 *
 */

export const selectUserFull = async (
  id?: string,
  email?: string,
  username?: string
) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query selectUserFull in myDb line 287... "
    );
  }
  try {
    if (id) {
      if (debug) console.log("selectUserFull: id: ", id);

      let user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          settings: true,
          notifications: { orderBy: { created_at: "desc" } },
          sent_notifications: { orderBy: { created_at: "desc" } },
          personal_info: true,
          qualifications: { orderBy: { start_date: "desc" } },
          experiences: { orderBy: { start_date: "desc" } },
          skills: true,
          social_media: true,
          invites: true,
        },
      });
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request completed in ${duration} ms`);
      }

      return user;
    } else if (username) {
      if (debug) console.log("selectUserFull: username: ", username);
      let user = await prisma.user.findUnique({
        where: {
          username: username,
        },
        include: {
          settings: true,
          notifications: true,
          sent_notifications: true,
          personal_info: true,
          qualifications: { orderBy: { start_date: "desc" } },
          experiences: { orderBy: { start_date: "desc" } },
          skills: true,
          social_media: true,
          invites: true,
        },
      });
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request completed in ${duration} ms`);
      }
      return user;
    } else if (email) {
      if (debug) console.log("selectUserFull: email: ", email);
      let user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          settings: true,
          notifications: { orderBy: { created_at: "desc" } },
          sent_notifications: { orderBy: { created_at: "desc" } },
          personal_info: true,
          qualifications: { orderBy: { start_date: "desc" } },
          experiences: { orderBy: { start_date: "desc" } },
          skills: true,
          social_media: true,
          invites: true,
        },
      });
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request completed in ${duration} ms`);
      }
      return user;
    }
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

export const selectUsersFull = async () => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with request selectUsersFull in myDb line 392... "
    );
  }
  try {
    let user = await prisma.user.findMany({
      include: {
        personal_info: true,
        qualifications: true,
        experiences: true,
        skills: true,
        social_media: true,
        invites: true,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return user;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};
/**
 *
 *
 * @selectUserFullForCv
 *
 *
 */

export const selectUserCvFull = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query selectUserCvFull in myDb line 439... "
    );
  }
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        personal_info: true,
        qualifications: { orderBy: { start_date: "desc" } },
        experiences: { orderBy: { start_date: "desc" } },
        skills: true,
        social_media: true,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return user;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};
/**
 *
 *
 * @selectAllUsers
 *
 *
 * Get all users from the database, select {id, username, email, role}
 *
 *
 */
export const selectAllUsers = async () => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query selectAllUsers in myDb line 490... "
    );
  }
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        lastLogin: true,
      },
    });
    if (allUsers) {
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request completed in ${duration} ms`);
      }
      return allUsers;
    }
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return "Something went wrong!";
  }
};

/**
 *
 *
 * Update
 *
 * @resetPassword
 *
 *
 * Get User By Token for update password
 *
 *
 */
export const selectUserPasswordToken = async (token: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query selectUserPasswordToken in myDb line 544... "
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        reset_token: token,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role: true,
        reset_token: true,
        reset_token_expiry: true,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return user;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};
/**
 *
 *
 * Update
 *
 * @Update
 *
 *   Update user
 *
 *
 **/
export const updateUser = async (
  personalInfo?: PersonalInfoType,
  account?: UserType,
  social?: SocialType
) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query updateUser in myDb line 598... "
    );
  }
  if (personalInfo) {
    if (debug) console.log("Updating personal info: ", personalInfo);
    try {
      const response = await prisma.user_personal_info.update({
        where: {
          user_id: personalInfo.user_id,
        },
        data: personalInfo,
      });
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request completed in ${duration} ms`);
      }
      return response;
    } catch (err) {
      await prisma.$disconnect();
      //console.log(err);
      return null;
    }
  } else if (account) {
    if (debug) console.log("Updating account: ", account);
    try {
      const response = await prisma.user.update({
        where: {
          id: account.id,
        },
        data: account,
      });
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request completed in ${duration} ms`);
      }
      return response;
    } catch (err) {
      await prisma.$disconnect();
      //console.log(err);
      return null;
    }
  } else if (social) {
    if (debug) console.log("Updating social: ", social);
    try {
      const response = await prisma.user_socials.update({
        where: {
          user_id: social.user_id,
        },
        data: social,
      });
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request completed in ${duration} ms`);
      }
      return response;
    } catch (err) {
      await prisma.$disconnect();
      if (debug) {
        const endingRequest = Date.now(); // Record the end time
        const duration = endingRequest - startingRequest; // Calculate the duration
        console.log(`Request failed in ${duration} ms`);
        console.log(err);
      }
      return null;
    }
  }
};

/**
 *
 *
 *
 * Update User last login date
 *
 *
 */
export const updateUserDbOnLogin = async (data: UserType) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query updateUserDbOnLogin in myDb line 691... "
    );
  }
  const { id } = data;
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 * @deleteUser
 *
 * Delete user from the database
 *
 */
export const deleteUserById = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query deleteUserById in myDb line 734... "
    );
  }
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return "Something went wrong! ";
  }
};

/**
 *
 *
 * @deleteInviteById
 *
 *
 */

/**
 *
 *
 * @createInvite
 *
 *
 * Create invite for user
 *
 */

export const createInvite = async (data: InviteType) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query createInvite in myDb line 786... "
    );
  }
  try {
    const response = await prisma.user_invites.create({
      data: data,
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 *
 * @deleteInviteById
 *
 *
 */

export const deleteInvite = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query deleteInvite in myDb line 827... "
    );
  }
  try {
    await prisma.user_invites.deleteMany({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return "Something went wrong! ";
  }
};

/**
 *
 *
 * @updatenviteById
 *
 *
 */

export const updateInvite = async (data: UpdateInviteType) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query updateInvite in myDb line 869... "
    );
  }
  const { id } = data;
  try {
    const response = await prisma.user_invites.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 *
 * Because i dont want to use uuid or cuid for invitation id as i will try to implement sending a seriaal number to user it is usefull to have a serial number for invitations! It's temporary and will be removed in the future!
 *@returns serial number!
 *
 */

export const inviteSerial = async () => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query inviteSerial in myDb line 914... "
    );
  }

  try {
    const response = await prisma.invite_id.findUnique({
      where: {
        name: "invite",
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    throw "Something went wrong!";
  }
};

/**
 *
 * @param data {id: string}
 *
 * After sending the serial number to the user we need to update the serial number in the database to prevent sending the same serial number to another user!
 *
 * @returns
 */

export const updateSerial = async (data: any) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query updateSerial in myDb line 958... "
    );
  }
  try {
    const response = await prisma.invite_id.update({
      where: {
        name: "invite",
      },
      data: data,
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 *
 * @param id: string
 *
 *
 * Get invitation by user_id
 * @deprecated use getUserFull instead
 *
 */
export const getInvitesByuser_id = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query getInvitesByuser_id in myDb line 1004... "
    );
  }
  try {
    const result = await prisma.user_invites.findMany({
      where: {
        user_id: {
          equals: id,
        },
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return result;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 *
 * @param id: string
 *
 *
 * Get invitation by id
 *
 */

export const getInvitesById = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query getInvitesById in myDb line 1051... "
    );
  }
  try {
    const result = await prisma.user_invites.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return result;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};
//
//
//Qualifications
/**
 *
 *
 * @param id: string
 *
 *
 * Get qualifications by id string
 *
 */

export const selectQualifications = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query selectQualifications in myDb line 1098... "
    );
  }
  try {
    const result = await prisma.user_qualifications.findMany({
      where: {
        user_id: {
          equals: id,
        },
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return result;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 * @param data
 *
 * @returns
 *
 */

export const saveQualification = async (data: CreateEducationType) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query saveQualification in myDb line 1143... "
    );
  }
  try {
    const result = await prisma.user_qualifications.create({
      data: data,
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return result;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 * @param data
 *
 * @returns
 *
 */

export const updateQualification = async (data: EditEducationType) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query updateQualification in myDb line 1183... "
    );
  }
  const { id } = data;
  try {
    const response = await prisma.user_qualifications.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();

    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 * @param id
 *
 * @returns
 *
 */

export const deleteQualificationById = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query deleteQualificationById in myDb line 1229... "
    );
  }
  try {
    const result = await prisma.user_qualifications.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return result;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 * @param id
 *
 * @returns
 *
 */

export const deleteExperienceById = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query deleteExperienceById in myDb line 1272... "
    );
  }
  try {
    const result = await prisma.user_experiences.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return result;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 *
 * @returns
 *
 *
 */

export const getAllQualifications = async () => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query getAllQualifications in myDb line 1315... "
    );
  }
  try {
    const data = await prisma.user_qualifications.findMany();
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return data;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};
//--------------------------------
//Experiences
/**
 *
 * @param data
 *
 * @returns
 *
 */

export const saveExperience = async (data: any) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query saveExperience in myDb line 1355... "
    );
  }
  try {
    const response = await prisma.user_experiences.create({
      data: data,
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 * @param data
 *
 *
 * @returns
 */

export const updateExperience = async (data: any) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query updateExperience in myDb line 1394... "
    );
  }
  const { id } = data;
  try {
    const response = await prisma.user_experiences.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 * @param id
 *
 * @returns
 *
 */

export const getExperienceById = async (id: any) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query getExperienceById in myDb line 1437... "
    );
  }
  try {
    const result = await prisma.user_experiences.findMany({
      where: {
        user_id: {
          equals: id,
        },
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return result;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 * @returns
 *
 *
 */

export const getAllExperience = async () => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query getAllExperience in myDb line 1479... "
    );
  }
  try {
    const data = await prisma.user_experiences.findMany();
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return data;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

//  CV invitation
/**
 *
 * @param data
 *
 * @returns
 *
 */

export const createInvitation = async (data: any) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query createInvitation in myDb line 1517... "
    );
  }
  try {
    const response = await prisma.user_invites.create({
      data: data,
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

/**
 *
 * @param data
 *
 * @returns
 *
 */

export const getAllInvites = async () => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query getAllInvites in myDb line 1556... "
    );
  }
  try {
    const allInvites = await prisma.user_invites.findMany();
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return allInvites;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return "Something went wrong!";
  }
};

export const updateUserLast = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query updateUserLast in myDb line 1585... "
    );
  }
  try {
    await prisma.user_personal_info.create({
      data: {
        user_id: id,
      },
    });
    await prisma.user_settings.create({
      data: {
        user_id: id,
      },
    });
    await prisma.user_socials.create({
      data: {
        user_id: id,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return null;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

export const getQualificationById = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query getQualificationById in myDb line 1628... "
    );
  }
  try {
    const result = await prisma.user_qualifications.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return result;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

export const getInboxNotifications = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query getInboxNotifications in myDb line 1663... "
    );
  }
  try {
    const result = await prisma.user_notifications.findMany({
      where: {
        to_user_id: id,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return result;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return [];
  }
};

export const getConversation = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query getConversation in myDb line 1698... "
    );
  }
  try {
    const result = await prisma.user_notifications.findMany({
      where: {
        OR: [
          {
            to_user_id: {
              equals: id,
            },
          },
          { from_user_id: { equals: id } },
        ],
      },
      orderBy: {
        created_at: "asc",
      },
    });

    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return result;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return [];
  }
};

export const send_message = async (data: any) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query send_message in myDb line 1744... "
    );
  }
  try {
    const response = await prisma.user_notifications.create({
      data: data,
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

export const mark_message = async (userId: string, messageIds: string[]) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query mark_message in myDb line 1777... "
    );
  }
  try {
    const response = await prisma.user_notifications.updateMany({
      where: {
        to_user_id: userId,
        id: {
          in: messageIds,
        },
        read: false,
      },
      data: {
        read: true,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};

export const delete_message = async (id: string) => {
  const startingRequest = Date.now(); // Record the start time
  if (debug) {
    const startTime = new Date(startingRequest);
    const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()}`;
    console.log(
      formattedTime,
      " : Connecting to the database with query delete_message in myDb line 1819...  "
    );
  }
  try {
    const response = await prisma.user_notifications.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request completed in ${duration} ms`);
    }
    return response;
  } catch (err) {
    await prisma.$disconnect();
    if (debug) {
      const endingRequest = Date.now(); // Record the end time
      const duration = endingRequest - startingRequest; // Calculate the duration
      console.log(`Request failed in ${duration} ms`);
      console.log(err);
    }
    return null;
  }
};
