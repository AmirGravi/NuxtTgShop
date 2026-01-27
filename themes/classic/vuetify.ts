export default {
    name: 'classic',
    hasDarkMode: true,
    vuetifyThemes: {
        light: {
            dark: false,
            colors: {
                background: '#FFFFFF',
                surface: '#FFFFFF',
                primary: '#1976d2',
                primaryDark: '#153448',
                secondary: '#03dac6',
                error: '#f44336',
                black: '#000000',
                info: '#2196f3',
                success: '#4caf50',
                warning: '#ff9800',
                adminPrimary:'#0558f1'
            },
        },
        dark: {
            dark: true,
            colors: {
                background: '#121212',
                surface: '#1E1E1E',
                primary: '#90caf9',
                primaryDark: '#0d1e28',
                white: '#ffffff',
                secondary: '#03dac6',
                error: '#f44336',
                info: '#64b5f6',
                success: '#81c784',
                warning: '#ffb74d',
                adminPrimary:'#42a0ed'
            },
        },
    },
}
