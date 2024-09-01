/**
 *
 * Account Types
 */

export interface CreateUser {
  email: string;
  username: string;
  password: string;
  role: string | undefined;
  reset_token: string | undefined;
  reset_token_expiry: Date | undefined;
  verified: boolean | undefined;
  verified_at: Date | undefined;
  verify_token: string | undefined;
  verify_token_expiry: Date | undefined;
  avatar: string | undefined;
  created_at: Date | undefined;
  updated_at: Date | undefined;
  lastLogin: Date | undefined;
  lastLogin_from: string | undefined;
}

export interface updateUserDb {
  id: string;
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  role: string | undefined;
  reset_token: string | undefined;
  reset_token_expiry: Date | undefined;
  verified: boolean | undefined;
  verified_at: Date | undefined;
  verify_token: string | undefined;
  verify_token_expiry: Date | undefined;
  avatar: string | undefined;
  created_at: Date | undefined;
  updated_at: Date | undefined;
  lastLogin: Date | undefined;
  lastLogin_from: string | undefined;
}

export interface UpdateUserOnLog {
  id: string;
  lastLogin: Date;
  lastLogin_from: string;
}

export interface SelectUserLogIn {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface CreateNotification {
  user_id: string;
  notification: string;
  type: string;
  read: boolean | undefined;
  created_at: Date;
}

export interface UpdateNotification {
  read: boolean;
}

export interface UserSettings {
  user_id: string;
  setting: string | undefined;
  value: string | undefined;
  setting1: string | undefined;
  value1: string | undefined;
  setting2: string | undefined;
  value2: string | undefined;
  setting3: string | undefined;
  value3: string | undefined;
  setting4: string | undefined;
  value4: string | undefined;
  setting5: string | undefined;
  value5: string | undefined;
  updated_at: Date | undefined;
}

/**
 * CV Types
 */

export interface PersonalInfo {
  user_id: string;
  first_name: string | undefined;
  last_name: string | undefined;
  age: number | undefined;
  city: string | undefined;
  state: string | undefined;
  country: string;
  zip: string | undefined;
  bio: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  created_at: Date | undefined;
  updated_at: Date | undefined;
  image: string | undefined;
}

export interface CreateEducation {
  user_id: string;
  school: string;
  degree: string;
  field: string;
  start_date: Date;
  description: string | undefined;
  end_date: Date | undefined;
  created_at: Date | undefined;
  updated_at: Date | undefined;
}

export interface UpdateEducation {
  id: string;
  school: string | undefined;
  degree: string | undefined;
  field: string | undefined;
  start_date: Date | undefined;
  description: string | undefined;
  company_logo: string | undefined;
  end_date: Date | undefined;
  created_at: Date | undefined;
  updated_at: Date | undefined;
}

export interface CreateExperience {
  user_id: string;
  company: string;
  position: string;
  start_date: Date;
  description: string | undefined;
  company_logo: string | undefined;
  end_date: Date | undefined;
  created_at: Date | undefined;
  updated_at: Date | undefined;
}

export interface UpdateExperience {
  id: string;
  company: string | undefined;
  position: string | undefined;
  start_date: Date | undefined;
  description: string | undefined;
  company_logo: string | undefined;
  end_date: Date | undefined;
  created_at: Date | undefined;
  updated_at: Date | undefined;
}

export interface SkillData {
  user_id: string;
  name: string;
  description: string | undefined;
  level: number | undefined;
  created_at: Date | undefined;
}

export interface CreateInvite {
  id: string;
  user_id: string;
  expires_at: Date;
  updated_at: Date | undefined;
  user_userName: string | undefined;
  destination_email: string;
  destination_name: string | undefined;
}

export interface UpdateInvite {
  id: string;
  opened_at: Date | undefined;
  opened: boolean | undefined;
}

export interface SocialData {
  user_id: String;
  website: string | undefined;
  linkedin: string | undefined;
  twitter: string | undefined;
  facebook: string | undefined;
  instagram: string | undefined;
  github: string | undefined;
  youtube: string | undefined;
  twitch: string | undefined;
  discord: string | undefined;
  tiktok: string | undefined;
  snapchat: string | undefined;
}
