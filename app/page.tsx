"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";

interface Command {
	input: string;
	output: string[];
}

export default function TerminalPortfolio() {
	const [isLoading, setIsLoading] = useState(true);
	const [currentInput, setCurrentInput] = useState("");
	const [history, setHistory] = useState<Command[]>([]);
	const [commandHistory, setCommandHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	const commands = {
		help: [
			"Available commands:",
			"  about     - Learn about me",
			"  skills    - View my technical skills",
			"  projects  - See my projects",
			"  contact   - Get my contact information",
			"  resume    - View my resume",
			"  clear     - Clear the terminal",
			"  help      - Show this help message",
		],
		about: [
			"Hi! I'm Sharif Md Minhaz, a Full Stack Developer",
			"",
			"I'm passionate about creating innovative web applications",
			"and solving complex problems through code. With expertise",
			"in modern web technologies, I enjoy building user-friendly",
			"interfaces and robust backend systems.",
			"",
			"When I'm not coding, you can find me exploring new",
			"technologies, contributing to open source projects,",
			"or enjoying a good cup of coffee.",
		],
		skills: [
			"Technical Skills:",
			"",
			"Frontend:",
			"  • React, Next.js, TypeScript",
			"  • HTML5, CSS3, Tailwind CSS",
			"  • JavaScript (ES6+)",
			"",
			"Backend:",
			"  • Node.js, Express.js",
			"  • Python, Flask",
			"  • RESTful APIs, GraphQL",
			"",
			"Database:",
			"  • PostgreSQL, MongoDB",
			"  • Redis, SQLITE",
			"",
			"Tools & Others:",
			"  • Git, Docker, AWS",
			"  • Jest, Cypress",
			"  • Figma, VS Code",
		],
		projects: [
			"Featured Projects:",
			"",
			"1. E-Commerce Platform",
			"   • Full-stack web application with React & Node.js",
			"   • Features: User auth, payment integration, admin panel",
			"   • Tech: React, Express, PostgreSQL, Stripe",
			"",
			"2. Task Management App",
			"   • Real-time collaborative task management",
			"   • Features: Drag & drop, real-time updates, team collaboration",
			"   • Tech: Next.js, Socket.io, MongoDB",
			"",
			"3. Weather Dashboard",
			"   • Interactive weather application with data visualization",
			"   • Features: Location-based weather, forecasts, charts",
			"   • Tech: React, D3.js, OpenWeather API",
			"",
			"Type 'github' to view my GitHub profile",
		],
		contact: [
			"Contact Information:",
			"",
			"📧 Email: smmr.career@gmail.com",
			"💼 LinkedIn: linkedin.com/in/minhaz-sharif-614724205",
			"🐙 GitHub: github.com/sharif-minhaz",
			"🌐 Website: dev-sharif-md-minhaz.netlify.app",
			"📱 Phone: +880 (130) 867-3831",
			"",
			"Feel free to reach out for collaborations,",
			"job opportunities, or just to say hello!",
		],
		resume: [
			"Resume:",
			"",
			"📄 You can download my resume at:",
			"   https://dev-sharif-md-minhaz.netlify.app",
			"",
			"Or view it online at:",
			"   https://dev-sharif-md-minhaz.netlify.app",
			"",
			"Last updated: July 2025",
		],
		github: ["Opening GitHub profile...", "🔗 https://github.com/sharif-minhaz"],
		linkedin: [
			"Opening LinkedIn profile...",
			"🔗 https://linkedin.com/in/minhaz-sharif-614724205",
		],
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			setHistory([
				{
					input: "",
					output: [
						"Welcome to my terminal portfolio!",
						"",
						"Type 'help' to see available commands.",
						"Use arrow keys to navigate command history.",
						"",
					],
				},
			]);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!isLoading && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isLoading]);

	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [history]);

	const handleCommand = (input: string) => {
		const command = input.toLowerCase().trim();
		let output: string[] = [];

		if (command === "clear") {
			setHistory([]);
			return;
		}

		if (command in commands) {
			output = commands[command as keyof typeof commands];
		} else if (command === "") {
			output = [""];
		} else {
			output = [`Command not found: ${command}`, "Type 'help' to see available commands."];
		}

		setHistory((prev) => [...prev, { input, output }]);
		setCommandHistory((prev) => [...prev, input]);
		setHistoryIndex(-1);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleCommand(currentInput);
		setCurrentInput("");
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			if (commandHistory.length > 0) {
				const newIndex =
					historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
				setHistoryIndex(newIndex);
				setCurrentInput(commandHistory[newIndex] || "");
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIndex >= 0) {
				const newIndex = historyIndex + 1;
				if (newIndex >= commandHistory.length) {
					setHistoryIndex(-1);
					setCurrentInput("");
				} else {
					setHistoryIndex(newIndex);
					setCurrentInput(commandHistory[newIndex]);
				}
			}
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-900 flex items-center justify-center">
				<div className="text-green-400 font-mono text-lg">Loading terminal...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4">
			<div className="max-w-4xl mx-auto">
				<div className="mb-4">
					<div className="flex items-center space-x-2 mb-2">
						<div className="w-3 h-3 bg-red-500 rounded-full"></div>
						<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
						<div className="w-3 h-3 bg-green-500 rounded-full"></div>
						<span className="text-gray-400 text-sm ml-4">terminal-portfolio</span>
					</div>
					<div className="border-t border-gray-700"></div>
				</div>

				<div
					ref={terminalRef}
					className="h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
				>
					{history.map((command, index) => (
						<div key={index} className="mb-2">
							{command.input && (
								<div className="flex items-center">
									<span className="text-blue-400">visitor@portfolio:~$</span>
									<span className="ml-2">{command.input}</span>
								</div>
							)}
							<div className="ml-0">
								{command.output.map((line, lineIndex) => (
									<div key={lineIndex} className="whitespace-pre-wrap">
										{line}
									</div>
								))}
							</div>
						</div>
					))}

					<form onSubmit={handleSubmit} className="flex items-center">
						<span className="text-blue-400">visitor@portfolio:~$</span>
						<input
							ref={inputRef}
							type="text"
							value={currentInput}
							onChange={(e) => setCurrentInput(e.target.value)}
							onKeyDown={handleKeyDown}
							className="ml-2 bg-transparent outline-none flex-1 text-green-400"
							autoComplete="off"
							spellCheck="false"
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
