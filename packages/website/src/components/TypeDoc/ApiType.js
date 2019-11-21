import React, { Fragment } from 'react';
import InlineCode from '../content/InlineCode';
import ApiDescription from './ApiDescription';
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
