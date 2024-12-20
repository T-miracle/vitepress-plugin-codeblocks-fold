import { nextTick, onMounted, watch } from 'vue';
let themeChangeObserve = null;
/**
 * 设置代码块折叠功能
 * @param frontmatter 前言
 * @param defaultAllFold 默认全部折叠
 * @param height 高度
 */
const cbf = (frontmatter, defaultAllFold, height) => {
    // 获取前言值
    let fm = true;
    if (frontmatter.value && frontmatter.value.cbf !== undefined) {
        fm = frontmatter.value.cbf;
    }
    // 获取文章里的所有代码块
    const codeblocks = document.querySelectorAll('.vp-doc [class*="language-"]');
    // console.log(codeblocks);
    // 遍历给代码块添加折叠
    codeblocks.forEach((el, index) => {
        const element = el;
        if (element.offsetHeight !== 0 && element.offsetHeight <= height) {
            return;
        }
        if (Array.isArray(fm)) { // 如果是数组
            if (defaultAllFold) {
                if (fm.indexOf(index + 1) === -1) {
                    judge(element, height);
                }
            }
            else {
                if (fm.indexOf(index + 1) !== -1) {
                    judge(element, height);
                }
            }
        }
        else { // 如果是布尔值
            if (defaultAllFold && fm) {
                judge(element, height);
            }
        }
    });
    !themeChangeObserve && themeChangeObserver();
    // 获取url中的锚点
    const hash = location.hash;
    // 如果有锚点，滚动到锚点位置
    if (hash) {
        setTimeout(() => {
            const target = document.querySelector(hash);
            const headerHeight = document.querySelector('.VPNav').clientHeight;
            if (target) {
                // 带动画滚动
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - headerHeight,
                    behavior: 'smooth'
                });
            }
        }, 200);
    }
};
/**
 * 兼容代码块组
 * @param el 元素
 * @param height 限制高度
 */
const observer = (el, height) => {
    new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const _el = mutation.target;
            if (mutation.attributeName === 'class' && _el.classList.contains('active') && _el.offsetHeight > height) {
                fold(el, height);
            }
        });
    }).observe(el, {
        attributeFilter: ['class']
    });
};
/**
 * 判断是否是代码块组中未显示的代码块
 * @param el 元素
 * @param height 高度
 */
const judge = (el, height) => {
    const displayStatus = window.getComputedStyle(el, null).getPropertyValue('display');
    const isDetailBlock = el.parentElement.classList.contains('details');
    if (displayStatus === 'none' || isDetailBlock) {
        observer(el, height);
    }
    else {
        fold(el, height);
    }
};
/**
 * 折叠与展开
 * @param el 代码块元素
 * @param height 限制高度
 */
const fold = (el, height) => {
    if (el.classList.contains('fold')) {
        return;
    }
    el.classList.add('fold');
    const pres = el.querySelectorAll('pre');
    pres.forEach(pre => {
        pre.style.height = height + 'px';
        pre.style.overflow = 'hidden';
    });
    el.style.marginBottom = '48px';
    el.style.borderRadius = '8px 8px 0 0';
    const foldBtn = document.createElement('div');
    const mask = document.createElement('div');
    mask.style.backgroundImage = 'linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, var(--vp-code-block-bg) 100%)';
    mask.className = 'codeblocks-mask';
    foldBtn.style.backgroundColor = 'var(--vp-code-block-bg)';
    foldBtn.className = 'fold-btn';
    foldBtn.insertAdjacentHTML('afterbegin', `<svg t="1680893932803" class="fold-btn-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1473" width="16" height="16" style="fill: var(--vp-code-block-bg); filter: invert(100%)"><path d="M553.1392 778.88512l451.61472-451.61472c22.64576-22.64576 22.64576-59.4176 0-82.14016-22.64576-22.64576-59.4176-22.64576-82.14016 0l-410.5472 410.61888-410.61888-410.624c-22.64576-22.64576-59.4176-22.64576-82.14016 0-22.64576 22.64576-22.64576 59.4176 0 82.14016l451.69152 451.69152a58.08128 58.08128 0 0 0 82.14016-0.07168z" p-id="1474"></path></svg>`);
    el.appendChild(mask);
    el.appendChild(foldBtn);
    // 添加折叠事件
    foldBtn.onclick = () => {
        const maskElement = el.querySelector('.codeblocks-mask');
        const iconElement = el.querySelector('.fold-btn-icon');
        pres.forEach(pre => {
            foldBtnEvent({ pre, foldBtn, iconElement, maskElement }, height);
        });
    };
};
/**
 * 折叠事件
 * @param els 元素对象
 * @param height 高度
 */
