// Public demo credentials published on https://www.saucedemo.com
export const PASSWORD = 'secret_sauce';

export const USERS = {
  standard: 'standard_user',
  locked: 'locked_out_user',
  problem: 'problem_user',
} as const;

export type UserKind = keyof typeof USERS;
