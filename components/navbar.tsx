import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href='/'>Home</Link>
      <Link href='/graphics'>Graphics</Link>
      <Link href='/music'>Music</Link>
      <Link href='/contact'>Contact</Link>
    </nav>
  )
}
