import './bootstrap';
import '../css/app.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { DrawerProvider } from './Context/DrawerContext';
import { LoaderProvider } from './Context/LoaderContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <DrawerProvider>
                <LoaderProvider>
                    <App {...props} />
                </LoaderProvider>
            </DrawerProvider>
       );
    },
    progress: {
        color: 'rgb(52, 58, 64)',
    },
});
