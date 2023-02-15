import { Dayjs } from "dayjs";
import { NativeInputContainer } from "./styled";
import { useInput } from "./hooks";

type Props = {
  date: Dayjs;
  onChange: (value: Dayjs) => void;
};

export const NativeInput = ({ date, onChange }: Props) => {
  const { valid, handleDateChange } = useInput(date, onChange);

  console.log("native input render");

  return (
    <NativeInputContainer
      type="date"
      min="1900-01-01"
      max="2099-12-31"
      valid={valid}
      value={date.format("YYYY-MM-DD")}
      onChange={handleDateChange}
    />
  );
};
