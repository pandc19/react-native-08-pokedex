import {createContext, PropsWithChildren} from 'react';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';

const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // ...NavigationDefaultTheme.colors, // careful: this can override core colors
  },
};

const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // ...NavigationDarkTheme.colors,
  },
};

export const ThemeContext = createContext({
  isDark: false,
  theme: CustomLightTheme,
});
export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';
  const theme = isDark ? CustomDarkTheme : CustomLightTheme;
  const navigationTheme = isDark ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navigationTheme}>
        <ThemeContext.Provider value={{isDark, theme}}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
