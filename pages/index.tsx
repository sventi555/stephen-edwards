import { promises as fs } from 'fs';
import path from 'path';

import Head from 'next/head';
import YAML from 'yaml';

import Footer from '../components/footer';
import Main from '../components/main';
import Navbar from '../components/navbar';

interface HomeProps {
  bio: string
}

// TODO turn markdown into html
export default function Home({ bio }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Stephen Edwards</title>
      </Head>
      <Navbar />
      <Main>
        <h1>Hi, I&apos;m Stephen</h1>
        <p>{bio}</p>
      </Main>
      <Footer />
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
