import { CustomIconProps } from './types/CustomIconProps';

const MyClipsIcon = ({ color }: CustomIconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18.167" height="18.167" viewBox="0 0 18.167 18.167">
            <g id="ic-media-play" transform="translate(0.75 0.75)">
                <path id="Path_238" data-name="Path 238" d="M9.12,7.214v7.9c0,.158.133.267.242.192l6.133-3.95a.25.25,0,0,0,0-.383L9.362,7C9.253,6.948,9.12,7.056,9.12,7.214Z" transform="translate(-3.187 -2.831)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" fillRule="evenodd"/>
                <circle id="Ellipse_67" data-name="Ellipse 67" cx="8.333" cy="8.333" r="8.333" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            </g>
        </svg>
);

export default MyClipsIcon;
