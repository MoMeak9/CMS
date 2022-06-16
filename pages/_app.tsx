import Layouts from '../components/Layout'
import {AppProps} from "next/app";
import 'antd/dist/antd.css';
import '../styles/login.scss';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Layouts>
            <Component {...pageProps} />
        </Layouts>
    )
}

export default MyApp
