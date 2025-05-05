import React, { useEffect } from 'react';
import tailwindDefaultColors from 'tailwindcss/colors';

type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: typeof defaultLightTheme;
};

export const defaultLightTheme = {
  colors: {
    primary: {
      main: tailwindDefaultColors.blue['500'] as string,
      light: tailwindDefaultColors.blue['400'] as string,
      dark: tailwindDefaultColors.blue['600'] as string,
    },
    error: {
      main: tailwindDefaultColors.red['500'] as string,
      light: tailwindDefaultColors.red['400'] as string,
      dark: tailwindDefaultColors.red['600'] as string,
    },
    warning: {
      main: tailwindDefaultColors.amber['400'] as string,
      light: tailwindDefaultColors.amber['300'] as string,
      dark: tailwindDefaultColors.amber['500'] as string,
    },
    success: {
      main: tailwindDefaultColors.green['500'] as string,
      light: tailwindDefaultColors.green['400'] as string,
      dark: tailwindDefaultColors.green['600'] as string,
    },
  },
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = defaultLightTheme,
}: ThemeProviderProps) => {
  useEffect(() => {
    Object.entries(theme.colors).forEach(([category, colorShades]) => {
      Object.entries(colorShades).forEach(([colorShade, colorValue]) => {
        document.documentElement.style.setProperty(
          `--color-${category}-${colorShade}`,
          colorValue,
        );
      });
    });
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
