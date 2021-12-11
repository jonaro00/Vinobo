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
              <Image src={"/logo.png"} width={37} height={37} alt="Logo" />
            </div>
            <div className={styles.siteNameContainer}>
              <div className={styles.siteName}></div>
              <div className={styles.siteSubTitle}></div>
            </div>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <Image src={"/titleLogo.png"} width={140} height={42} alt="Logo" />
          </a>
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <p className={styles.signedInUser}>{user}</p>
            <a className={"btn"} onClick={signOut}>
              <button>Sign Out</button>
            </a>
          </>
        ) : (
          <>
            <Link href="/signin">
              <a className={"btn"}>Sign In</a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
