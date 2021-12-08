import { promises as fs } from 'fs';
import path from 'path';

import Head from 'next/head';
import showdown from 'showdown';
import YAML from 'yaml';

import Container from '../components/container';

interface ContactProps {
  blurb: string,
  email: string,
  phone: string,
  insta: string,
  linkedin: string,
  github: string
}

export default function Contact(props: ContactProps) {
  const converter = new showdown.Converter();
  return (
    <div>
      <Head>
        <title>Stephen Edwards</title>
      </Head>
      <Container pageName='contact'>
        <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.blurb) }} />
        <p>Email: <a href={'mailto:' + props.email}>{props.email}</a></p>
        <p>Instagram: <a href={props.insta}>{props.insta}</a></p>
      </Container>
    </div>
  );
}

// export async function getStaticProps() {
//   const contactData = YAML.parse(
//     await fs.readFile(
//       path.join(process.cwd(), '_site/pages/contact.yml'),
//       'utf8'
//     ));

//   return {
//     props: contactData
//   };
// }
