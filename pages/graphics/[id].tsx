import { promises as fs } from 'fs';
import path from 'path';

import Head from 'next/head';
import YAML from 'yaml';

import Footer from '../../components/footer';
import Navbar from '../../components/navbar';

// TODO change date type to specifically a moment.js string
interface GraphicProps {
  slug: string,
  title: string,
  'iframe-url': string,
  screenshot: string,
  date: string
}

export default function Graphic(props: GraphicProps) {
  return (
    <div>
      <Head>
        <title>Stephen Edwards</title>
      </Head>
      <Navbar />
      <main>
        <p>{props.title}</p>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const sketchDir = await fs.readdir(path.join(process.cwd(), '_site/sketches/'));
  const paths = sketchDir.map((sketchPath) => (
    { params: { id: sketchPath.substring(0, sketchPath.length - 4) } }
  ));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const sketchData = YAML.parse(
    await fs.readFile(
      path.join(process.cwd(), `_site/sketches/${params.id + '.yml'}`),
      'utf8'
    )
  );

  return {
    props: sketchData
  };
}
