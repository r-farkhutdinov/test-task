import { PagesProvider } from './providers/PagesProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { Main } from './pages/Main';

export const App = () => {
  return (
    <ThemeProvider>
      <PagesProvider>
        <Main />
      </PagesProvider>
    </ThemeProvider>
  );
};
