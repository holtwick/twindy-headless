import { defineComponent, openBlock, createBlock, resolveComponent, mergeProps, createCommentVNode, createTextVNode, toDisplayString, renderSlot, withCtx, resolveDirective, withDirectives, createVNode, Fragment, renderList, withKeys, withModifiers } from 'vue';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var script = defineComponent({
    name: "tw-symbol",
    props: {
        name: {
            type: String,
            default: 0,
            required: true,
        },
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("i", {
    class: "f7",
    "data-f7-icon": _ctx.name,
    "aria-hidden": "true"
  }, null, 8 /* PROPS */, ["data-f7-icon"]))
}

script.render = render;

// @action, @click
var script$1 = defineComponent({
    name: "tw-button",
    components: { TwSymbol: script },
    props: {
        title: {
            type: String,
            default: "",
        },
        theme: {
            default: "primary",
        },
        symbol: {
            type: String,
        },
        symbolLeft: {
            type: String,
        },
        symbolRight: {
            type: String,
        },
        role: {
            type: String,
            default: "button",
            validator: function (value) {
                return ["button", "link"].includes(value);
            },
        },
        active: {
            // active state for selections
            type: Boolean,
            default: false,
        },
        passive: {
            // do not loose focus
            type: Boolean,
            default: false,
        },
    },
    data: function () {
        return {
            disabled: false,
            tooltipInstance: null,
            hoverCount: 0,
        };
    },
    computed: {
        slotted: function () {
            var _a, _b;
            return this.title || ((_b = (_a = this.$slots) === null || _a === void 0 ? void 0 : _a.default) === null || _b === void 0 ? void 0 : _b[0]) != null;
        },
        classnames: function () {
            var _a;
            return _a = {},
                _a["tw-" + this.role] = true,
                _a["-" + this.theme] = true,
                _a["-active"] = this.active === true,
                _a["-has-title"] = this.slotted,
                _a;
        },
    },
    methods: {
        doAction: function (ev) {
            return __awaiter(this, void 0, void 0, function () {
                var err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // this.hideTooltip()
                            if (this.disabled)
                                return [2 /*return*/];
                            this.disabled = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            // ev.waitUntil = async () => null
                            return [4 /*yield*/, this.$nextTick()];
                        case 2:
                            // ev.waitUntil = async () => null
                            _a.sent();
                            this.$emit("click", ev);
                            this.$emit("action", ev);
                            this.$emit("update:active", !this.active);
                            if (!ev.waitUntil) return [3 /*break*/, 4];
                            return [4 /*yield*/, ev.waitUntil];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            err_1 = _a.sent();
                            return [3 /*break*/, 6];
                        case 6:
                            this.disabled = false;
                            return [2 /*return*/];
                    }
                });
            });
        },
        doClick: function (ev) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.passive) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.doAction(ev)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        },
        doBeforeClick: function (ev) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.passive) return [3 /*break*/, 2];
                            ev.preventDefault();
                            return [4 /*yield*/, this.doAction(ev)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        },
    },
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tw_symbol = resolveComponent("tw-symbol");

  return (openBlock(), createBlock("button", mergeProps({ class: _ctx.classnames }, _ctx.$attrs, {
    disabled: _ctx.disabled,
    role: _ctx.role,
    onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.doBeforeClick && _ctx.doBeforeClick(...args))),
    onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.doClick && _ctx.doClick(...args))),
    onContextmenu: _cache[3] || (_cache[3] = (...args) => (_ctx.doClick && _ctx.doClick(...args)))
  }), [
    (_ctx.symbol || _ctx.symbolLeft)
      ? (openBlock(), createBlock(_component_tw_symbol, {
          key: 0,
          name: _ctx.symbol || _ctx.symbolLeft,
          class: "tw-button-symbol-left"
        }, null, 8 /* PROPS */, ["name"]))
      : createCommentVNode("v-if", true),
    createTextVNode(" " + toDisplayString(_ctx.title) + " ", 1 /* TEXT */),
    renderSlot(_ctx.$slots, "default"),
    (_ctx.symbolRight)
      ? (openBlock(), createBlock(_component_tw_symbol, {
          key: 1,
          name: _ctx.symbolRight,
          class: "tw-button-symbol-right"
        }, null, 8 /* PROPS */, ["name"]))
      : createCommentVNode("v-if", true)
  ], 16 /* FULL_PROPS */, ["disabled", "role"]))
}

