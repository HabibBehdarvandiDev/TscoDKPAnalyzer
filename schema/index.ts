import { z } from "zod";

const UserLoginSchema = z.object({
  username: z.string().min(3).max(22),
  password: z.string().min(8).max(50),
});

const UserSignUpSchema = z.object({
  first_name: z.string().min(3).max(22),
  last_name: z.string().min(3).max(22),
  role: z.enum(["EMPLOYEE", "MANAGER", "DEVELOPER", "CEO"]),
  username: z.string().min(3).max(22),
  password: z.string().min(8).max(50),
});

export { UserLoginSchema, UserSignUpSchema };
