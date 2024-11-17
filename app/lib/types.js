// /**
//  *
//  * Account Types
//  */

// import { inter } from "../ui/fonts";

// // export interface UserFullType {
// //   id: string;
// //   email: string;
// //   username: string;
// //   password: string;
// //   role: string;
// //   reset_token: string;
// //   reset_token_expiry: Date;
// //   verified: boolean;
// //   verified_at: Date;
// //   verify_token: string;
// //   verify_token_expiry: Date;
// //   avatar: string;
// //   created_at: Date;
// //   updated_at: Date;
// //   lastLogin: Date;
// //   lastLogin_from: string;
// // }

// export interface CreateUserType {
//   email: string;
//   username: string;
//   password: string;
//   role?: string;
//   reset_token?: string;
//   reset_token_expiry?: Date;
//   verified?: boolean;
//   verified_at?: Date;
//   verify_token?: string;
//   verify_token_expiry?: Date;
//   avatar?: string;
//   created_at?: Date;
//   updated_at?: Date;
//   lastLogin?: Date;
//   lastLogin_from?: string;
// }

// export interface UserType {
//   id: string;
//   email?: string;
//   username?: string;
//   password?: string;
//   role?: string;
//   reset_token?: string;
//   reset_token_expiry?: Date;
//   verified?: boolean;
//   verified_at?: Date;
//   verify_token?: string;
//   verify_token_expiry?: Date;
//   avatar?: string;
//   created_at?: Date;
//   updated_at?: Date;
//   lastLogin?: Date;
//   lastLogin_from?: string;
// }

// export interface UserLogInType {
//   id: string;
//   username: string;
//   email: string;
//   password?: string;
//   role: string;
//   lastLogin_from: string | null;
// }

// export interface NotificationType {
//   user_id: string;
//   notification?: string;
//   type?: string;
//   read?: boolean;
//   created_at?: Date;
// }

// export interface SettingsType {
//   user_id: string;
//   setting?: string;
//   value?: string;
//   setting1?: string;
//   value1?: string;
//   setting2?: string;
//   value2?: string;
//   setting3?: string;
//   value3?: string;
//   setting4?: string;
//   value4?: string;
//   setting5?: string;
//   value5?: string;
//   updated_at?: Date;
// }

// /**
//  * CV Types
//  */

// export interface PersonalInfoType {
//   id?: string;
//   user_id: string;
//   first_name?: string;
//   last_name?: string;
//   age?: number;
//   city?: string;
//   state?: string;
//   country?: string;
//   zip?: string;
//   bio?: string;
//   phone?: string;
//   email?: string;
//   created_at?: Date;
//   updated_at?: Date;
//   image?: string;
// }

// export interface CreateEducationType {
//   user_id: string;
//   school: string;
//   city: string;
//   degree: string;
//   field: string;
//   start_date: Date;
//   description?: string;
//   end_date?: Date;
//   created_at?: Date;
//   updated_at?: Date;
//   image?: string;
// }

// export interface EditEducationType {
//   id: string;
//   user_id?: string;
//   school?: string;
//   degree?: string;
//   city?: string;
//   field?: string;
//   start_date?: Date;
//   description?: string;
//   end_date?: Date;
//   created_at?: Date;
//   updated_at?: Date;
//   image?: string;
// }

// // export interface UpdateEducation {
// //   id: string;
// //   school?: string;
// //   degree?: string;
// //   field?: string;
// //   start_date?: Date;
// //   description?: string;
// //   company_logo?: string;
// //   end_date?: Date;
// //   created_at?: Date;
// //   updated_at?: Date;
// // }

// export interface ExperienceType {
//   user_id: string;
//   company: string;
//   city: string;
//   position: string;
//   description?: string;
//   company_logo?: string;
//   working_now?: boolean;
//   start_date: Date;
//   end_date?: Date;
// }

// export interface EditExperienceType {
//   id: string;
//   company?: string;
//   city?: string;
//   position?: string;
//   start_date?: Date;
//   description?: string;
//   company_logo?: string;
//   working_now?: boolean;
//   end_date?: Date;
//   updated_at?: Date;
// }

// // export interface UpdateExperience {
// //   id: string;
// //   company?: string;
// //   position?: string;
// //   start_date?: Date;
// //   description?: string;
// //   company_logo?: string;
// //   end_date?: Date;
// //   created_at?: Date;
// //   updated_at?: Date;
// // }

// export interface SkillType {
//   user_id: string;
//   name?: string;
//   description?: string;
//   level?: number;
//   created_at?: Date;
// }

// export interface InviteType {
//   id: string;
//   user_id: string;
//   expires_at: Date;
//   updated_at?: Date;
//   user_userName?: string;
//   destination_email: string;
//   destination_name?: string;
//   opened_at?: Date;
// }

