import { ThemeSwitch } from "@/components/theme-switch";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { SmartAnalyzer } from "@/components/smart-analyzer";

export const AppNavBar = () => {
	return (
		<Navbar position="static" maxWidth="full">
			<NavbarBrand>
				<h1 className="text-xl text-center font-bold">Multi-Targets Calculator</h1>
			</NavbarBrand>

			<NavbarContent justify="end">
				<NavbarItem>
					<SmartAnalyzer />
				</NavbarItem>
				<NavbarItem>
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
