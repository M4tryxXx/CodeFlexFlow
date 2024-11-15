import { selectUserFull } from "./myDb";
import { Message, UserFullType, Education, Experience, Skill } from "./types";

class UserDataObj {
  private userId: string;
  private user: UserFullType | null = null;
  private experiences: Experience[] | [] = [];
  private qualifications: Education[] | [] = [];
  private messages: Message[] | [] = [];
  private inbox: Message[] | [] = [];
  private outbox: Message[] | [] = [];
  private skills: Skill[] | [] = [];

  constructor(userId: string) {
    this.userId = userId;
  }

  async userInit(userId: string) {
    if (!this.user) {
      const user = await selectUserFull(userId);
      this.user = user ?? null;
      this.experiences = user?.experiences ?? [];
      this.qualifications = user?.qualifications ?? [];
      this.messages =
        user?.notifications.concat(user?.sent_notifications) ?? [];
      this.inbox = user?.notifications ?? [];
      this.outbox = user?.sent_notifications ?? [];
      this.skills = user?.skills ?? [];
    }
  }

  async stateUpdateUser(): Promise<UserFullType | null> {
    const user = await selectUserFull(this.userId);
    this.user = user ?? null;
    return this.user;
  }

  getExperiences(): Experience[] | [] {
    if (!this.user) {
      return [];
    }
    return this.experiences;
  }

  getQualifications(): Education[] | [] {
    if (!this.user) {
      return [];
    }
    return this.qualifications;
  }

  getMessages(): Message[] | [] {
    if (!this.user) {
      return [];
    }
    return this.messages;
  }

  getInbox(): Message[] | [] {
    if (!this.user) {
      return [];
    }
    return this.inbox;
  }

  getOutbox(): Message[] | [] {
    if (!this.user) {
      return [];
    }
    return this.outbox;
  }

  getSkills(): Skill[] | [] {
    if (!this.user) {
      return [];
    }
    return this.skills;
  }

  getAvatar(): string | null {
    if (!this.user) {
      return null;
    }
    return this.user?.avatar ?? null;
  }

  getRole(): string | null {
    if (!this.user) {
      return null;
    }
    return this.user?.role ?? null;
  }

  getFullname(): string | null {
    if (!this.user) {
      return null;
    }
    return this.user
      ? `${this.user?.personal_info?.first_name} ${this.user?.personal_info?.last_name}`
      : null;
  }
}

export default UserDataObj;
