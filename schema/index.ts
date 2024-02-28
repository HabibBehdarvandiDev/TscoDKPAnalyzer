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

const ProductPost = z.object({
  product_name: z.string().min(3).max(22),
  dkp: z.number(),
  price: z.string(),
  product_category: z.enum(["MOUSE", "KEYBOARD", "HEADPHONE"]),
});

const ProductGetOne = z.object({
  id: z.string(),
  product_name: z.string().min(3).max(22),
  dkp: z.number(),
  price: z.string(),
  product_category: z.enum(["MOUSE", "KEYBOARD", "HEADPHONE"]),
  created_at: z.string(),
  updated_at: z.string(),
});

const ProductGetAll = z.array(ProductGetOne).nonempty();

export { UserLoginSchema, UserSignUpSchema, ProductPost };
