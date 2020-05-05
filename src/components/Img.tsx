import React, {useEffect, useState} from 'react';
import westore from 'images/westore.svg';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const Img: React.FC<Props> = (props) => {
  const {children, alt, src, fallbackSrc, ...rest} = props;
  const [_src, setSrc] = useState<string | undefined>(fallbackSrc);
  useEffect(() => {
    setSrc(src);
  }, [src]);
  const onError = () => {
    if (fallbackSrc !== undefined && _src !== fallbackSrc) {setSrc(fallbackSrc);}
  };
  return (
    <img src={_src} alt={alt} {...rest} onError={onError}/>
  );
};

Img.defaultProps = {
  alt: '[图片]',
  fallbackSrc: westore,
};
