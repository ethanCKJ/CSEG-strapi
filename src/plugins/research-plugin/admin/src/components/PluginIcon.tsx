import { Globe } from '@strapi/icons';

const PluginIcon = () =>
  <div style={{display: 'flex', alignItems: 'center', fontSize: '16px', gap:'8px'}}>
    <Globe width={20} height={20}/>
    <span>{"Research projects"}</span>
  </div>;

export { PluginIcon };
