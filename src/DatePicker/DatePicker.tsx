import { Spacer } from "ingred-ui";
import { ReactNode } from "react";
import { Input } from "../Input/Input";
import { Calendar } from "../Calendar/Calendar";
import { Dayjs } from "dayjs";
import { Card, Action, LeftContainer } from "./styled";

type Action = {
  text: ReactNode;
  onClick: () => void;
};

export const DatePicker = ({
  date,
  actions,
  onChange,
}: {
  date: Dayjs;
  actions?: Action[];
  onChange: (date: Dayjs) => void;
}) => {
  return (
    <Card display="flex">
      <LeftContainer>
        <Input date={date} onChange={onChange} />
        <Spacer pb={1} />
        {actions?.map(({ text, onClick }) => (
          <Action onClick={() => onClick()}>{text}</Action>
        ))}
      </LeftContainer>
      <Spacer pl={1} />
      <Calendar date={date} onDateChange={onChange} />
    </Card>
  );
};
