import { BankClass } from './bankClass';

describe('Bank', () => {
  it('should create an instance', () => {
    expect(new BankClass(1, 'hola')).toBeTruthy();
  });
});
