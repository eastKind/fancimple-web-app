export const validate = (key: string, value: string) => {
  const result = {
    [key]: "",
  };

  switch (key) {
    case "name":
      if (!/^[가-힣a-zA-Z0-9_.]{2,16}$/.test(value)) {
        result.name = "문자,숫자,밑줄 및 마침표 2~16자를 입력해주세요.";
      }
      break;
    case "email":
      if (
        !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
          value
        )
      ) {
        result.email = "올바른 이메일 주소가 아닙니다.";
      }
      break;
    case "password":
      if (!/(?=.*\d)(?=.*[a-zA-ZS]).{8,}/.test(value)) {
        result.password = "영문,숫자 조합 8자이상 입력해주세요.";
      }
      break;
  }

  return result;
};

export const validatePw = (password: string, password2: string) => {
  return {
    password2: password === password2 ? "" : "비밀번호가 일치하지 않습니다.",
  };
};
