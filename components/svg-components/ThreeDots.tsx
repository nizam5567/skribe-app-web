import { CustomIconProps } from './types/CustomIconProps';

const ThreeDots = ({ color }: CustomIconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="6"
      viewBox="0 0 26 6"
    >
      <g id="Group_7229" data-name="Group 7229" transform="translate(-1313)">
        <circle
          id="Ellipse_182"
          data-name="Ellipse 182"
          cx="3"
          cy="3"
          r="3"
          transform="translate(1333)"
          fill={color}
        />
        <circle
          id="Ellipse_181"
          data-name="Ellipse 181"
          cx="3"
          cy="3"
          r="3"
          transform="translate(1323)"
          fill={color}
        />
        <circle
          id="Ellipse_180"
          data-name="Ellipse 180"
          cx="3"
          cy="3"
          r="3"
          transform="translate(1313)"
          fill={color}
        />
      </g>
    </svg>
);

export default ThreeDots;
