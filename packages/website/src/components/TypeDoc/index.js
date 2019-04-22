import React from 'react';
import ApiFunction from './ApiFunction';
import ApiVariable from './ApiVariable';
import ApiClass from './ApiClass';
import typedoc from 'typeDoc';

const resolveReference = id => {
  const module = typedoc.children.find(module => module.children.some(child => child.id === id));
  return module && module.children.find(child => child.id === id);
};

const getItemDependencies = item => {
  switch (item.kindString) {
    case 'External module':
      const moduleItems = item.children.filter(item => item.flags.isExported);

      moduleItems.sort((a, b) => {
        return a.sources[0].line - b.sources[0].line;
      });

      return moduleItems.reduce((dependnecies, child) => [...dependnecies, child, ...getItemDependencies(child)], []);
    case 'Class':
      const classItems = item.children.filter(item => item.flags.isPublic);

      classItems.sort((a, b) => {
        return a.sources[0].line - b.sources[0].line;
      });

      return classItems.reduce((dependnecies, child) => [...dependnecies, ...getItemDependencies(child)], classItems);
    case 'Function':
    case 'Method':
      return item.signatures.reduce((dependnecies, signature) => {
        const typeArgumentDeps =
          signature.type &&
          signature.type.typeArguments &&
          signature.type.typeArguments.reduce((acc, item) => [...acc, ...getItemDependencies(item)], []) || [];

        const paramDeps =
          signature.parameters &&
          signature.parameters.reduce((acc, item) => [...acc, ...getItemDependencies(item)], []) || [];

        return [...dependnecies, ...typeArgumentDeps, ...paramDeps];
      }, []);
    default:
      if (item.type === 'reference' && item.id) {
        const reference = resolveReference(item.id);

        if (!reference) {
          return [];
        }

        return [reference, ...getItemDependencies(reference)];
      }
      return [];
  }
};

const entrypointModule = typedoc.children.find(module => module.flags.isEntrypoint);
const Typedoc = () =>
  getItemDependencies(entrypointModule).map(child => {
    switch (child.kindString) {
      case 'Class':
        return <ApiClass key={child.id} {...child} />;
      case 'Function':
        return <ApiFunction key={child.id} {...child} />;
      case 'Variable':
      case 'Type alias':
        return <ApiVariable key={child.id} {...child} />;
      default:
        return null;
    }
  });

export default Typedoc;
