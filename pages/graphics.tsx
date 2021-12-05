import { promises as fs } from 'fs';
import path from 'path';

import Head from 'next/head';
import YAML from 'yaml';

import Footer from '../components/footer';
import Navbar from '../components/navbar';

// TODO change date type to specifically a moment.js string
interface Sketch {
  slug: string,
  title: string,
  'iframe-url': string,
  screenshot: string,
  date: string
}

interface GraphicsProps {
  sketches: [Sketch]
}

export default function Graphics({ sketches }: GraphicsProps) {
  return (
    <div>
      <Head>
        <title>Stephen Edwards</title>
      </Head>
      <Navbar />
      <main>
        {sketches.map((sketch) => (
          <div key={sketch.slug}>
            <p>{sketch.title}</p>
            <iframe src={sketch['iframe-url']}></iframe>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const sketches = [];

  const sketchDir = await fs.readdir(path.join(process.cwd(), '_site/sketches/'));
  for (const sketchPath of sketchDir) {
    const sketchData = YAML.parse(
      await fs.readFile(
        path.join(process.cwd(), `_site/sketches/${sketchPath}`),
        'utf8'
      ));
    sketches.push({ ...sketchData, slug: sketchPath });
  }

  return {
    props: { sketches }
  };
}
