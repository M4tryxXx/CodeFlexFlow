import z from "zod";

export const editUserSchema = z.object({
  id: z.string(),
  password: z.string().optional(),
  role: z.string().optional(),
  reset_token: z.string().optional(),
  reset_token_expiry: z.date().optional(),
  verified: z.boolean().optional(),
  verified_at: z.date().optional(),
  verify_token: z.string().optional(),
  verify_token_expiry: z.date().optional(),
  avatar: z.string().optional(),
  updated_at: z.date(),
  lastLogin: z.date().optional(),
  lastLogin_from: z.string().optional(),
});

export const PersonalInfoSchema = z.object({
  user_id: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  age: z.number().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zip: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  updated_at: z.date().optional(),
  image: z.string().optional(),
});

export const verifyEmailSchema = z.object({ email: z.string().email().min(5) });
export const verifyUsernameSchema = z.object({
  username: z.string().min(3),
});

export const verifyInvitationSchema = z.object({
  Invitation: z.string().min(8).startsWith("CV-"),
});

export const registerUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
  email: z.string().email().min(5),
});

export const updateUserDbPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export const addQualificationSchema = z.object({
  user_id: z.string(),
  school: z.string().min(3),
  city: z.string().min(3),
  degree: z.string().optional(),
  field: z.string().min(3),
  start_date: z.date(),
  end_date: z.date().optional(),
  description: z.string().optional(),
  updated_at: z.date().optional(),
});
export const editQualificationSchema = z.object({
  id: z.string(),
  school: z.string().optional(),
  city: z.string().optional(),
  degree: z.string().optional(),
  field: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  description: z.string().optional(),
  updated_at: z.date(),
});

export const addExperienceSchema = z.object({
  user_id: z.string(),
  position: z.string(),
  company: z.string(),
  city: z.string(),
  start_date: z.date(),
  end_date: z.date().optional(),
  field: z.string().optional(),
  description: z.string().optional(),
  working_now: z.boolean().optional(),
  company_logo: z.string().optional(),
});

export const editExperienceSchema = z.object({
  id: z.string(),
  position: z.string().optional(),
  field: z.string().optional(),
  company: z.string().optional(),
  city: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  description: z.string().optional(),
  working_now: z.boolean().optional(),
  company_logo: z.string().optional(),
});

export const EditSocialData = z.object({
  user_id: z.string(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  github: z.string().optional(),
  youtube: z.string().optional(),
  twitch: z.string().optional(),
  discord: z.string().optional(),
  snapchat: z.string().optional(),
  tiktok: z.string().optional(),
  updated_at: z.date(),
});

export const sendMessageSchema = z.object({
  subject: z.string().min(3),
  message: z.string().min(3),
  from_user_id: z.string().optional(),
  to_user_id: z.string(),
  from: z.string(),
});
