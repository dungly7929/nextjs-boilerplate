import { z } from "zod";

//Check if password and confirmPassword are the same

export const AuthCredentialsSignUpValidator = z
  .object({
    email: z.string().email({ message: "Email không được để trống" }),
    password: z
      .string()
      .min(6, {
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Mật khẩu phải có ít nhất một chữ cái viết hoa",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Mật khẩu phải có ít nhất một chữ cái viết thường",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Mật khẩu phải có ít nhất một chữ số",
      })
      .refine((password) => /[^A-Za-z0-9]/.test(password), {
        message: "Mật khẩu phải có ít nhất một ký tự đặc biệt",
      }),
    confirmpassword: z.string().min(1, {
      message: "Mật khẩu xác nhận không được để trống",
    }),
    fullname: z
      .string()
      .min(1, {
        message: "Tên không được để trống",
      })
      .max(15, {
        message: "Tên không được quá 15 ký tự",
      }),
    phonenumber: z
      .string()
      .min(10, {
        message: "Số điện thoại phải có ít nhất 10 số",
      })
      .max(15, {
        message: "Số điện thoại không được quá 15 số",
      }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    path: ["confirmPassword"], // specify the path to the field that this error message should be associated with
  });

export const AuthCredentialsSignInValidator = z.object({
  email: z.string().email({ message: "Email khổng được để trống" }),
  password: z.string().min(1, {
    message: "Mật khẩu không được để trống",
  }),
});

export type TAuthCredenialsSignUpValidator = z.infer<
  typeof AuthCredentialsSignUpValidator
>;
export type TAuthCredenialsSignInValidator = z.infer<
  typeof AuthCredentialsSignInValidator
>;
