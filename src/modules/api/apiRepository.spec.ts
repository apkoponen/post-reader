import nock from 'nock';
import Axios from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- axios typings are missing, so we suppress this.
import httpAdapter from 'axios/lib/adapters/http';
import apiConfiguration from './apiConfiguration';
import { register } from './apiRepository';

Axios.defaults.adapter = httpAdapter;

function createApiNock() {
  return nock(apiConfiguration.host);
}

nock.disableNetConnect();

const email = 'test@test.com';
const name = 'test';
const meta = {
  request_id: 'VlkDdsfUhWJeC5O1h7UkEqc6Fz935qU7',
};

describe('register', () => {
  it('should return token on success', async () => {
    const mockToken = 'smslt_42d42aa263f545_65d890ace622f';
    const response = {
      meta,
      data: {
        client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
        email,
        sl_token: mockToken,
      },
    };

    createApiNock()
      .post(() => true)
      .reply(200, response);

    const { token, success } = await register({ email, name });

    expect(token).toEqual(mockToken);
    expect(success).toEqual(true);
  });

  it('should return success "false" on failure', async () => {
    const { success } = await register({ email: '', name: '' });

    expect(success).toEqual(false);
  });

  it('should return error on empty email', async () => {
    const { errors } = await register({ email: '', name });

    expect(errors.email).toHaveLength(1);
  });

  it('should return error on API invalid email response', async () => {
    const response = {
      meta,
      error: {
        message: 'PARAM_TYPE_INVALID_EMAIL',
      },
    };
    createApiNock()
      .post(() => true)
      .reply(400, response);
    const { errors } = await register({
      email: 'this-does-not-matter-because-we-mock-the-response',
      name,
    });

    expect(errors.email).toHaveLength(1);
  });

  it('should return error on empty name', async () => {
    const { errors } = await register({ email, name: '' });

    expect(errors.name).toHaveLength(1);
  });

  it('should return error on API invalid name response', async () => {
    const response = {
      meta,
      error: {
        message: 'PARAM_TYPE_INVALID_STRING_CHARS',
      },
    };
    createApiNock()
      .post(() => true)
      .reply(400, response);
    const { errors } = await register({
      email: 'this-does-not-matter-because-we-mock-the-response//',
      name,
    });

    expect(errors.name).toHaveLength(1);
  });

  it('should throw on unexpected API error message', async () => {
    const response = {
      meta,
      error: {
        message: 'THIS_IS_SOME_ODD_CODE',
      },
    };
    createApiNock()
      .post(() => true)
      .reply(400, response);
    await expect(
      register({
        email,
        name,
      })
    ).rejects.not.toBeUndefined();
  });

  it('should throw unexpected errors', async () => {
    // Nock will prevent the network request, so we get a mocked unexpected for free.
    await expect(
      register({
        email,
        name,
      })
    ).rejects.not.toBeUndefined();
  });
});

nock.enableNetConnect();
