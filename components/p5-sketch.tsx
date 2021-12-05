import styles from './p5-sketch.module.css';

interface P5SketchProps {
  url: string
}

export default function P5Sketch(props: P5SketchProps) {
  return (
    <iframe className={styles.sketch} src={props.url}></iframe>
  );
}
