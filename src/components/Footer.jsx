import React from 'react';

const Footer = (props) => {
  const { href } = props;
  const { title } = props;

  return (
    <footer>
      <a href={href}>
        <b>{title}</b>
      </a>
    </footer>
  );
};

export default Footer;
