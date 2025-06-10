import React, { PropsWithChildren } from 'react';
import { render, type RenderOptions } from "@testing-library/react";
import { setupStore, type AppStore, type RootState } from '../app/store';
import { Provider } from 'react-redux';

// Used to extend the default options for the 'render()' function from RTL
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
) {
    // Destructure extendedRenderOptions which contains the default render options
    // along with the extended options of the preloadedState and redux store
    const {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions;

    // Define a wrapper which will wrap the React elements with a Redux provider with the defined store
    const Wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>
            {children}
        </Provider>
    );

    // Call the RTL render() with the UI elements and wrapper
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    };
}