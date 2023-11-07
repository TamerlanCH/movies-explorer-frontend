const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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