import React from 'react';
import Footer from './Footer';
import Header from './Header/Header';
import { ThemeProvider } from '@material-ui/core/styles';
import PsycareTheme from '../assets/js/PsycareTheme'

function PageTemplate(props) {
  return (
    <ThemeProvider theme={PsycareTheme}>
      <Header />
      <div className="mt50">
        {props.children}
      </div>
      <Footer />
    </ThemeProvider>
  )
}

export default PageTemplate;
