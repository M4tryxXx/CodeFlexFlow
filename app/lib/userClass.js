import { selectUserFull } from "./myDb";
import { Message, UserFullType, Education, Experience, Skill } from "./types";

class UserDataObj {
  userId;
  user = null;
  experiences = [];
  qualifications = [];
  messages = [];
  inbox = [];
  outbox = [];
  skills = [];

  constructor(userId) {
    this.userId = userId;
  }

  async userInit(userId) {
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

  async stateUpdateUser() {
    const user = await selectUserFull(this.userId);
    this.user = user ?? null;
    return this.user;
  }

  getExperiences() {
    if (!this.user) {
      return [];
    }
    return this.experiences;
  }

  getQualifications() {
    if (!this.user) {
      return [];
    }
    return this.qualifications;
  }

  getMessages() {
    if (!this.user) {
      return [];
    }
    return this.messages;
  }

  getInbox() {
    if (!this.user) {
      return [];
    }
    return this.inbox;
  }

  getOutbox() {
    if (!this.user) {
      return [];
    }
    return this.outbox;
  }

  getSkills() {
    if (!this.user) {
      return [];
    }
    return this.skills;
  }

  getAvatar() {
    if (!this.user) {
      return null;
    }
    return this.user?.avatar ?? null;
  }

  getRole() {
    if (!this.user) {
      return null;
    }
    return this.user?.role ?? null;
  }

  getFullname() {
    if (!this.user) {
      return null;
    }
    return this.user
      ? `${this.user?.personal_info?.first_name} ${this.user?.personal_info?.last_name}`
      : null;
  }
}

export default UserDataObj;
