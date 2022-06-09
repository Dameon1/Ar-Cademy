import { useEffect, useState } from 'react';
const AsyncImageLoader = (props) => {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [alt, setAlt] = useState('');
  useEffect(() => {
    setLoadedSrc(null);
    if (props.src) {
      const handleLoad = () => {
        setLoadedSrc(props.src);
        setAlt(props.alt)
      };
      const image = new Image();
      image.addEventListener('load', handleLoad);
      image.src = props.src;
      image.alt = props.alt;
      return () => {
        image.removeEventListener('load', handleLoad);
      };
    }
  }, [props.src, props.alt]);
  if (loadedSrc === props.src) {
    return (
      <img {...props} alt={alt} className="cardImage" />
    );
  }
  return null;
};


export default AsyncImageLoader;