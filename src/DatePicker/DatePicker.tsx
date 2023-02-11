import { Button, Spacer } from "ingred-ui";
import { FC, ReactNode, useState } from "react";
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

/**
 * @todo add with backdrop
 * @todo add icon button
 * @todo fix input style
 */
export const DatePicker: FC<Props> = ({ date, actions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Input date={date} onChange={onChange} />
      <Spacer pb={1} />
      {isOpen && (
        <Card display="flex">
          <LeftContainer>
            <Input date={date} onChange={onChange} />
            <Spacer pb={1} />
            {actions?.map(({ text, onClick }, i) => (
              <Action key={i} onClick={() => onClick()}>
                {text}
              </Action>
            ))}
          </LeftContainer>
          <Spacer pl={1} />
          <Calendar date={date} onDateChange={onChange} />
        </Card>
      )}
    </>
  );
};