script$1.render = render$1;

// Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright
var findFocusable = function (element) {
    if (!element) {
        return null;
    }
    return element.querySelectorAll("\n    a[href],\n    area[href],\n    input:not([disabled]),\n    select:not([disabled]),\n    textarea:not([disabled]),\n    button:not([disabled]),\n    iframe,\n    object,\n    embed,\n    *[tabindex],\n    *[contenteditable]\n    ".trim());
    //     .tw-button,
    //     .tw-link,
};
var onKeyDown;
var bind = function (el, _a) {
    var _b = _a.value, value = _b === void 0 ? true : _b;
    if (value && el) {
        onKeyDown = function (event) {
            var focusable = Array.from(findFocusable(el));
            var currentFocus = document.querySelector(":focus");
            var index = focusable.findIndex(function (f) { return f.isSameNode(currentFocus); });
            var length = focusable.length;
            if (event.key === "Tab") {
                event.preventDefault();
                if (!event.shiftKey) {
                    ++index;
                    if (index >= length)
                        index = 0;
                }
                else {
                    --index;
                    if (index <= 0)
                        index = length - 1;
                }
                focusable[index].focus();
            }
        };
        el.addEventListener("keydown", onKeyDown);
    }
};
var unbind = function (el) {
    el === null || el === void 0 ? void 0 : el.removeEventListener("keydown", onKeyDown);
};
var directive = {
    beforeMount: bind,
    unMount: unbind,
};

// Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright
function removeElement(el) {
    if (typeof el.remove !== "undefined") {
        el.remove();
    }
    else if (typeof el.parentNode !== "undefined") {
        el.parentNode.removeChild(el);
    }
}

var script$2 = defineComponent({
    name: "tw-link",
    components: { TwButton: script$1 },
});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tw_button = resolveComponent("tw-button");

  return (openBlock(), createBlock(_component_tw_button, mergeProps({ role: "link" }, _ctx.$attrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */))
}

script$2.render = render$2;

var script$3 = defineComponent({
    name: "tw-modal",
    props: {
        modelValue: {
            type: Boolean,
        },
        title: {
            type: String,
            default: "",
        },
        close: {
            type: Boolean,
            default: true,
        },
        standalone: {
            type: Boolean,
            default: false,
        },
        role: {
            default: "dialog",
        },
        canCancel: {
            type: Boolean,
            default: true,
        },
        onCancel: {
            type: Function,
            default: function () {
                // log("onCancel not defined")
            },
        },
    },
    components: {
        TwSymbol: script,
        TwLink: script$2,
    },
    directives: {
        trapFocus: directive,
    },
    emits: ["close", "update:modelValue"],
    methods: {
        doCancel: function () {
            var _a;
            this.$emit("cancel");
            var onCancel = ((_a = this === null || this === void 0 ? void 0 : this.$parent) === null || _a === void 0 ? void 0 : _a.onCancel) || (this === null || this === void 0 ? void 0 : this.onCancel);
            if (onCancel) {
                onCancel.apply(null, arguments);
            }
            this.doClose();
        },
        doClose: function () {
            var _this = this;
            this.$emit("close", false);
            this.$emit("update:modelValue", false);
            if (this.standalone) {
                // Timeout for the animation complete before destroying
                setTimeout(function () {
                    // this.value = false
                    _this.$destroy();
                    removeElement(_this.$el);
                }, 150);
            }
        },
        keyPress: function (event) {
            if (this.modelValue && event.keyCode === 27) {
                // Esc key
                this.doCancel("escape");
            }
        },
    },
    created: function () {
        document === null || document === void 0 ? void 0 : document.addEventListener("keyup", this.keyPress);
    },
    beforeMount: function () {
        var _this = this;
        // Insert the Dialog component in the element container
        if (this.standalone && typeof window !== "undefined") {
            this.$nextTick(function () {
                var container = 
                /* document.querySelector(this.container) || */ document.body;
                container.appendChild(_this.$el);
            });
        }
    },
    beforeUnmount: function () {
        if (typeof window !== "undefined") {
            document === null || document === void 0 ? void 0 : document.removeEventListener("keyup", this.keyPress);
            // reset scroll
            // document?.documentElement.classList.remove('is-clipped')
        }
    },
});

