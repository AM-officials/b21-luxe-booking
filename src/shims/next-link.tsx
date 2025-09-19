import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const Link: React.FC<React.PropsWithChildren<Props>> = ({ href, children, ...rest }) => {
  if (href.startsWith('http')) return <a href={href} {...rest}>{children}</a>;
  return <RouterLink to={href} {...(rest as any)}>{children}</RouterLink>;
};

export default Link;
