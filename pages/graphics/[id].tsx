import { promises as fs } from 'fs';
import path from 'path';

import Head from 'next/head';
import { useRouter } from 'next/router';
import showdown from 'showdown';
import YAML from 'yaml';

import Container from '../../components/container';
import P5Sketch from '../../components/p5-sketch';

interface GraphicProps {
  slug: string,
  title: string,
  description: string,
  url: string,
  screenshot: string,
  date: string
}

export default function Graphic(props: GraphicProps) {
  const router = useRouter();

  const converter = new showdown.Converter();

  function goBack() {
    router.back();
  }

  return (
    <div>
      <Head>
        <title>Stephen Edwards</title>
      </Head>
      <Container pageName='graphics'>
        <button className='mb-4 underline' onClick={goBack}>&#8592; Back</button>
        <h1>{props.title}</h1>
        <div className='space-y-3 lg:flex lg:space-y-0 lg:space-x-5'>
          <P5Sketch url={props.url}/>
          <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.description) }} />
        </div>
      </Container>
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