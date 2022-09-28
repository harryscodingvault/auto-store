import { addDays, addMinutes, format } from "date-fns";

export const getCurrentDay = () => {
  const currDate = new Date();
  const currTime = format(currDate, "HH:mm");
  const currDay = format(currDate, "yyyy-MM-dd");

  return { currTime, currDay, currDate };
};

export const getDatePlus30 = () => {
  const currDate = addMinutes(new Date(), 30);
  const currTime = format(currDate, "HH:mm");
  const currDay = format(currDate, "yyyy-MM-dd");

  return { currTime, currDay, currDate };
};
