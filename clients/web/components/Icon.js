import React from 'react';
import FontAwesome from 'react-fontawesome';

const Icon = ({ name, className }) => {
  if (name == "Movie")
    name = "film";

  return (
    <FontAwesome name={name.toLowerCase()} className={className} />
  );
}

export default Icon;
