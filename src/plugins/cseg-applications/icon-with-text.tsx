import {Walk} from "@strapi/icons";

export const IconWithText = () => (
    <div style={{display: 'flex', alignItems: 'center', fontSize: '16px', gap:'8px'}}>
      <Walk width={20} height={20}/>
      <span>{"Membership"}</span>
    </div>
);