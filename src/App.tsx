import { createTheme, ThemeProvider, Spacer, Flex } from "ingred-ui";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
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

const DatePicker = ({
  date,
  onChange,
}: {
  date: Dayjs;
  onChange: (date: Dayjs) => void;
}) => {
  return (
    <Card display="flex">
      <Input date={date} onChange={onChange} />
      <Spacer pl={1} />
      <Calendar date={date} onDateChange={onChange} />
    </Card>
  );
};

function App() {
  const theme = createTheme();
  const [date, setDate] = useState<Dayjs>(dayjs());

  return (
    <ThemeProvider theme={theme}>
      <DatePicker date={date} onChange={setDate} />
    </ThemeProvider>
  );
}

export default App;
