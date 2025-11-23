import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

const ThemeProviderNext = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderNext;
