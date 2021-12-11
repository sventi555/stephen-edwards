import { promises as fs } from 'fs';
import path from 'path';

import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import showdown from 'showdown';
import YAML from 'yaml';

import Container from '../../components/container';
import Sketch from '../../components/sketch';

interface GraphicProps {
  title: string,
  description: string,
  gif: string,
  iframeUrl: string
}

const INC_GEN = 50;

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
        <div className='space-y-5 lg:flex lg:space-y-0 lg:space-x-5'>
          <Sketch gif={props.gif} iframeUrl={props.iframeUrl}/>
          <div className='markdown' dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.description) }} />
        </div>
      </Container>
    </div>
  );
}

export async function getStaticPaths() {
  const sketchDir = await fs.readdir(path.join(process.cwd(), '_site/sketches/'));
  sketchDir.reverse();

  const paths = sketchDir.slice(0, INC_GEN).map((sketchPath) => (
    { params: { id: sketchPath.substring(0, sketchPath.length - 4) } }
  ));

  return { paths: paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  let fileContents: string;
  try {
    fileContents = await fs.readFile(
      path.join(process.cwd(), `_site/sketches/${params.id + '.yml'}`),
      'utf8'
    );
  } catch (err) {
    return { notFound: true };
  }

  const sketchData = YAML.parse(fileContents);

  return {
    props: _.pick(sketchData, ['title', 'description', 'gif', 'iframeUrl'])
  };
}
