import { z } from 'zod';

const requiredStr: string = '필수 입력 항목입니다';
const phoneNumberRegex = new RegExp(/^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/);
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\]).{8,}$/
);

export const logInValidation = z.object({
  email: z
    .string()
    .min(1, { message: requiredStr })
    .email({ message: '잘못된 이메일 형식입니다' }),
  password: z.string().min(1, { message: requiredStr }),
  search: z.string(),
});

export const signUpValidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: requiredStr })
      .min(2, { message: '두 글자 이상이어야 합니다' }),
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
      .min(8, { message: '최소 8자 이상이어야 합니다' })
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
