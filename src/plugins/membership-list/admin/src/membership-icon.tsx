import {User} from "@strapi/icons";

export const MembershipIcon = () => (
    <div style={{display: 'flex', alignItems: 'center', fontSize: '16px', gap:'8px'}}>
      <User width={20} height={20}/>
      <span>{"Membership List"}</span>
    </div>
);
