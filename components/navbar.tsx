import Link from 'next/link';

interface NavlinkProps {
  pageName: string,
  curPageName: string,
  link: string,
  label: string
}

interface NavbarProps {
  pageName: string
}

// TODO make pageName an enum

function Navlink({ pageName, curPageName, link, label }: NavlinkProps) {
  return (
    <Link href={link}>
      <a className={(curPageName === pageName ? 'font-bold' : '')}>
        {label}
      </a>
    </Link>
  );
}

export default function Navbar({ pageName }: NavbarProps) {
  return (
    <div className='flex p-5 space-x-10 text-light bg-primary'>
      <nav className='flex space-x-10'>
        <Navlink curPageName={pageName} pageName='home' link='/' label='Home' />
        <Navlink curPageName={pageName} pageName='graphics' link='/graphics' label='Graphics' />
        <Navlink curPageName={pageName} pageName='contact' link='/contact' label='Contact' />
      </nav>
    </div>
  );
}
