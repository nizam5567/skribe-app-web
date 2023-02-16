import { CustomIconProps } from './types/CustomIconProps';

const TimePickerIcon = ({ color }: CustomIconProps) => (
    <svg
      id="Group_6745"
      data-name="Group 6745"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <rect
        id="Rectangle_2172"
        data-name="Rectangle 2172"
        width="24"
        height="24"
        fill={color}
        opacity="0"
      />
      <path
        id="midnight"
        d="M16.779,8.389a8.357,8.357,0,0,1-1.421,4.657.655.655,0,0,1-1.09-.729A7.066,7.066,0,0,0,15.442,9h-.6a.655.655,0,1,1,0-1.311h.588a7.091,7.091,0,0,0-6.355-6.34V1.95a.655.655,0,1,1-1.311,0V1.338A7.091,7.091,0,0,0,1.346,7.685h.686A.655.655,0,1,1,2.032,9H1.337a7.09,7.09,0,0,0,6.43,6.445v-.677a.655.655,0,1,1,1.311,0v.671a7.053,7.053,0,0,0,2.974-.986.655.655,0,0,1,.679,1.121,8.391,8.391,0,1,1,4.049-7.18ZM8.389,4.67a.655.655,0,0,0-.655.655V6.769L5.485,4.444a.655.655,0,0,0-.942.911l3.375,3.49a.655.655,0,0,0,1.127-.456V5.325A.655.655,0,0,0,8.389,4.67Z"
        transform="translate(3.61 3.611)"
        fill={color}
      />
    </svg>
);

export default TimePickerIcon;
