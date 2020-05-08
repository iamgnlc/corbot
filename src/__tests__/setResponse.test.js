import { setResponse } from '../functions';

describe('setResponse', () => {
  it('returns valid response', () => {
    const nickName = 'nickName';
    const quote = 'quote';
    const response = setResponse({ nickName, quote });

    expect(response).toEqual(`we ${nickName}\n\n${quote}`);
  });
});
