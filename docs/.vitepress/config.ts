import { defineConfig } from 'vitepress';

export default defineConfig({
    // lang: "zh-CN",
    title: 'test',
    markdown: {
        theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
        }
    },
    // 主题配置
    themeConfig: {
        sidebar: [
            {text: 'index', link : '/index.md'},
            {text: 'test', link : '/test.md'},
            {text: 'eee', link : '/eee.md'},
        ]
    }
});