// export interface UpdateInviteType {
//   id: string;
//   expires_at?: Date;
//   updated_at?: Date;
//   user_userName?: string;
//   destination_email?: string;
//   destination_name?: string;
//   opened_at?: Date;
//   opened?: boolean;
// }

// // export interface UpdateInvite {
// //   id?: string;
// // }

// export interface SocialType {
//   user_id: string;
//   website?: string;
//   linkedin?: string;
//   twitter?: string;
//   facebook?: string;
//   instagram?: string;
//   github?: string;
//   youtube?: string;
//   twitch?: string;
//   discord?: string;
//   tiktok?: string;
//   snapchat?: string;
// }

// export interface PageProps {
//   params: {
//     user_viewId: string;
//   };
// }

// export interface Message {
//   id?: string;
//   from_user_id: string | null;
//   to_user_id: string;
//   subject: string;
//   message: string;
//   type?: string | null;
//   read: boolean | null;
//   created_at: Date;
//   from: string | null;
//   to: string | null;
// }

// export interface Skill {
//   id: string;
//   user_id: string;
//   name: string;
//   description: string | null;
//   level: number | null;
//   created_at: Date | null;
// }

// export interface Experience {
//   city: string | null;
//   company: string | null;
//   company_logo: string | null;
//   created_at: Date | null;
//   description: string | null;
//   end_date: Date | null;
//   field: string | null;
//   id: string;
//   position: string | null;
//   start_date: Date | null;
//   updated_at: Date | null;
//   user_id: string;
//   working_now: boolean | null;
// }

// export interface Education {
//   city: string | null;
//   created_at: Date | null;
//   degree: string | null;
//   description: string | null;
//   end_date: Date | null;
//   field: string | null;
//   id: string;
//   image: string | null;
//   school: string | null;
//   start_date: Date | null;
//   updated_at: Date | null;
//   user_id: string;
// }

// export interface Invite {
//   id: string;
//   user_id: string;
//   expires_at: Date;
//   user_userName: string | null;
//   destination_email: string | null;
//   at_company_name: string | null;
//   opened: boolean;
//   opened_at: Date | null;
// }

// export interface Notification {
//   id: string;
//   subject: string | null;
//   message: string;
//   from_user_id: string | null;
//   to_user_id: string;
//   from: string | null;
//   to: string | null;
//   created_at: Date;
//   read: boolean | null;
//   type: string | null;
// }

// export interface PersonalInfo {
//   age?: number | null;
//   bio?: string | null;
//   city?: string | null;
//   country?: string | null;
//   created_at?: Date | null;
//   email?: string | null;
//   first_name?: string | null;
//   id: string;
//   image?: string | null;
//   last_name?: string | null;
//   phone?: string | null;
//   state?: string | null;
//   updated_at?: Date | null;
//   user_id?: string | null;
//   zip?: string | null;
// }

// export interface Settings {
//   id: string;
//   setting: string | null;
//   setting1: string | null;
//   setting2: string | null;
//   setting3: string | null;
//   setting4: string | null;
//   setting5: string | null;
//   updated_at: Date | null;
//   user_id: string;
//   value: string | null;
//   value1: string | null;
//   value2: string | null;
//   value3: string | null;
//   value4: string | null;
//   value5: string | null;
// }

// export interface SocialMedia {
//   id: string;
//   user_id: string | null;
//   website: string | null;
//   linkedin: string | null;
//   twitter: string | null;
//   facebook: string | null;
//   instagram: string | null;
//   github: string | null;
//   youtube: string | null;
//   twitch: string | null;
//   discord: string | null;
//   tiktok: string | null;
//   snapchat: string | null;
// }

// export interface UserFullType {
//   id: string;
//   email: string;
//   username: string;
//   password: string;
//   role: string;
//   reset_token: string | null;
//   reset_token_expiry: Date | null;
//   verified: boolean;
//   verified_at: Date | null;
//   verify_token: string | null;
//   verify_token_expiry: Date | null;
//   avatar: string | null;
//   created_at: Date;
//   experiences: Experience[];
//   invites: Invite[];
//   lastLogin: Date | null;
//   lastLogin_from: string | null;
//   notifications: Notification[];
//   personal_info: PersonalInfo | null;
//   qualifications: Education[];
//   sent_notifications: Notification[];
//   settings: Settings | null;
//   skills: Skill[]; // Adjust the type as needed
//   social_media: SocialMedia | null;
//   updated_at: Date | null;
// }

// export interface ChatDataType {
//   messagesDb: Message[];
//   senderId: string;
//   limiter: number;
//   user: UserFullType;
//   messagesEndRef: any;
//   loadMoreMessages: any;
//   receiverId: string;
//   sender: string;
//   receiver: string;
//   parent_socket: any;
// }
