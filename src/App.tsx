import { CalculatorForm } from "./components/calculator-form";
import { ThemeSwitch } from "./components/theme-switch";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

function App() {
	return (
		<>
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

			<div className="container mx-auto">
				<CalculatorForm />
			</div>
		</>
	);
}

export default App;
