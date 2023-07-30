import Link from 'next/link';
export default function Home() {
	return (
		<div>
			<Link href="/todolist">
				<button>ToDo List</button>
			</Link>
			<div>Home Page</div>
		</div>
	);
}
