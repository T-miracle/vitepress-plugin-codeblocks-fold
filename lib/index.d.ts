import { Ref } from 'vue';
import { PageData, Route } from 'vitepress';
type vitepressAPI = {
    frontmatter: Ref<PageData['frontmatter']>;
    route: Route;
};
/**
 * Set codeblocks folding.  设置代码块折叠
 * @param {vitepressAPI} vitepressObj route and frontmatter.  路由与前言
 * @param [defaultAllFold] Collapse all by default?  默认全部折叠？
 * @param [height] The height of the folded codeblocks（default 400px）.  折叠后的代码块高度（默认 400px）
 */
declare const codeblocksFold: (vitepressObj: vitepressAPI, defaultAllFold?: boolean, height?: number) => void;
export default codeblocksFold;
