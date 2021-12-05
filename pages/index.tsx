import { promises as fs } from 'fs';
import path from 'path';

import Head from 'next/head';
import YAML from 'yaml';

import Footer from '../components/footer';
import Navbar from '../components/navbar';

interface HomeProps {
  bio: string
}

export default function Home({ bio }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Stephen Edwards</title>
      </Head>
      <Navbar />
      <main>
        <h1>Hi, I&apos;m Stephen</h1>
        <p>{bio}</p>
      </main>
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
