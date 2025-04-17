import { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

type ThemeMode = 'light' | 'dark'

const ThemeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  mode: 'light' as ThemeMode,
})

export const useThemeContext = () => useContext(ThemeContext)

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light')

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
