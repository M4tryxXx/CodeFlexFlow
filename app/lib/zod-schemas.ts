import z from "zod";

export const editUserSchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  age: z.number().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
  username: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  mobile: z.string().optional(),
  zip: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  github: z.string().optional(),
  youtube: z.string().optional(),
  twitch: z.string().optional(),
  discord: z.string().optional(),
  address2: z.string().optional(),
  street: z.string().optional(),
  house: z.string().optional(),
});

export const verifyEmailSchema = z.object({ email: z.string().email().min(5) });
export const verifyUsernameSchema = z.object({
  username: z.string().min(3),
});

export const verifyInvitationSchema = z.object({
  Invitation: z.string().min(8).startsWith("CV-"),
});

export const registerUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().min(3),
  password: z.string().min(8),
  email: z.string().email().min(5),
});

export const updateUserPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export const addQualificationSchema = z.object({
  name: z.string().min(3),
  city: z.string().min(3),
  qualification: z.string().min(3),
  from: z.string(),
  to: z.string().optional(),
  description: z.string().optional(),
  userId: z.string(),
});
export const editQualificationSchema = z.object({
  name: z.string().optional(),
  city: z.string().optional(),
  qualification: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  description: z.string().optional(),
  id: z.string(),
});

export const addExperienceSchema = z.object({
  userId: z.string(),
  title: z.string().min(3),
  company: z.string().min(3),
  from: z.string(),
  to: z.string().optional(),
  description: z.string().optional(),
  stillWorking: z.string().optional(),
});

export const editExperienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  from: z.string(),
  to: z.string().optional(),
  description: z.string().optional(),
  stillWorking: z.string().optional(),
});
