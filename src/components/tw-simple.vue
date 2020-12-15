<template>
    <div>
        {{ title }}         
        <slot>
            Fallback
        </slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "tw-simple",
    props: {
        title: String
    },
    setup() {
        return {}
    }
})
</script>