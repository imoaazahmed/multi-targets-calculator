import { render as rtlRender } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import store from "@/redux/store";
import { ReactNode } from "react";

function render(ui: any, { ...renderOptions } = {}) {
	function Wrapper({ children }: { children: ReactNode }) {
		return (
			<ReduxProvider store={store}>
				<NextUIProvider>{children}</NextUIProvider>
			</ReduxProvider>
		);
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
