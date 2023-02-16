interface TagsIconProps {
  color: string
}
const TagsIcon = ({ color }: TagsIconProps) => (
    <svg
      id="ic-actions-hashtag"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <rect
        id="Rectangle_453"
        data-name="Rectangle 453"
        width="20"
        height="20"
        fill="none"
      />
      <g
        id="ic-actions-hashtag-2"
        data-name="ic-actions-hashtag"
        transform="translate(4.291 4.03)"
      >
        <line
          id="Line_520"
          data-name="Line 520"
          x2="10.999"
          transform="translate(0 9.806)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
        <line
          id="Line_521"
          data-name="Line 521"
          x2="10.852"
          transform="translate(0.566 2.133)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
        <line
          id="Line_522"
          data-name="Line 522"
          y1="11.939"
          x2="1.395"
          transform="translate(8.377)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
        <line
          id="Line_523"
          data-name="Line 523"
          y1="11.939"
          x2="1.394"
          transform="translate(2.063)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
      </g>
    </svg>
);

export default TagsIcon;
