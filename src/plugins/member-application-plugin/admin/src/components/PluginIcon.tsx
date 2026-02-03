import { Walk } from '@strapi/icons';

const PluginIcon = () =>
  <div style={{display: 'flex', alignItems: 'center', fontSize: '16px', gap:'8px'}}>
    <Walk width={20} height={20}/>
    <span>{"New members"}</span>
  </div>;
  // <Walk width={20} height={20}/>

export { PluginIcon };
