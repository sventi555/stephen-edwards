import Image from 'next/image';

import Footer from './footer';
import Main from './main';
import Navbar from './navbar';

interface ContainerProps {
  pageName: string;
  children: JSX.Element[] | JSX.Element;
}

export default function Container(props: ContainerProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar pageName={props.pageName}/>
      <Main>
        {props.children}
      </Main>
      <Footer />
      <Image className='fixed w-20 bottom-2 right-2' src='/static/images/pigeon.png' alt='pigeon' />
    </div>
  );
}
