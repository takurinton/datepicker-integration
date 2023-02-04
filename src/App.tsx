import { createTheme, ThemeProvider } from "ingred-ui";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { DatePicker } from "./DatePicker";

function App() {
  const theme = createTheme();
  const [date, setDate] = useState<Dayjs>(dayjs());
  const actions = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <DatePicker date={date} onChange={setDate} actions={actions} />
    </ThemeProvider>
  );
}

export default App;
