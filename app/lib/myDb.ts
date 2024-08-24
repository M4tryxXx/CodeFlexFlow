"use server";

import prisma from "./prisma-cache";
import { sendWelcomeEmail } from "./mailer";

export const getUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    if (allUsers) {
      await prisma.$disconnect();
      return allUsers;
    }
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return "Something went wrong!";
  }
};

export const findUserResetToken = async (token: String | any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        resetToken: token,
      },
    });
    await prisma.$disconnect();
    return user;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
  }
};

export const findUserByEmail = async (email: String | any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    await prisma.$disconnect();
    return user;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
  }
};

export const findUserByUsername = async (username: String | any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user) {
      await prisma.$disconnect();
      return user;
    } else {
      await prisma.$disconnect();
      return null;
    }
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
  }
};

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  await prisma.$disconnect();
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const registerUserDb = async (data: any) => {
  try {
    const response = await prisma.user.create({
      data: data,
    });
    console.log(data);
    await prisma.$disconnect();
    return response;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return null;
  }
};

export const deleteUserById = async (id: string) => {
  await prisma.qualification.deleteMany({
    where: {
      userId: id,
    },
  });
  await prisma.experience.deleteMany({
    where: {
      userId: id,
    },
  });
  await prisma.invites.deleteMany({
    where: {
      userId: id,
    },
  });

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

export const deleteInviteById = async (id: string) => {
  try {
    await prisma.invites.deleteMany({
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

export const updateUser = async (data: any) => {
  const { id } = data;
  try {
    const response = await prisma.user.update({
      where: {
        id: id,
      },
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

export const updateInvite = async (data: any) => {
  const { id } = data;
  try {
    const response = await prisma.invites.update({
      where: {
        id: id,
      },
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

export const updateLogin = async (id: string, data: any) => {
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
    console.log(err);
    return null;
  }
};

export const getQualificationById = async (id: any) => {
  try {
    const result = await prisma.qualification.findMany({
      where: {
        userId: {
          equals: id,
        },
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return null;
  }
};

export const saveQualification = async (data: any) => {
  try {
    const result = await prisma.qualification.create({
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

export const updateQualification = async (data: any) => {
  const { id } = data;
  try {
    const response = await prisma.qualification.update({
      where: {
        id: id,
      },
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

export const deleteQualificationById = async (id: string) => {
  try {
    await prisma.qualification.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    return { err };
  }
};

export const deleteExperienceById = async (id: string) => {
  try {
    await prisma.experience.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return { err };
  }
};

export const getAllQualifications = async () => {
  try {
    const data = await prisma.qualification.findMany();
    await prisma.$disconnect();
    return data;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return null;
  }
};

export const saveExperience = async (data: any) => {
  try {
    const response = await prisma.experience.create({
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

export const updateExperience = async (data: any) => {
  const { id } = data;
  try {
    const response = await prisma.experience.update({
      where: {
        id: id,
      },
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

export const getExperienceById = async (id: any) => {
  try {
    const result = await prisma.experience.findMany({
      where: {
        userId: {
          equals: id,
        },
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return null;
  }
};

export const getAllExperience = async () => {
  try {
    const data = await prisma.experience.findMany();
    await prisma.$disconnect();
    return data;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return null;
  }
};

export const createInvitation = async (data: any) => {
  try {
    const response = await prisma.invites.create({
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

export const getAllInvites = async () => {
  try {
    const allInvites = await prisma.invites.findMany();
    await prisma.$disconnect();
    return allInvites;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return "Something went wrong!";
  }
};

export const inviteSerial = async () => {
  try {
    const response = await prisma.inviteId.findUnique({
      where: {
        name: "invite",
      },
    });
    await prisma.$disconnect();
    return response;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return null;
  }
};

export const updateSerial = async (data: any) => {
  try {
    const response = await prisma.inviteId.update({
      where: {
        name: "invite",
      },
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

export const getInvitesByUserId = async (id: any) => {
  try {
    const result = await prisma.invites.findMany({
      where: {
        userId: {
          equals: id,
        },
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return null;
  }
};

export const getInvitesById = async (id: any) => {
  try {
    const result = await prisma.invites.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    await prisma.$disconnect();
    console.log(err);
    return null;
  }
};

export interface User {
  id: string;
  username: string;
  password: string;
  lastLogin?: Date | null;
}
