/* eslint-disable no-console */

export default class ErrorRepository {
  constructor() {
    this.errorDescription = new Map();
  }

  add(code, description) {
    if (!Number.isInteger(code)) throw new Error('Неверный тип кода ошибки. Требуется целое число');
    if (!(typeof description === 'string' || description instanceof String)) throw new Error('Неверный тип описания ошибки. Требуется строка');
    if (!this.errorDescription.has(code)) this.errorDescription.set(code, description);
    else throw new Error('Код уже существует. Операция отменена');
  }

  translate(code) {
    return this.errorDescription.get(code) ? this.errorDescription.get(code) : 'Unknown error';
  }
}

try {
  const errorRepository = new ErrorRepository();
  errorRepository.add(1, 'Ответ сформирован');
  errorRepository.add(-2, 'Ошибка открытия файла на чтение');
  console.log(errorRepository.translate(1));
  console.log(errorRepository.translate(-2));
  console.log(errorRepository.translate(true));
  errorRepository.add();
} catch (error) {
  console.error(error.message);
}
