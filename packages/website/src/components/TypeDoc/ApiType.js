import React, { Fragment } from 'react';
import InlineCode from '../content/InlineCode';
import Link from '../content/Link';
import ApiDescription from './ApiDescription';
import slugify from '@sindresorhus/slugify';
import { getParameterType } from './ApiFunctionParameter';

const getTypeArguments = typeArguments => {
  if (!typeArguments) {
    return '';
  }

  return (
    <>
      {'<'}
      {typeArguments.map((item, index) => (
        <Fragment key={index}>{getParameterType(item)}</Fragment>
      ))}
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
