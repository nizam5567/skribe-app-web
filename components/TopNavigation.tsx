import Link from 'next/link';
import HamburgerIcon from './svg-components/HamburgerIcon';
import styles from './TopNavigation.module.scss';
import ScheduleNewEventButton from './ScheduleNewEventButton';
import SkribeFabicon from './svg-components/SkribeFabicon';

interface Props {
  handleHamburgerIconClick: Function
}

const TopNavigation = ({ handleHamburgerIconClick }: Props) => (
    <div className={styles['top-navigation']}>
      <span className={styles['hamburger-icon']} onClick={() => handleHamburgerIconClick()}>
        <HamburgerIcon />
      </span>
      <span className={styles['skribe-logo']}>
        <Link href="/home">
          <a>
            <SkribeFabicon />
          </a>
        </Link>
      </span>
      <span style={{ 'marginLeft': 'auto' }}>
        <ScheduleNewEventButton />
      </span>
    </div>
);

export default TopNavigation;