const _hoisted_1 = { class: "tw-modal-container" };
const _hoisted_2 = {
  key: 0,
  class: "tw-modal-header"
};
const _hoisted_3 = { class: "tw-modal-title" };
const _hoisted_4 = /*#__PURE__*/createVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "feather feather-x"
}, [
  /*#__PURE__*/createVNode("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }),
  /*#__PURE__*/createVNode("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })
], -1 /* HOISTED */);
const _hoisted_5 = { class: "tw-modal-body modal-body -fit -scrollable" };
const _hoisted_6 = { class: "tw-modal-footer modal-footer -fix" };

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tw_link = resolveComponent("tw-link");
  const _directive_trap_focus = resolveDirective("trap-focus");

  return withDirectives((openBlock(), createBlock("div", {
    class: ["tw-modal", { active: _ctx.modelValue }],
    tabindex: "-1",
    "aria-modal": "true",
    role: _ctx.role
  }, [
    createVNode("a", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.doCancel && _ctx.doCancel(...args))),
      class: "tw-modal-overlay",
      "aria-label": "Close"
    }),
    createVNode("div", _hoisted_1, [
      (_ctx.title || _ctx.close)
        ? (openBlock(), createBlock("header", _hoisted_2, [
            createVNode("div", _hoisted_3, [
              renderSlot(_ctx.$slots, "title", {}, () => [
                createTextVNode(toDisplayString(_ctx.title), 1 /* TEXT */)
              ])
            ]),
            (_ctx.close)
              ? (openBlock(), createBlock(_component_tw_link, {
                  key: 0,
                  xtooltip: "Close",
                  onClick: _ctx.doCancel,
                  class: "tw-modal-close",
                  symbol: "xmark"
                }, {
                  default: withCtx(() => [
                    _hoisted_4
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick"]))
              : createCommentVNode("v-if", true)
          ]))
        : createCommentVNode("v-if", true),
      createVNode("section", _hoisted_5, [
        renderSlot(_ctx.$slots, "default")
      ]),
      createVNode("footer", _hoisted_6, [
        renderSlot(_ctx.$slots, "footer")
      ])
    ])
  ], 10 /* CLASS, PROPS */, ["role"])), [
    [_directive_trap_focus]
  ])
}

script$3.render = render$3;

var script$4 = defineComponent({
    name: "tw-input-base",
    inheritAttrs: false,
    emits: ["update:modelValue"],
    props: {
        label: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: "Text",
        },
        modelValue: {
            type: [String, Boolean, Number],
            default: "",
        },
        uid: {
            type: String,
            default: Math.random().toString(),
        },
        type: {
            type: String,
        },
        options: {
            type: Array,
            default: function () { return []; },
        },
        singleLine: {
            default: false,
        },
        grow: {
            default: false,
        },
    },
    data: function () {
        return {
            newValue: this.modelValue,
        };
    },
    computed: {
        computedValue: {
            get: function () {
                var dflt = "";
                if (this.type === "switch")
                    dflt = false;
                if (this.type === "select")
                    dflt = 0;
                if (this.type === "number")
                    dflt = 0;
                return this.newValue || dflt;
            },
            set: function (value) {
                this.newValue = value;
                this.$emit("update:modelValue", value);
                // !this.isValid && this.checkHtml5Validity()
            },
        },
    },
    watch: {
        value: function (value) {
            this.newValue = value;
        },
    },
    methods: {
        resizeInput: function () {
            var minWidth = 32;
            var input = this.$refs.$input;
            var value = input.value.trim();
            input.style.width = "1px";
            input.style.width = (value ? input.scrollWidth : minWidth) + "px";
        },
        onInput: function (event) {
            var _this = this;
            if (this.grow)
                this.resizeInput();
            this.$nextTick(function () {
                if (event.target) {
                    _this.computedValue = event.target.value;
                }
            });
        },
        onInputBool: function (event) {
            var _this = this;
            this.$nextTick(function () {
                if (event.target) {
                    _this.computedValue = event.target.checked;
                    event.target.focus();
                }
            });
        },
    },
});

const _hoisted_1$1 = {
  key: 0,
  value: "",
  disabled: "",
  hidden: ""
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.type === 'textarea')
    ? (openBlock(), createBlock("textarea", mergeProps({
        key: 0,
        class: "form-input"
      }, _ctx.$attrs, {
        id: _ctx.uid,
        placeholder: _ctx.placeholder,
        value: _ctx.computedValue,
        onInput: _cache[1] || (_cache[1] = (...args) => (_ctx.onInput && _ctx.onInput(...args))),
        onChange: _cache[2] || (_cache[2] = $event => (_ctx.$emit('action', _ctx.computedValue))),
        textContent: toDisplayString(_ctx.value)
      }), null, 16 /* FULL_PROPS */, ["id", "placeholder", "value", "textContent"]))
    : (_ctx.type === 'select')
      ? (openBlock(), createBlock("select", mergeProps({
          key: 1,
          class: "form-select"
        }, _ctx.$attrs, {
          id: _ctx.uid,
          value: _ctx.computedValue,
          onInput: _cache[3] || (_cache[3] = (...args) => (_ctx.onInput && _ctx.onInput(...args))),
          onChange: _cache[4] || (_cache[4] = $event => (_ctx.$emit('action', _ctx.computedValue)))
        }), [
          (_ctx.placeholder)
            ? (openBlock(), createBlock("option", _hoisted_1$1, toDisplayString(_ctx.placeholder), 1 /* TEXT */))
            : createCommentVNode("v-if", true),
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.options, (o) => {
            return (openBlock(), createBlock("option", {
              value: o,
              key: o
            }, toDisplayString(o), 9 /* TEXT, PROPS */, ["value"]))
          }), 128 /* KEYED_FRAGMENT */)),
          renderSlot(_ctx.$slots, "default")
        ], 16 /* FULL_PROPS */, ["id", "value"]))
      : (_ctx.type === 'switch')
        ? (openBlock(), createBlock("input", mergeProps({
            key: 2,
            type: "checkbox"
          }, _ctx.$attrs, {
            id: _ctx.uid,
            checked: _ctx.computedValue,
            role: "switch",
            onInput: _cache[5] || (_cache[5] = (...args) => (_ctx.onInputBool && _ctx.onInputBool(...args))),
            onChange: _cache[6] || (_cache[6] = $event => (_ctx.$emit('action', _ctx.computedValue)))
          }), null, 16 /* FULL_PROPS */, ["id", "checked"]))
        : (_ctx.type === 'number')
          ? (openBlock(), createBlock("input", mergeProps({
              key: 3,
              type: "number",
              autocomplete: "off",
              class: "form-input"
            }, _ctx.$attrs, {
              id: _ctx.uid,
              value: _ctx.computedValue,
              onInput: _cache[7] || (_cache[7] = (...args) => (_ctx.onInput && _ctx.onInput(...args))),
              placeholder: _ctx.placeholder,
              onChange: _cache[8] || (_cache[8] = $event => (_ctx.$emit('action', _ctx.computedValue)))
            }), null, 16 /* FULL_PROPS */, ["id", "value", "placeholder"]))
          : (openBlock(), createBlock("input", mergeProps({
              key: 4,
              type: "text",
              ref: "$input",
              class: "form-input"
            }, _ctx.$attrs, {
              id: _ctx.uid,
              value: _ctx.computedValue,
              placeholder: _ctx.placeholder,
              autocomplete: "off",
              onInput: _cache[9] || (_cache[9] = (...args) => (_ctx.onInput && _ctx.onInput(...args))),
              onKeydown: _cache[10] || (_cache[10] = withKeys(withModifiers(() => {}, ["prevent"]), ["enter"])),
              onChange: _cache[11] || (_cache[11] = $event => (_ctx.$emit('action', _ctx.computedValue)))
            }), null, 16 /* FULL_PROPS */, ["id", "value", "placeholder"]))
}

