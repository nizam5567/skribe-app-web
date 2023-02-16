import { CustomIconProps } from './types/CustomIconProps';

const ActivityIcon = ({ color }: CustomIconProps) => (
        <svg id="ic-actions-notifications-add" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <rect id="Rectangle_467" data-name="Rectangle 467" width="20" height="20" fill="none"/>
            <g id="ic-actions-notifications-add-2" data-name="ic-actions-notifications-add" transform="translate(2.5 2.5)">
                <path id="Path_432" data-name="Path 432" d="M16.667,15.5H5L6.847,6.268A4.065,4.065,0,0,1,10.833,3h0a4.065,4.065,0,0,1,3.986,3.267l.967,4.83Z" transform="translate(-3.333 -3)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" fillRule="evenodd"/>
                <line id="Line_558" data-name="Line 558" x2="15" transform="translate(0 12.499)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"/>
                <path id="Path_433" data-name="Path 433" d="M14,18a2.5,2.5,0,0,1-5,0" transform="translate(-4 -5.5)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"/>
                <line id="Line_559" data-name="Line 559" x1="5" transform="translate(5 7.457)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="1.2"/>
                <line id="Line_560" data-name="Line 560" y1="5" transform="translate(7.5 4.957)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="1.2"/>
            </g>
        </svg>
);

export default ActivityIcon;
