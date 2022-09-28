import { addDays, addMinutes, format } from "date-fns";

export const getCurrentDay = () => {
  const currDate = addMinutes(new Date(), 30);
  const currTime = format(currDate, "HH:mm:ss");
  const currDay = format(currDate, "yyyy-MM-dd");

  return { currTime, currDay };
};