script$4.render = render$4;

// Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright
var ctr = 1;
function UUID() {
    return "id-" + ctr++;
}
// import { v4 } from "uuid"
// // https://www.crockford.com/base32.html
// // https://github.com/LinusU/base32-encode/blob/master/index.js
// export function base32Encode(buffer) {
//   const alphabet = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
//   // const alphabet = '0123456789abcdefghjkmnpqrstvwxyz'
//   let length = buffer.byteLength
//   let view = new Uint8Array(buffer)
//   let bits = 0
//   let value = 0
//   let output = ""
//   for (let i = 0; i < length; i++) {
//     value = (value << 8) | view[i]
//     bits += 8
//     while (bits >= 5) {
//       output += alphabet[(value >>> (bits - 5)) & 31]
//       bits -= 5
//     }
//   }
//   if (bits > 0) {
//     output += alphabet[(value << (5 - bits)) & 31]
//   }
//   return output
// }
// export function UUID() {
//   let array = []
//   v4(null, array)
//   return base32Encode(Buffer.from(array))
// }
// export const UUID_length = 26

var script$5 = defineComponent({
    name: "tw-form-group",
    props: {
        label: {
            type: String,
            default: null,
        },
    },
    data: function () {
        return {
            uid: UUID(),
        };
    },
});

