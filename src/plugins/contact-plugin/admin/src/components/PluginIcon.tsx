import { Message } from '@strapi/icons';

const PluginIcon = () =>
  <div style={{display: 'flex', alignItems: 'center', fontSize: '16px', gap:'8px'}}>
    <Message width={20} height={20}/>
    <span>{"Contact messages"}</span>
  </div>;

export { PluginIcon };
