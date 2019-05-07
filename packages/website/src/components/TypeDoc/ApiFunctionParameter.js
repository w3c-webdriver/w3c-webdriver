import React from 'react';
import InlineCode from '../content/InlineCode';
import Link from '../content/Link';
import ApiDescription from './ApiDescription';
import slugify from '@sindresorhus/slugify';

export const getParameterType = type => {
  switch (type && type.type) {
    case 'reflection':
      return 'object';
    case 'intrinsic':
      return type.name;
    case 'union':
      const result = type.types
        .map(({ name }) => name)
        .filter(name => name !== 'undefined')
        .join(' | ');
      return result === 'false | true' ? 'boolean' : result;
    case 'reference':
      return type.id ? <Link href={`#${slugify(type.name)}`}>{type.name}</Link> : type.name;
    case 'array':
      return <>{getParameterType(type.elementType)}[]</>;
    default:
      return type.type;
  }
};

const getSubTypes = type => {
  if (!type || !type.declaration) {
    return null;
  }

  return (
    <ul>
      {type.declaration.children.map(item => (
        <ApiFunctionParameter key={item.id} {...item} />
      ))}
    </ul>
  );
};

const ApiFunctionParameter = ({ name, type, comment, flags }) => {
  const title = [name, flags && flags.isOptional ? '?' : '', ': '].join('');

  return (
    <li>
      <InlineCode>
        {title}
        {getParameterType(type)}
      </InlineCode>{' '}
      <ApiDescription {...comment} />
      {getSubTypes(type)}
    </li>
  );
};

export default ApiFunctionParameter;
