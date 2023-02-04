import { createTheme, ThemeProvider, Spacer, Flex } from "ingred-ui";
import dayjs, { Dayjs } from "dayjs";
import { ReactNode, useState } from "react";
import { Calendar } from "./Calendar/Calendar";
import { Input } from "./Input/Input";
import styled from "styled-components";

const Card = styled(Flex)`
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  width: fit-content;
`;

const LeftContainer = styled.div`
  /* width: 200px; */
`;

const Action = styled.button`
  cursor: pointer;
  font-weight: bold;
  background: none;
  border: none;
  padding: 0;
  display: block;
  margin-top: 8px;
  margin-bottom: 8px;
`;

type Action = {
  text: ReactNode;
  onClick: () => void;
};

const DatePicker = ({
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

function App() {
  const theme = createTheme();
  const [date, setDate] = useState<Dayjs>(dayjs());
  const actions = [
    {
      text: "今日",
      onClick: () => {
        setDate(dayjs());
      },
    },
    {
      text: "来週",
      onClick: () => {
        console.log("clicked");
        setDate(dayjs().add(1, "week"));
      },
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <DatePicker date={date} onChange={setDate} actions={actions} />
    </ThemeProvider>
  );
}

export default App;
