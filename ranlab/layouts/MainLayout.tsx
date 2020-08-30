import { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  children?: ReactNode
  title?: string
}

const MainLayout = ({ children, title }: Props) => (
  <div>
    <Head>
      <title>
        {
          title ? `${title} | ` : ''
        }
        Regional Analytics Lab
      </title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Head>
    {children}
  </div>
)

export default MainLayout
