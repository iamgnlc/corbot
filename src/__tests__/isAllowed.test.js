import { isAllowed } from '../functions';

describe('isAllowed', () => {
  it('returns allowed', () => {
    const firstName = 'gianluca';
    const response = isAllowed(firstName);

    expect(response).toBe(true);
  });

  it('returns not allowed', () => {
    const firstName = 'gennaro';
    const response = isAllowed(firstName);

    expect(response).toBe(false);
  });
});
