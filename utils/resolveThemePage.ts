import { defineAsyncComponent } from "vue";
import { useThemeStore } from "~/stores/theme";

const themePages = import.meta.glob("~/themes/*/pages/**/*.vue");

function pickPage(theme: string, pagePath: string) {

    const suffix = `/themes/${theme}/pages/${pagePath}.vue`;

    const key = Object.keys(themePages).find((k) => k.endsWith(suffix));
    return key ? (themePages as any)[key] : null;
}

export function resolveThemePage(pagePath: string) {
    const themeStore = useThemeStore();

    return defineAsyncComponent(async () => {
        const theme = themeStore.name || "classic";

        const loader = pickPage(theme, pagePath);

        if (!loader) {
            throw new Error(
                `Theme page not found. theme="${theme}" page="${pagePath}". Expected: themes/${theme}/pages/${pagePath}.vue`
            );
        }

        return await loader();
    });
}
