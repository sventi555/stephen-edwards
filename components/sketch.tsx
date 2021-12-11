import Image from 'next/image';

import styles from './sketch.module.css';

interface GifSketchProps {
  gif: string
}

function GifSketch({ gif }: GifSketchProps) {
  return (
    <Image className='w-full' src={gif} alt='sketch' />
  );
}

interface P5SketchProps {
  iframeUrl: string
}

function P5Sketch(props: P5SketchProps) {
  return (
    <iframe className={styles.sketch} src={props.iframeUrl}></iframe>
  );
}

interface SketchProps {
  gif?: string
  iframeUrl?: string,
}

function chooseSketch({ gif, iframeUrl }: SketchProps) {
  if (gif) return <GifSketch gif={gif} />;
  else if (iframeUrl) return <P5Sketch iframeUrl={iframeUrl} />;
  else return <p>Sketch not found.</p>;
}

export default function Sketch({ gif, iframeUrl }: SketchProps) {
  return (
    <div className={styles.sketch}>
      {chooseSketch({ gif, iframeUrl })}
    </div>
  );
}
