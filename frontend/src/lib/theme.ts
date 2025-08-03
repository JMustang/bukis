export type Theme = "light" | "dark";

export const getTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("theme") as Theme) || "light";
};

export const setTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const toggleTheme = () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
  return newTheme;
};
