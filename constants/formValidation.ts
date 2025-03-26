const email = {
  required: '필수 입력 항목입니다',
  pattern: {
    value:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    message: '잘못된 이메일 형식입니다',
  },
};

const password = {
  required: '필수 입력 항목입니다',
  minLength: {
    value: 8,
    message: '비밀번호를 8자 이상 입력해 주세요',
  },
};

const text = {
  required: '필수 입력 항목입니다',
};

const defaultRules = {
  email,
  password,
  text,
};

export default defaultRules;
