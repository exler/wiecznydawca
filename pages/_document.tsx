import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body className="donor">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
