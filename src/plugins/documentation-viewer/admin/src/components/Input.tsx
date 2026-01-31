import type {MessageDescriptor} from 'react-intl';
import React, {useEffect, useState} from 'react';
import {Box, Typography, Accordion} from '@strapi/design-system';
import MarkDown from 'react-markdown';
import {useFetchClient} from "@strapi/strapi/admin";
import Wrapper from "./Wrapper";


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
  const [title, setTitle] = useState('Documentation');
  const [loading, setLoading] = useState(true);
  const {get} = useFetchClient();

  const documentId = attribute?.options?.documentId;
  const type = attribute?.options?.type
  console.log('type',type);

  useEffect(() => {
    if (!documentId && (type === 'accordion' || type === 'markdown')) {
      setMarkdown('*No document configured. Set Document ID in Content Type Builder.*');
      setLoading(false);
      return;
    }

    const fetchDocument = async () => {
      try {
        const res = await get(`/content-manager/collection-types/api::documentation.documentation/${documentId}`);
        let data = null
        if ('data' in res){
          data = res.data.data;
        } else{
          throw new Error('Invalid response format');
        }
        setMarkdown(data.content || '');
        setTitle(data.title || 'Documentation');
      } catch (error) {
        if (error instanceof Error) {
          setMarkdown(`*Error loading document: ${error.message}*`);
        } else {
          setMarkdown(`*Error loading document: Unknown error*`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  if (loading){
    return <div>Loading...</div>
  }

  if (type === 'accordion') {
    return (
      <Accordion.Root>
        <Accordion.Item value="acc-01">
          <Accordion.Header>
            <Accordion.Trigger description="documentation">
              {title}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Typography display="block" padding={4}>
              <Wrapper>
                <MarkDown
                >{markdown}</MarkDown>
              </Wrapper>
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )
  }

  if (type === 'markdown'){
    return (
      <Box marginBottom={1}>
        <Typography>{title}</Typography>
        <Box background="neutral100" borderRadius="4px">
          <Wrapper>
            <MarkDown
            >{markdown}</MarkDown>
          </Wrapper>
        </Box>
      </Box>
    );
  }

  return (
    <Box background={"alternative600"} color={"black"} padding={1}>
      <Typography variant={"delta"}>{attribute?.options?.dividerText || <hr/>}</Typography>
    </Box>
  );


};

export default Input;
