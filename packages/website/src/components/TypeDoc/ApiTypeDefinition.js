import React from 'react';
import Heading from '../content/Heading';
import InlineCode from '../content/InlineCode';
import ApiDescription from './ApiDescription';
import ApiFunctionParameter from './ApiFunctionParameter';
import ApiSubSection from './ApiSubSection';
import Link from '../content/Link';
import slugify from '@sindresorhus/slugify';

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
            {type.declaration.children.map((parameter, index) => (
              <ApiFunctionParameter key={index} {...parameter} />
            ))}
          </ul>
        </>
      )}
      {type.type === 'union' && (
        <>
        <ApiSubSection>Possible values</ApiSubSection>
        <ul>
          {type.types.map((type, index) => (
            <li key={index}>
              {type.value && <InlineCode>'{type.value}'</InlineCode>}
              {!type.value && <Link href={`#${slugify(type.name)}`}>{type.name}</Link>}

            </li>
          ))}
        </ul>
      </>
      )}
      {type.type === 'reference' && (
        <>
          <ApiSubSection>Possible values</ApiSubSection>
          <ul>
            <li>
              <Link href={`#${slugify(type.name)}`}>{type.name}</Link>
            </li>
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
