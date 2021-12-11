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
            <div className={styles.titleLogo}>
              <Image src={"/titleLogo.png"} width={112} height={36} alt="Logo" />
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
            <p className={styles.signedInUser}>{user}</p>
            <a className={"btn"} onClick={signOut}>
              Sign Out
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
