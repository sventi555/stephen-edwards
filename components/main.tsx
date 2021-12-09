interface MainProps {
  children: JSX.Element[] | JSX.Element
}

export default function Main(props: MainProps) {
  return (
    <main className='pr-10 p-7'>
      {props.children}
    </main>
  );
}
