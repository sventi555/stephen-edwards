import { promises as fs } from 'fs';
import path from 'path';

import Head from 'next/head';
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
        <h1>Hi, I&apos;m Stephen</h1>
        <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(bio) }} />
      </Container>
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
