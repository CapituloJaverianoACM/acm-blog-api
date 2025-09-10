export type DBResponse<T> = {
  error: string | null;
  data: T | null;
};