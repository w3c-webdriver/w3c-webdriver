const path = require('path');
const { getOptions } = require('loader-utils');
const { Application } = require('typedoc');
const fs = require('fs');

const resolveReference = (projectObject, id) => {
  const module = projectObject.children.find(module => module.children.some(child => child.id === id));
  return module && module.children.find(child => child.id === id);
};

const getItemDependencies = (projectObject, item, resolutionPath) => {
  if (resolutionPath.find(p => p === item)) {
    return [];
  }

  resolutionPath = [...resolutionPath, item];

  switch (item.kindString) {
    case 'External module':
      const moduleItems = item.children.filter(item => item.flags.isExported);

      moduleItems.sort((a, b) => {
        return a.sources[0].line - b.sources[0].line;
      });

      return moduleItems.reduce(
        (dependencies, child) => [...dependencies, ...getItemDependencies(projectObject, child, resolutionPath)],
        moduleItems
      );
    case 'Class':
      const classItems = item.children.filter(item => item.flags.isPublic);

      classItems.sort((a, b) => {
        return a.sources[0].line - b.sources[0].line;
      });

      return classItems.reduce(
        (dependencies, child) => [...dependencies, ...getItemDependencies(projectObject, child, resolutionPath)],
        classItems
      );
    case 'Variable':
    case 'Type alias':
      return getItemDependencies(projectObject, item.type, resolutionPath);
    case 'Type literal':
      return item.children.reduce(
        (dependencies, child) => [...dependencies, ...getItemDependencies(projectObject, child, resolutionPath)],
        []
      );
    case 'Function':
    case 'Method':
      return item.signatures.reduce((dependencies, signature) => {
        const typeArgumentDeps =
          (signature.type &&
            signature.type.typeArguments &&
            signature.type.typeArguments.reduce(
              (acc, item) => [...acc, ...getItemDependencies(projectObject, item, resolutionPath)],
              []
            )) ||
          [];

        const paramDeps =
          (signature.parameters &&
            signature.parameters.reduce((acc, item) => [...acc, ...getItemDependencies(projectObject, item, resolutionPath)], [])) ||
          [];

        return [...dependencies, ...typeArgumentDeps, ...paramDeps];
      }, []);
    case 'Parameter':
      return getItemDependencies(projectObject, item.type, resolutionPath);
    default:
      if (item.type === 'reference' && item.id) {
        const reference = resolveReference(projectObject, item.id);

        if (!reference) {
          return [];
        }

        return [reference, ...getItemDependencies(projectObject, reference, resolutionPath)];
      }

      if (item.type === 'reflection') {
        return getItemDependencies(projectObject, item.declaration, resolutionPath);
      }

      return [];
  }
};

module.exports = function() {
  const options = getOptions(this);
  const app = new Application(options);
  const result = app.converter.convert([this.resourcePath]);

  if (result.errors && result.errors.length) {
    result.errors.map(error => {
      throw new Error(error.messageText);
    });
  }

  const projectObject = app.serializer.projectToObject(result.project);

  const module = projectObject.children.find(({ originalName }) => originalName.replace(/\//g, path.sep) === this.resourcePath);

  if (!module) {
    throw new Error(`${this.resourcePath} entry point not found.`);
  }

  module.flags.isEntrypoint = true;

  const flatAPI = getItemDependencies(projectObject, module, []).filter((child, index, all) => all.indexOf(child) === index);

  fs.writeFileSync(path.resolve(__dirname, '../../typedoc.json'), JSON.stringify(projectObject), 'utf8');
  fs.writeFileSync(path.resolve(__dirname, '../../typedoc-flat.json'), JSON.stringify(flatAPI), 'utf8');

  return `export default ${JSON.stringify(flatAPI)}`;
};
