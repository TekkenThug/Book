export const PASSWORD_REGEXP =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;
export const INTERVAL_REGEXP =
  /^(?!.*(second|minute|hour|day|week|month|year).*\1)\d+\s+(?:second|minute|hour|day|week|month|year)s?(?:\s+\d+\s+(?:second|minute|hour|day|week|month|year)s?)*$/;
