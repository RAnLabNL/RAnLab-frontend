import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/region">
        <a>
          Region Dashboard
        </a>
      </Link>
    </div>
  )
}
