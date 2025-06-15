import "./theme.sass";
import { useTheme } from "@/context/Theme/theme-context";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Theme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme__toggle button"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <MdDarkMode className="icon-dark" />
      ) : (
        <MdLightMode className="icon-light" />
      )}
    </button>
  );
};

export default Theme;
