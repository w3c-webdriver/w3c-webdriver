import React from 'react';
import Heading from '../content/Heading';
import InlineCode from '../content/InlineCode';
import ApiDescription from './ApiDescription';
import ApiFunctionParameter from './ApiFunctionParameter';
import ApiSubSection from './ApiSubSection';

const ApiTypeDefinition = ({ name, type, comment, minLevel }) => {
  const title = name;

  return (
    <>
      <Heading level={minLevel}>{title}</Heading>
      <ApiDescription {...comment} />
      {type.type === 'reflection' && (
        <>
          <ApiSubSection>Properties</ApiSubSection>
          <ul>
            {type.declaration.children.map(parameter => (
              <ApiFunctionParameter key={parameter.id} {...parameter} />
            ))}
          </ul>
        </>
      )}
      {type.type === 'union' && (
        <>
          <ApiSubSection>Possible values</ApiSubSection>
          <ul>
            {type.types.map(type => (
              <li>
                <InlineCode>'{type.value}'</InlineCode>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

ApiTypeDefinition.defaultProps = {
  minLevel: 2
};

export default ApiTypeDefinition;
