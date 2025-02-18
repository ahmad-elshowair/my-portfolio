"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<nav className="sticky top-0 w-full z-50 bg-[#2c3531]">
				<div className="max-w-5xl mx-auto px-4">
					<div className="flex items-center justify-between h-20">
						<Link href={"/"}>
							<Image
								src={
									"https://ioytezgkjmzpfcwaxqcj.supabase.co/storage/v1/object/public/portfolio//porttfolio_logo.2.png"
								}
								width={64}
								height={64}
								alt="logo"
								className="hover:scale-150 transition-transform duration-300 ease-in-out"
							/>
						</Link>
						{/* Menu Toggle Button */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 text-green-500 hover:text-green-800 relative z-50 h-16 w-16">
							<div className="relative h-full w-full">
								<FiMenu
									className={cn(
										"absolute inset-0 w-full h-full transition-all duration-300 ease-in-out",
										isOpen
											? "opacity-0 translate-y-full"
											: "opacity-100 translate-y-0",
									)}
								/>

								<FiX
									className={cn(
										"absolute inset-0 w-full h-full transition-all duration-300 ease-in-out",
										isOpen
											? "opacity-100 translate-y-0"
											: "opacity-0 -translate-y-full",
									)}
								/>
							</div>
						</button>
					</div>
				</div>

				{/* Menu Overlay */}
				<div
					className={cn(
						"fixed top-0 right-0 w-full h-screen bg-[#588157] backdrop-blur-sm transition-transform duration-500 ease-in-out transform",
						isOpen ? "translate-x-0" : "translate-x-full",
						"overflow-hidden",
					)}>
					<ul className="flex flex-col items-center justify-center h-full space-y-12 pt-20">
						{["me", "experience", "showcase", "contact"].map((section, i) => (
							<li
								key={section}
								className={cn(
									"transform transition-all duration-700 relative group",
									"ease-bounce hover:scale-110",
									isOpen
										? "translate-y-0 opacity-100"
										: "-translate-y-full opacity-0",
									`delay-[${i * 250 + 500}ms]`,
								)}>
								{/* Left Bracket */}
								<div className="absolute right-full top-1/2 -translate-y-1/2 pr-6 transition-all duration-300 opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100">
									<span className="text-5xl font-light text-[#f5ebe0]">
										&lt;
									</span>
								</div>

								<a
									href={`#${section}`}
									onClick={() => setIsOpen(false)}
									className="text-4xl text-[#f5ebe0] hover:text-green-500 transition-all duration-300 capitalize block px-4">
									{section}
								</a>

								{/* Right Bracket */}
								<div className="absolute left-full top-1/2 -translate-y-1/2 pl-6 transition-all duration-300 opacity-0 translate-x-10 group-hover:translate-x-0 group-hover:opacity-100">
									<span className="text-5xl font-light text-[#f5ebe0]">
										/&gt;
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			</nav>

			{/* Prevent scrolling when menu is open */}
			<style jsx global>{`
				body {
					overflow: ${isOpen ? "hidden" : "auto"};
				}
			`}</style>
		</>
	);
};

export default Navbar;
