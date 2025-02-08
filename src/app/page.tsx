import Navbar from "@/components/Navbar";

export default function Home() {
	return (
		<>
		<Navbar/>
		<main className="flex items-center justify-center h-[calc(100vh-70px)]">
			<h1 className="text-4xl font-bold text-center">Hi, There !</h1>
		</main>
		</>
	);
}
