import { promises as fs } from 'fs';
import path from 'path';

import _ from 'lodash';
import moment from 'moment';
import Image from 'next/image';
import Head from 'next/head';
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
        <div>
          {sketches.map((sketch) => (
            <a key={sketch.slug} className='flex items-center p-2 space-x-5 transition-all border-2 border-gray-100 rounded hover:border-gray-400' href={`graphics/${sketch.slug}`}>
              <Image className='w-2/5 sm:w-56' src={sketch.screenshot} alt={'Thumbnail of ' + sketch.title + ' sketch'}></Image>
              <div className='space-y-3'>
                <h3><i>{sketch.title}</i></h3>
                <p>{moment(sketch.date).format('MMMM Do YYYY')}</p>
              </div>
            </a>
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
