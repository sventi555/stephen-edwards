import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='flex space-x-10 p-5'>
      <Link href='/'>Home</Link>
      <Link href='/graphics'>Graphics</Link>
      <Link href='/music'>Music</Link>
      <Link href='/contact'>Contact</Link>
    </nav>
  );
}
