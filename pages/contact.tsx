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
  insta: {
    link: string,
    username: string
  },
  linkedin: {
    link: string,
    username: string
  },
  github: {
    link: string,
    username: string
  }
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
        <div className='p-5'>
          <p>Email: <a className='italic underline' href={'mailto:' + props.email}>
            {props.email}
          </a></p>
          <p>Instagram: <a className='italic underline' href={props.insta.link} target='_blank' rel="noreferrer">
            {props.insta.username}
          </a></p>
          <p>LinkedIn: <a className='italic underline' href={props.linkedin.link} target='_blank' rel="noreferrer">
            {props.linkedin.username}
          </a></p>
          <p>GitHub: <a className='italic underline' href={props.github.link} target='_blank' rel="noreferrer">
            {props.github.username}
          </a></p>
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const contactData = YAML.parse(
    await fs.readFile(
      path.join(process.cwd(), '_site/pages/contact.yml'),
      'utf8'
    ));

  return {
    props: contactData
  };
}
