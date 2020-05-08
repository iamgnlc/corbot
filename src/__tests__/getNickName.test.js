import { getNickName } from '../functions';

describe('getNickName', () => {
  it('returns valid nickname', () => {
    const firstName = 'gianluca';
    const nickName = 'giallù';
    const response = getNickName(firstName, true);

    expect(response).toEqual(nickName);
  });

  it('not returns a nickname', () => {
    const firstName = 'gianluca';
    const response = getNickName(firstName, false);

    expect(response).toEqual('');
  });
});
