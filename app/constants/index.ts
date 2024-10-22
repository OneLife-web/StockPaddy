import { startOfMonth, startOfWeek, subDays } from "date-fns";

export const presets = {
  today: {
    from: new Date(),
    to: new Date(),
  },
  yesterday: {
    from: subDays(new Date(), 1),
    to: subDays(new Date(), 1),
  },
  thisWeek: {
    from: startOfWeek(new Date(), { weekStartsOn: 1 }),
    to: new Date(),
  },
  thisMonth: {
    from: startOfMonth(new Date()),
    to: new Date(),
  },
};