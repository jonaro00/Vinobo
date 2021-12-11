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
          <a>
            About
            <i className={"fas fa-info-circle"} />
          </a>
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <p className={styles.signedInUser}>
              {user}
              <i className={"fas fa-user-circle"} />
            </p>
            <a className={"btn"} onClick={signOut}>
              Sign Out
              <i className={"fas fa-sign-out-alt"} />
            </a>
          </>
        ) : (
          <>
            <Link href="/signin">
              <a className={"btn"}>
                Sign In
                <i className={"fas fa-sign-in-alt"} />
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
