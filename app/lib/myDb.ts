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
    return response;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    let user;
    if (id) {
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
    return user;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
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
  try {
    let user;
    if (id) {
      user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          settings: true,
          notifications: true,
        },
      });
    } else if (username) {
      user = await prisma.user.findUnique({
        where: {
          username: username,
        },
        include: {
          settings: true,
          notifications: true,
        },
      });
    } else if (email) {
      user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          settings: true,
          notifications: true,
        },
      });
    }
    await prisma.$disconnect();
    return user;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
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
  try {
    if (id) {
      let user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          settings: true,
          notifications: true,
          personal_info: true,
          qualifications: true,
          experiences: true,
          skills: true,
          social_media: true,
          invites: true,
        },
      });
      await prisma.$disconnect();

      return user;
    } else if (username) {
      let user = await prisma.user.findUnique({
        where: {
          username: username,
        },
        include: {
          settings: true,
          notifications: true,
          personal_info: true,
          qualifications: true,
          experiences: true,
          skills: true,
          social_media: true,
          invites: true,
        },
      });
      await prisma.$disconnect();
      return user;
    } else if (email) {
      let user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          settings: true,
          notifications: true,
          personal_info: true,
          qualifications:  {orderBy: {start_date: 'desc'}},
          experiences:  {orderBy: {start_date: 'desc'}},
          skills: true,
          social_media: true,
          invites: true,
        },
      });
      await prisma.$disconnect();
      return user;
    }
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return null;
  }
};

export const selectUsersFull = async () => {
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

    return user;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
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
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        personal_info: true,
        qualifications: {orderBy: {start_date: 'desc'}},
        experiences: {orderBy: { start_date: 'desc'}},
        skills: true,
        social_media: true,
      },
    });
    await prisma.$disconnect();
    return user;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
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
      return allUsers;
    }
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
    return user;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
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
  if (personalInfo) {
    try {
      const response = await prisma.user_personal_info.update({
        where: {
          user_id: personalInfo.user_id,
        },
        data: personalInfo,
      });
      await prisma.$disconnect();
      return response;
    } catch (err) {
      await prisma.$disconnect();
      //console.log(err);
      return null;
    }
  } else if (account) {
    try {
      const response = await prisma.user.update({
        where: {
          id: account.id,
        },
        data: account,
      });
      await prisma.$disconnect();
      return response;
    } catch (err) {
      await prisma.$disconnect();
      //console.log(err);
      return null;
    }
  } else if (social) {
    try {
      const response = await prisma.user_socials.update({
        where: {
          user_id: social.user_id,
        },
        data: social,
      });
      await prisma.$disconnect();
      return response;
    } catch (err) {
      await prisma.$disconnect();
      //console.log(err);
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
  const { id } = data;
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
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
  try {
    const response = await prisma.user_invites.create({
      data: data,
    });
    await prisma.$disconnect();
    return response;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    await prisma.user_invites.deleteMany({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  const { id } = data;
  try {
    const response = await prisma.user_invites.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();
    return response;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const response = await prisma.invite_id.findUnique({
      where: {
        name: "invite",
      },
    });
    await prisma.$disconnect();
    return response;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const response = await prisma.invite_id.update({
      where: {
        name: "invite",
      },
      data: data,
    });
    await prisma.$disconnect();
    return response;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const result = await prisma.user_invites.findMany({
      where: {
        user_id: {
          equals: id,
        },
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const result = await prisma.user_invites.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const result = await prisma.user_qualifications.findMany({
      where: {
        user_id: {
          equals: id,
        },
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const result = await prisma.user_qualifications.create({
      data: data,
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
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
  const { id } = data;
  try {
    const response = await prisma.user_qualifications.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();
    return response;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const result = await prisma.user_qualifications.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
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
  try {
    const result = await prisma.user_experiences.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const data = await prisma.user_qualifications.findMany();
    await prisma.$disconnect();
    return data;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const response = await prisma.user_experiences.create({
      data: data,
    });
    await prisma.$disconnect();
    return response;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
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
  const { id } = data;
  try {
    const response = await prisma.user_experiences.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();
    return response;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const result = await prisma.user_experiences.findMany({
      where: {
        user_id: {
          equals: id,
        },
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const data = await prisma.user_experiences.findMany();
    await prisma.$disconnect();
    return data;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
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
  try {
    const response = await prisma.user_invites.create({
      data: data,
    });
    await prisma.$disconnect();
    return response;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
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
  try {
    const allInvites = await prisma.user_invites.findMany();
    await prisma.$disconnect();
    return allInvites;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
    return "Something went wrong!";
  }
};

export const updateUserLast = async (id: string) => {
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
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
  }

  await prisma.$disconnect();
};

export const getQualificationById = async (id: string) => {
  try {
    const result = await prisma.user_qualifications.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    //console.log(err);
    return null;
  }
}