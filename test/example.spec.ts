import { Greeter } from '../src';

describe('sample test', () => {
  it('should pass', () => {
    expect(Greeter('Feedma')).toBe('Hello Feedma');
  });
});
