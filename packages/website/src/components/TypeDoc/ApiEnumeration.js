import React from 'react';
import Heading from '../content/Heading';
import ApiDescription from './ApiDescription';
import ApiSubSection from './ApiSubSection';

const ApiEnumeration = ({ name, children, comment, minLevel }) => {
  const title = name;

  return (
    <>
      <Heading level={minLevel}>{title}</Heading>
      <ApiDescription {...comment} />
      <ApiSubSection>Possible values</ApiSubSection>
      <ul>
        {children.map(value => (
          <li key={value.name}>{value.name}</li>
        ))}
      </ul>
    </>
  );
};

ApiEnumeration.defaultProps = {
  minLevel: 2
};

export default ApiEnumeration;
