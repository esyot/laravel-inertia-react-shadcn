import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import "../css/app.css";

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob<Parameters<typeof resolvePageComponent>[1][""]>(
                "./Pages/**/*.tsx",
            ),
        ),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
