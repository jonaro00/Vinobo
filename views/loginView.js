export default function LoginView(props) {
  return (
    <div>
      <div>
        <input
          type="email"
          placeholder="Email..."
          onChange={(event) => props.onEmail(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => props.onPassword(event.target.value)}
        ></input>
        <button onClick={props.login}>Log in!</button>
        <button onClick={props.logout}>Log out!</button>
      </div>
      {props.user ? <div>Current user: {props.user.email}</div> : <div>No user logged in</div>}
      {props.error ? <div>{props.error.message}</div> : <div></div>}
    </div>
  );
}
