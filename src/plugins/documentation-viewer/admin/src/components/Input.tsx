import type { MessageDescriptor } from 'react-intl';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@strapi/design-system';
import MarkDown from 'react-markdown';
import {useFetchClient} from "@strapi/strapi/admin";
import styled from "styled-components";


// IntlObject type used by Strapi
type IntlObject = MessageDescriptor;

// The attribute object includes your custom options
interface CustomFieldAttribute {
  type: string;
  customField: string;
  options?: {
    documentId?: string;
    [key: string]: any; // Allow other custom options
  };
}

const Wrapper = styled.div`
  top: 0;
  overflow: auto;
  padding: ${({ theme }) => `${theme.spaces[1]} ${theme.spaces[2]}`};
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.neutral800};
  line-height: ${({ theme }) => theme.lineHeights[6]};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-block-start: ${({ theme }) => theme.spaces[2]};
    margin-block-end: ${({ theme }) => theme.spaces[2]};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spaces[2]};
  }

  h1 {
    font-size: 3.6rem;
    font-weight: 600;
  }

  h2 {
    font-size: 3rem;
    font-weight: 500;
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 500;
  }

  h4 {
    font-size: 2rem;
    font-weight: 500;
  }

  strong {
    font-weight: 800;
  }

  em {
    font-style: italic;
  }

  blockquote {
    margin-top: ${({ theme }) => theme.spaces[8]};
    margin-bottom: ${({ theme }) => theme.spaces[7]};
    font-size: 1.4rem;
    font-weight: 400;
    border-left: 4px solid ${({ theme }) => theme.colors.neutral150};
    font-style: italic;
    padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[5]};
  }

  img {
    max-width: 100%;
  }

  table {
    thead {
      background: ${({ theme }) => theme.colors.neutral150};

      th {
        padding: ${({ theme }) => theme.spaces[4]};
      }
    }
    tr {
      border: 1px solid ${({ theme }) => theme.colors.neutral200};
    }
    th,
    td {
      padding: ${({ theme }) => theme.spaces[4]};
      border: 1px solid ${({ theme }) => theme.colors.neutral200};
      border-bottom: 0;
      border-top: 0;
    }
  }

  pre,
  code {
    font-size: 1.4rem;
    border-radius: 4px;
    /*
      Hard coded since the color is the same between themes,
      theme.colors.neutral800 changes between themes.

      Matches the color of the JSON Input component.
    */
    background-color: #32324d;
    max-width: 100%;
    overflow: auto;
    padding: ${({ theme }) => theme.spaces[2]};
  }

  /* Inline code */
  p,
  pre,
  td {
    > code {
      color: #839496;
    }
  }

  ol {
    list-style-type: decimal;
    margin-block-start: ${({ theme }) => theme.spaces[4]};
    margin-block-end: ${({ theme }) => theme.spaces[4]};
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: ${({ theme }) => theme.spaces[4]};

    ol,
    ul {
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }

  ul {
    list-style-type: disc;
    margin-block-start: ${({ theme }) => theme.spaces[4]};
    margin-block-end: ${({ theme }) => theme.spaces[4]};
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: ${({ theme }) => theme.spaces[4]};

    ul,
    ol {
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }
`;

// The onChange event target structure
interface ChangeEventTarget {
  name: string;
  value: unknown;
  type: string;
}

interface ChangeEvent {
  target: ChangeEventTarget;
}

// Main Input component props
export interface CustomFieldInputProps {
  attribute: CustomFieldAttribute;
  description?: IntlObject;
  placeholder?: IntlObject;
  hint?: string;
  name: string;
  intlLabel: IntlObject;
  onChange: (event: ChangeEvent) => void;
  contentTypeUID: string;
  type: string;
  value: unknown;
  required: boolean;
  error?: IntlObject;
  disabled: boolean;
}


const Input: React.FC<CustomFieldInputProps> = ({
                                                  attribute,
                                                  name,
                                                  disabled,
                                                  error,
                                                  intlLabel,
                                                }) => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const {get} = useFetchClient();

  // Type-safe access to documentId from options
  const documentId = attribute?.options?.documentId;

  useEffect(() => {
    if (!documentId) {
      setMarkdown('*No document configured. Set Document ID in Content Type Builder.*');
      setLoading(false);
      return;
    }

    const fetchDocument = async () => {
      try {
        const res = await get(`/content-manager/collection-types/api::documentation.documentation/${documentId}`);
        console.log(res)
        let data = ''
        if ('data' in res){
          data = res.data.data;
        } else{
          throw new Error('Invalid response format');
        }
        console.log('data',data)
        setMarkdown(data.content || '');
      } catch (error) {
        setMarkdown(`*Error loading document: ${error.message}*`);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  return (
    <Box marginBottom={1}>
      <Typography>Documentation</Typography>
      <Box background="neutral100" borderRadius="4px">
      {loading ? (
        <Typography>Loading documentation...</Typography>
      ) : (
        <Wrapper>
          <MarkDown
          >{markdown}</MarkDown>
        </Wrapper>
      )}
      </Box>
    </Box>
  );
};

export default Input;
