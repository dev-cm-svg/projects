import { MottoProvider } from '../context/MottoContext';

function MyApp({ Component, pageProps }) {
    return (
        <MottoProvider>
            <Component {...pageProps} />
        </MottoProvider>
    );
}

export default MyApp;
