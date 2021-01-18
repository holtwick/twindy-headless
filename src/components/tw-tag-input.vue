<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  {{ candidates }} {{ filter }}
  <tw-completion
    :items="candidates"
    @add="handleSelection"
    @deleteLast="handleDeleteLast"
    @filter="handleFilter"
    class="tw-tag-input"
    placeholder="Add Tag"
    min-size="120"
  >
    <template #before>
      <span v-for="t in tags" class="tw-tag-field" :key="t.id">
        {{ t.title }}
        <span @click.prevent="doRemoveTag(t.id)" class="tag-remove">x</span>
      </span>
    </template>
    <template #item="{ item }">
      <span v-if="item.action">
        Create new tag <b>{{ item.value }}</b>
      </span>
      <span v-else>
        {{ item.title }}
      </span>
    </template>
  </tw-completion>
</template>

<script lang="ts">
import twCompletion from "./tw-completion.vue"
import { defineComponent, ref, computed, reactive, watch, PropType } from "vue"

export function arrayRemoveElement(arr: any[], el: any) {
  if (arr && Array.isArray(arr)) {
    let index
    while ((index = arr.indexOf(el)) !== -1) {
      arr.splice(index, 1)
    }
    return arr
  }
  return []
}

interface Tag {
  id: string
  title: string
}

export default defineComponent({
  components: {
    twCompletion,
  },
  props: {
    modelValue: {
      type: Array as PropType<Tag[]>,
    },
    allTags: {
      type: Object as PropType<{ [key: string]: Tag }>,
    },
  },
  emits: ["update:modelValue"],
  setup(props: any, { emit }) {
    let filter = ref("")
    let candidates = ref<Tag[]>([])

    let tags = computed(() => {
      console.log("calc tags")
      return (props.modelValue || []).map((tagID: string) => {
        return props.allTags[tagID]
      })
    })

    let methods = {
      setTags(tags: string[] = []) {
        emit("update:modelValue", [...tags])
      },
      doRemoveTag(id: string) {
        methods.setTags(arrayRemoveElement(props.modelValue, id))
      },
      async handleSelection(item: any) {
        //   log("add item", item)
        //   if (item.action) {
        //     let title = item.value.toString().trim()
        //     if (title) {
        //       let item = $op.createItemObject({
        //         module: "tag",
        //         title,
        //       })
        //       item = cloneObject(await $op.storeItem(item))
        //       if (item) {
        //         this.setTags([...cloneObject(this.item.tags || []), item._id])
        //       }
        //     }
        //   } else if (item._id) {
        //     this.setTags([...cloneObject(this.item.tags || []), item._id])
        //   } else {
        //     log("unknown item", item)
        //   }
      },
      handleFilter(filter: string) {
        let value = filter.trim()
        console.log("calc candidates", value)
        let lvalue = value.toLowerCase()
        let exactMatch = false
        let currentTags = props.modelValue || []
        // @ts-ignore
        let items: Tags[] = Object.values(props.allTags).filter((item: Tag) => {
          if (currentTags.includes(item.id)) {
            if (value) {
              const title = item.title.toString().toLowerCase()
              if (item.title === lvalue) {
                exactMatch = true
              }
              return title.indexOf(lvalue) >= 0
            }
            return true
          }
          return false
        })
        if (value && !exactMatch) {
          items.push({ action: "create", value })
        }
        candidates.value = items
      },
      handleDeleteLast() {
        console.log("delete last")
        // TODO:2020-06-16 Mark before deletion
        let tags = props.modelValue
        if (tags.pop()) {
          methods.setTags(tags)
        }
      },
    }

    return {
      ...methods,
      candidates,
      tags,
      filter,
    }
  },
})
</script>
