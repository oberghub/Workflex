import MainNavigation from './navigation/MainNavigation';

import { Provider } from 'react-redux';
import { store } from './store';
export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation/>
    </Provider>
  );
}
