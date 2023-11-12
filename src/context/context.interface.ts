import { Context } from "telegraf";
export interface SessionData {
  step: string;
  id?: string;
  phone_number?: string;
  name?: string;
  surname: string;
  organization?: string;
}

export interface IBotContext extends Context {
  session: SessionData;
}
