import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
	title: "Terminal Portfolio",
	description: "Interactive terminal-style portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-gray-900">{children}</body>
		</html>
	);
}
