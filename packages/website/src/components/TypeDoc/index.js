import React from 'react';
import ApiFunction from './ApiFunction';
import ApiVariable from './ApiVariable';
import ApiClass from './ApiClass';
import typedoc from 'typeDoc';
import ApiTypeDefinition from './ApiTypeDefinition';
import ApiEnumeration from './ApiEnumeration';

const Typedoc = () => (
  <>
    {typedoc.map(child => {
      switch (child.kindString) {
        case 'Class':
          return <ApiClass key={child.id} {...child} />;
        case 'Function':
          return <ApiFunction key={child.id} {...child} />;
        case 'Variable':
          return <ApiVariable key={child.id} {...child} />;
        case 'Type alias':
          return <ApiTypeDefinition key={child.id} {...child} />;
        case 'Enumeration':
          return <ApiEnumeration key={child.id} {...child} />;
        default:
          return null;
      }
    })}
  </>
);

export default Typedoc;
