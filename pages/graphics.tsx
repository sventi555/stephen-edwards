import { promises as fs } from 'fs';
import path from 'path';

import _ from 'lodash';
import moment from 'moment';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import YAML from 'yaml';

import Container from '../components/container';

interface Sketch {
  slug: string,
  title: string,
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
      <Container pageName='graphics'>
        <h1>Drawings and Animations</h1>
        <div className='flex flex-col space-y-2'>
          {sketches.map((sketch) => (
            <Link key={sketch.slug} href={`graphics/${sketch.slug}`}>
              <a className='flex items-center p-2 space-x-5 transition-all border-2 border-gray-800 rounded hover:border-gray-500'>
                <div className='w-2/5 sm:w-56'>
                  <Image layout='responsive' width='200' height='200' src={sketch.screenshot} alt={'Thumbnail of ' + sketch.title + ' sketch'} />
                </div>
                <div className='space-y-3'>
                  <h3><i>{sketch.title}</i></h3>
                  <p>{moment(sketch.date).format('MMMM Do YYYY')}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Container>
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
    sketches.push({
      ..._.pick(sketchData, ['title', 'screenshot', 'date']),
      slug: sketchPath.substring(0, sketchPath.length - 4)
    });
  }

  sketches.reverse();

  return {
    props: { sketches }
  };
}
