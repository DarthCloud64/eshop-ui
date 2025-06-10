import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
    test: {
        environment: 'jsdom', // sets the test environment to JS/browser instead of node
        globals: true, // injects methods like expect()
        css: false,
        setupFiles: "./src/setupTests.ts"
    },
}));