import MainNavigation from './navigation/MainNavigation';

import { Provider } from 'react-redux';
export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation/>
    </Provider>
  );
}
