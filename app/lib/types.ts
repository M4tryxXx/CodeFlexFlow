/**
 *
 * Account Types
 */

export interface CreateUserType {
  email: string;
  username: string;
  password: string;
  role?: string;
  reset_token?: string;
  reset_token_expiry?: Date;
  verified?: boolean;
  verified_at?: Date;
  verify_token?: string;
  verify_token_expiry?: Date;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
  lastLogin?: Date;
  lastLogin_from?: string;
}

export interface UserType {
  id: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
  reset_token?: string;
  reset_token_expiry?: Date;
  verified?: boolean;
  verified_at?: Date;
  verify_token?: string;
  verify_token_expiry?: Date;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
  lastLogin?: Date;
  lastLogin_from?: string;
}

export interface UserLogInType {
  id: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  lastLogin_from: string | null;
}

export interface NotificationType {
  user_id: string;
  notification?: string;
  type?: string;
  read?: boolean;
  created_at?: Date;
}

export interface SettingsType {
  user_id: string;
  setting?: string;
  value?: string;
  setting1?: string;
  value1?: string;
  setting2?: string;
  value2?: string;
  setting3?: string;
  value3?: string;
  setting4?: string;
  value4?: string;
  setting5?: string;
  value5?: string;
  updated_at?: Date;
}

/**
 * CV Types
 */

export interface PersonalInfoType {
  id?: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  age?: number;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  bio?: string;
  phone?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
  image?: string;
}

export interface CreateEducationType {
  user_id: string;
  school: string;
  city: string;
  degree: string;
  field: string;
  start_date: Date;
  description?: string;
  end_date?: Date;
  created_at?: Date;
  updated_at?: Date;
  image?: string;
}

export interface EditEducationType {
  id: string;
  user_id?: string;
  school?: string;
  degree?: string;
  field?: string;
  start_date?: Date;
  description?: string;
  end_date?: Date;
  created_at?: Date;
  updated_at?: Date;
  image?: string;
}

// export interface UpdateEducation {
//   id: string;
//   school?: string;
//   degree?: string;
//   field?: string;
//   start_date?: Date;
//   description?: string;
//   company_logo?: string;
//   end_date?: Date;
//   created_at?: Date;
//   updated_at?: Date;
// }

export interface ExperienceType {
  user_id: string;
  company: string;
  position: string;
  description?: string;
  company_logo?: string;
  working_now?: boolean;
  start_date: Date;
  end_date?: Date;
}

export interface EditExperienceType {
  id: string;
  company?: string;
  position?: string;
  start_date?: Date;
  description?: string;
  company_logo?: string;
  working_now?: boolean;
  end_date?: Date;
  updated_at?: Date;
}

// export interface UpdateExperience {
//   id: string;
//   company?: string;
//   position?: string;
//   start_date?: Date;
//   description?: string;
//   company_logo?: string;
//   end_date?: Date;
//   created_at?: Date;
//   updated_at?: Date;
// }

export interface SkillType {
  user_id: string;
  name?: string;
  description?: string;
  level?: number;
  created_at?: Date;
}

export interface InviteType {
  id: string;
  user_id: string;
  expires_at: Date;
  updated_at?: Date;
  user_userName?: string;
  destination_email: string;
  destination_name?: string;
  opened_at?: Date;
}

export interface UpdateInviteType {
  id: string;
  expires_at?: Date;
  updated_at?: Date;
  user_userName?: string;
  destination_email?: string;
  destination_name?: string;
  opened_at?: Date;
  opened?: boolean;
}

// export interface UpdateInvite {
//   id?: string;
// }

export interface SocialType {
  user_id: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
  twitch?: string;
  discord?: string;
  tiktok?: string;
  snapchat?: string;
}