const foldBtnEvent = (els, height) => {
    const { pre, foldBtn, iconElement, maskElement } = els;
    if (pre.classList.contains('expand')) { // 折叠
        const oldPos = foldBtn.getBoundingClientRect().top;
        pre.style.height = height + 'px';
        pre.style.overflow = 'hidden';
        pre.scrollTo(0, 0);
        pre.classList.remove('expand');
        maskElement.style.height = '48px';
        iconElement.classList.remove('turn');
        // 保持按钮位置并滚动页面
        window.scrollTo(0, foldBtn.getBoundingClientRect().top + window.scrollY - oldPos);
    }
    else { // 展开
        pre.style.height = 'auto';
        pre.style.overflow = 'auto';
        pre.classList.add('expand');
        maskElement.style.height = '0';
        iconElement.classList.add('turn');
    }
};
const rebindListener = (height) => {
    // console.log('重新绑定监听...')
    const codeblocks = document.querySelectorAll('.vp-doc [class*="language-"]');
    codeblocks.forEach(el => {
        const foldBtn = el.querySelector('.fold-btn');
        // console.log(`--->`, foldBtn?.onclick)
        if (foldBtn && !foldBtn.onclick) {
            foldBtn.onclick = () => {
                const pre = el.querySelector('pre');
                const maskElement = el.querySelector('.codeblocks-mask');
                const iconElement = el.querySelector('.fold-btn-icon');
                foldBtnEvent({ pre, foldBtn, iconElement, maskElement }, height);
            };
        }
    });
};
function isRGBA(value) {
    // 使用正则表达式匹配 RGBA 值的模式
    const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/i;
    // 使用 test 方法检查值是否符合模式
    return rgbaPattern.test(value);
}
const themeChangeObserver = () => {
    hideMask();
    themeChangeObserve = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                // console.log(`hideMask---${new Date()}`)
                hideMask();
            }
        });
    });
    themeChangeObserve.observe(document.querySelector('html'), {
        attributeFilter: ['class']
    });
};
const hideMask = () => {
    if (document.querySelector('.vp-doc [class*="language-"]')) {
        let _isRGBA = isRGBA(window.getComputedStyle(document.querySelector('.vp-doc [class*="language-"]'), null).getPropertyValue('background-color'));
        // console.log(`isRGBA`, _isRGBA)
        if (_isRGBA) {
            nextTick(() => {
                document.querySelectorAll('.codeblocks-mask').forEach(item => {
                    // console.log(`display`);
                    item.style.display = 'none';
                });
            }).then();
        }
        else {
            nextTick(() => {
                document.querySelectorAll('.codeblocks-mask').forEach(item => {
                    item.style.display = '';
                });
            }).then();
        }
    }
};
/**
 * Set codeblocks folding.  设置代码块折叠
 * @param vitepressObj route and frontmatter.  路由与前言
 * @param defaultAllFold Collapse all by default?  默认全部折叠？
 * @param height The height of the folded codeblocks（default 400px）.  折叠后的代码块高度（默认 400px）
 */
const codeblocksFold = (vitepressObj, defaultAllFold = true, height = 400) => {
    // console.log(`初始化`)
    const { frontmatter, route } = vitepressObj;
    onMounted(() => {
        // console.log('onMounted...')
        cbf(frontmatter, defaultAllFold, height);
        rebindListener(height);
    });
    watch(() => route.path, () => {
        // console.log('watch route...')
        nextTick(() => {
            cbf(vitepressObj.frontmatter, defaultAllFold, height);
            rebindListener(height);
        }).then();
    });
};
export default codeblocksFold;
