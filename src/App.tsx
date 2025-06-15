import "@/styles/global.sass";
import Header from "@/components/Header";
import Weather from "@/components/Weather";
import { ThemeProvider } from "@/context/Theme/ThemeContext";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Weather />
      </ThemeProvider>
    </>
  );
};

export default App;
