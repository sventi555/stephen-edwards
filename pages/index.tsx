import { promises as fs } from 'fs';
import path from 'path';

import Head from 'next/head';
import Script from 'next/script';
import showdown from 'showdown';
import YAML from 'yaml';

import Container from '../components/container';

interface HomeProps {
  bio: string
}

export default function Home({ bio }: HomeProps) {
  const converter = new showdown.Converter();
  return (
    <div>
      <Head>
        <title>Stephen Edwards</title>
      </Head>
      <Container pageName='home'>
        <div className='flex flex-col justify-center flex-grow'>
          <h1 className='text-center'>Hi, I&apos;m Stephen</h1>
          <div className='text-center' dangerouslySetInnerHTML={{ __html: converter.makeHtml(bio) }} />
        </div>
      </Container>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>
    </div>
  );
}

export async function getStaticProps() {
  const homeData = YAML.parse(
    await fs.readFile(
      path.join(process.cwd(), '_site/pages/home.yml'),
      'utf8'
    ));

  return {
    props: homeData
  };
}
