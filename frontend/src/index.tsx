import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import * as serviceWorker from './serviceWorker';
import './styles/styles.scss';

const primaryColorVar = '#667aff';

const themConfig = {
  token: {
    colorPrimary: primaryColorVar,
  },
  components: {
    Button: {
      controlHeight: 40,
      fontSize: 16,
      defaultBg: '#fff',
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={themConfig}>
        <AuthProvider>
          <App />
        </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
