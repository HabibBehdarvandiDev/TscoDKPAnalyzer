type Product = {
  id: number;
  product_name: string;
  dkp: number;
  price: bigint;
  product_category: ProductCategory;
  created_at: Date;
  updated_at: Date;
};

enum ProductCategory {
  MOUSE = "MOUSE",
  KEYBOARD = "KEYBOARD",
  HEADPHONE = "HEADPHONE",
}

type User = {
  id: number;
  first_name: string;
  last_name: string;
  role: UserRole;
  actions?: any;
  username: string;
  password: string;
  password_hashed: string;
};

enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  DEVELOPER = "DEVELOPER",
  CEO = "CEO",
}
