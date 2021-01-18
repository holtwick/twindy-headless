<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <tw-completion
    :items="candidates"
    @add="handleSelection"
    @filter="handleFilter"
    @deleteLast="handleDeleteLast"
    class="op-tag-input"
    placeholder="Add Tag"
    min-size="120"
  >
    <template #before>
      <span
        v-for="t in tags"
        :class="`op-tag-field co-tag co-tag-${t.color || 'default'}`"
      >
        {{ t.title }}
        <i
          data-f7-icon="xmark"
          @click.prevent="doRemoveTag(t._id)"
          class="tag-remove"
        ></i>
      </span>
    </template>
    <template #item="{ item }">
      <span v-if="item.action">
        Create new tag <b>{{ item.value }}</b>
      </span>
      <span v-else :class="`co-tag co-tag-${item.color || 'default'}`"
        >{{ item.title }}
      </span>
    </template>
  </tw-completion>
</template>

<script>
import twCompletion from "./tw-completion.vue"

export function arrayRemoveElement(arr, el) {
  if (arr && Array.isArray(arr)) {
    let index
    while ((index = arr.indexOf(el)) !== -1) {
      arr.splice(index, 1)
    }
    return arr
  }
  return []
}

export default {
  name: "op-tag-input",
  components: {
    twCompletion,
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      candidates: [],
    }
  },
  computed: {
    tags() {
      return (this.item.tags || []).map((tagID) => {
        const item = $op.state.items[tagID]
        log("tags", tagID, item)
        return item
      })
    },
  },
  methods: {
    setTags(tags) {
      this.$set(this.item, "tags", tags)
    },
    doRemoveTag(id) {
      log("remove tag", id)
      this.setTags(arrayRemoveElement(cloneObject(this.item.tags), id))
    },
    async handleSelection(item) {
      log("add item", item)
      if (item.action) {
        let title = item.value.toString().trim()
        if (title) {
          let item = $op.createItemObject({
            module: "tag",
            title,
          })
          item = cloneObject(await $op.storeItem(item))
          if (item) {
            this.setTags([...cloneObject(this.item.tags || []), item._id])
          }
        }
      } else if (item._id) {
        this.setTags([...cloneObject(this.item.tags || []), item._id])
      } else {
        log("unknown item", item)
      }
    },
    handleFilter(filter) {
      let value = filter.trim()
      let lvalue = value.toLowerCase()
      let exactMatch = false
      log("handle filter", filter)
      let currentTags = cloneObject(this.item.tags || [])
      let candidates = Object.values($op.state.items).filter((item) => {
        if (item.module === "tag" && !currentTags.includes(item._id)) {
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
        candidates.push({ action: "create", value })
      }
      log("candidates", candidates)
      this.candidates = candidates
    },
    handleDeleteLast() {
      // TODO:2020-06-16 Mark before deletion
      let tags = this.item.tags
      if (tags.pop()) {
        this.setTags([...tags])
      }
    },
  },
}
</script>
