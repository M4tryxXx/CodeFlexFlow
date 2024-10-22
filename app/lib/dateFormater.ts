import { format } from "date-fns";

const dateFormatter = {
  formatDate: (date: Date): string => {
    return format(date, "dd-MM-yyyy");
  },
};

export default dateFormatter;
