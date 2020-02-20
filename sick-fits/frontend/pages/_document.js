//What does this file do? 
//this file is the dummy file from next.js that is required when using...
//..Styled Components if you want to stop teh Flash of Unstyled Content (FOUC)
//Not super sure what's happening here, but wrote comments to try and explain

//import what's needed from "next/document"
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}