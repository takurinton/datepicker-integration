import dayjs, { Dayjs } from "dayjs";
import { useCallback, useMemo } from "react";

export const useInput = (date: Dayjs, onChange?: (date: Dayjs) => void) => {
  const valid = useMemo(() => date.isValid(), [date]);

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (dayjs(event.target.value).isValid()) {
        onChange && onChange(dayjs(event.target.value));
      }
    },
    [onChange]
  );

  return {
    valid,
    handleDateChange,
  };
};
