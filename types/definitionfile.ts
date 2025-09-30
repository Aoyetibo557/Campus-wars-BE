import { Request } from "express";
import type { User, Profile } from "./database";

// TODO: fix this late to use the user (profiles table type)
export interface IGetUserAuthInfoRequest extends Request {
  user?: Partial<Profile>;
}
