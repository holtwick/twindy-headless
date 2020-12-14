<!-- Copyright (c) 2019 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <iframe
    src="about:blank"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
    scrolling="no"
    class="tw-iframe"
    style="overflow: hidden"
    ref="iframe"
  ></iframe>
</template>

<script>
import { platform } from "@/lib/utils/platform"

const log = require("debug")("ui:iframe")

export default {
  name: "tw-iframe",
  props: {
    value: String,
  },
  data() {
    return {
      timer: null,
      // html: 'about:blank'
    }
  },
  methods: {
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    async doUpdateHTML(value) {
      window.scrollTo(0, 0)
      this.clearTimer()
      if (value) {
        // this.html = `data:text/html,` + value
        // await this.$nextTick()

        let iFrame = this.$refs.iframe
        if (iFrame) {
          iFrame.style.height = "400px"
          const iFrameWindow = iFrame.contentWindow
          const iFrameDocument = iFrameWindow.document
          log("iframe doc", iFrameDocument)
          if (platform.appleNative) {
            // TODO:2020-05-24 Better check for Safari?
            iFrameDocument.documentElement.innerHTML = value
          } else {
            iFrameDocument.open()
            iFrameDocument.write(value)
            iFrameDocument.close()
          }

          try {
            for (let link of iFrameDocument.documentElement.querySelectorAll(
              "a"
            )) {
              link.setAttribute("target", "_blank")
              link.addEventListener("click", (e) => {
                return $op.openHyperLink(e)
              })
            }
          } catch (err) {
            console.error("Exception:", err)
          }

          iFrame.style.height =
            Math.max(400, iFrameDocument.body.offsetHeight + 120) + "px"
          let prevHeight = 0
          this.timer = setInterval(() => {
            let bodyHeight = +iFrameDocument.body.getBoundingClientRect().height
            let childrenHeight = 0
            let el = iFrameDocument.body.firstElementChild
            while (el) {
              childrenHeight += el.getBoundingClientRect().height
              el = el.nextElementSibling
            }
            const currentHeight = Math.max(childrenHeight, bodyHeight)
            // if (prevHeight === currentHeight) {
            //   this.clearTimer()
            // }
            prevHeight = currentHeight
            iFrame.style.height = Math.max(400, currentHeight) + "px"
          }, 500)
        }
      }
    },
  },
  async mounted() {
    await this.doUpdateHTML(this.value)
  },
  // watch: {
  //   'value.content'() { // content is not going to change any more for Evernote
  //     this.doUpdateHTML(this.value)
  //   }
  // },
  beforeUnmount() {
    this.clearTimer()
  },
}
</script>

<style scoped lang="scss">
.tw-iframe {
  width: 100%;
  /*padding-left: 1rem;*/
  /*padding-right: 1rem;*/
  /*pointer-events: none;*/
}
</style>
