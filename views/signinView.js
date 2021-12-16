import styles from "../styles/SigninView.module.css";
import Loader from "react-loader-spinner";

export default function SigninView({
  register,
  submitHandler,
  onEmail,
  onPassword,
  loading,
  errorText,
}) {
  return (
    <div className={styles.signinViewBox}>
      <h3 className={styles.headerText}>
        {register
          ? "Don't already have an account? Register as Vinobo user here:"
          : "Sign in with your Vinobo account here:"}
      </h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitHandler();
          event.target.reset();
        }}
      >
        <div className={styles.signinView}>
          <div>
            <label className={styles.emailLabel} htmlFor="email">
              Email address:
            </label>
          </div>
          <div>
            <input
              className={styles.signinEmail}
              onChange={(event) => onEmail(event.target.value)}
              name="email"
              type="email"
              autoComplete="email"
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
              onChange={(event) => onPassword(event.target.value)}
              name="password"
              type="password"
              autoComplete={register ? "new-password" : "current-password"}
            />
          </div>
          <div>
            <input type="submit" value={register ? "Register" : "Sign in"} />
          </div>
        </div>
      </form>
      <div className={styles.loadingText}>
        {loading ? <Loader type="Circles" color="#9fc5e8" height={60} width={60} /> : ""}
      </div>
      <div className={styles.errorText}>{errorText}</div>
    </div>
  );
}
