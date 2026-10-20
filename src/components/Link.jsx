import React from 'react';
import { navigate } from '../utils/hooks.js';

export default function Link({ to, children, className = '', ...props }) {
  if (!to) {
    return (
      <a className={className} {...props}>
        {children}
      </a>
    );
  }

  if (to.startsWith('#')) {
    return (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    );
  }

  const cleanPath = to
    .replace('index.html', '/')
    .replace('pages/', '/')
    .replace('.html', '')
    .replace(/^\.?\//, '/');

  const handleClick = (e) => {
    e.preventDefault();
    navigate(cleanPath);
  };

  return (
    <a href={cleanPath} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
