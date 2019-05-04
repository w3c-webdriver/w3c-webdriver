import React from 'react';
import Markdown from 'react-markdown';
import Link from '../content/Link';
import InlineCode from '../content/InlineCode';
import ApiSubSection from './ApiSubSection';

const hasLinks = tags => {
  return tags.filter(({ tag }) => tag === 'see').length > 0;
};

const getLinks = tags => {
  return tags
    .filter(({ tag }) => tag === 'see')
    .map(({ text }, index) => {
      const match = text.match(/{@link (.*?)\|(.*?)}/);

      if (!match) {
        return null;
      }

      return <li key={index}><Link href={ match[1] }>{ match[2] }</Link></li>;
    });
};

const ApiDescription = ({ shortText, tags = [] }) => {
  return (
    <>
      {shortText && <Markdown
        escapeHtml={true}
        source={shortText}
        renderers={{
          link: ({ href, children }) => <Link href={href}>{children}</Link>,
          inlineCode: InlineCode,
          paragraph: 'span'
        }}
        />
      }
      { hasLinks(tags) &&
        <>
          <ApiSubSection>See also</ApiSubSection>
          <ul>{getLinks(tags)}</ul>
        </>
      }
    </>
  );
};

export default ApiDescription;
