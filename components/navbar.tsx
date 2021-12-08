import Link from 'next/link';

interface NavbarProps {
  pageName: string
}

// TODO make pageName an enum

export default function Navbar({ pageName }: NavbarProps) {
  return (
    <nav className='flex p-5 space-x-10'>
      <Link href='/'><a className={pageName === 'home' ? 'font-bold' : ''}>Home</a></Link>
      <Link href='/graphics'><a className={pageName === 'graphics' ? 'font-bold' : ''}>Graphics</a></Link>
      {/* <Link href='/music'><a className={pageName === 'music' ? 'font-bold' : ''}>Music</a></Link> */}
      <Link href='/contact'><a className={pageName === 'contact' ? 'font-bold' : ''}>Contact</a></Link>
    </nav>
  );
}
