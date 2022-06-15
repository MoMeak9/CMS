import Layout from '../components/Layout'
import {AppProps} from "next/app";
import 'antd/dist/antd.css';
import '../styles/login.scss';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
