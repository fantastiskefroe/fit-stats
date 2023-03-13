import {endOfWeek, startOfWeek} from "date-fns";

export function startOfWeekMon(date: Date): Date {
  return startOfWeek(date, {weekStartsOn: 1});
}

export function endOfWeekMon(date: Date): Date {
  return endOfWeek(date, {weekStartsOn: 1});
}

export function loadToken(): string {
  const token = window.localStorage.getItem('fit-token');
  if (token == null) {
    return "NhA7LbZxFBwbAD4xoMac9ZqHYeundBRcjZCQhRp7evxiNUsUhWZtBPC.vuyd6CGt";
  }

  return token;
}
