import { promises as fs } from 'fs';
import path from 'path';

import Head from 'next/head';
import YAML from 'yaml';

import Container from '../components/container';

interface ContactProps {
  email: string,
  phone: string,
  insta: string,
  linkedin: string,
  github: string
}

export default function Contact(props: ContactProps) {
  return (
    <div>
      <Head>
        <title>Stephen Edwards</title>
      </Head>
      <Container pageName='contact'>
        <p>Placeholder</p>
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
