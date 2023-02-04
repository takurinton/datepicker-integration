import { Spacer } from "ingred-ui";
import { FC, ReactNode } from "react";
import { Input } from "../Input/Input";
import { Calendar } from "../Calendar/Calendar";
import { Dayjs } from "dayjs";
import { Card, Action, LeftContainer } from "./styled";

type Action = {
  text: ReactNode;
  onClick: () => void;
};

type Props = {
  date: Dayjs;
  actions?: Action[];
  onChange: (date: Dayjs) => void;
};

export const DatePicker: FC<Props> = ({ date, actions, onChange }) => {
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
