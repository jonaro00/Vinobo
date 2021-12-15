import Link from "next/link";

export default function RegisterSuccessView(props) {
  return (
    <div>
      <h5>You have successfully registered a Vinobo account.</h5>
      <Link href="/">
        <a>
          <u>Continue</u> to Vinobo
        </a>
      </Link>
    </div>
  );
}
