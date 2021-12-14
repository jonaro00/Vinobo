import Link from "next/link";

export default function RegisterSuccessView(props) {
  return (
    <div>
      <div>You have successfully registered a Vinobo account.</div>
      <Link href="/">
        <a>Continue to vinobo</a>
      </Link>
    </div>
  );
}
