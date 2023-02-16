import Image from 'next/image';
import Link from 'next/link';
import styles from './SigninLeft.module.scss';

const SigninLeft = () => (
    <div className={styles['signin-left']} style={{ 'backgroundImage': "url('./images/signin-left-bg.png')" }}>
      <div className={styles.logo}>
        <Link href="/signin">
          <a>
            <Image src="/images/logo.png" alt="Skribe Logo" width={93} height={31} />
          </a>
        </Link>
      </div>

      <div className={styles['signin-left-content']}>
        <h1 className={styles.heading}>
          Where Testimony <br />
          Comes Alive
        </h1>
        <p className={styles['short-details']}>Skribe.ai empowers legal professionals to efficiently capture, analyze, and share legal testimony.</p>
      </div>
    </div>
);

export default SigninLeft;
