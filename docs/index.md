# Test

:::code-group

```vue [Vue2]
<!--/在`directive`中定义-->
<script>
    export default {
        directives: {
            focus: {
                inserted: function(el) {
                    el.focus(); //页面完成加载之后自动让输入框获取焦点的小功能
                }
            }
        }
    }
</script>
```

```vue [Vue3]
<!--/在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令-->
<script setup lang="ts">
    // 在模板中启用 v-focus
    const vFocus = {
        mounted: (el: HTMLElement) => el.focus()
    }
</script>
```

```vue [Vue3]
<!--/在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令-->
<script setup lang="ts">
    // 在模板中启用 v-focus
    const vFocus = {
        mounted: (el: HTMLElement) => el.focus()
    }
</script>
<!--/在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令-->
<script setup lang="ts">
    // 在模板中启用 v-focus
    const vFocus = {
        mounted: (el: HTMLElement) => el.focus()
    }
</script>
<!--/在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令-->
<script setup lang="ts">
    // 在模板中启用 v-focus
    const vFocus = {
        mounted: (el: HTMLElement) => el.focus()
    }
</script>
<!--/在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令-->
<script setup lang="ts">
    // 在模板中启用 v-focus
    const vFocus = {
        mounted: (el: HTMLElement) => el.focus()
    }
</script>
```

:::
