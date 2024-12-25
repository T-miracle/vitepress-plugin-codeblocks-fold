import { EnhanceAppContext, useData, useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import codeblocksFold from '../../../lib/index.ts';
import '../../../style/index.scss'

export default {
    ...DefaultTheme,
    enhanceApp(ctx: EnhanceAppContext) {
        DefaultTheme.enhanceApp(ctx);
    },
    setup() {
        codeblocksFold()
    }
};
