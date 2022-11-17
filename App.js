import MainNavigation from './navigation/MainNavigation';
import { Provider } from 'react-redux';
import { store } from './store';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
