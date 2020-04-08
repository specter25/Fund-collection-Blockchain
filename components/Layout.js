import React from 'react'
import Header from './Header'
import Head from 'next/head'
import {Container} from 'semantic-ui-react';

 const Layout = (props) => {
    return (
        <Container>
            <Head>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

            </Head>



            <Header />  
            {props.children}
            <h1>Im a footer</h1>
        </Container>
    )
}

export default Layout