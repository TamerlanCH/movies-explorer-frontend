const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regexName = /^[a-zA-Zа-яА-Я\sё-]+$/;

export function validateEmail(email) {

  if (email !== undefined) {
    if (email.length === 0) {
      return { invalid: true, message: 'Заполните это поле.' };

    } else if (!emailRegex.test(email.toLowerCase())) {
      return { invalid: true, message: 'Email имеет неверный формат' };
    } else if (emailRegex.test(email.toLowerCase())) {
      return { invalid: false, message: '' };
    }
  } else {
    return { invalid: true, message: '' };
  }
}

export function validateName(name) {
  if (name !== undefined) {
    if (name.length === 0) {
      return { invalid: true, message: 'Это поле не должно быть пустым!' };
    } else if (!regexName.test(name.toLowerCase())) {
      return {
        invalid: true,
        message:
          'Имя должно содержать только латиницу, кириллицу, пробел или дефис!'
      };
    } else if (regexName.test(name.toLowerCase())) {
      return { invalid: false, message: '' };
    }
  } else {
    return { invalid: true, message: '' };
  }
}