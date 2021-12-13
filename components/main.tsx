interface MainProps {
  children: JSX.Element[] | JSX.Element
}

export default function Main(props: MainProps) {
  return (
    <main className='flex flex-col flex-grow bg-primary p-7 text-light'>
      {props.children}
    </main>
  );
}
