import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Name must be provided";
        }

        if (typeof issue.input !== "string") {
          return "Name must be a string";
        }
      },
    })
    .trim()
    .nonempty("Name cannot be empty")
    .min(4, "Name must be at least 4 characters long")

    // Cannot start with a number
    .refine((value) => !/^\d/.test(value), {
      message: "Name cannot start with a number",
    })

    // Cannot be only numbers like "12345"
    .refine((value) => !/^\d+$/.test(value), {
      message: "Name cannot contain only numbers",
    }),

  email: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Email must be provided";
        }

        if (typeof issue.input !== "string") {
          return "Email must be a string";
        }
      },
    })
    .trim()
    .nonempty("Email cannot be empty")
    .email("Invalid email address"),

  password: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Password must be provided";
        }

        if (typeof issue.input !== "string") {
          return "Password must be a string";
        }
      },
    })
    .trim()
    .nonempty("Password cannot be empty")
    .min(8, "Password must be at least 8 character long."),

  role: z
    .string({
      error: (issue) => {
        if (typeof issue.input !== "string") {
          return "Role must be a string";
        }
      },
    })
    .trim()
    .nonempty("Role cannot be empty")
    .refine((value) => ["student", "teacher", "admin"].includes(value), {
      message: "Role must be student, teacher, or admin",
    })
    .optional()
    .default("student"),
});

export const updateUserSchema = z
  .object({
    name: z
      .string({
        error: (issue) => {
          if (typeof issue.input !== "string") {
            return "Name must be a string";
          }
        },
      })
      .trim()
      .nonempty("Name cannot be empty")
      .min(4, "Name must be at least 4 characters long")
      .refine((value) => !/^\d+$/.test(value), {
        message: "Name cannot contain only number",
      })
      .optional(),

    password: z
      .string({
        error: (issue) => {
          if (typeof issue.input !== "string") {
            return "Password must be string";
          }
        },
      })
      .trim()
      .nonempty("Password cannot be empty")
      .min(8, "Password must be at least 8 characters long")
      .optional(),

    role: z
      .string({
        error: (issue) => {
          if (typeof issue.input !== "string") {
            return "Role must be string";
          }
        },
      })
      .trim()
      .nonempty("Role cannot be empty")
      .refine((value) => ["student", "teacher", "admin"].includes(value), {
        message: "Role must be student , teacher or admin",
      })
      .optional(),
})
.refine(
    (data) =>
      data.name !== undefined ||
      data.password !== undefined ||
      data.role !== undefined,
    {
      message: "At least one field is mandatory",
    },
);
