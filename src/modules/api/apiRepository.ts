import Axios from 'axios';
import groupBy from 'lodash.groupby';
import { isAxiosError } from '../../utils/axios';
import apiConfiguration from './apiConfiguration';
import ExpiredTokenError from './ExpiredTokenError';

function generateApiUrl(path: string) {
  return apiConfiguration.url + path;
}

export type RegisterResponseErrors = Record<string, string[]>;

export interface RegisterResponse {
  success: boolean;
  errors: RegisterResponseErrors;
}

export interface RegisterParams {
  name: string;
  email: string;
}

export async function register({
  name,
  email,
}: RegisterParams): Promise<{ token: string } & RegisterResponse> {
  let token = '';
  const errors: RegisterResponseErrors = {
    name: [],
    email: [],
  };

  if (name && email) {
    try {
      const { data } = await Axios.post(generateApiUrl('/register'), {
        name,
        email,
        client_id: apiConfiguration.clientId,
      });
      token = data.data.sl_token;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.status === 400 &&
        error.response?.data?.error?.message
      ) {
        switch (error.response.data.error.message) {
          case 'PARAM_TYPE_INVALID_STRING_CHARS':
            errors.name.push('Please only include allowed characters.');
            break;
          case 'PARAM_TYPE_INVALID_EMAIL':
            errors.email.push('The email address is invalid.');
            break;
          default:
            throw error;
        }
      } else {
        throw error;
      }
    }
  } else {
    const emptyErrorMessage = 'Cannot be empty.';
    if (!name) {
      errors.name.push(emptyErrorMessage);
    }
    if (!email) {
      errors.email.push(emptyErrorMessage);
    }
  }

  return {
    token,
    success: !!token,
    errors,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isInvalidTokenResponseError(error: any) {
  return (
    isAxiosError(error) &&
    error.response?.status === 500 &&
    error.response?.data?.error?.message === 'Invalid SL Token'
  );
}

export interface ApiPost {
  id: string;
  from_name: string;
  from_id: string;
  message: string;
  type: string;
  created_time: string;
}

export type FetchPostsResponse = Record<string, ApiPost[]>;

export async function fetchPosts(token: string): Promise<FetchPostsResponse> {
  const requests = [];
  try {
    for (let page = 1; page <= 10; page++) {
      requests.push(
        Axios.get(generateApiUrl('/posts'), {
          params: { sl_token: token, page },
        })
      );
    }
    const responses = await Promise.all(requests);
    const postsFromAllRequests = responses
      .map((response) => response.data.data.posts)
      .flat();

    return groupBy<ApiPost>(postsFromAllRequests, 'from_id');
  } catch (error) {
    if (isInvalidTokenResponseError(error)) {
      throw new ExpiredTokenError();
    } else {
      throw error;
    }
  }
}
