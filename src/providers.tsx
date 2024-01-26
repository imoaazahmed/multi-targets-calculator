import { useNavigate } from "react-router-dom";

// Next UI
import { NextUIProvider } from "@nextui-org/react";

// Redux
import { Provider } from "react-redux";
import store from "@/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();

	return (
		<Provider store={store}>
			<NextUIProvider navigate={navigate}>{children}</NextUIProvider>
		</Provider>
	);
}
