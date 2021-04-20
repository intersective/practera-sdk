import { add } from '../service/service';

describe('add-demo-npm unit tests', (): void => {
  it('adding two positive numbers', (): void => {
    const actual: number = add(1, 2);
    expect(actual).toEqual(3);
  });
  it('adding two negative numbers', (): void => {
    const actual: number = add(-5, -2);
    expect(actual).toEqual(-7);
  });
  it('adding one positive and one negative number', (): void => {
    const actual: number = add(7, -2);
    expect(actual).toEqual(5);
  });
});
