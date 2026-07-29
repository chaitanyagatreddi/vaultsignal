import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), svgr()],
    server: {
        proxy: {
            // SignalX / GitRadar FastAPI (python fastapi_app.py → port 7860)
            '/api/github': {
                target: 'http://127.0.0.1:7860',
                changeOrigin: true,
                // SSE needs long-lived connections
                timeout: 0,
                proxyTimeout: 0,
                configure: (proxy) => {
                    proxy.on('proxyReq', (proxyReq) => {
                        proxyReq.setHeader('Accept', 'text/event-stream')
                        proxyReq.setHeader('Connection', 'keep-alive')
                        proxyReq.setHeader('Cache-Control', 'no-cache')
                    })
                },
            },
            '/api/apollo': {
                target: 'https://api.apollo.io',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/apollo/, ''),
            },
            '/api/monid': {
                target: 'https://api.monid.ai',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/monid/, ''),
            },
        },
    },
    safelist: [
        'from-red-500',
        'to-red-700',
        'hover:shadow-red-500/50',
        'text-red-200',
        'text-red-300',
        'from-blue-600',
        'to-blue-800',
        'hover:shadow-blue-500/50',
        'text-blue-200',
        'text-blue-300'
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
