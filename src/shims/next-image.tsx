import React from 'react';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

const Image: React.FC<ImageProps> = ({ fill, style, ...rest }) => {
  const mergedStyle = fill
    ? ({ ...(style || {}), width: '100%', height: '100%', objectFit: 'cover' } as React.CSSProperties)
    : style;
  return <img {...rest} style={mergedStyle} />;
};

export default Image;
