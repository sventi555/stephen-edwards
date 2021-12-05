import { promises as fs } from 'fs';
import path from 'path';

import moment from 'moment';
import Head from 'next/head';
import YAML from 'yaml';

import Footer from '../../components/footer';
import P5Sketch from '../../components/p5-sketch';
import Main from '../../components/main';
import Navbar from '../../components/navbar';

// TODO change date type to specifically a moment.js string
interface GraphicProps {
  slug: string,
  title: string,
  description: string,
  url: string,
  screenshot: string,
  date: string
}

// TODO turn markdown into html
export default function Graphic(props: GraphicProps) {
  return (
    <div>
      <Head>
        <title>Stephen Edwards</title>
      </Head>
      <Navbar />
      <Main>
        <h1>{props.title}</h1>
        <div className='space-y-3 md:flex md:flex-wrap md:space-x-5 md:space-y-0'>
          <P5Sketch url={props.url}/>
          <div>
            <p>{props.description}</p>
          </div>
        </div>
      </Main>
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
