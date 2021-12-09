import Image from "next/image";
import Link from "next/link";
import styles from "../styles/HeaderView.module.css";

export default function HeaderView({ user, signOut }) {
  return (
    <div className={styles.container}>
      <div>
        <Link href="/">
          <a>
            <div className={styles.logo}>
              <Image src={"/logo2.png"} width={42} height={42} alt="Logo" />
            </div>
            <div className={styles.siteNameContainer}>
              <div className={styles.siteName}>Vinobo</div>
              <div className={styles.siteSubTitle}>Video Notebook</div>
            </div>
          </a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <p>Signed in as: {user}</p>
            <a className={"btn"} onClick={signOut}>
              Sign Out
            </a>
          </>
        ) : (
          <>
            <Link href="#">
              <a>Sign In</a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
