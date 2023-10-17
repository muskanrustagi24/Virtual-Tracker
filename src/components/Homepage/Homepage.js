import React from "react";
import { ThemeProvider } from 'styled-components'
import Header from "../Common/Header";
import { Container } from "../Styles/Container.styled";
import { GlobalStyles } from "../Styles/Global";
import Card from "../Common/Card";
import content from "../content";


const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#003333',
  },
  mobile: '768px',
}

const HomePage = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Header />
    <Container>
      {content.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </Container>
  </ThemeProvider>
);

export default HomePage;