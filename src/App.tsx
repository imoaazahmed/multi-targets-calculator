import { CalculatorForm } from "./components/calculator-form";
import { ThemeSwitch } from "./components/theme-switch";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Link } from "./theme/components";

function App() {
	return (
		<main>
			<Navbar position="static" maxWidth="full">
				<NavbarBrand>
					<h1 className="text-xl text-center font-bold">Total Profit Calculator</h1>
				</NavbarBrand>

				<NavbarContent justify="end">
					<NavbarItem>
						<ThemeSwitch />
					</NavbarItem>
				</NavbarContent>
			</Navbar>

			<div className="container mx-auto my-8">
				<CalculatorForm />

				<div className="flex gap-unit-xs items-center justify-center mt-8">
					<p>Made By 🇪🇬</p>
					<Link href="https://www.linkedin.com/in/imoaazahmed/" isExternal color="foreground">
						Moaaz
					</Link>
					<p>•</p>
					<p>© {new Date().getFullYear()}</p>
				</div>
			</div>
		</main>
	);
}

export default App;
