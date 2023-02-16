import styles from './SocialLogin.module.scss';
// import {
//     faGoogle, faMicrosoft, faApple
// } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoogleIcon from './svg-components/GoogleIcon';
import MicrosoftIcon from './svg-components/MicrosoftIcon';
import AppleIcon from './svg-components/AppleIcon';

interface SocialLoginProps {
  providers: any
}

const SocialLogin = ({ providers }: SocialLoginProps) => {
  const hasGoogleProvider = providers.indexOf('google') !== -1;
  const hasMicrosoftProvider = providers.indexOf('microsoft') !== -1;
  const hasAppleProvider = providers.indexOf('apple') !== -1;

  return (
        <div className={`text-center ${styles['social-btn']}`}>
            {hasGoogleProvider && <a href="#" className={`btn ${styles['btn-social-custom']} ${styles['btn-block']}`}>
                {/* <FontAwesomeIcon icon={faGoogle} className={styles["faIconCls"]} /> */}
                <span className={styles['social-icon']}><GoogleIcon /></span>
                Continue with Google
                <span className={styles['long-arrow-right']} style={{ 'backgroundImage': 'url(./images/arrow-right.png)' }}></span>
            </a>}
            {hasMicrosoftProvider && <a href="#" className={`btn ${styles['btn-social-custom']} ${styles['btn-block']}`}>
                {/* <FontAwesomeIcon icon={faMicrosoft} className={styles["faIconCls"]} /> */}
                <span className={styles['social-icon']}><MicrosoftIcon /></span>
                Continue with Microsoft
                <span className={styles['long-arrow-right']} style={{ 'backgroundImage': 'url(./images/arrow-right.png)' }}></span>
            </a>}
            {hasAppleProvider && <a href="#" className={`btn ${styles['btn-social-custom']} ${styles['btn-block']}`}>
                {/* <FontAwesomeIcon icon={faApple} className={styles["faIconCls"]} /> */}
                <span className={styles['social-icon']}><AppleIcon /></span>
                Continue with Apple
                <span className={styles['long-arrow-right']} style={{ 'backgroundImage': 'url(./images/arrow-right.png)' }}></span>
            </a>}
        </div>
  );
};

export default SocialLogin;
