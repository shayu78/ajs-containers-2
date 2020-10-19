import ErrorRepository from '../app';

test('class ErrorRepository instanceof', () => {
  expect(new ErrorRepository()).toBeInstanceOf(ErrorRepository);
});

describe('ErrorRepository methods', () => {
  const errorRepository = new ErrorRepository();

  test('ErrorRepository add', () => {
    errorRepository.add(0, '000');
    expect(Array.from(errorRepository.errorDescription)).toEqual(expect.arrayContaining([
      [0, '000'],
    ]));
    expect(errorRepository.errorDescription.has(0)).toEqual(true);
  });

  test('ErrorRepository add value - throw (no value)', () => {
    expect(() => {
      errorRepository.add();
    }).toThrowError(Error);
  });

  test('ErrorRepository add value - throw (incorrect code type)', () => {
    expect(() => {
      errorRepository.add('10', '1010');
    }).toThrowError(Error);
  });

  test('ErrorRepository add value - throw (incorrect desciption type)', () => {
    expect(() => {
      errorRepository.add(10, true);
    }).toThrowError(Error);
  });

  test('ErrorRepository add value - throw (code already exist)', () => {
    expect(() => {
      errorRepository.add(0, '111');
    }).toThrowError(Error);
  });

  test('ErrorRepository translate', () => {
    const description = errorRepository.translate(0);
    expect(description).toEqual('000');
  });

  test('ErrorRepository translate (no such code)', () => {
    const description = errorRepository.translate(100);
    expect(description).toEqual('Unknown error');
  });

  test('ErrorRepository translate (no value)', () => {
    const description = errorRepository.translate();
    expect(description).toEqual('Unknown error');
  });
});
