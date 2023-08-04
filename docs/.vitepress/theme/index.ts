import { EnhanceAppContext, useData, useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
// @ts-ignore
import codeblocksFold from '../../../lib/index.ts';
import '../../../style/index.scss'

export default {
    ...DefaultTheme,
    enhanceApp(ctx: EnhanceAppContext) {
        DefaultTheme.enhanceApp(ctx);
    },
    setup() {
        // 获取前言和路由
        const { frontmatter } = useData();
        const route = useRoute();
        codeblocksFold({route, frontmatter})
    }
};