const _hoisted_1$2 = { class: "form-group" };
const _hoisted_2$1 = { class: "form-body" };

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1$2, [
    (_ctx.label)
      ? (openBlock(), createBlock("label", {
          key: 0,
          for: _ctx.uid,
          class: "form-label label-sm"
        }, toDisplayString(_ctx.label), 9 /* TEXT, PROPS */, ["for"]))
      : createCommentVNode("v-if", true),
    createVNode("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "default", { uid: _ctx.uid })
    ])
  ]))
}

script$5.render = render$5;

var script$6 = defineComponent({
    name: "tw-select",
    components: {
        TwFormGroup: script$5,
        TwInputBase: script$4,
    },
    emits: ["update:modelValue"],
});

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tw_input_base = resolveComponent("tw-input-base");
  const _component_tw_form_group = resolveComponent("tw-form-group");

  return (openBlock(), createBlock(_component_tw_form_group, _ctx.$attrs, {
    default: withCtx(({ uid }) => [
      createVNode(_component_tw_input_base, mergeProps({ uid: uid }, _ctx.$attrs, {
        type: "select",
        onInput: _cache[1] || (_cache[1] = $event => (_ctx.$emit('update:modelValue', $event)))
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 2 /* DYNAMIC */
      }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["uid"])
    ]),
    _: 1 /* STABLE */
  }, 16 /* FULL_PROPS */))
}

script$6.render = render$6;

// Mix of this receipt: https://www.cssscript.com/realistic-ios-switch-pure-css/
var script$7 = defineComponent({
    name: "tw-switch",
    components: {
        TwFormGroup: script$5,
        TwInputBase: script$4,
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        theme: {
            type: String,
            default: "primary",
        },
    },
    computed: {
        slotted: function () {
            var _a, _b;
            return this.label || ((_b = (_a = this.$slots) === null || _a === void 0 ? void 0 : _a.default) === null || _b === void 0 ? void 0 : _b[0]) != null;
        },
    },
    data: function () {
        return {
            uid: UUID(),
        };
    },
});

const _hoisted_1$3 = /*#__PURE__*/createVNode("i", null, null, -1 /* HOISTED */);
const _hoisted_2$2 = {
  key: 0,
  class: "tw-switch-label"
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tw_input_base = resolveComponent("tw-input-base");

  return (openBlock(), createBlock("div", {
    class: ["tw-switch-container", { '-inline': !_ctx.slotted, 'form-group': _ctx.slotted }]
  }, [
    createVNode("label", {
      for: _ctx.uid,
      class: ["tw-switch", `-${_ctx.theme}`],
      ref: "labelSwitch"
    }, [
      createVNode(_component_tw_input_base, mergeProps({ uid: _ctx.uid }, _ctx.$attrs, { type: "switch" }), null, 16 /* FULL_PROPS */, ["uid"]),
      _hoisted_1$3,
      (_ctx.slotted)
        ? (openBlock(), createBlock("span", _hoisted_2$2, [
            createTextVNode(toDisplayString(_ctx.label) + " ", 1 /* TEXT */),
            renderSlot(_ctx.$slots, "default")
          ]))
        : createCommentVNode("v-if", true)
    ], 10 /* CLASS, PROPS */, ["for"])
  ], 2 /* CLASS */))
}

script$7.render = render$7;

export { script$1 as twButton, script$3 as twModal, script$6 as twSelect, script$7 as twSwitch };
