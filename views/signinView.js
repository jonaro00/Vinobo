import styles from "../styles/SigninView.module.css";

export default function SigninView(props) {
  return (
    <div className={styles.signinViewBox}>
      <h5 className={styles.headerText}>Sign in with your Vinobo account here:</h5>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.signInUser();
          event.target.reset();
        }}
      >
        <div className={styles.signinView}>
          <div>
            <label className={styles.emailLabel} htmlFor="email">
              E-mail address:
            </label>
          </div>
          <div>
            <input
              className={styles.signinEmail}
              onChange={(event) => props.onEmail(event.target.value)}
              name="email"
              type="email"
              placeholder={"E-mail address"}
            />
          </div>
          <div>
            <label className={styles.passwordLabel} htmlFor="password">
              Password:
            </label>
          </div>
          <div>
            <input
              className={styles.signinPassword}
              onChange={(event) => props.onPassword(event.target.value)}
              name="password"
              type="password"
              placeholder={"Password"}
            />
          </div>
          <div>
            <input type="submit" value="Sign in" />
          </div>
        </div>
      </form>
      <p>User signed in: {props.currentUser}</p>
    </div>
  );
}
