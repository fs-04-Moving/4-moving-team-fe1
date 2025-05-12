import { z } from 'zod';

const requiredStr: string = '필수 입력 항목입니다';
const phoneNumberRegex = new RegExp(/^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/);
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\]).{8,}$/,
);
const isNumberRegex = /^[0-9]*$/; // 숫자만 체크

export const logInValidation = z.object({
  email: z.string().min(1, { message: requiredStr }).email({ message: '잘못된 이메일 형식입니다' }),
  password: z
    .string()
    .min(1, { message: requiredStr })
    .min(8, { message: '8자 이상이어야 합니다' })
    .regex(passwordRegex, '영문/숫자/특수문자를 모두 포함해야 합니다'),
});

export const signUpValidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: requiredStr })
      .min(2, { message: '2자 이상이어야 합니다' }),
    email: z
      .string()
      .min(1, { message: requiredStr })
      .email({ message: '잘못된 이메일 형식입니다' }),
    phoneNumber: z
      .string()
      .min(1, { message: requiredStr })
      .regex(phoneNumberRegex, '잘못된 전화번호 형식입니다'),
    password: z
      .string()
      .min(1, { message: requiredStr })
      .min(8, { message: '8자 이상이어야 합니다' })
      .regex(passwordRegex, '영문/숫자/특수문자를 모두 포함해야 합니다'),
    passwordConfirm: z.string(),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom, // code: 'custom'으로 적어도 무방
        message: '비밀번호가 일치하지 않습니다',
        path: ['passwordConfirm'], // 에러 메시지가 표시될 위치 지정(여러 곳에서 메시지를 표시하려면 addIssue를 추가)
      });
    }
  });

export const createWorkerProfileValiation = z.object({
  profileImage: z.instanceof(File).nullable().optional(),
  nickname: z
    .string()
    .trim()
    .min(1, { message: requiredStr })
    .min(2, { message: '2자 이상이어야 합니다' }),
  experience: z.string().regex(isNumberRegex, '숫자만 입력해야 합니다'),
  summary: z
    .string()
    .trim()
    .min(1, { message: requiredStr })
    .min(10, { message: '10자 이상이어야 합니다' })
    .max(30, { message: '30자 이내여야 합니다' }),
  description: z
    .string()
    .trim()
    .min(1, { message: requiredStr })
    .min(10, { message: '10자 이상이어야 합니다' })
    .max(300, { message: '300자 이내여야 합니다' }),
});

export const editCustomerInfoValidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: requiredStr })
      .min(2, { message: '2자 이상이어야 합니다' }),
    email: z
      .string()
      .min(1, { message: requiredStr })
      .email({ message: '잘못된 이메일 형식입니다' }),
    phoneNumber: z
      .string()
      .min(1, { message: requiredStr })
      .regex(phoneNumberRegex, '잘못된 전화번호 형식입니다'),
    password: z
      .string()
      .min(1, { message: requiredStr })
      .min(8, { message: '8자 이상이어야 합니다' })
      .regex(passwordRegex, '영문/숫자/특수문자를 모두 포함해야 합니다'),
    newPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: '8자 이상이어야 합니다',
      })
      .refine((val) => !val || passwordRegex.test(val), {
        message: '영문/숫자/특수문자를 모두 포함해야 합니다',
      }),

    newPasswordConfirm: z.string().optional(),
  })
  .refine(({ newPassword, newPasswordConfirm }) => newPassword === newPasswordConfirm, {
    path: ['newPasswordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });
