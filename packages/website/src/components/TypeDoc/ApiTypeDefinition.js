import React from 'react';
import Heading from '../content/Heading';
import ApiDescription from './ApiDescription';
import ApiFunctionParameter from './ApiFunctionParameter';
import ApiSubSection from './ApiSubSection';

const ApiTypeDefinition = ({ name, type, comment, minLevel }) => {
  const title = name;

  return (
    <>
      <Heading level={minLevel}>{title}</Heading>
      <ApiDescription {...comment} />
      <ApiSubSection>Properties</ApiSubSection>
      <ul>
        { type.declaration.children.map(parameter => (
          <ApiFunctionParameter key={parameter.id} {...parameter} />
        )) }
      </ul>
    </>
  );
};

ApiTypeDefinition.defaultProps = {
  minLevel: 2
};

export default ApiTypeDefinition;
