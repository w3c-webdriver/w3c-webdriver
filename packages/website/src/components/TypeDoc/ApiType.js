import React from 'react';
import InlineCode from '../content/InlineCode';
import ApiDescription from './ApiDescription';
import slugify from '@sindresorhus/slugify';

const getTypeArguments = typeArguments => {
  if (!typeArguments) {
    return '';
  }

  return (
    <>
      {'<'}
      {typeArguments.map(({ type, name, id }) =>
        type === 'reference' && id ? (
          <a key={id} href={`#${slugify(name)}`}>
            {name}
          </a>
        ) : (
          name
        )
      )}
      {'>'}
    </>
  );
};

const getTypeDefinition = (name, type, typeArguments) => {
  switch (type) {
    case 'reference':
      return (
        <InlineCode>
          {name}
          {getTypeArguments(typeArguments)}
        </InlineCode>
      );
  }
};

const ApiType = ({ type, name, comment, typeArguments }) => {
  return (
    <>
      <InlineCode>{getTypeDefinition(name, type, typeArguments)}</InlineCode> <ApiDescription {...comment} />
    </>
  );
};

export default ApiType;
