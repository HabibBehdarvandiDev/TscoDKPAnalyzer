import { z } from "zod";

const UserSchema = z.object({
  username: z.string().min(3).max(22),
  password: z.string().min(8).max(50),
});

export { UserSchema };
