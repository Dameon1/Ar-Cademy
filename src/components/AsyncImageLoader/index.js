import { useEffect, useState } from 'react';

const AsyncImageLoader = ({ src, alt, ...rest }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    setImageSrc(null);
    if (src) {
      const handleLoad = () => {
        setImageSrc(src);
        setImageAlt(alt);
      };
      const image = new Image();
      image.addEventListener('load', handleLoad);
      image.src = src;
      image.alt = alt;
      return () => {
        image.removeEventListener('load', handleLoad);
      };
    }
  }, [src, alt]);

  if (imageSrc === src) {
    return <img src={imageSrc} alt={imageAlt} {...rest} style={{borderRadius: "5px", minWidth:"50px"}}/>;
  }
  return null;
};

export default AsyncImageLoader;
