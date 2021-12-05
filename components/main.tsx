interface MainProps {
  children: JSX.Element[] | JSX.Element
}

export default function Main(props: MainProps) {
  return (
    <main className='p-5'>
      {props.children}
    </main>
  );
}
