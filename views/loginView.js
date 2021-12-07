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
      </div>
      {props.error ? (
        <div>There was an error: {props.error.message}</div>
      ) : (
        <div>Current user: {props.currentUser}</div>
      )}
    </div>
  );
}
