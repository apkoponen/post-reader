import { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAxiosError(object: any): object is AxiosError {
  return object?.isAxiosError;
}
