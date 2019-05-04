import React from 'react';
import ApiFunction from './ApiFunction';
import Heading from '../content/Heading';
import ApiDescription from './ApiDescription';

const ApiClass = ({ name, children, minLevel, comment }) => {
  const items = children.filter(item => item.kindString === 'Method' && item.flags.isPublic);

  items.sort((a, b) => {
    return a.sources[0].line - b.sources[0].line;
  });

  return (
    <>
      <Heading level={minLevel}>{name}</Heading>
      <ApiDescription {...comment} />
      {items.map(method => {
        const signatures = method.signatures.map(signature => ({
          ...signature,
          name: `${name.charAt(0).toLowerCase() + name.slice(1)}.${signature.name}`
        }));

        return <ApiFunction key={method.id} {...method} signatures={signatures} />;
      })}
    </>
  );
};

ApiClass.defaultProps = {
  minLevel: 2
};

export default ApiClass;
