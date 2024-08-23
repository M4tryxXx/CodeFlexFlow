import z from "zod";

export const editUserSchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
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
  stillWorking: z.string(),
});

export const editExperienceSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  company: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  description: z.string().optional(),
  stillWorking: z.string().optional(),
});
