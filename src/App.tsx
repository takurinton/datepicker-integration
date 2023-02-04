import { createTheme, ThemeProvider, Spacer } from "ingred-ui";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Calendar } from "./Calendar/Calendar";
import { Input } from "./Input/Input";

const DatePicker = ({
  date,
  onChange,
}: {
  date: Dayjs;
  onChange: (date: Dayjs) => void;
}) => {
  return (
    <>
      <Input date={date} onChange={onChange} />
      <Spacer pb={1} />
      <Calendar date={date} onDateChange={onChange} />
    </>
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
