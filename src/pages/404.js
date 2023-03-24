import Link from "next/link";

export default function Custom404() {
  return (
    <p>
      Такой страницы не существует, <Link className="error-message" href="/">Вернуться</Link>
    </p>
  );
}
