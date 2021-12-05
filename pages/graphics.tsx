import { promises as fs } from 'fs';
import path from 'path';

import moment from 'moment';
import Head from 'next/head';
import YAML from 'yaml';

import Footer from '../components/footer';
import Main from '../components/main';
import Navbar from '../components/navbar';

// TODO change date type to specifically a moment.js string
interface Sketch {
  slug: string,
  title: string,
  url: string,
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
      <Main>
        <h1>Drawings and Animations</h1>
        <div>
          {sketches.map((sketch) => (
            <a key={sketch.slug} className='flex p-2 space-x-5 items-center border-2 rounded hover:border-gray-400 transition-all' href={`graphics/${sketch.slug}`}>
              <img className='w-56' src={sketch.screenshot}></img>
              <div className='space-y-3'>
                <h3><i>{sketch.title}</i></h3>
                <p>{moment(sketch.date).format('MMMM Do YYYY')}</p>
              </div>
            </a>
          ))}
        </div>
      </Main>
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
    sketches.push({ ...sketchData, slug: sketchPath.substring(0, sketchPath.length - 4) });
  }

  return {
    props: { sketches }
  };
}
