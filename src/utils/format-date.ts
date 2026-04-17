import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

export const formatDate = (date: string | Date): string => {
  return dayjs(date).format("DD MMM YYYY");
};