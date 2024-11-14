import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a client
const queryClient = new QueryClient();

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </QueryClientProvider>
    </Provider>,

    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
