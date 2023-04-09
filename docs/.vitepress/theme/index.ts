import { EnhanceAppContext, useData, useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import codeblocksFold from '../../../lib/index';
import '../../../style/index.css'

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
