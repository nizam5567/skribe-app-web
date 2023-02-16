import { CustomIconProps } from './types/CustomIconProps';

const ParticipantIcon = ({ color }: CustomIconProps) => (
        <svg id="ic-actions-user" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <rect id="Rectangle_166" data-name="Rectangle 166" width="20" height="20" fill="none"/>
        <g id="ic-actions-user-2" data-name="ic-actions-user" transform="translate(2.5 1.658)">
            <path id="Path_42" data-name="Path 42" d="M3,20.333l.658-2.4c2.175-7.917,11.508-7.917,13.683,0l.658,2.4" transform="translate(-3 -3.649)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <circle id="Ellipse_20" data-name="Ellipse 20" cx="4.167" cy="4.167" r="4.167" transform="translate(3.333)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="1.5"/>
        </g>
        </svg>
);

export default ParticipantIcon;
