import styles from './sketch.module.css';

interface GifSketchProps {
  gif: string
}

function GifSketch({ gif }: GifSketchProps) {
  return (
    <div className={`${styles.sketch}`}><img className='w-full' src={gif} alt='sketch' /></div>
  );
}

interface P5SketchProps {
  iframeUrl: string
}

function P5Sketch(props: P5SketchProps) {
  return (
    <iframe className={`${styles.sketch} ${styles.p5Sketch}`} src={props.iframeUrl}></iframe>
  );
}

interface SketchProps {
  gif?: string
  iframeUrl?: string,
}

export default function Sketch({ gif, iframeUrl }: SketchProps) {
  if (gif) return <GifSketch gif={gif} />;
  else if (iframeUrl) return <P5Sketch iframeUrl={iframeUrl} />;
  else return <p>Sketch not found.</p>;
}
