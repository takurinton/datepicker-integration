import { createTheme, ThemeProvider, Spacer } from "ingred-ui";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { DatePicker } from "./Calendar/DatePicker";
import { Input } from "./Input/Input";
// import { NativeInput } from "./Input/Native";

function App() {
  const theme = createTheme();
  const [date, setDate] = useState<Dayjs>(dayjs());

  return (
    <ThemeProvider theme={theme}>
      <Input date={date} onChange={setDate} />
      <Spacer pb={1} />
      <DatePicker date={date} onDateChange={setDate} />
    </ThemeProvider>
  );
}

export default App;
