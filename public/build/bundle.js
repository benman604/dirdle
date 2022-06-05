/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/global.css":
/*!************************!*\
  !*** ./src/global.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/hot-api.js":
/*!****************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/hot-api.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeApplyHmr": () => (/* binding */ makeApplyHmr)
/* harmony export */ });
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proxy.js */ "./node_modules/svelte-hmr/runtime/proxy.js");
/* eslint-env browser */



const logPrefix = '[HMR:Svelte]'

// eslint-disable-next-line no-console
const log = (...args) => console.log(logPrefix, ...args)

const domReload = () => {
  // eslint-disable-next-line no-undef
  const win = typeof window !== 'undefined' && window
  if (win && win.location && win.location.reload) {
    log('Reload')
    win.location.reload()
  } else {
    log('Full reload required')
  }
}

const replaceCss = (previousId, newId) => {
  if (typeof document === 'undefined') return false
  if (!previousId) return false
  if (!newId) return false
  // svelte-xxx-style => svelte-xxx
  const previousClass = previousId.slice(0, -6)
  const newClass = newId.slice(0, -6)
  // eslint-disable-next-line no-undef
  document.querySelectorAll('.' + previousClass).forEach(el => {
    el.classList.remove(previousClass)
    el.classList.add(newClass)
  })
  return true
}

const removeStylesheet = cssId => {
  if (cssId == null) return
  if (typeof document === 'undefined') return
  // eslint-disable-next-line no-undef
  const el = document.getElementById(cssId)
  if (el) el.remove()
  return
}

const defaultArgs = {
  reload: domReload,
}

const makeApplyHmr = transformArgs => args => {
  const allArgs = transformArgs({ ...defaultArgs, ...args })
  return applyHmr(allArgs)
}

let needsReload = false

function applyHmr(args) {
  const {
    id,
    cssId,
    nonCssHash,
    reload = domReload,
    // normalized hot API (must conform to rollup-plugin-hot)
    hot,
    hotOptions,
    Component,
    acceptable, // some types of components are impossible to HMR correctly
    preserveLocalState,
    ProxyAdapter,
    emitCss,
  } = args

  const existing = hot.data && hot.data.record

  const canAccept = acceptable && (!existing || existing.current.canAccept)

  const r =
    existing ||
    (0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.createProxy)({
      Adapter: ProxyAdapter,
      id,
      Component,
      hotOptions,
      canAccept,
      preserveLocalState,
    })

  const cssOnly =
    hotOptions.injectCss &&
    existing &&
    nonCssHash &&
    existing.current.nonCssHash === nonCssHash

  r.update({
    Component,
    hotOptions,
    canAccept,
    nonCssHash,
    cssId,
    previousCssId: r.current.cssId,
    cssOnly,
    preserveLocalState,
  })

  hot.dispose(data => {
    // handle previous fatal errors
    if (needsReload || (0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.hasFatalError)()) {
      if (hotOptions && hotOptions.noReload) {
        log('Full reload required')
      } else {
        reload()
      }
    }

    // 2020-09-21 Snowpack master doesn't pass data as arg to dispose handler
    data = data || hot.data

    data.record = r

    if (!emitCss && cssId && r.current.cssId !== cssId) {
      if (hotOptions.cssEjectDelay) {
        setTimeout(() => removeStylesheet(cssId), hotOptions.cssEjectDelay)
      } else {
        removeStylesheet(cssId)
      }
    }
  })

  if (canAccept) {
    hot.accept(async arg => {
      const { bubbled } = arg || {}

      // NOTE Snowpack registers accept handlers only once, so we can NOT rely
      // on the surrounding scope variables -- they're not the last version!
      const { cssId: newCssId, previousCssId } = r.current
      const cssChanged = newCssId !== previousCssId
      // ensure old style sheet has been removed by now
      if (!emitCss && cssChanged) removeStylesheet(previousCssId)
      // guard: css only change
      if (
        // NOTE bubbled is provided only by rollup-plugin-hot, and we
        // can't safely assume a CSS only change without it... this means we
        // can't support CSS only injection with Nollup or Webpack currently
        bubbled === false && // WARNING check false, not falsy!
        r.current.cssOnly &&
        (!cssChanged || replaceCss(previousCssId, newCssId))
      ) {
        return
      }

      const success = await r.reload()

      if ((0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.hasFatalError)() || (!success && !hotOptions.optimistic)) {
        needsReload = true
      }
    })
  }

  // well, endgame... we won't be able to render next updates, even successful,
  // if we don't have proxies in svelte's tree
  //
  // since we won't return the proxy and the app will expect a svelte component,
  // it's gonna crash... so it's best to report the real cause
  //
  // full reload required
  //
  const proxyOk = r && r.proxy
  if (!proxyOk) {
    throw new Error(`Failed to create HMR proxy for Svelte component ${id}`)
  }

  return r.proxy
}


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/index.js":
/*!**************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeApplyHmr": () => (/* reexport safe */ _hot_api_js__WEBPACK_IMPORTED_MODULE_0__.makeApplyHmr)
/* harmony export */ });
/* harmony import */ var _hot_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hot-api.js */ "./node_modules/svelte-hmr/runtime/hot-api.js");



/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/overlay.js":
/*!****************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/overlay.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-env browser */

const removeElement = el => el && el.parentNode && el.parentNode.removeChild(el)

const ErrorOverlay = () => {
  let errors = []
  let compileError = null

  const errorsTitle = 'Failed to init component'
  const compileErrorTitle = 'Failed to compile'

  const style = {
    section: `
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 32px;
      background: rgba(0, 0, 0, .85);
      font-family: Menlo, Consolas, monospace;
      font-size: large;
      color: rgb(232, 232, 232);
      overflow: auto;
      z-index: 2147483647;
    `,
    h1: `
      margin-top: 0;
      color: #E36049;
      font-size: large;
      font-weight: normal;
    `,
    h2: `
      margin: 32px 0 0;
      font-size: large;
      font-weight: normal;
    `,
    pre: ``,
  }

  const createOverlay = () => {
    const h1 = document.createElement('h1')
    h1.style = style.h1
    const section = document.createElement('section')
    section.appendChild(h1)
    section.style = style.section
    const body = document.createElement('div')
    section.appendChild(body)
    return { h1, el: section, body }
  }

  const setTitle = title => {
    overlay.h1.textContent = title
  }

  const show = () => {
    const { el } = overlay
    if (!el.parentNode) {
      const target = document.body
      target.appendChild(overlay.el)
    }
  }

  const hide = () => {
    const { el } = overlay
    if (el.parentNode) {
      overlay.el.remove()
    }
  }

  const update = () => {
    if (compileError) {
      overlay.body.innerHTML = ''
      setTitle(compileErrorTitle)
      const errorEl = renderError(compileError)
      overlay.body.appendChild(errorEl)
      show()
    } else if (errors.length > 0) {
      overlay.body.innerHTML = ''
      setTitle(errorsTitle)
      errors.forEach(({ title, message }) => {
        const errorEl = renderError(message, title)
        overlay.body.appendChild(errorEl)
      })
      show()
    } else {
      hide()
    }
  }

  const renderError = (message, title) => {
    const div = document.createElement('div')
    if (title) {
      const h2 = document.createElement('h2')
      h2.textContent = title
      h2.style = style.h2
      div.appendChild(h2)
    }
    const pre = document.createElement('pre')
    pre.textContent = message
    div.appendChild(pre)
    return div
  }

  const addError = (error, title) => {
    const message = (error && error.stack) || error
    errors.push({ title, message })
    update()
  }

  const clearErrors = () => {
    errors.forEach(({ element }) => {
      removeElement(element)
    })
    errors = []
    update()
  }

  const setCompileError = message => {
    compileError = message
    update()
  }

  const overlay = createOverlay()

  return {
    addError,
    clearErrors,
    setCompileError,
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorOverlay);


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js":
/*!**************************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adapter": () => (/* binding */ adapter),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/svelte-hmr/runtime/overlay.js");
/* global window, document */

// NOTE from 3.38.3 (or so), insert was carrying the hydration logic, that must
// be used because DOM elements are reused more (and so insertion points are not
// necessarily added in order); then in 3.40 the logic was moved to
// insert_hydration, which is the one we must use for HMR
const svelteInsert = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_hydration || svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert
if (!svelteInsert) {
  throw new Error(
    'failed to find insert_hydration and insert in svelte/internal'
  )
}



const removeElement = el => el && el.parentNode && el.parentNode.removeChild(el)

const adapter = class ProxyAdapterDom {
  constructor(instance) {
    this.instance = instance
    this.insertionPoint = null

    this.afterMount = this.afterMount.bind(this)
    this.rerender = this.rerender.bind(this)

    this._noOverlay = !!instance.hotOptions.noOverlay
  }

  // NOTE overlay is only created before being actually shown to help test
  // runner (it won't have to account for error overlay when running assertions
  // about the contents of the rendered page)
  static getErrorOverlay(noCreate = false) {
    if (!noCreate && !this.errorOverlay) {
      this.errorOverlay = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_1__["default"])()
    }
    return this.errorOverlay
  }

  // TODO this is probably unused now: remove in next breaking release
  static renderCompileError(message) {
    const noCreate = !message
    const overlay = this.getErrorOverlay(noCreate)
    if (!overlay) return
    overlay.setCompileError(message)
  }

  dispose() {
    // Component is being destroyed, detaching is not optional in Svelte3's
    // component API, so we can dispose of the insertion point in every case.
    if (this.insertionPoint) {
      removeElement(this.insertionPoint)
      this.insertionPoint = null
    }
    this.clearError()
  }

  // NOTE afterMount CAN be called multiple times (e.g. keyed list)
  afterMount(target, anchor) {
    const {
      instance: { debugName },
    } = this
    if (!this.insertionPoint) {
      this.insertionPoint = document.createComment(debugName)
    }
    svelteInsert(target, this.insertionPoint, anchor)
  }

  rerender() {
    this.clearError()
    const {
      instance: { refreshComponent },
      insertionPoint,
    } = this
    if (!insertionPoint) {
      throw new Error('Cannot rerender: missing insertion point')
    }
    refreshComponent(insertionPoint.parentNode, insertionPoint)
  }

  renderError(err) {
    if (this._noOverlay) return
    const {
      instance: { debugName },
    } = this
    const title = debugName || err.moduleName || 'Error'
    this.constructor.getErrorOverlay().addError(err, title)
  }

  clearError() {
    if (this._noOverlay) return
    const overlay = this.constructor.getErrorOverlay(true)
    if (!overlay) return
    overlay.clearErrors()
  }
}

// TODO this is probably unused now: remove in next breaking release
if (typeof window !== 'undefined') {
  window.__SVELTE_HMR_ADAPTER = adapter
}

// mitigate situation with Snowpack remote source pulling latest of runtime,
// but using previous version of the Node code transform in the plugin
// see: https://github.com/rixo/svelte-hmr/issues/27
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adapter);


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/proxy.js":
/*!**************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/proxy.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasFatalError": () => (/* binding */ hasFatalError),
/* harmony export */   "createProxy": () => (/* binding */ createProxy)
/* harmony export */ });
/* harmony import */ var _svelte_hooks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svelte-hooks.js */ "./node_modules/svelte-hmr/runtime/svelte-hooks.js");
/* eslint-env browser */
/**
 * The HMR proxy is a component-like object whose task is to sit in the
 * component tree in place of the proxied component, and rerender each
 * successive versions of said component.
 */



const handledMethods = ['constructor', '$destroy']
const forwardedMethods = ['$set', '$on']

const logError = (msg, err) => {
  // eslint-disable-next-line no-console
  console.error('[HMR][Svelte]', msg)
  if (err) {
    // NOTE avoid too much wrapping around user errors
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

const posixify = file => file.replace(/[/\\]/g, '/')

const getBaseName = id =>
  id
    .split('/')
    .pop()
    .split('.')
    .slice(0, -1)
    .join('.')

const capitalize = str => str[0].toUpperCase() + str.slice(1)

const getFriendlyName = id => capitalize(getBaseName(posixify(id)))

const getDebugName = id => `<${getFriendlyName(id)}>`

const relayCalls = (getTarget, names, dest = {}) => {
  for (const key of names) {
    dest[key] = function(...args) {
      const target = getTarget()
      if (!target) {
        return
      }
      return target[key] && target[key].call(this, ...args)
    }
  }
  return dest
}

const isInternal = key => key !== '$$' && key.substr(0, 2) === '$$'

// This is intented as a somewhat generic / prospective fix to the situation
// that arised with the introduction of $$set in Svelte 3.24.1 -- trying to
// avoid giving full knowledge (like its name) of this implementation detail
// to the proxy. The $$set method can be present or not on the component, and
// its presence impacts the behaviour (but with HMR it will be tested if it is
// present _on the proxy_). So the idea here is to expose exactly the same $$
// props as the current version of the component and, for those that are
// functions, proxy the calls to the current component.
const relayInternalMethods = (proxy, cmp) => {
  // delete any previously added $$ prop
  Object.keys(proxy)
    .filter(isInternal)
    .forEach(key => {
      delete proxy[key]
    })
  // guard: no component
  if (!cmp) return
  // proxy current $$ props to the actual component
  Object.keys(cmp)
    .filter(isInternal)
    .forEach(key => {
      Object.defineProperty(proxy, key, {
        configurable: true,
        get() {
          const value = cmp[key]
          if (typeof value !== 'function') return value
          return (
            value &&
            function(...args) {
              return value.apply(this, args)
            }
          )
        },
      })
    })
}

const copyComponentProperties = (proxy, cmp, previous) => {
  //proxy custom methods
  const props = Object.getOwnPropertyNames(Object.getPrototypeOf(cmp))
  if (previous) {
    previous.forEach(prop => {
      delete proxy[prop]
    })
  }
  return props.filter(prop => {
    if (!handledMethods.includes(prop) && !forwardedMethods.includes(prop)) {
      Object.defineProperty(proxy, prop, {
        configurable: true,
        get() {
          return cmp[prop]
        },
        set(value) {
          // we're changing it on the real component first to see what it
          // gives... if it throws an error, we want to throw the same error in
          // order to most closely follow non-hmr behaviour.
          cmp[prop] = value
        },
      })
      return true
    }
  })
}

// everything in the constructor!
//
// so we don't polute the component class with new members
//
class ProxyComponent {
  constructor(
    {
      Adapter,
      id,
      debugName,
      current, // { Component, hotOptions: { preserveLocalState, ... } }
      register,
    },
    options // { target, anchor, ... }
  ) {
    let cmp
    let disposed = false
    let lastError = null

    const setComponent = _cmp => {
      cmp = _cmp
      relayInternalMethods(this, cmp)
    }

    const getComponent = () => cmp

    const destroyComponent = () => {
      // destroyComponent is tolerant (don't crash on no cmp) because it
      // is possible that reload/rerender is called after a previous
      // createComponent has failed (hence we have a proxy, but no cmp)
      if (cmp) {
        cmp.$destroy()
        setComponent(null)
      }
    }

    const refreshComponent = (target, anchor, conservativeDestroy) => {
      if (lastError) {
        lastError = null
        adapter.rerender()
      } else {
        try {
          const replaceOptions = {
            target,
            anchor,
            preserveLocalState: current.preserveLocalState,
          }
          if (conservativeDestroy) {
            replaceOptions.conservativeDestroy = true
          }
          setComponent(cmp.$replace(current.Component, replaceOptions))
        } catch (err) {
          setError(err, target, anchor)
          if (
            !current.hotOptions.optimistic ||
            // non acceptable components (that is components that have to defer
            // to their parent for rerender -- e.g. accessors, named exports)
            // are most tricky, and they havent been considered when most of the
            // code has been written... as a result, they are especially tricky
            // to deal with, it's better to consider any error with them to be
            // fatal to avoid odities
            !current.canAccept ||
            (err && err.hmrFatal)
          ) {
            throw err
          } else {
            // const errString = String((err && err.stack) || err)
            logError(`Error during component init: ${debugName}`, err)
          }
        }
      }
    }

    const setError = err => {
      lastError = err
      adapter.renderError(err)
    }

    const instance = {
      hotOptions: current.hotOptions,
      proxy: this,
      id,
      debugName,
      refreshComponent,
    }

    const adapter = new Adapter(instance)

    const { afterMount, rerender } = adapter

    // $destroy is not called when a child component is disposed, so we
    // need to hook from fragment.
    const onDestroy = () => {
      // NOTE do NOT call $destroy on the cmp from here; the cmp is already
      //   dead, this would not work
      if (!disposed) {
        disposed = true
        adapter.dispose()
        unregister()
      }
    }

    // ---- register proxy instance ----

    const unregister = register(rerender)

    // ---- augmented methods ----

    this.$destroy = () => {
      destroyComponent()
      onDestroy()
    }

    // ---- forwarded methods ----

    relayCalls(getComponent, forwardedMethods, this)

    // ---- create & mount target component instance ---

    try {
      let lastProperties
      const _cmp = (0,_svelte_hooks_js__WEBPACK_IMPORTED_MODULE_0__.createProxiedComponent)(current.Component, options, {
        allowLiveBinding: current.hotOptions.allowLiveBinding,
        onDestroy,
        onMount: afterMount,
        onInstance: comp => {
          // WARNING the proxy MUST use the same $$ object as its component
          // instance, because a lot of wiring happens during component
          // initialisation... lots of references to $$ and $$.fragment have
          // already been distributed around when the component constructor
          // returns, before we have a chance to wrap them (and so we can't
          // wrap them no more, because existing references would become
          // invalid)
          this.$$ = comp.$$
          lastProperties = copyComponentProperties(this, comp, lastProperties)
        },
      })
      setComponent(_cmp)
    } catch (err) {
      const { target, anchor } = options
      setError(err, target, anchor)
      throw err
    }
  }
}

const syncStatics = (component, proxy, previousKeys) => {
  // remove previously copied keys
  if (previousKeys) {
    for (const key of previousKeys) {
      delete proxy[key]
    }
  }

  // forward static properties and methods
  const keys = []
  for (const key in component) {
    keys.push(key)
    proxy[key] = component[key]
  }

  return keys
}

const globalListeners = {}

const onGlobal = (event, fn) => {
  event = event.toLowerCase()
  if (!globalListeners[event]) globalListeners[event] = []
  globalListeners[event].push(fn)
}

const fireGlobal = (event, ...args) => {
  const listeners = globalListeners[event]
  if (!listeners) return
  for (const fn of listeners) {
    fn(...args)
  }
}

const fireBeforeUpdate = () => fireGlobal('beforeupdate')

const fireAfterUpdate = () => fireGlobal('afterupdate')

if (typeof window !== 'undefined') {
  window.__SVELTE_HMR = {
    on: onGlobal,
  }
  window.dispatchEvent(new CustomEvent('svelte-hmr:ready'))
}

let fatalError = false

const hasFatalError = () => fatalError

/**
 * Creates a HMR proxy and its associated `reload` function that pushes a new
 * version to all existing instances of the component.
 */
function createProxy({
  Adapter,
  id,
  Component,
  hotOptions,
  canAccept,
  preserveLocalState,
}) {
  const debugName = getDebugName(id)
  const instances = []

  // current object will be updated, proxy instances will keep a ref
  const current = {
    Component,
    hotOptions,
    canAccept,
    preserveLocalState,
  }

  const name = `Proxy${debugName}`

  // this trick gives the dynamic name Proxy<MyComponent> to the concrete
  // proxy class... unfortunately, this doesn't shows in dev tools, but
  // it stills allow to inspect cmp.constructor.name to confirm an instance
  // is a proxy
  const proxy = {
    [name]: class extends ProxyComponent {
      constructor(options) {
        try {
          super(
            {
              Adapter,
              id,
              debugName,
              current,
              register: rerender => {
                instances.push(rerender)
                const unregister = () => {
                  const i = instances.indexOf(rerender)
                  instances.splice(i, 1)
                }
                return unregister
              },
            },
            options
          )
        } catch (err) {
          // If we fail to create a proxy instance, any instance, that means
          // that we won't be able to fix this instance when it is updated.
          // Recovering to normal state will be impossible. HMR's dead.
          //
          // Fatal error will trigger a full reload on next update (reloading
          // right now is kinda pointless since buggy code still exists).
          //
          // NOTE Only report first error to avoid too much polution -- following
          // errors are probably caused by the first one, or they will show up
          // in turn when the first one is fixed ¯\_(ツ)_/¯
          //
          if (!fatalError) {
            fatalError = true
            logError(
              `Unrecoverable error in ${debugName}: next update will trigger a ` +
                `full reload`
            )
          }
          throw err
        }
      }
    },
  }[name]

  // initialize static members
  let previousStatics = syncStatics(current.Component, proxy)

  const update = newState => Object.assign(current, newState)

  // reload all existing instances of this component
  const reload = () => {
    fireBeforeUpdate()

    // copy statics before doing anything because a static prop/method
    // could be used somewhere in the create/render call
    previousStatics = syncStatics(current.Component, proxy, previousStatics)

    const errors = []

    instances.forEach(rerender => {
      try {
        rerender()
      } catch (err) {
        logError(`Failed to rerender ${debugName}`, err)
        errors.push(err)
      }
    })

    if (errors.length > 0) {
      return false
    }

    fireAfterUpdate()

    return true
  }

  const hasFatalError = () => fatalError

  return { id, proxy, update, reload, hasFatalError, current }
}


/***/ }),

/***/ "./node_modules/svelte-hmr/runtime/svelte-hooks.js":
/*!*********************************************************!*\
  !*** ./node_modules/svelte-hmr/runtime/svelte-hooks.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProxiedComponent": () => (/* binding */ createProxiedComponent)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/**
 * Emulates forthcoming HMR hooks in Svelte.
 *
 * All references to private component state ($$) are now isolated in this
 * module.
 */


const captureState = cmp => {
  // sanity check: propper behaviour here is to crash noisily so that
  // user knows that they're looking at something broken
  if (!cmp) {
    throw new Error('Missing component')
  }
  if (!cmp.$$) {
    throw new Error('Invalid component')
  }

  const {
    $$: { callbacks, bound, ctx },
  } = cmp

  const state = cmp.$capture_state()

  // capturing current value of props (or we'll recreate the component with the
  // initial prop values, that may have changed -- and would not be reflected in
  // options.props)
  const props = Object.assign({}, cmp.$$.props)
  Object.keys(cmp.$$.props).forEach(prop => {
    props[prop] = ctx[props[prop]]
  })

  return { ctx, callbacks, bound, state, props }
}

// restoreState
//
// It is too late to restore context at this point because component instance
// function has already been called (and so context has already been read).
// Instead, we rely on setting current_component to the same value it has when
// the component was first rendered -- which fix support for context, and is
// also generally more respectful of normal operation.
//
const restoreState = (cmp, restore) => {
  if (!restore) {
    return
  }
  const { callbacks, bound } = restore
  if (callbacks) {
    cmp.$$.callbacks = callbacks
  }
  if (bound) {
    cmp.$$.bound = bound
  }
  // props, props.$$slots are restored at component creation (works
  // better -- well, at all actually)
}

const get_current_component_safe = () => {
  // NOTE relying on dynamic bindings (current_component) makes us dependent on
  // bundler config (and apparently it does not work in demo-svelte-nollup)
  try {
    // unfortunately, unlike current_component, get_current_component() can
    // crash in the normal path (when there is really no parent)
    return (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_current_component)()
  } catch (err) {
    // ... so we need to consider that this error means that there is no parent
    //
    // that makes us tightly coupled to the error message but, at least, we
    // won't mute an unexpected error, which is quite a horrible thing to do
    if (err.message === 'Function called outside component initialization') {
      // who knows...
      return svelte_internal__WEBPACK_IMPORTED_MODULE_0__.current_component
    } else {
      throw err
    }
  }
}

const createProxiedComponent = (
  Component,
  initialOptions,
  { allowLiveBinding, onInstance, onMount, onDestroy }
) => {
  let cmp
  let options = initialOptions

  const isCurrent = _cmp => cmp === _cmp

  const assignOptions = (target, anchor, restore, preserveLocalState) => {
    const props = Object.assign({}, options.props)

    // Filtering props to avoid "unexpected prop" warning
    // NOTE this is based on props present in initial options, but it should
    //      always works, because props that are passed from the parent can't
    //      change without a code change to the parent itself -- hence, the
    //      child component will be fully recreated, and initial options should
    //      always represent props that are currnetly passed by the parent
    if (options.props && restore.props) {
      for (const prop of Object.keys(options.props)) {
        if (restore.props.hasOwnProperty(prop)) {
          props[prop] = restore.props[prop]
        }
      }
    }

    if (preserveLocalState && restore.state) {
      if (Array.isArray(preserveLocalState)) {
        // form ['a', 'b'] => preserve only 'a' and 'b'
        props.$$inject = {}
        for (const key of preserveLocalState) {
          props.$$inject[key] = restore.state[key]
        }
      } else {
        props.$$inject = restore.state
      }
    } else {
      delete props.$$inject
    }
    options = Object.assign({}, initialOptions, {
      target,
      anchor,
      props,
      hydrate: false,
    })
  }

  const instrument = targetCmp => {
    const createComponent = (Component, restore, previousCmp) => {
      ;(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_current_component)(parentComponent || previousCmp)
      const comp = new Component(options)
      restoreState(comp, restore)
      instrument(comp)
      return comp
    }

    targetCmp.$$.on_hmr = []

    // `conservative: true` means we want to be sure that the new component has
    // actually been successfuly created before destroying the old instance.
    // This could be useful for preventing runtime errors in component init to
    // bring down the whole HMR. Unfortunately the implementation bellow is
    // broken (FIXME), but that remains an interesting target for when HMR hooks
    // will actually land in Svelte itself.
    //
    // The goal would be to render an error inplace in case of error, to avoid
    // losing the navigation stack (especially annoying in native, that is not
    // based on URL navigation, so we lose the current page on each error).
    //
    targetCmp.$replace = (
      Component,
      {
        target = options.target,
        anchor = options.anchor,
        preserveLocalState,
        conservative = false,
      }
    ) => {
      const restore = captureState(targetCmp)
      assignOptions(
        target || options.target,
        anchor,
        restore,
        preserveLocalState
      )

      const callbacks = cmp.$$.on_hmr

      const afterCallbacks = callbacks.map(fn => fn(cmp)).filter(Boolean)

      const previous = cmp
      if (conservative) {
        try {
          const next = createComponent(Component, restore, previous)
          // prevents on_destroy from firing on non-final cmp instance
          cmp = null
          previous.$destroy()
          cmp = next
        } catch (err) {
          cmp = previous
          throw err
        }
      } else {
        // prevents on_destroy from firing on non-final cmp instance
        cmp = null
        if (previous) {
          // previous can be null if last constructor has crashed
          previous.$destroy()
        }
        cmp = createComponent(Component, restore, cmp)
      }

      cmp.$$.hmr_cmp = cmp

      for (const fn of afterCallbacks) {
        fn(cmp)
      }

      cmp.$$.on_hmr = callbacks

      return cmp
    }

    // NOTE onMount must provide target & anchor (for us to be able to determinate
    // 			actual DOM insertion point)
    //
    // 			And also, to support keyed list, it needs to be called each time the
    // 			component is moved (same as $$.fragment.m)
    if (onMount) {
      const m = targetCmp.$$.fragment.m
      targetCmp.$$.fragment.m = (...args) => {
        const result = m(...args)
        onMount(...args)
        return result
      }
    }

    // NOTE onDestroy must be called even if the call doesn't pass through the
    //      component's $destroy method (that we can hook onto by ourselves, since
    //      it's public API) -- this happens a lot in svelte's internals, that
    //      manipulates cmp.$$.fragment directly, often binding to fragment.d,
    //      for example
    if (onDestroy) {
      targetCmp.$$.on_destroy.push(() => {
        if (isCurrent(targetCmp)) {
          onDestroy()
        }
      })
    }

    if (onInstance) {
      onInstance(targetCmp)
    }

    // Svelte 3 creates and mount components from their constructor if
    // options.target is present.
    //
    // This means that at this point, the component's `fragment.c` and,
    // most notably, `fragment.m` will already have been called _from inside
    // createComponent_. That is: before we have a chance to hook on it.
    //
    // Proxy's constructor
    //   -> createComponent
    //     -> component constructor
    //       -> component.$$.fragment.c(...) (or l, if hydrate:true)
    //       -> component.$$.fragment.m(...)
    //
    //   -> you are here <-
    //
    if (onMount) {
      const { target, anchor } = options
      if (target) {
        onMount(target, anchor)
      }
    }
  }

  const parentComponent = allowLiveBinding
    ? svelte_internal__WEBPACK_IMPORTED_MODULE_0__.current_component
    : get_current_component_safe()

  cmp = new Component(options)
  cmp.$$.hmr_cmp = cmp

  instrument(cmp)

  return cmp
}


/***/ }),

/***/ "./src/App.svelte":
/*!************************!*\
  !*** ./src/App.svelte ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
/* harmony import */ var _WordGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WordGrid */ "./src/WordGrid.svelte");
/* harmony import */ var _Keyboard_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Keyboard.svelte */ "./src/Keyboard.svelte");
/* harmony import */ var _wordbank_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./wordbank.js */ "./src/wordbank.js");
/* harmony import */ var _Popover_svelte__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Popover.svelte */ "./src/Popover.svelte");
/* harmony import */ var C_Users_Ben_Documents_test_dirdle_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var C_Users_Ben_Documents_test_dirdle_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src\App.svelte generated by Svelte v3.46.4 */


const { console: console_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;






const file = "src\\App.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-16khfjo", "main.svelte-16khfjo.svelte-16khfjo{margin:0;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.message.svelte-16khfjo .svelte-16khfjo,.under.svelte-16khfjo .svelte-16khfjo{margin-right:10px;margin-left:10px;display:inline}.message.svelte-16khfjo.svelte-16khfjo{width:100%}.bottom.svelte-16khfjo.svelte-16khfjo{bottom:5px;position:absolute}@media only screen and (max-width: 600px), (max-height: 800px){table.svelte-16khfjo.svelte-16khfjo{margin-left:auto;margin-right:auto}h1.svelte-16khfjo.svelte-16khfjo{font-size:x-large}main.svelte-16khfjo.svelte-16khfjo{margin-top:50px}}@media only screen and (max-height: 600px){h1.svelte-16khfjo.svelte-16khfjo{font-size:large}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLnN2ZWx0ZSIsInNvdXJjZXMiOlsiQXBwLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxyXG5cdGltcG9ydCB7IG9uTW91bnQsIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ3N2ZWx0ZSc7XHJcblx0aW1wb3J0IHsgc2NhbGUgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XHJcblx0aW1wb3J0IFdvcmRHcmlkIGZyb20gJy4vV29yZEdyaWQnXHJcblx0aW1wb3J0IEtleWJvYXJkIGZyb20gJy4vS2V5Ym9hcmQuc3ZlbHRlJ1xyXG5cdGltcG9ydCBCYW5rIGZyb20gJy4vd29yZGJhbmsuanMnXHJcblx0aW1wb3J0IFBvcG92ZXIgZnJvbSAnLi9Qb3BvdmVyLnN2ZWx0ZSdcclxuXHJcblxyXG5cdGxldCB3b3JkID0gXCJcIlxyXG5cdGxldCBzdGF0ZSA9IDBcclxuXHRsZXQgdHJpZXMgPSB3b3JkLmxlbmd0aFxyXG5cdGxldCByZXN1bHRzID0gW11cclxuXHRsZXQgbnVtSGludHMgPSA1XHJcblx0bGV0IHVzZWRIaW50cyA9IFtdXHJcblx0bGV0IGZpbmlzaGVkID0gZmFsc2VcclxuXHRsZXQgc2hhcmVSZXN1bHRzQ29udGVudCA9IFwiRGlyZGxlIFwiXHJcblxyXG5cdHdpbmRvd1tcImtleXByZXNzXCJdID0gW11cclxuXHR3aW5kb3dbXCJrZXljb2xvclwiXSA9IFtdXHJcblxyXG5cdGxldCBtZXNzYWdlID0gXCJcIlxyXG5cdGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UoZXZlbnQpe1xyXG5cdFx0aWYoZXZlbnQuZGV0YWlsLm1lc3NhZ2UgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0bWVzc2FnZSA9IGV2ZW50LmRldGFpbC5tZXNzYWdlXHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdG1lc3NhZ2UgPSBcIlwiXHJcblx0XHRcdH0sIDEwMDApXHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGxldCB4ID0gZXZlbnQuZGV0YWlsLnN0YXRlXHJcblx0XHRcdHJlc3VsdHMucHVzaCh4KVxyXG5cdFx0XHRpZih4ID09IFwiY29ycmVjdFwiKXtcclxuXHRcdFx0XHRzdGF0ZSA9IFwid2luXCJcclxuXHRcdFx0XHRidWlsZFJlc3VsdENvbnRlbnQoKVxyXG5cdFx0XHR9IFxyXG5cdFx0XHRlbHNlIGlmKHggPT0gXCJpbmNvcnJlY3RcIil7XHJcblx0XHRcdFx0aWYoc3RhdGUgKyAxID49IHRyaWVzKXtcclxuXHRcdFx0XHRcdHN0YXRlID0gXCJsb3NlXCJcclxuXHRcdFx0XHRcdGJ1aWxkUmVzdWx0Q29udGVudCgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHRzdGF0ZSsrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoYW5kbGVLZXljbGljayhldmVudCl7XHJcblx0XHRjb25zb2xlLmxvZyhldmVudC5kZXRhaWwua2V5KVxyXG5cdFx0cmV0dXJuIHtrZXk6IGV2ZW50LmRldGFpbC5rZXl9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBidWlsZFJlc3VsdENvbnRlbnQoKXtcclxuXHRcdGZpbmlzaGVkID0gdHJ1ZVxyXG5cdFx0bGV0IHNjb3JlID0gKHN0YXRlID09IFwid2luXCIpID8gKHdpbmRvd1tcImtleWNvbG9yXCJdLmxlbmd0aCkgOiBcIlhcIlxyXG5cdFx0c2hhcmVSZXN1bHRzQ29udGVudCArPSBzY29yZSArIFwiLzYgXFxuXCJcclxuXHRcdGZvcihsZXQgcm93IG9mIHdpbmRvd1tcImtleWNvbG9yXCJdKXtcclxuXHRcdFx0Zm9yKGxldCBjb2xvciBvZiByb3cpe1xyXG5cdFx0XHRcdGlmKGNvbG9yID09IFwiYmxhY2tcIil7XHJcblx0XHRcdFx0XHRzaGFyZVJlc3VsdHNDb250ZW50ICs9IFwi4qybXCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoY29sb3IgPT0gXCJncmVlblwiKXtcclxuXHRcdFx0XHRcdHNoYXJlUmVzdWx0c0NvbnRlbnQgKz0gXCLwn5+pXCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoY29sb3IgPT0gXCJ5ZWxsb3dcIil7XHJcblx0XHRcdFx0XHRzaGFyZVJlc3VsdHNDb250ZW50ICs9IFwi8J+fqFwiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHNoYXJlUmVzdWx0c0NvbnRlbnQgKz0gXCJcXG5cIlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bGV0IHNoYXJlQnRuQ29udGVudCA9IFwiU2hhcmVcIlxyXG5cdGZ1bmN0aW9uIGNvcHlSZXN1bHRzKCl7XHJcblx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChzaGFyZVJlc3VsdHNDb250ZW50KS50aGVuKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzaGFyZUJ0bkNvbnRlbnQgPSAoJ0NvcGllZCByZXN1bHRzJyk7XHJcblx0XHR9LCBmdW5jdGlvbihlcnIpIHtcclxuXHRcdFx0c2hhcmVCdG5Db250ZW50ID0gKCdDb3VsZCBub3QgY29weSB0ZXh0OiAnLCBlcnIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdHNoYXJlQnRuQ29udGVudCA9IFwiU2hhcmVcIlxyXG5cdFx0fSwgMjAwMCk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRTdGF0ZShpKXtcclxuXHRcdGlmKGkgPT0gc3RhdGUpe1xyXG5cdFx0XHRyZXR1cm4gXCJ0eXBpbmdcIlxyXG5cdFx0fVxyXG5cdFx0aWYoaSA+IHN0YXRlKXtcclxuXHRcdFx0cmV0dXJuIFwid2FpdGluZ1wiXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0c1tpXVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmFuZEludChtaW4sIG1heCkge1xyXG5cdFx0bWluID0gTWF0aC5jZWlsKG1pbik7XHJcblx0XHRtYXggPSBNYXRoLmZsb29yKG1heCk7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pXHJcblx0fVxyXG5cclxuXHRvbk1vdW50KCgpID0+IHtcclxuXHRcdGlmKHdvcmQgPT0gXCJcIil7XHJcblx0XHRcdGxldCBhdyA9IEJhbmsuc3BsaXQoXCJcXG5cIilcclxuXHRcdFx0d29yZCA9IGF3W3JhbmRJbnQoMCwgYXcubGVuZ3RoKV1cclxuXHRcdFx0Y29uc29sZS5sb2cod29yZClcclxuXHRcdFx0dHJpZXMgPSB3b3JkLmxlbmd0aCArIDJcclxuXHRcdFx0c3RhdGUgPSAwXHJcblx0XHRcdHJlc3VsdHMgPSBbXVxyXG5cdFx0fVxyXG5cdH0pXHJcblxyXG5cdGxldCBtYXJrdXBNb2RlID0gZmFsc2VcclxuXHRsZXQgc2VsZWN0ZWRDb2xvciA9IFwiYmxhY2tcIlxyXG5cdGxldCBzZWxlY3RhYmxlQ29sb3JzID0gW1wiYmxhY2tcIiwgXCJncmVlblwiLCBcIm9yYW5nZVwiXVxyXG5cdGZ1bmN0aW9uIHRvZ2dsZU1hcmt1cE1vZGUoKXtcclxuXHRcdG1hcmt1cE1vZGUgPSAhbWFya3VwTW9kZVxyXG5cdH1cclxuXHJcblx0bGV0IHByYWN0aWNlTW9kZSA9IGZhbHNlXHJcblx0ZnVuY3Rpb24gdG9nZ2xlUHJhY3RpY2VNb2RlKCl7XHJcblx0XHRwcmFjdGljZU1vZGUgPSAhcHJhY3RpY2VNb2RlXHJcblx0fVxyXG5cclxuXHRsZXQgc2hvd0luZm8gPSB0cnVlXHJcblx0aWYod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZmlyc3RcIikgPT09IG51bGwpe1xyXG5cdFx0d2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZmlyc3RcIiwgXCJ0cnVlXCIpXHJcblx0fSBlbHNle1xyXG5cdFx0c2hvd0luZm8gPSBmYWxzZVxyXG5cdH1cclxuXHQkOntcclxuXHRcdGNvbnNvbGUubG9nKHNob3dJbmZvKVxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG5cclxuPFBvcG92ZXIgYmluZDpzdGF0ZT17c2hvd0luZm99PlxyXG5cdDxwPldlbGNvbWUgdG8gZGlyZGxlLCBhIGRpcmVjdGlvbmFsIHdvcmQgZ3Vlc3NpbmcgZ2FtZSBiYXNlZCBvbiBXb3JkbGUuPC9wPlxyXG5cdDx1bD5cclxuXHRcdDxsaT5JZiBhIGxldHRlciBoYXMgYSBncmV5IFs/XSwgeW91IGtub3cgaXQncyBlaXRoZXIgaW4gdGhlIGNvcnJlY3QgcGxhY2Ugb3IgaXMgbm90IGluIHRoZSB3b3JkIGF0IGFsbC48L2xpPlxyXG5cdFx0PHVsPlxyXG5cdFx0XHQ8bGk+Q2xpY2sgYSBbP10gdG8gcmV2ZWFsIGEgaGludC4gSWYgdGhhdCBsZXR0ZXIgdHVybnMgZ3JlZW4sIGl0J3MgaW4gdGhlIHJpZ2h0IHBsYWNlLiBJZiBpdCB0dXJucyBibGFjaywgaXQncyBub3QgaW4gdGhlIHdvcmQgYXQgYWxsLjwvbGk+XHJcblx0XHRcdDxsaT5Zb3UgY2FuIHJldmVhbCB1cCB0byA1IGhpbnRzIHRoYXQgdHVybiBibGFjay48L2xpPlxyXG5cdFx0PC91bD5cclxuXHRcdDxsaT5JZiBhIGxldHRlciBoYXMgYSB5ZWxsb3cgYXJyb3csIGl0IGV4aXN0cyBzb21ld2hlcmUgaW4gdGhlIHdvcmQgaW4gdGhhdCByZXNwZWN0aXZlIGRpcmVjdGlvbi48L2xpPlxyXG5cdDwvdWw+XHJcbjwvUG9wb3Zlcj5cclxuXHJcbjxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+XHJcblx0PGgxPmRpcmRsZTwvaDE+IFxyXG5cdHsjaWYgbWVzc2FnZSAhPSBcIlwifVxyXG5cdFx0PHN0cm9uZyB0cmFuc2l0aW9uOnNjYWxlPnttZXNzYWdlfTwvc3Ryb25nPlxyXG5cdHsvaWZ9XHJcblx0eyNpZiBzdGF0ZSA9PSBcIndpblwifVxyXG5cdFx0PGRpdiB0cmFuc2l0aW9uOnNjYWxlPlxyXG5cdFx0XHQ8c3Ryb25nPllvdSB3b24hPC9zdHJvbmc+XHJcblx0XHRcdDxidXR0b24gb246Y2xpY2s9e2NvcHlSZXN1bHRzfT57c2hhcmVCdG5Db250ZW50fTwvYnV0dG9uPlxyXG5cdFx0XHQ8YnV0dG9uIG9uOmNsaWNrPXsoKT0+e3dpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKX19Pk5ldyBHYW1lPC9idXR0b24+XHJcblx0XHQ8L2Rpdj5cclxuXHR7L2lmfVxyXG5cclxuXHR7I2lmIHN0YXRlID09IFwibG9zZVwifVxyXG5cdFx0PGRpdiB0cmFuc2l0aW9uOnNjYWxlPlxyXG5cdFx0XHQ8c3Ryb25nPllvdSBsb3N0ITwvc3Ryb25nPlxyXG5cdFx0XHQ8cD5UaGUgd29yZCB3YXMge3dvcmR9LjwvcD5cclxuXHRcdFx0PGJ1dHRvbiB0cmFuc2l0aW9uOnNjYWxlIG9uOmNsaWNrPXtjb3B5UmVzdWx0c30+e3NoYXJlQnRuQ29udGVudH08L2J1dHRvbj5cclxuXHRcdFx0PGJ1dHRvbiBvbjpjbGljaz17KCk9Pnt3aW5kb3cubG9jYXRpb24ucmVsb2FkKCl9fT5OZXcgR2FtZTwvYnV0dG9uPlxyXG5cdFx0PC9kaXY+XHJcblx0ey9pZn1cclxuXHJcblx0PGRpdiBjbGFzcz1cInJpZ2h0XCI+XHJcblx0XHQ8c3Ryb25nPntudW1IaW50c30vNSBoaW50cyByZW1haW5pbmc8L3N0cm9uZz5cclxuXHQ8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwidW5kZXJcIj5cclxuXHQ8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2Jlbm1hbjYwNC9kaXJkbGVcIj5HaXRodWI8L2E+XHJcblx0PGEgaHJlZj1cIiMzXCIgaWQ9XCJoZWxwYnRuXCIgb246Y2xpY2s9eygpPT57c2hvd0luZm8gPSB0cnVlfX0+SGVscDwvYT5cclxuXHQ8ZGl2IGNsYXNzPVwicmlnaHRcIj5cclxuXHRcdDxzbWFsbD5UbyB1c2UgYSBoaW50LCBjbGljayBhIFs/XTwvc21hbGw+XHJcblx0PC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBjbGFzcz1cImJvdHRvbVwiIHN0eWxlPVwibGVmdDogMTBweDtcIj5cclxuXHR7I2lmIG1hcmt1cE1vZGV9XHJcblx0XHQ8ZGl2PlxyXG5cdFx0XHR7I2VhY2ggc2VsZWN0YWJsZUNvbG9ycyBhcyBzY2x9XHJcblx0XHRcdFx0PGJ1dHRvbiBvbjpjbGljaz17KCk9PntzZWxlY3RlZENvbG9yID0gc2NsfX1cclxuXHRcdFx0XHRcdHN0eWxlPXsnY29sb3I6JyArIHNjbCArICc7IGZvbnQtc2l6ZTonICsgKChzZWxlY3RlZENvbG9yID09IHNjbCkgPyAneC1sYXJnZScgOiAnbWVkaXVtJyl9PuKspDwvYnV0dG9uPlxyXG5cdFx0XHR7L2VhY2h9XHJcblx0XHQ8L2Rpdj5cclxuXHR7L2lmfVxyXG5cdDxidXR0b24gc3R5bGU9XCJ7XHJcblx0XHQoIW1hcmt1cE1vZGUpID8gJ2JhY2tncm91bmQtY29sb3I6d2hpdGU7IGZvbnQtd2VpZ2h0OmJvbGRlcicgOiAnJ1xyXG5cdFx0fVwiXHJcblx0b246Y2xpY2s9e3RvZ2dsZU1hcmt1cE1vZGV9PlR5cGU8L2J1dHRvbj5cclxuXHQ8YnV0dG9uIHN0eWxlPVwie1xyXG5cdFx0KG1hcmt1cE1vZGUpID8gJ2JhY2tncm91bmQtY29sb3I6d2hpdGU7IGZvbnQtd2VpZ2h0OmJvbGRlcicgOiAnJ1xyXG5cdFx0fVwiXHJcblx0b246Y2xpY2s9e3RvZ2dsZU1hcmt1cE1vZGV9Pk1hcms8L2J1dHRvbj5cclxuPC9kaXY+XHJcbjwhLS0gXHJcbjxkaXYgY2xhc3M9XCJib3R0b20gcmlnaHRcIiBzdHlsZT1cInJpZ2h0OiAxMHB4XCI+XHJcblx0PGJ1dHRvbiBzdHlsZT1cIntcclxuXHRcdCghcHJhY3RpY2VNb2RlKSA/ICdiYWNrZ3JvdW5kLWNvbG9yOndoaXRlOyBmb250LXdlaWdodDpib2xkZXInIDogJydcclxuXHRcdH1cIlxyXG5cdG9uOmNsaWNrPXt0b2dnbGVQcmFjdGljZU1vZGV9PkRhaWx5PC9idXR0b24+XHJcblx0PGJ1dHRvbiBzdHlsZT1cIntcclxuXHRcdChwcmFjdGljZU1vZGUpID8gJ2JhY2tncm91bmQtY29sb3I6d2hpdGU7IGZvbnQtd2VpZ2h0OmJvbGRlcicgOiAnJ1xyXG5cdFx0fTsgbWFyZ2luLXJpZ2h0OiA0cHhcIlxyXG5cdG9uOmNsaWNrPXt0b2dnbGVQcmFjdGljZU1vZGV9PlByYWN0aWNlPC9idXR0b24+XHJcbjwvZGl2PiAtLT5cclxuXHJcbjxtYWluPlxyXG5cdDxicj5cclxuXHQ8dGFibGU+XHJcblx0XHR7I2VhY2gge2xlbmd0aDogdHJpZXN9IGFzIF8sIGl9XHJcblx0XHRcdDxXb3JkR3JpZCBzdGF0ZT17Z2V0U3RhdGUoaSwgc3RhdGUpfSBjb3JyZWN0PXt3b3JkfSBiaW5kOm51bWhpbnRzPXtudW1IaW50c30gYmluZDp1c2VkSGludHM9e3VzZWRIaW50c30gYmluZDpmaW5pc2hlZD17ZmluaXNoZWR9IG9uOm1lc3NhZ2U9e2hhbmRsZU1lc3NhZ2V9Lz5cclxuXHRcdHsvZWFjaH1cclxuXHQ8L3RhYmxlPlxyXG5cclxuXHQ8S2V5Ym9hcmQgb246a2V5Y2xpY2s9e2hhbmRsZUtleWNsaWNrfSBiaW5kOm1hcmt1cE1vZGU9e21hcmt1cE1vZGV9IGJpbmQ6c2VsZWN0ZWRDb2xvcj17c2VsZWN0ZWRDb2xvcn0vPlxyXG5cdDwhLS0gPEFsYW5BSSBvbjptZXNzYWdlPXtoYW5kbGVNZXNzYWdlfSBjb3JyZWN0PXt3b3JkfSBiaW5kOnN0YXRlPXtzdGF0ZX0vPiAtLT5cclxuPC9tYWluPlxyXG5cclxuPHN0eWxlPlxyXG5cdG1haW57XHJcblx0XHRtYXJnaW46IDA7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR0b3A6IDUwJTtcclxuXHRcdGxlZnQ6IDUwJTtcclxuXHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG5cclxuXHR9XHJcblxyXG5cdC5tZXNzYWdlICosIC51bmRlciAqe1xyXG5cdFx0bWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG5cdFx0bWFyZ2luLWxlZnQ6IDEwcHg7XHJcblx0XHRkaXNwbGF5OiBpbmxpbmU7XHJcblx0fVxyXG5cdC5tZXNzYWdle1xyXG5cdFx0d2lkdGg6IDEwMCU7XHJcblx0fVxyXG5cclxuXHQuYm90dG9te1xyXG5cdFx0Ym90dG9tOjVweDsgXHJcblx0XHRwb3NpdGlvbjphYnNvbHV0ZTtcclxuXHR9XHJcblxyXG5cdEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpLCAobWF4LWhlaWdodDogODAwcHgpe1xyXG5cdFx0dGFibGV7XHJcblx0XHRcdG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG5cdFx0XHRtYXJnaW4tcmlnaHQ6IGF1dG87XHJcblx0XHR9XHJcblx0XHRoMXtcclxuXHRcdFx0Zm9udC1zaXplOiB4LWxhcmdlO1xyXG5cdFx0fVxyXG5cdFx0bWFpbntcclxuXHRcdFx0bWFyZ2luLXRvcDogNTBweDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC1oZWlnaHQ6IDYwMHB4KXtcclxuXHRcdGgxIHtcclxuXHRcdFx0Zm9udC1zaXplOiBsYXJnZTtcclxuXHRcdH1cclxuICAgIH1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtPQyxrQ0FBSSxDQUFDLEFBQ0osTUFBTSxDQUFFLENBQUMsQ0FDVCxRQUFRLENBQUUsUUFBUSxDQUNsQixHQUFHLENBQUUsR0FBRyxDQUNSLElBQUksQ0FBRSxHQUFHLENBQ1QsU0FBUyxDQUFFLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEFBRWpDLENBQUMsQUFFRCx1QkFBUSxDQUFDLGVBQUMsQ0FBRSxxQkFBTSxDQUFDLGVBQUMsQ0FBQyxBQUNwQixZQUFZLENBQUUsSUFBSSxDQUNsQixXQUFXLENBQUUsSUFBSSxDQUNqQixPQUFPLENBQUUsTUFBTSxBQUNoQixDQUFDLEFBQ0Qsc0NBQVEsQ0FBQyxBQUNSLEtBQUssQ0FBRSxJQUFJLEFBQ1osQ0FBQyxBQUVELHFDQUFPLENBQUMsQUFDUCxPQUFPLEdBQUcsQ0FDVixTQUFTLFFBQVEsQUFDbEIsQ0FBQyxBQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxLQUFLLENBQUMsRUFBRSxhQUFhLEtBQUssQ0FBQyxDQUFDLEFBQzlELG1DQUFLLENBQUMsQUFDTCxXQUFXLENBQUUsSUFBSSxDQUNqQixZQUFZLENBQUUsSUFBSSxBQUNuQixDQUFDLEFBQ0QsZ0NBQUUsQ0FBQyxBQUNGLFNBQVMsQ0FBRSxPQUFPLEFBQ25CLENBQUMsQUFDRCxrQ0FBSSxDQUFDLEFBQ0osVUFBVSxDQUFFLElBQUksQUFDakIsQ0FBQyxBQUNGLENBQUMsQUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUMsQUFDMUMsRUFBRSw4QkFBQyxDQUFDLEFBQ0gsU0FBUyxDQUFFLEtBQUssQUFDakIsQ0FBQyxBQUNDLENBQUMifQ== */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[31] = list[i];
	child_ctx[33] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[34] = list[i];
	return child_ctx;
}

// (137:0) <Popover bind:state={showInfo}>
function create_default_slot(ctx) {
	let p;
	let t1;
	let ul1;
	let li0;
	let t3;
	let ul0;
	let li1;
	let t5;
	let li2;
	let t7;
	let li3;

	const block = {
		c: function create() {
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			p.textContent = "Welcome to dirdle, a directional word guessing game based on Wordle.";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			ul1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("ul");
			li0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			li0.textContent = "If a letter has a grey [?], you know it's either in the correct place or is not in the word at all.";
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			ul0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("ul");
			li1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			li1.textContent = "Click a [?] to reveal a hint. If that letter turns green, it's in the right place. If it turns black, it's not in the word at all.";
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			li2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			li2.textContent = "You can reveal up to 5 hints that turn black.";
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			li3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			li3.textContent = "If a letter has a yellow arrow, it exists somewhere in the word in that respective direction.";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 137, 1, 2901);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(li0, file, 139, 2, 2987);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(li1, file, 141, 3, 3108);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(li2, file, 142, 3, 3252);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(ul0, file, 140, 2, 3099);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(li3, file, 144, 2, 3319);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(ul1, file, 138, 1, 2979);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, ul1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul1, li0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul1, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul1, ul0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul0, li1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul0, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul0, li2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul1, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul1, li3);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(ul1);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(137:0) <Popover bind:state={showInfo}>",
		ctx
	});

	return block;
}

// (151:1) {#if message != ""}
function create_if_block_3(ctx) {
	let strong;
	let t;
	let strong_transition;
	let current;

	const block = {
		c: function create() {
			strong = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("strong");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*message*/ ctx[7]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(strong, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(strong, file, 151, 2, 3511);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, strong, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(strong, t);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (!current || dirty[0] & /*message*/ 128) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, /*message*/ ctx[7]);
		},
		i: function intro(local) {
			if (current) return;

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
				if (!strong_transition) strong_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(strong, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, true);
				strong_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			if (!strong_transition) strong_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(strong, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, false);
			strong_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(strong);
			if (detaching && strong_transition) strong_transition.end();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(151:1) {#if message != \\\"\\\"}",
		ctx
	});

	return block;
}

// (154:1) {#if state == "win"}
function create_if_block_2(ctx) {
	let div;
	let strong;
	let t1;
	let button0;
	let t2;
	let t3;
	let button1;
	let div_transition;
	let current;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			strong = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("strong");
			strong.textContent = "You won!";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*shareBtnContent*/ ctx[8]);
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button1.textContent = "New Game";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(strong, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(strong, file, 155, 3, 3616);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button0, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button0, file, 156, 3, 3646);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button1, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button1, file, 157, 3, 3708);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 154, 2, 3589);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, strong);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, button0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(button0, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, button1);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button0, "click", /*copyResults*/ ctx[12], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button1, "click", /*click_handler*/ ctx[17], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (!current || dirty[0] & /*shareBtnContent*/ 256) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t2, /*shareBtnContent*/ ctx[8]);
		},
		i: function intro(local) {
			if (current) return;

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
				if (!div_transition) div_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, true);
				div_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			if (!div_transition) div_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, false);
			div_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			if (detaching && div_transition) div_transition.end();
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(154:1) {#if state == \\\"win\\\"}",
		ctx
	});

	return block;
}

// (162:1) {#if state == "lose"}
function create_if_block_1(ctx) {
	let div;
	let strong;
	let t1;
	let p;
	let t2;
	let t3;
	let t4;
	let t5;
	let button0;
	let t6;
	let button0_transition;
	let t7;
	let button1;
	let div_transition;
	let current;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			strong = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("strong");
			strong.textContent = "You lost!";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("The word was ");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*word*/ ctx[1]);
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(".");
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*shareBtnContent*/ ctx[8]);
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button1.textContent = "New Game";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(strong, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(strong, file, 163, 3, 3850);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 164, 3, 3881);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button0, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button0, file, 165, 3, 3913);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button1, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button1, file, 166, 3, 3992);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 162, 2, 3823);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, strong);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, p);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, button0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(button0, t6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, button1);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button0, "click", /*copyResults*/ ctx[12], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button1, "click", /*click_handler_1*/ ctx[18], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (!current || dirty[0] & /*word*/ 2) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t3, /*word*/ ctx[1]);
			if (!current || dirty[0] & /*shareBtnContent*/ 256) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t6, /*shareBtnContent*/ ctx[8]);
		},
		i: function intro(local) {
			if (current) return;

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
				if (!button0_transition) button0_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(button0, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, true);
				button0_transition.run(1);
			});

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
				if (!div_transition) div_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, true);
				div_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			if (!button0_transition) button0_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(button0, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, false);
			button0_transition.run(0);
			if (!div_transition) div_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, false);
			div_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			if (detaching && button0_transition) button0_transition.end();
			if (detaching && div_transition) div_transition.end();
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(162:1) {#if state == \\\"lose\\\"}",
		ctx
	});

	return block;
}

// (185:1) {#if markupMode}
function create_if_block(ctx) {
	let div;
	let each_value_1 = /*selectableColors*/ ctx[14];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 185, 2, 4470);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*selectableColors, selectedColor*/ 17408) {
				each_value_1 = /*selectableColors*/ ctx[14];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(185:1) {#if markupMode}",
		ctx
	});

	return block;
}

// (187:3) {#each selectableColors as scl}
function create_each_block_1(ctx) {
	let button;
	let t;
	let button_style_value;
	let mounted;
	let dispose;

	function click_handler_3() {
		return /*click_handler_3*/ ctx[20](/*scl*/ ctx[34]);
	}

	const block = {
		c: function create() {
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("⬤");

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button, "style", button_style_value = 'color:' + /*scl*/ ctx[34] + '; font-size:' + (/*selectedColor*/ ctx[10] == /*scl*/ ctx[34]
			? 'x-large'
			: 'medium'));

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 187, 4, 4517);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(button, t);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button, "click", click_handler_3, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*selectedColor*/ 1024 && button_style_value !== (button_style_value = 'color:' + /*scl*/ ctx[34] + '; font-size:' + (/*selectedColor*/ ctx[10] == /*scl*/ ctx[34]
			? 'x-large'
			: 'medium'))) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button, "style", button_style_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(187:3) {#each selectableColors as scl}",
		ctx
	});

	return block;
}

// (217:2) {#each {length: tries} as _, i}
function create_each_block(ctx) {
	let wordgrid;
	let updating_numhints;
	let updating_usedHints;
	let updating_finished;
	let current;

	function wordgrid_numhints_binding(value) {
		/*wordgrid_numhints_binding*/ ctx[21](value);
	}

	function wordgrid_usedHints_binding(value) {
		/*wordgrid_usedHints_binding*/ ctx[22](value);
	}

	function wordgrid_finished_binding(value) {
		/*wordgrid_finished_binding*/ ctx[23](value);
	}

	let wordgrid_props = {
		state: /*getState*/ ctx[13](/*i*/ ctx[33], /*state*/ ctx[2]),
		correct: /*word*/ ctx[1]
	};

	if (/*numHints*/ ctx[4] !== void 0) {
		wordgrid_props.numhints = /*numHints*/ ctx[4];
	}

	if (/*usedHints*/ ctx[5] !== void 0) {
		wordgrid_props.usedHints = /*usedHints*/ ctx[5];
	}

	if (/*finished*/ ctx[6] !== void 0) {
		wordgrid_props.finished = /*finished*/ ctx[6];
	}

	wordgrid = new _WordGrid__WEBPACK_IMPORTED_MODULE_3__["default"]({ props: wordgrid_props, $$inline: true });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(wordgrid, 'numhints', wordgrid_numhints_binding));
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(wordgrid, 'usedHints', wordgrid_usedHints_binding));
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(wordgrid, 'finished', wordgrid_finished_binding));
	wordgrid.$on("message", /*handleMessage*/ ctx[11]);

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(wordgrid.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(wordgrid, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const wordgrid_changes = {};
			if (dirty[0] & /*state*/ 4) wordgrid_changes.state = /*getState*/ ctx[13](/*i*/ ctx[33], /*state*/ ctx[2]);
			if (dirty[0] & /*word*/ 2) wordgrid_changes.correct = /*word*/ ctx[1];

			if (!updating_numhints && dirty[0] & /*numHints*/ 16) {
				updating_numhints = true;
				wordgrid_changes.numhints = /*numHints*/ ctx[4];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_numhints = false);
			}

			if (!updating_usedHints && dirty[0] & /*usedHints*/ 32) {
				updating_usedHints = true;
				wordgrid_changes.usedHints = /*usedHints*/ ctx[5];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_usedHints = false);
			}

			if (!updating_finished && dirty[0] & /*finished*/ 64) {
				updating_finished = true;
				wordgrid_changes.finished = /*finished*/ ctx[6];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_finished = false);
			}

			wordgrid.$set(wordgrid_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(wordgrid.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(wordgrid.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(wordgrid, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(217:2) {#each {length: tries} as _, i}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let popover;
	let updating_state;
	let t0;
	let div1;
	let h1;
	let t2;
	let t3;
	let t4;
	let t5;
	let div0;
	let strong;
	let t6;
	let t7;
	let t8;
	let div3;
	let a0;
	let t10;
	let a1;
	let t12;
	let div2;
	let small;
	let t14;
	let div4;
	let t15;
	let button0;
	let t16;
	let button0_style_value;
	let t17;
	let button1;
	let t18;
	let button1_style_value;
	let t19;
	let main;
	let br;
	let t20;
	let table;
	let t21;
	let keyboard;
	let updating_markupMode;
	let updating_selectedColor;
	let current;
	let mounted;
	let dispose;

	function popover_state_binding(value) {
		/*popover_state_binding*/ ctx[16](value);
	}

	let popover_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	if (/*showInfo*/ ctx[0] !== void 0) {
		popover_props.state = /*showInfo*/ ctx[0];
	}

	popover = new _Popover_svelte__WEBPACK_IMPORTED_MODULE_6__["default"]({ props: popover_props, $$inline: true });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(popover, 'state', popover_state_binding));
	let if_block0 = /*message*/ ctx[7] != "" && create_if_block_3(ctx);
	let if_block1 = /*state*/ ctx[2] == "win" && create_if_block_2(ctx);
	let if_block2 = /*state*/ ctx[2] == "lose" && create_if_block_1(ctx);
	let if_block3 = /*markupMode*/ ctx[9] && create_if_block(ctx);
	let each_value = { length: /*tries*/ ctx[3] };
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	function keyboard_markupMode_binding(value) {
		/*keyboard_markupMode_binding*/ ctx[24](value);
	}

	function keyboard_selectedColor_binding(value) {
		/*keyboard_selectedColor_binding*/ ctx[25](value);
	}

	let keyboard_props = {};

	if (/*markupMode*/ ctx[9] !== void 0) {
		keyboard_props.markupMode = /*markupMode*/ ctx[9];
	}

	if (/*selectedColor*/ ctx[10] !== void 0) {
		keyboard_props.selectedColor = /*selectedColor*/ ctx[10];
	}

	keyboard = new _Keyboard_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({ props: keyboard_props, $$inline: true });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(keyboard, 'markupMode', keyboard_markupMode_binding));
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(keyboard, 'selectedColor', keyboard_selectedColor_binding));
	keyboard.$on("keyclick", handleKeyclick);

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(popover.$$.fragment);
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			h1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
			h1.textContent = "dirdle";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block0) if_block0.c();
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block1) if_block1.c();
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block2) if_block2.c();
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			strong = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("strong");
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*numHints*/ ctx[4]);
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("/5 hints remaining");
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			a0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a0.textContent = "Github";
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			a1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a1.textContent = "Help";
			t12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			small = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("small");
			small.textContent = "To use a hint, click a [?]";
			t14 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			if (if_block3) if_block3.c();
			t15 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			t16 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Type");
			t17 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			t18 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Mark");
			t19 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			main = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("main");
			br = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("br");
			t20 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			table = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("table");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t21 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(keyboard.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(h1, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h1, file, 149, 1, 3469);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(strong, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(strong, file, 171, 2, 4105);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div0, "class", "right svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div0, file, 170, 1, 4082);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div1, "class", "message svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div1, file, 148, 0, 3445);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "href", "https://github.com/benman604/dirdle");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a0, file, 176, 1, 4193);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "href", "#3");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "id", "helpbtn");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a1, file, 177, 1, 4252);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(small, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(small, file, 179, 2, 4345);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div2, "class", "right svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div2, file, 178, 1, 4322);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div3, "class", "under svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div3, file, 175, 0, 4171);

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button0, "style", button0_style_value = !/*markupMode*/ ctx[9]
			? 'background-color:white; font-weight:bolder'
			: '');

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button0, file, 192, 1, 4701);

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button1, "style", button1_style_value = /*markupMode*/ ctx[9]
			? 'background-color:white; font-weight:bolder'
			: '');

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button1, file, 196, 1, 4839);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div4, "class", "bottom svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div4, "left", "10px");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div4, file, 183, 0, 4407);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(br, file, 214, 1, 5368);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(table, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(table, file, 215, 1, 5375);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(main, "class", "svelte-16khfjo");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(main, file, 213, 0, 5359);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(popover, target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, h1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t2);
			if (if_block0) if_block0.m(div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t3);
			if (if_block1) if_block1.m(div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t4);
			if (if_block2) if_block2.m(div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, strong);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(strong, t6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(strong, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t8, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div3, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div3, a0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div3, t10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div3, a1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div3, t12);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div3, div2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, small);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t14, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div4, anchor);
			if (if_block3) if_block3.m(div4, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div4, t15);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div4, button0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(button0, t16);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div4, t17);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div4, button1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(button1, t18);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t19, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, main, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(main, br);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(main, t20);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(main, table);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(table, null);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(main, t21);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(keyboard, main, null);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(a1, "click", /*click_handler_2*/ ctx[19], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button0, "click", /*toggleMarkupMode*/ ctx[15], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button1, "click", /*toggleMarkupMode*/ ctx[15], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const popover_changes = {};

			if (dirty[1] & /*$$scope*/ 64) {
				popover_changes.$$scope = { dirty, ctx };
			}

			if (!updating_state && dirty[0] & /*showInfo*/ 1) {
				updating_state = true;
				popover_changes.state = /*showInfo*/ ctx[0];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_state = false);
			}

			popover.$set(popover_changes);

			if (/*message*/ ctx[7] != "") {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*message*/ 128) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0, 1);
					if_block0.m(div1, t3);
				}
			} else if (if_block0) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}

			if (/*state*/ ctx[2] == "win") {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*state*/ 4) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1, 1);
					if_block1.m(div1, t4);
				}
			} else if (if_block1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}

			if (/*state*/ ctx[2] == "lose") {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[0] & /*state*/ 4) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_1(ctx);
					if_block2.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					if_block2.m(div1, t5);
				}
			} else if (if_block2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}

			if (!current || dirty[0] & /*numHints*/ 16) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t6, /*numHints*/ ctx[4]);

			if (/*markupMode*/ ctx[9]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block(ctx);
					if_block3.c();
					if_block3.m(div4, t15);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (!current || dirty[0] & /*markupMode*/ 512 && button0_style_value !== (button0_style_value = !/*markupMode*/ ctx[9]
			? 'background-color:white; font-weight:bolder'
			: '')) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button0, "style", button0_style_value);
			}

			if (!current || dirty[0] & /*markupMode*/ 512 && button1_style_value !== (button1_style_value = /*markupMode*/ ctx[9]
			? 'background-color:white; font-weight:bolder'
			: '')) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button1, "style", button1_style_value);
			}

			if (dirty[0] & /*getState, state, word, numHints, usedHints, finished, handleMessage, tries*/ 10366) {
				each_value = { length: /*tries*/ ctx[3] };
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(each_blocks[i], 1);
						each_blocks[i].m(table, null);
					}
				}

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}

			const keyboard_changes = {};

			if (!updating_markupMode && dirty[0] & /*markupMode*/ 512) {
				updating_markupMode = true;
				keyboard_changes.markupMode = /*markupMode*/ ctx[9];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_markupMode = false);
			}

			if (!updating_selectedColor && dirty[0] & /*selectedColor*/ 1024) {
				updating_selectedColor = true;
				keyboard_changes.selectedColor = /*selectedColor*/ ctx[10];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_selectedColor = false);
			}

			keyboard.$set(keyboard_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(popover.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2);

			for (let i = 0; i < each_value.length; i += 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(each_blocks[i]);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(keyboard.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(popover.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(each_blocks[i]);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(keyboard.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(popover, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div1);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t8);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div3);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t14);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div4);
			if (if_block3) if_block3.d();
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t19);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(main);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(keyboard);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function handleKeyclick(event) {
	console.log(event.detail.key);
	return { key: event.detail.key };
}

function randInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('App', slots, []);
	let word = "";
	let state = 0;
	let tries = word.length;
	let results = [];
	let numHints = 5;
	let usedHints = [];
	let finished = false;
	let shareResultsContent = "Dirdle ";
	window["keypress"] = [];
	window["keycolor"] = [];
	let message = "";

	function handleMessage(event) {
		if (event.detail.message != undefined) {
			$$invalidate(7, message = event.detail.message);

			setTimeout(
				() => {
					$$invalidate(7, message = "");
				},
				1000
			);
		} else {
			let x = event.detail.state;
			results.push(x);

			if (x == "correct") {
				$$invalidate(2, state = "win");
				buildResultContent();
			} else if (x == "incorrect") {
				if (state + 1 >= tries) {
					$$invalidate(2, state = "lose");
					buildResultContent();
				} else {
					$$invalidate(2, state++, state);
				}
			}
		}
	}

	function buildResultContent() {
		$$invalidate(6, finished = true);
		let score = state == "win" ? window["keycolor"].length : "X";
		shareResultsContent += score + "/6 \n";

		for (let row of window["keycolor"]) {
			for (let color of row) {
				if (color == "black") {
					shareResultsContent += "⬛";
				}

				if (color == "green") {
					shareResultsContent += "🟩";
				}

				if (color == "yellow") {
					shareResultsContent += "🟨";
				}
			}

			shareResultsContent += "\n";
		}
	}

	let shareBtnContent = "Share";

	function copyResults() {
		navigator.clipboard.writeText(shareResultsContent).then(
			function () {
				$$invalidate(8, shareBtnContent = 'Copied results');
			},
			function (err) {
				$$invalidate(8, shareBtnContent = ('Could not copy text: ', err));
			}
		);

		setTimeout(
			() => {
				$$invalidate(8, shareBtnContent = "Share");
			},
			2000
		);
	}

	function getState(i) {
		if (i == state) {
			return "typing";
		}

		if (i > state) {
			return "waiting";
		}

		return results[i];
	}

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onMount)(() => {
		if (word == "") {
			let aw = _wordbank_js__WEBPACK_IMPORTED_MODULE_5__["default"].split("\n");
			$$invalidate(1, word = aw[randInt(0, aw.length)]);
			console.log(word);
			$$invalidate(3, tries = word.length + 2);
			$$invalidate(2, state = 0);
			results = [];
		}
	});

	let markupMode = false;
	let selectedColor = "black";
	let selectableColors = ["black", "green", "orange"];

	function toggleMarkupMode() {
		$$invalidate(9, markupMode = !markupMode);
	}

	let practiceMode = false;

	function togglePracticeMode() {
		practiceMode = !practiceMode;
	}

	let showInfo = true;

	if (window.localStorage.getItem("first") === null) {
		window.localStorage.setItem("first", "true");
	} else {
		showInfo = false;
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
	});

	function popover_state_binding(value) {
		showInfo = value;
		$$invalidate(0, showInfo);
	}

	const click_handler = () => {
		window.location.reload();
	};

	const click_handler_1 = () => {
		window.location.reload();
	};

	const click_handler_2 = () => {
		$$invalidate(0, showInfo = true);
	};

	const click_handler_3 = scl => {
		$$invalidate(10, selectedColor = scl);
	};

	function wordgrid_numhints_binding(value) {
		numHints = value;
		$$invalidate(4, numHints);
	}

	function wordgrid_usedHints_binding(value) {
		usedHints = value;
		$$invalidate(5, usedHints);
	}

	function wordgrid_finished_binding(value) {
		finished = value;
		$$invalidate(6, finished);
	}

	function keyboard_markupMode_binding(value) {
		markupMode = value;
		$$invalidate(9, markupMode);
	}

	function keyboard_selectedColor_binding(value) {
		selectedColor = value;
		$$invalidate(10, selectedColor);
	}

	$$self.$capture_state = () => ({
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__.onMount,
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__.createEventDispatcher,
		scale: svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale,
		WordGrid: _WordGrid__WEBPACK_IMPORTED_MODULE_3__["default"],
		Keyboard: _Keyboard_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		Bank: _wordbank_js__WEBPACK_IMPORTED_MODULE_5__["default"],
		Popover: _Popover_svelte__WEBPACK_IMPORTED_MODULE_6__["default"],
		word,
		state,
		tries,
		results,
		numHints,
		usedHints,
		finished,
		shareResultsContent,
		message,
		handleMessage,
		handleKeyclick,
		buildResultContent,
		shareBtnContent,
		copyResults,
		getState,
		randInt,
		markupMode,
		selectedColor,
		selectableColors,
		toggleMarkupMode,
		practiceMode,
		togglePracticeMode,
		showInfo
	});

	$$self.$inject_state = $$props => {
		if ('word' in $$props) $$invalidate(1, word = $$props.word);
		if ('state' in $$props) $$invalidate(2, state = $$props.state);
		if ('tries' in $$props) $$invalidate(3, tries = $$props.tries);
		if ('results' in $$props) results = $$props.results;
		if ('numHints' in $$props) $$invalidate(4, numHints = $$props.numHints);
		if ('usedHints' in $$props) $$invalidate(5, usedHints = $$props.usedHints);
		if ('finished' in $$props) $$invalidate(6, finished = $$props.finished);
		if ('shareResultsContent' in $$props) shareResultsContent = $$props.shareResultsContent;
		if ('message' in $$props) $$invalidate(7, message = $$props.message);
		if ('shareBtnContent' in $$props) $$invalidate(8, shareBtnContent = $$props.shareBtnContent);
		if ('markupMode' in $$props) $$invalidate(9, markupMode = $$props.markupMode);
		if ('selectedColor' in $$props) $$invalidate(10, selectedColor = $$props.selectedColor);
		if ('selectableColors' in $$props) $$invalidate(14, selectableColors = $$props.selectableColors);
		if ('practiceMode' in $$props) practiceMode = $$props.practiceMode;
		if ('showInfo' in $$props) $$invalidate(0, showInfo = $$props.showInfo);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*showInfo*/ 1) {
			$: {
				console.log(showInfo);
			}
		}
	};

	return [
		showInfo,
		word,
		state,
		tries,
		numHints,
		usedHints,
		finished,
		message,
		shareBtnContent,
		markupMode,
		selectedColor,
		handleMessage,
		copyResults,
		getState,
		selectableColors,
		toggleMarkupMode,
		popover_state_binding,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3,
		wordgrid_numhints_binding,
		wordgrid_usedHints_binding,
		wordgrid_finished_binding,
		keyboard_markupMode_binding,
		keyboard_selectedColor_binding
	];
}

class App extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css, [-1, -1]);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);



/***/ }),

/***/ "./src/Keyboard.svelte":
/*!*****************************!*\
  !*** ./src/Keyboard.svelte ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var C_Users_Ben_Documents_test_dirdle_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var C_Users_Ben_Documents_test_dirdle_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src\Keyboard.svelte generated by Svelte v3.46.4 */


const { Object: Object_1, console: console_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;
const file = "src\\Keyboard.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-as3lhl", ".row.svelte-as3lhl.svelte-as3lhl{width:100%;display:flex;align-items:center;justify-content:center}.row.svelte-as3lhl button.svelte-as3lhl{margin-left:2px;margin-right:2px;width:35px;height:35px;text-transform:uppercase}main.svelte-as3lhl.svelte-as3lhl{margin-bottom:50px}@media only screen and (max-width: 600px), (max-height: 600px){.row.svelte-as3lhl button.svelte-as3lhl{width:32px;height:32px}}.greenorblack.svelte-as3lhl.svelte-as3lhl{background-image:url(\"images/unknown.png\"), linear-gradient(#e9e9e9c7, #e9e9e9c7);background-size:cover;color:black}.somewhere-left.svelte-as3lhl.svelte-as3lhl{background-image:url(\"images/left-trig.png\"), linear-gradient(#ffffff, #ffffff);background-size:cover;color:black}.somewhere-right.svelte-as3lhl.svelte-as3lhl{background-image:url(\"images/right-trig.png\"), linear-gradient(#ffffff, #ffffff);background-size:cover;color:black\r\n    }\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5Ym9hcmQuc3ZlbHRlIiwic291cmNlcyI6WyJLZXlib2FyZC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cclxuICAgIGV4cG9ydCBsZXQgbWFya3VwTW9kZSA9IGZhbHNlO1xyXG4gICAgZXhwb3J0IGxldCBzZWxlY3RlZENvbG9yID0gXCJibGFja1wiXHJcbiAgICBsZXQga2V5cyA9IFtcclxuICAgICAgICBcInF3ZXJ0eXVpb3BcIixcclxuICAgICAgICBcImFzZGZnaGprbFwiLFxyXG4gICAgICAgIFwi4oaQenhjdmJubeKGklwiXHJcbiAgICBdXHJcblxyXG4gICAgZnVuY3Rpb24ga2V5Q2xpY2soa2V5KXtcclxuICAgICAgICBpZihrZXkgPT0gXCLihpBcIil7XHJcbiAgICAgICAgICAgIGtleSA9IFwiQmFja3NwYWNlXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoa2V5ID09IFwi4oaSXCIpe1xyXG4gICAgICAgICAgICBrZXkgPSBcIkVudGVyXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobWFya3VwTW9kZSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PSBcIkVudGVyXCIgfHwga2V5ID09IFwiQmFja3NwYWNlXCIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2VsZWN0ZWRDb2xvciA9PSBrZXljb2xvcnNba2V5XSl7XHJcbiAgICAgICAgICAgICAgICBrZXljb2xvcnNba2V5XSA9IFwiXCJcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAga2V5Y29sb3JzW2tleV0gPSBzZWxlY3RlZENvbG9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgZm4gb2Ygd2luZG93W1wia2V5cHJlc3NcIl0pe1xyXG4gICAgICAgICAgICBmbih7a2V5OiBrZXl9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQga2V5Y29sb3JzID0ge31cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUtleWJvYXJkKGNvbG9ycyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coa2V5Y29sb3JzKVxyXG4gICAgICAgIGZvcihsZXQgaSBvZiBPYmplY3Qua2V5cyhjb2xvcnMpKXtcclxuICAgICAgICAgICAgZm9yKGxldCBqIG9mIGNvbG9yc1tpXSl7XHJcbiAgICAgICAgICAgICAgICBrZXljb2xvcnNbal0gPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAga2V5Y29sb3JzID0ga2V5Y29sb3JzXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93W1widXBkYXRlS2V5Ym9hcmRcIl0gPSB1cGRhdGVLZXlib2FyZFxyXG48L3NjcmlwdD5cclxuXHJcbjxtYWluPlxyXG4gICAgPGJyPlxyXG4gICAgeyNlYWNoIGtleXMgYXMga2V5fVxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgeyNlYWNoIGtleSBhcyBsZXR0ZXJ9XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwie2tleWNvbG9yc1tsZXR0ZXJdfVwiIG9uOmNsaWNrPXsoKT0+e2tleUNsaWNrKGxldHRlcil9fT57bGV0dGVyfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICB7L2VhY2h9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB7L2VhY2h9XHJcbjwvbWFpbj5cclxuXHJcbjxzdHlsZT5cclxuICAgIC5yb3d7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgLnJvdyBidXR0b257XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDJweDtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDJweDtcclxuICAgICAgICB3aWR0aDogMzVweDtcclxuICAgICAgICBoZWlnaHQ6IDM1cHg7XHJcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIH1cclxuICAgIG1haW57XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNTBweDtcclxuICAgIH1cclxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpLCAobWF4LWhlaWdodDogNjAwcHgpe1xyXG4gICAgICAgIC5yb3cgYnV0dG9ue1xyXG4gICAgICAgICAgICB3aWR0aDogMzJweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAzMnB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuZ3JlZW5vcmJsYWNre1xyXG5cdCAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJpbWFnZXMvdW5rbm93bi5wbmdcIiksIGxpbmVhci1ncmFkaWVudCgjZTllOWU5YzcsICNlOWU5ZTljNyk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLnNvbWV3aGVyZS1sZWZ0e1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImltYWdlcy9sZWZ0LXRyaWcucG5nXCIpLCBsaW5lYXItZ3JhZGllbnQoI2ZmZmZmZiwgI2ZmZmZmZik7XHJcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLnNvbWV3aGVyZS1yaWdodHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJpbWFnZXMvcmlnaHQtdHJpZy5wbmdcIiksIGxpbmVhci1ncmFkaWVudCgjZmZmZmZmLCAjZmZmZmZmKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgICAgIGNvbG9yOiBibGFja1xyXG4gICAgfVxyXG48L3N0eWxlPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwREksZ0NBQUksQ0FBQyxBQUNELEtBQUssQ0FBRSxJQUFJLENBQ1gsT0FBTyxDQUFFLElBQUksQ0FDYixXQUFXLENBQUUsTUFBTSxDQUNuQixlQUFlLENBQUUsTUFBTSxBQUMzQixDQUFDLEFBQ0Qsa0JBQUksQ0FBQyxvQkFBTSxDQUFDLEFBQ1IsV0FBVyxDQUFFLEdBQUcsQ0FDaEIsWUFBWSxDQUFFLEdBQUcsQ0FDakIsS0FBSyxDQUFFLElBQUksQ0FDWCxNQUFNLENBQUUsSUFBSSxDQUNaLGNBQWMsQ0FBRSxTQUFTLEFBQzdCLENBQUMsQUFDRCxnQ0FBSSxDQUFDLEFBQ0QsYUFBYSxDQUFFLElBQUksQUFDdkIsQ0FBQyxBQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxLQUFLLENBQUMsRUFBRSxhQUFhLEtBQUssQ0FBQyxDQUFDLEFBQzNELGtCQUFJLENBQUMsb0JBQU0sQ0FBQyxBQUNSLEtBQUssQ0FBRSxJQUFJLENBQ1gsTUFBTSxDQUFFLElBQUksQUFDaEIsQ0FBQyxBQUNMLENBQUMsQUFFRCx5Q0FBYSxDQUFDLEFBQ2IsZ0JBQWdCLENBQUUsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUMvRSxlQUFlLENBQUUsS0FBSyxDQUN0QixLQUFLLENBQUUsS0FBSyxBQUNoQixDQUFDLEFBRUQsMkNBQWUsQ0FBQyxBQUNaLGdCQUFnQixDQUFFLElBQUksc0JBQXNCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FDaEYsZUFBZSxDQUFFLEtBQUssQ0FDdEIsS0FBSyxDQUFFLEtBQUssQUFDaEIsQ0FBQyxBQUVELDRDQUFnQixDQUFDLEFBQ2IsZ0JBQWdCLENBQUUsSUFBSSx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUNqRixlQUFlLENBQUUsS0FBSyxDQUN0QixLQUFLLENBQUUsS0FBSztJQUNoQixDQUFDIn0= */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	return child_ctx;
}

// (51:12) {#each key as letter}
function create_each_block_1(ctx) {
	let button;
	let t_value = /*letter*/ ctx[10] + "";
	let t;
	let button_class_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[5](/*letter*/ ctx[10]);
	}

	const block = {
		c: function create() {
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button, "class", button_class_value = "" + ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.null_to_empty)(/*keycolors*/ ctx[0][/*letter*/ ctx[10]]) + " svelte-as3lhl"));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 51, 16, 1208);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(button, t);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button, "click", click_handler, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*keycolors*/ 1 && button_class_value !== (button_class_value = "" + ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.null_to_empty)(/*keycolors*/ ctx[0][/*letter*/ ctx[10]]) + " svelte-as3lhl"))) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button, "class", button_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(51:12) {#each key as letter}",
		ctx
	});

	return block;
}

// (49:4) {#each keys as key}
function create_each_block(ctx) {
	let div;
	let t;
	let each_value_1 = /*key*/ ctx[7];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "row svelte-as3lhl");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 49, 8, 1138);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*keycolors, keys, keyClick*/ 7) {
				each_value_1 = /*key*/ ctx[7];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, t);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(49:4) {#each keys as key}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let main;
	let br;
	let t;
	let each_value = /*keys*/ ctx[1];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			main = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("main");
			br = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("br");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(br, file, 47, 4, 1099);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(main, "class", "svelte-as3lhl");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(main, file, 46, 0, 1087);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, main, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(main, br);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(main, t);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(main, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*keys, keycolors, keyClick*/ 7) {
				each_value = /*keys*/ ctx[1];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(main, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(main);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Keyboard', slots, []);
	let { markupMode = false } = $$props;
	let { selectedColor = "black" } = $$props;
	let keys = ["qwertyuiop", "asdfghjkl", "←zxcvbnm→"];

	function keyClick(key) {
		if (key == "←") {
			key = "Backspace";
		}

		if (key == "→") {
			key = "Enter";
		}

		if (markupMode) {
			if (key == "Enter" || key == "Backspace") {
				return;
			}

			if (selectedColor == keycolors[key]) {
				$$invalidate(0, keycolors[key] = "", keycolors);
			} else {
				$$invalidate(0, keycolors[key] = selectedColor, keycolors);
			}

			return;
		}

		for (let fn of window["keypress"]) {
			fn({ key });
		}
	}

	let keycolors = {};

	function updateKeyboard(colors) {
		console.log(keycolors);

		for (let i of Object.keys(colors)) {
			for (let j of colors[i]) {
				$$invalidate(0, keycolors[j] = i, keycolors);
			}
		}

		$$invalidate(0, keycolors);
	}

	window["updateKeyboard"] = updateKeyboard;
	const writable_props = ['markupMode', 'selectedColor'];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Keyboard> was created with unknown prop '${key}'`);
	});

	const click_handler = letter => {
		keyClick(letter);
	};

	$$self.$$set = $$props => {
		if ('markupMode' in $$props) $$invalidate(3, markupMode = $$props.markupMode);
		if ('selectedColor' in $$props) $$invalidate(4, selectedColor = $$props.selectedColor);
	};

	$$self.$capture_state = () => ({
		markupMode,
		selectedColor,
		keys,
		keyClick,
		keycolors,
		updateKeyboard
	});

	$$self.$inject_state = $$props => {
		if ('markupMode' in $$props) $$invalidate(3, markupMode = $$props.markupMode);
		if ('selectedColor' in $$props) $$invalidate(4, selectedColor = $$props.selectedColor);
		if ('keys' in $$props) $$invalidate(1, keys = $$props.keys);
		if ('keycolors' in $$props) $$invalidate(0, keycolors = $$props.keycolors);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [keycolors, keys, keyClick, markupMode, selectedColor, click_handler];
}

class Keyboard extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { markupMode: 3, selectedColor: 4 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Keyboard",
			options,
			id: create_fragment.name
		});
	}

	get markupMode() {
		throw new Error("<Keyboard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set markupMode(value) {
		throw new Error("<Keyboard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedColor() {
		throw new Error("<Keyboard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedColor(value) {
		throw new Error("<Keyboard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyboard);



/***/ }),

/***/ "./src/Popover.svelte":
/*!****************************!*\
  !*** ./src/Popover.svelte ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
/* harmony import */ var C_Users_Ben_Documents_test_dirdle_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var C_Users_Ben_Documents_test_dirdle_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src\Popover.svelte generated by Svelte v3.46.4 */



const file = "src\\Popover.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1kciocc", "main.svelte-1kciocc{position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto}.content.svelte-1kciocc{background-color:#ffffff;margin:15% auto;padding:20px;padding-top:10px;width:80%;max-width:fit-content;box-shadow:0 0 20px 0 rgba(0, 0, 0, 0.2);border-radius:5px}.right.svelte-1kciocc{float:right}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wb3Zlci5zdmVsdGUiLCJzb3VyY2VzIjpbIlBvcG92ZXIuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgeyBzY2FsZSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJ1xyXG4gICAgZXhwb3J0IGxldCBzdGF0ZSA9IGZhbHNlXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVTdGF0ZSgpe1xyXG4gICAgICAgIHN0YXRlID0gIXN0YXRlXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7ICAgXHJcbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpLmNvbnRhaW5zKGUudGFyZ2V0KSAmJiBlLnRhcmdldC5pZCAhPSAnaGVscGJ0bicpIHtcclxuICAgICAgICAgICAgc3RhdGUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG48L3NjcmlwdD5cclxuXHJcbnsjaWYgc3RhdGV9XHJcbiAgICA8bWFpbiB0cmFuc2l0aW9uOnNjYWxlPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCIgaWQ9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzPVwicmlnaHRcIiBocmVmPVwiIy9cIiByb2xlPVwiYnV0dG9uXCIgb246Y2xpY2t8cHJldmVudERlZmF1bHQ9e3RvZ2dsZVN0YXRlfT5DbG9zZTwvYT5cclxuICAgICAgICAgICAgPHNsb3Q+PC9zbG90PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9tYWluPlxyXG57L2lmfVxyXG5cclxuPHN0eWxlPlxyXG4gICAgbWFpbiB7XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIHotaW5kZXg6IDE7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgfVxyXG5cclxuICAgIC5jb250ZW50IHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgIG1hcmdpbjogMTUlIGF1dG87XHJcbiAgICAgICAgcGFkZGluZzogMjBweDtcclxuICAgICAgICBwYWRkaW5nLXRvcDogMTBweDtcclxuICAgICAgICB3aWR0aDogODAlO1xyXG4gICAgICAgIG1heC13aWR0aDogZml0LWNvbnRlbnQ7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDIwcHggMCByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5yaWdodCB7XHJcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgfVxyXG48L3N0eWxlPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3QkksSUFBSSxlQUFDLENBQUMsQUFDRixRQUFRLENBQUUsS0FBSyxDQUNmLE9BQU8sQ0FBRSxDQUFDLENBQ1YsSUFBSSxDQUFFLENBQUMsQ0FDUCxHQUFHLENBQUUsQ0FBQyxDQUNOLEtBQUssQ0FBRSxJQUFJLENBQ1gsTUFBTSxDQUFFLElBQUksQ0FDWixRQUFRLENBQUUsSUFBSSxBQUNsQixDQUFDLEFBRUQsUUFBUSxlQUFDLENBQUMsQUFDTixnQkFBZ0IsQ0FBRSxPQUFPLENBQ3pCLE1BQU0sQ0FBRSxHQUFHLENBQUMsSUFBSSxDQUNoQixPQUFPLENBQUUsSUFBSSxDQUNiLFdBQVcsQ0FBRSxJQUFJLENBQ2pCLEtBQUssQ0FBRSxHQUFHLENBQ1YsU0FBUyxDQUFFLFdBQVcsQ0FDdEIsVUFBVSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUN6QyxhQUFhLENBQUUsR0FBRyxBQUN0QixDQUFDLEFBRUQsTUFBTSxlQUFDLENBQUMsQUFDSixLQUFLLENBQUUsS0FBSyxBQUNoQixDQUFDIn0= */");
}

// (15:0) {#if state}
function create_if_block(ctx) {
	let main;
	let div;
	let a;
	let t1;
	let main_transition;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			main = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("main");
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a.textContent = "Close";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (default_slot) default_slot.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "right svelte-1kciocc");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "#/");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "role", "button");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 17, 12, 460);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "content svelte-1kciocc");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "id", "content");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 16, 8, 412);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(main, "class", "svelte-1kciocc");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(main, file, 15, 4, 379);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, main, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(main, div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t1);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*toggleState*/ ctx[1]), false, true, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(/*$$scope*/ ctx[2])
						: (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot, local);

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
				if (!main_transition) main_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(main, svelte_transition__WEBPACK_IMPORTED_MODULE_1__.scale, {}, true);
				main_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot, local);
			if (!main_transition) main_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(main, svelte_transition__WEBPACK_IMPORTED_MODULE_1__.scale, {}, false);
			main_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(main);
			if (default_slot) default_slot.d(detaching);
			if (detaching && main_transition) main_transition.end();
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(15:0) {#if state}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*state*/ ctx[0] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*state*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*state*/ 1) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block, 1, 1, () => {
					if_block = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Popover', slots, ['default']);
	let { state = false } = $$props;

	function toggleState() {
		$$invalidate(0, state = !state);
	}

	window.addEventListener('click', function (e) {
		if (!document.getElementById('content').contains(e.target) && e.target.id != 'helpbtn') {
			$$invalidate(0, state = false);
		}
	});

	const writable_props = ['state'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Popover> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('state' in $$props) $$invalidate(0, state = $$props.state);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ scale: svelte_transition__WEBPACK_IMPORTED_MODULE_1__.scale, state, toggleState });

	$$self.$inject_state = $$props => {
		if ('state' in $$props) $$invalidate(0, state = $$props.state);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [state, toggleState, $$scope, slots];
}

class Popover extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { state: 0 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Popover",
			options,
			id: create_fragment.name
		});
	}

	get state() {
		throw new Error("<Popover>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set state(value) {
		throw new Error("<Popover>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popover);



/***/ }),

/***/ "./src/WordGrid.svelte":
/*!*****************************!*\
  !*** ./src/WordGrid.svelte ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _words_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./words.js */ "./src/words.js");
/* harmony import */ var C_Users_Ben_Documents_test_dirdle_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var C_Users_Ben_Documents_test_dirdle_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src\WordGrid.svelte generated by Svelte v3.46.4 */


const { window: window_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;


const file = "src\\WordGrid.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-t59wck", "th.svelte-t59wck{width:75px;height:75px;font-size:xx-large;color:white;text-transform:uppercase}@media only screen and (max-height: 800px){th.svelte-t59wck{width:60px;height:60px;font-size:x-large}}@media only screen and (max-width: 600px), (max-height: 700px){th.svelte-t59wck{width:50px;height:50px;font-size:x-large}}.greenorblack.svelte-t59wck{background-image:url(\"images/unknown.png\"), linear-gradient(#e9e9e9c7, #e9e9e9c7);background-size:cover;color:black}.greenorblack.svelte-t59wck:hover{background-image:url(\"images/unknown.png\"), linear-gradient(#5e5e5e, #5e5e5e);background-size:cover;color:white;cursor:pointer}.somewhere-left.svelte-t59wck{background-image:url(\"images/left-trig.png\"), linear-gradient(#ffffff, #ffffff);background-size:cover;color:black}.somewhere-right.svelte-t59wck{background-image:url(\"images/right-trig.png\"), linear-gradient(#ffffff, #ffffff);background-size:cover;color:black\r\n    }\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZEdyaWQuc3ZlbHRlIiwic291cmNlcyI6WyJXb3JkR3JpZC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cclxuICAgIC8vIGltcG9ydCB3b3JkLXN0cmVhbVxyXG4gICAgLy8gaW1wb3J0IHJhbmRvbS13b3JkXHJcbiAgICBpbXBvcnQge2NyZWF0ZUV2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnc3ZlbHRlJ1xyXG5cdGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XHJcblx0aW1wb3J0IEFsbHdvcmRzIGZyb20gJy4vd29yZHMuanMnXHJcblxyXG5cclxuICAgIGV4cG9ydCBsZXQgY29ycmVjdFxyXG4gICAgZXhwb3J0IGxldCBzdGF0ZVxyXG4gICAgZXhwb3J0IGxldCBudW1oaW50c1xyXG4gICAgZXhwb3J0IGxldCBmaW5pc2hlZCA9IGZhbHNlXHJcbiAgICBsZXQgd29yZCA9IFwiXCJcclxuICAgIGxldCBjb2xvciA9IFwid2FpdGluZyxcIi5yZXBlYXQoY29ycmVjdC5sZW5ndGgpLnNwbGl0KFwiLFwiKVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENvbG9yKGkpe1xyXG4gICAgICAgIGZvcihsZXQgaiBvZiB1c2VkSGludHMpe1xyXG4gICAgICAgICAgICBpZihqLmluZGV4ID09IGkgJiYgai5jaGFyID09IHdvcmRbaV0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9yW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RhdGUgPT0gXCJjb3JyZWN0XCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJncmVlblwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGkgPT0gd29yZC5sZW5ndGggJiYgc3RhdGUgIT0gXCJ3YWl0aW5nXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJjdXJzb3JcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb2xvcltpXSA9PSBcImdyZWVuXCIgfHwgY29sb3JbaV0gPT0gXCJibGFja1wiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ3JlZW5vcmJsYWNrXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY29sb3JbaV0gPT0gXCJ5ZWxsb3dcIil7XHJcbiAgICAgICAgICAgIGxldCBjaW5kZXggPSAwXHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqPGNvcnJlY3QubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoY29ycmVjdFtqXSA9PSB3b3JkW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICBjaW5kZXggPSBqXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaSA8IGNpbmRleCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzb21ld2hlcmUtcmlnaHRcIlxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBpZihpID4gY2luZGV4KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInNvbWV3aGVyZS1sZWZ0XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sb3JbaV1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRDaGFyKGkpe1xyXG4gICAgICAgIGlmKGkgPCB3b3JkLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JkW2ldXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIiBcIlxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvdW50Q2hhcih3ZCwgY2hhcil7XHJcbiAgICAgICAgcmV0dXJuIHdkLnNwbGl0KGNoYXIpLmxlbmd0aCAtIDFcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBjaGVjaygpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3b3JkLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYod29yZFtpXSA9PSBjb3JyZWN0W2ldKXtcclxuICAgICAgICAgICAgICAgIGNvbG9yW2ldID0gXCJncmVlblwiXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihjb3JyZWN0LmluY2x1ZGVzKHdvcmRbaV0pKXtcclxuICAgICAgICAgICAgICAgIGNvbG9yW2ldID0gXCJ5ZWxsb3dcIlxyXG4gICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb2xvcltpXSA9IFwiYmxhY2tcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgdXBkYXRlS2V5Ym9hcmRDb2xvcnMoKVxyXG4gICAgICAgIHdpbmRvd1tcImtleWNvbG9yXCJdLnB1c2goY29sb3IpXHJcbiAgICAgICAgc3RhdGUgPSAod29yZCA9PSBjb3JyZWN0KSA/IFwiY29ycmVjdFwiIDogXCJpbmNvcnJlY3RcIlxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBkaXNwYXRjaCgnbWVzc2FnZScsIHtzdGF0ZTogc3RhdGV9KVxyXG4gICAgICAgIH0sIDEwMClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVLZXlib2FyZENvbG9ycygpe1xyXG4gICAgICAgIGxldCByZWZvcm1hdGVkQ29sb3JzID0ge1wiYmxhY2tcIjogW10sIFwieWVsbG93XCI6IFtdLCBcImdyZWVuXCI6IFtdLCBcImdyZWVub3JibGFja1wiOiBbXSwgXCJzb21ld2hlcmUtcmlnaHRcIjogW10sIFwic29tZXdoZXJlLWxlZnRcIjogW119XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICByZWZvcm1hdGVkQ29sb3JzW2dldENvbG9yKGkpXS5wdXNoKHdvcmRbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvd1tcInVwZGF0ZUtleWJvYXJkXCJdKHJlZm9ybWF0ZWRDb2xvcnMpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24ga2V5cHJlc3MoZXZlbnQpe1xyXG4gICAgICAgIGlmKHN0YXRlID09IFwidHlwaW5nXCIgJiYgd29yZC5sZW5ndGggPD0gY29ycmVjdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJFbnRlclwiICYmIHdvcmQubGVuZ3RoID09IGNvcnJlY3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIGlmKEFsbHdvcmRzLnNwbGl0KFwiXFxuXCIpLmluY2x1ZGVzKHdvcmQpKXtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjaygpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChcIm1lc3NhZ2VcIiwge21lc3NhZ2U6IHdvcmQgKyBcIiBpcyBub3QgYSB3b3JkIVwifSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJCYWNrc3BhY2VcIil7XHJcbiAgICAgICAgICAgICAgICB3b3JkID0gd29yZC5zdWJzdHJpbmcoMCwgd29yZC5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoZXZlbnQua2V5Lmxlbmd0aCA9PSAxICYmIHdvcmQubGVuZ3RoIDwgY29ycmVjdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgd29yZCArPSBldmVudC5rZXkudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvd1tcImtleXByZXNzXCJdLnB1c2goa2V5cHJlc3MpXHJcblxyXG4gICAgZXhwb3J0IGxldCB1c2VkSGludHMgPSBbXVxyXG4gICAgZnVuY3Rpb24gcmV2ZWFsSGludChpKXtcclxuICAgICAgICBmb3IobGV0IGogb2YgdXNlZEhpbnRzKXtcclxuICAgICAgICAgICAgaWYoai5pbmRleCA9PSBpICYmIGouY2hhciA9PSB3b3JkW2ldKXtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG51bWhpbnRzIDw9IDAgJiYgIWZpbmlzaGVkKXtcclxuICAgICAgICAgICAgZGlzcGF0Y2goXCJtZXNzYWdlXCIsIHttZXNzYWdlOiBcIllvdSBoYXZlIG5vIG1vcmUgaGludHMhXCJ9KVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZ2V0Q29sb3IoaSkgPT0gXCJncmVlbm9yYmxhY2tcIil7XHJcbiAgICAgICAgICAgIHVzZWRIaW50cy5wdXNoKHtpbmRleDogaSwgY2hhcjogd29yZFtpXX0pXHJcbiAgICAgICAgICAgIHVzZWRIaW50cyA9IHVzZWRIaW50c1xyXG4gICAgICAgICAgICBpZighZmluaXNoZWQgJiYgd29yZFtpXSAhPSBjb3JyZWN0W2ldKXtcclxuICAgICAgICAgICAgICAgIG51bWhpbnRzLS1cclxuICAgICAgICAgICAgICAgIG51bWhpbnRzID0gbnVtaGludHNcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqPGNvcnJlY3QubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZWRIaW50cy5wdXNoKHtpbmRleDogaiwgY2hhcjogd29yZFtpXX0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1c2VkSGludHMgPSB1c2VkSGludHNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlS2V5Ym9hcmRDb2xvcnMoKVxyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdmVsdGU6d2luZG93IG9uOmtleWRvd249e2tleXByZXNzfS8+XHJcbjx0cj5cclxuICAgIHsjZWFjaCB7bGVuZ3RoOiBjb3JyZWN0Lmxlbmd0aH0gYXMgXywgaX1cclxuICAgICAgICA8dGggXHJcbiAgICAgICAgICAgIGNsYXNzPVwie2dldENvbG9yKGksIHdvcmQsIHN0YXRlLCB1c2VkSGludHMpfVwiXHJcbiAgICAgICAgICAgIG9uOmNsaWNrPXsoKT0+e3JldmVhbEhpbnQoaSl9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgICAge2dldENoYXIoaSwgd29yZCl9XHJcbiAgICAgICAgPC90aD5cclxuICAgIHsvZWFjaH1cclxuPC90cj5cclxuXHJcbjxzdHlsZT5cclxuICAgIHRoe1xyXG4gICAgICAgIHdpZHRoOiA3NXB4O1xyXG4gICAgICAgIGhlaWdodDogNzVweDtcclxuICAgICAgICBmb250LXNpemU6IHh4LWxhcmdlO1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgfVxyXG5cclxuXHRAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiA4MDBweCl7XHJcbiAgICAgICAgdGh7XHJcbiAgICAgICAgICAgIHdpZHRoOiA2MHB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogeC1sYXJnZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCksIChtYXgtaGVpZ2h0OiA3MDBweCl7XHJcbiAgICAgICAgdGh7XHJcbiAgICAgICAgICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogeC1sYXJnZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmdyZWVub3JibGFja3tcclxuXHQgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiaW1hZ2VzL3Vua25vd24ucG5nXCIpLCBsaW5lYXItZ3JhZGllbnQoI2U5ZTllOWM3LCAjZTllOWU5YzcpO1xyXG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICAgICAgY29sb3I6IGJsYWNrO1xyXG4gICAgfVxyXG4gICAgLmdyZWVub3JibGFjazpob3ZlcntcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJpbWFnZXMvdW5rbm93bi5wbmdcIiksIGxpbmVhci1ncmFkaWVudCgjNWU1ZTVlLCAjNWU1ZTVlKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLnNvbWV3aGVyZS1sZWZ0e1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImltYWdlcy9sZWZ0LXRyaWcucG5nXCIpLCBsaW5lYXItZ3JhZGllbnQoI2ZmZmZmZiwgI2ZmZmZmZik7XHJcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLnNvbWV3aGVyZS1yaWdodHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJpbWFnZXMvcmlnaHQtdHJpZy5wbmdcIiksIGxpbmVhci1ncmFkaWVudCgjZmZmZmZmLCAjZmZmZmZmKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgICAgIGNvbG9yOiBibGFja1xyXG4gICAgfVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0pJLGdCQUFFLENBQUMsQUFDQyxLQUFLLENBQUUsSUFBSSxDQUNYLE1BQU0sQ0FBRSxJQUFJLENBQ1osU0FBUyxDQUFFLFFBQVEsQ0FDbkIsS0FBSyxDQUFFLEtBQUssQ0FDWixjQUFjLENBQUUsU0FBUyxBQUM3QixDQUFDLEFBRUosT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLEFBQ3BDLGdCQUFFLENBQUMsQUFDQyxLQUFLLENBQUUsSUFBSSxDQUNYLE1BQU0sQ0FBRSxJQUFJLENBQ1osU0FBUyxDQUFFLE9BQU8sQUFDdEIsQ0FBQyxBQUNMLENBQUMsQUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxDQUFDLEVBQUUsYUFBYSxLQUFLLENBQUMsQ0FBQyxBQUMzRCxnQkFBRSxDQUFDLEFBQ0MsS0FBSyxDQUFFLElBQUksQ0FDWCxNQUFNLENBQUUsSUFBSSxDQUNaLFNBQVMsQ0FBRSxPQUFPLEFBQ3RCLENBQUMsQUFDTCxDQUFDLEFBRUQsMkJBQWEsQ0FBQyxBQUNiLGdCQUFnQixDQUFFLElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FDL0UsZUFBZSxDQUFFLEtBQUssQ0FDdEIsS0FBSyxDQUFFLEtBQUssQUFDaEIsQ0FBQyxBQUNELDJCQUFhLE1BQU0sQ0FBQyxBQUNoQixnQkFBZ0IsQ0FBRSxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQzlFLGVBQWUsQ0FBRSxLQUFLLENBQ3RCLEtBQUssQ0FBRSxLQUFLLENBQ1osTUFBTSxDQUFFLE9BQU8sQUFDbkIsQ0FBQyxBQUVELDZCQUFlLENBQUMsQUFDWixnQkFBZ0IsQ0FBRSxJQUFJLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQ2hGLGVBQWUsQ0FBRSxLQUFLLENBQ3RCLEtBQUssQ0FBRSxLQUFLLEFBQ2hCLENBQUMsQUFFRCw4QkFBZ0IsQ0FBQyxBQUNiLGdCQUFnQixDQUFFLElBQUksdUJBQXVCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FDakYsZUFBZSxDQUFFLEtBQUssQ0FDdEIsS0FBSyxDQUFFLEtBQUs7SUFDaEIsQ0FBQyJ9 */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[15] = list[i];
	child_ctx[17] = i;
	return child_ctx;
}

// (134:4) {#each {length: correct.length} as _, i}
function create_each_block(ctx) {
	let th;
	let t0_value = /*getChar*/ ctx[5](/*i*/ ctx[17], /*word*/ ctx[3]) + "";
	let t0;
	let t1;
	let th_class_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[10](/*i*/ ctx[17]);
	}

	const block = {
		c: function create() {
			th = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("th");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(th, "class", th_class_value = "" + ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.null_to_empty)(/*getColor*/ ctx[4](/*i*/ ctx[17], /*word*/ ctx[3], /*state*/ ctx[0], /*usedHints*/ ctx[1])) + " svelte-t59wck"));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(th, file, 134, 8, 4037);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, th, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(th, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(th, t1);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(th, "click", click_handler, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*word*/ 8 && t0_value !== (t0_value = /*getChar*/ ctx[5](/*i*/ ctx[17], /*word*/ ctx[3]) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t0, t0_value);

			if (dirty & /*word, state, usedHints*/ 11 && th_class_value !== (th_class_value = "" + ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.null_to_empty)(/*getColor*/ ctx[4](/*i*/ ctx[17], /*word*/ ctx[3], /*state*/ ctx[0], /*usedHints*/ ctx[1])) + " svelte-t59wck"))) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(th, "class", th_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(th);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(134:4) {#each {length: correct.length} as _, i}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let tr;
	let mounted;
	let dispose;
	let each_value = { length: /*correct*/ ctx[2].length };
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			tr = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("tr");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(tr, file, 132, 0, 3977);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, tr, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tr, null);
			}

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(window_1, "keydown", /*keypress*/ ctx[6], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*getColor, word, state, usedHints, revealHint, getChar, correct*/ 191) {
				each_value = { length: /*correct*/ ctx[2].length };
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tr, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(tr);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function countChar(wd, char) {
	return wd.split(char).length - 1;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('WordGrid', slots, []);
	const dispatch = (0,svelte__WEBPACK_IMPORTED_MODULE_1__.createEventDispatcher)();
	let { correct } = $$props;
	let { state } = $$props;
	let { numhints } = $$props;
	let { finished = false } = $$props;
	let word = "";
	let color = ("waiting,").repeat(correct.length).split(",");

	function getColor(i) {
		for (let j of usedHints) {
			if (j.index == i && j.char == word[i]) {
				return color[i];
			}
		}

		if (state == "correct") {
			return "green";
		}

		if (i == word.length && state != "waiting") {
			return "cursor";
		}

		if (color[i] == "green" || color[i] == "black") {
			return "greenorblack";
		}

		if (color[i] == "yellow") {
			let cindex = 0;

			for (let j = 0; j < correct.length; j++) {
				if (correct[j] == word[i]) {
					cindex = j;
				}
			}

			if (i < cindex) {
				return "somewhere-right";
			}

			if (i > cindex) {
				return "somewhere-left";
			}
		}

		return color[i];
	}

	function getChar(i) {
		if (i < word.length) {
			return word[i];
		}

		return " ";
	}

	async function check() {
		for (let i = 0; i < word.length; i++) {
			if (word[i] == correct[i]) {
				color[i] = "green";
			} else if (correct.includes(word[i])) {
				color[i] = "yellow";
			} else {
				color[i] = "black";
			}
		}

		updateKeyboardColors();
		window["keycolor"].push(color);
		$$invalidate(0, state = word == correct ? "correct" : "incorrect");

		setTimeout(
			() => {
				dispatch('message', { state });
			},
			100
		);
	}

	function updateKeyboardColors() {
		let reformatedColors = {
			"black": [],
			"yellow": [],
			"green": [],
			"greenorblack": [],
			"somewhere-right": [],
			"somewhere-left": []
		};

		for (let i = 0; i < word.length; i++) {
			reformatedColors[getColor(i)].push(word[i]);
		}

		window["updateKeyboard"](reformatedColors);
	}

	function keypress(event) {
		if (state == "typing" && word.length <= correct.length) {
			if (event.key == "Enter" && word.length == correct.length) {
				if (_words_js__WEBPACK_IMPORTED_MODULE_2__["default"].split("\n").includes(word)) {
					check();
					return;
				}

				dispatch("message", { message: word + " is not a word!" });
			}

			if (event.key == "Backspace") {
				$$invalidate(3, word = word.substring(0, word.length - 1));
			} else if (event.key.length == 1 && word.length < correct.length) {
				$$invalidate(3, word += event.key.toLowerCase());
			}
		}
	}

	window["keypress"].push(keypress);
	let { usedHints = [] } = $$props;

	function revealHint(i) {
		for (let j of usedHints) {
			if (j.index == i && j.char == word[i]) {
				return;
			}
		}

		if (numhints <= 0 && !finished) {
			dispatch("message", { message: "You have no more hints!" });
			return;
		}

		if (getColor(i) == "greenorblack") {
			usedHints.push({ index: i, char: word[i] });
			$$invalidate(1, usedHints);

			if (!finished && word[i] != correct[i]) {
				$$invalidate(8, numhints--, numhints);
				$$invalidate(8, numhints);

				for (let j = 0; j < correct.length; j++) {
					usedHints.push({ index: j, char: word[i] });
				}

				$$invalidate(1, usedHints);
			}
		}

		updateKeyboardColors();
	}

	const writable_props = ['correct', 'state', 'numhints', 'finished', 'usedHints'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WordGrid> was created with unknown prop '${key}'`);
	});

	const click_handler = i => {
		revealHint(i);
	};

	$$self.$$set = $$props => {
		if ('correct' in $$props) $$invalidate(2, correct = $$props.correct);
		if ('state' in $$props) $$invalidate(0, state = $$props.state);
		if ('numhints' in $$props) $$invalidate(8, numhints = $$props.numhints);
		if ('finished' in $$props) $$invalidate(9, finished = $$props.finished);
		if ('usedHints' in $$props) $$invalidate(1, usedHints = $$props.usedHints);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__.createEventDispatcher,
		dispatch,
		Allwords: _words_js__WEBPACK_IMPORTED_MODULE_2__["default"],
		correct,
		state,
		numhints,
		finished,
		word,
		color,
		getColor,
		getChar,
		countChar,
		check,
		updateKeyboardColors,
		keypress,
		usedHints,
		revealHint
	});

	$$self.$inject_state = $$props => {
		if ('correct' in $$props) $$invalidate(2, correct = $$props.correct);
		if ('state' in $$props) $$invalidate(0, state = $$props.state);
		if ('numhints' in $$props) $$invalidate(8, numhints = $$props.numhints);
		if ('finished' in $$props) $$invalidate(9, finished = $$props.finished);
		if ('word' in $$props) $$invalidate(3, word = $$props.word);
		if ('color' in $$props) color = $$props.color;
		if ('usedHints' in $$props) $$invalidate(1, usedHints = $$props.usedHints);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		state,
		usedHints,
		correct,
		word,
		getColor,
		getChar,
		keypress,
		revealHint,
		numhints,
		finished,
		click_handler
	];
}

class WordGrid extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(
			this,
			options,
			instance,
			create_fragment,
			svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal,
			{
				correct: 2,
				state: 0,
				numhints: 8,
				finished: 9,
				usedHints: 1
			},
			add_css
		);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "WordGrid",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*correct*/ ctx[2] === undefined && !('correct' in props)) {
			console.warn("<WordGrid> was created without expected prop 'correct'");
		}

		if (/*state*/ ctx[0] === undefined && !('state' in props)) {
			console.warn("<WordGrid> was created without expected prop 'state'");
		}

		if (/*numhints*/ ctx[8] === undefined && !('numhints' in props)) {
			console.warn("<WordGrid> was created without expected prop 'numhints'");
		}
	}

	get correct() {
		throw new Error("<WordGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set correct(value) {
		throw new Error("<WordGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get state() {
		throw new Error("<WordGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set state(value) {
		throw new Error("<WordGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get numhints() {
		throw new Error("<WordGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set numhints(value) {
		throw new Error("<WordGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get finished() {
		throw new Error("<WordGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set finished(value) {
		throw new Error("<WordGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get usedHints() {
		throw new Error("<WordGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set usedHints(value) {
		throw new Error("<WordGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WordGrid);



/***/ }),

/***/ "./node_modules/svelte-loader/lib/hot-api.js":
/*!***************************************************!*\
  !*** ./node_modules/svelte-loader/lib/hot-api.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyHmr": () => (/* binding */ applyHmr)
/* harmony export */ });
/* harmony import */ var svelte_hmr_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte-hmr/runtime */ "./node_modules/svelte-hmr/runtime/index.js");


// eslint-disable-next-line no-undef
const g = typeof window !== 'undefined' ? window : __webpack_require__.g;

const globalKey =
	typeof Symbol !== 'undefined'
		? Symbol('SVELTE_LOADER_HOT')
		: '__SVELTE_LOADER_HOT';

if (!g[globalKey]) {
	// do updating refs counting to know when a full update has been applied
	let updatingCount = 0;

	const notifyStart = () => {
		updatingCount++;
	};

	const notifyError = reload => err => {
		const errString = (err && err.stack) || err;
		// eslint-disable-next-line no-console
		console.error(
			'[HMR] Failed to accept update (nollup compat mode)',
			errString
		);
		reload();
		notifyEnd();
	};

	const notifyEnd = () => {
		updatingCount--;
		if (updatingCount === 0) {
			// NOTE this message is important for timing in tests
			// eslint-disable-next-line no-console
			console.log('[HMR:Svelte] Up to date');
		}
	};

	g[globalKey] = {
		hotStates: {},
		notifyStart,
		notifyError,
		notifyEnd,
	};
}

const runAcceptHandlers = acceptHandlers => {
	const queue = [...acceptHandlers];
	const next = () => {
		const cur = queue.shift();
		if (cur) {
			return cur(null).then(next);
		} else {
			return Promise.resolve(null);
		}
	};
	return next();
};

const applyHmr = (0,svelte_hmr_runtime__WEBPACK_IMPORTED_MODULE_0__.makeApplyHmr)(args => {
	const { notifyStart, notifyError, notifyEnd } = g[globalKey];
	const { m, reload } = args;

	let acceptHandlers = (m.hot.data && m.hot.data.acceptHandlers) || [];
	let nextAcceptHandlers = [];

	m.hot.dispose(data => {
		data.acceptHandlers = nextAcceptHandlers;
	});

	const dispose = (...args) => m.hot.dispose(...args);

	const accept = handler => {
		if (nextAcceptHandlers.length === 0) {
			m.hot.accept();
		}
		nextAcceptHandlers.push(handler);
	};

	const check = status => {
		if (status === 'ready') {
			notifyStart();
		} else if (status === 'idle') {
			runAcceptHandlers(acceptHandlers)
				.then(notifyEnd)
				.catch(notifyError(reload));
		}
	};

	m.hot.addStatusHandler(check);

	m.hot.dispose(() => {
		m.hot.removeStatusHandler(check);
	});

	const hot = {
		data: m.hot.data,
		dispose,
		accept,
	};

	return { ...args, hot };
});


/***/ }),

/***/ "./src/wordbank.js":
/*!*************************!*\
  !*** ./src/wordbank.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let Bank = `serif
overt
agent
sling
vouch
snowy
cream
cyber
salsa
slain
happy
close
boost
leave
woven
hilly
cower
rumor
begun
tense
grunt
waste
lapel
haute
ingot
drone
touch
drive
dried
fishy
basin
salve
hence
gummy
radio
brand
rival
knelt
serve
blend
queer
sedan
froze
ninny
pleat
siren
femur
surly
dingo
bribe
scone
verve
blare
coast
ester
chief
music
seven
sport
usher
setup
tonic
dusty
mambo
badge
macaw
woody
pagan
pause
fiber
stalk
gusty
budge
enema
recut
prank
plane
ripen
hello
foyer
regal
credo
elect
clang
bravo
gayly
trite
cabby
saner
broth
crown
fruit
elfin
booze
wheat
spook
fully
gouge
tapir
delve
filmy
plant
again
gaudy
agape
guide
trice
sheer
pence
canal
raven
lance
wider
crepe
speck
epoch
water
flank
noble
rhino
condo
rugby
ghost
spent
merry
carat
inlay
nutty
visit
eerie
petty
cater
joint
belly
cheat
allay
awash
aging
staid
gamut
druid
roast
gayer
chest
sooty
snipe
trove
grout
groan
flock
altar
charm
clack
annul
funny
nanny
mayor
melon
allot
unite
maker
spiky
drawn
quite
shout
blond
humid
tithe
inner
angel
truss
vista
plank
usual
etude
taker
liner
slump
blood
quell
comfy
comma
poesy
stoop
loamy
pilot
debut
adapt
weedy
fiend
chose
snare
daddy
laden
bawdy
pulse
folly
spray
wooer
knack
shush
fraud
toxin
smoky
aloft
larva
claim
bleed
prime
theta
odder
fluke
awful
sissy
check
toddy
stuff
bison
panel
stork
taper
royal
candy
mangy
blurb
shoot
wench
drift
swath
gavel
foggy
scant
flush
slack
cleat
nurse
being
groin
manor
catty
robin
hunch
blank
crack
dully
boxer
thrum
hotly
agree
truly
acrid
dodge
primo
pouch
token
axial
matey
imbue
retry
stole
crump
stump
craze
brine
alpha
bring
icily
moron
cable
modem
tower
flume
mover
meter
cabal
shack
equip
comet
goner
semen
ditto
flown
piney
knife
sheep
deity
spoon
borax
brick
swung
owner
apply
havoc
erupt
glean
attic
worse
place
detox
elite
elder
avail
dairy
fizzy
decor
ulcer
merit
nerdy
began
power
quasi
shrub
lodge
click
crush
prism
state
eight
afoot
flirt
audit
craft
vapid
crook
rebus
flint
baker
robot
shale
maple
manga
brown
jazzy
gawky
glide
speak
birch
fried
draft
focus
cloud
notch
whack
vault
splat
thigh
heady
ladle
revel
orbit
penal
mince
scout
troll
lorry
moral
decay
ovate
molar
sworn
girth
there
bitty
penne
polar
whiny
enter
eaten
skimp
avert
write
cinch
dross
width
heist
spare
tibia
grief
refer
adorn
tempo
liver
climb
shyly
fudge
horse
butte
sunny
slang
digit
spool
goose
timer
motel
quake
gumbo
loser
spend
undid
color
newer
spoof
steer
baron
sulky
lathe
amply
cynic
login
stock
oaken
clamp
modal
lynch
brawn
blush
front
ought
snoop
retro
yield
drape
choir
fluff
mecca
guava
ruler
steel
grasp
snack
boney
guard
brain
idiom
bough
pluck
evoke
forte
psalm
befit
tardy
rowdy
kappa
arson
micro
igloo
gooey
yearn
glint
tramp
qualm
aware
dream
prong
tilde
cameo
satyr
stash
quilt
eking
heavy
fever
untie
flake
broom
spine
couch
mamma
icing
video
swore
crate
trunk
hydro
below
count
fifth
sooth
repel
spite
ahead
wiser
trail
obese
privy
cycle
prick
snail
azure
roost
pithy
zesty
vocal
rider
booth
corny
cello
stain
order
abbot
sonar
joust
hyper
copse
scope
merge
bride
jaunt
award
purge
woman
print
slant
urine
lapse
sigma
tying
rajah
trait
topic
belle
argue
visor
burly
frail
welsh
about
range
croup
apron
clock
enact
jetty
fling
vigil
march
nasal
night
octet
vital
harsh
snarl
tonga
widow
abort
irate
float
dummy
fungi
shear
graph
dally
begin
chill
strap
batch
clank
swamp
buggy
egret
scold
squib
ether
rouse
ramen
scoff
brisk
leash
swear
plier
roger
madam
olive
carve
hitch
faint
kneel
raise
tubal
juror
spoke
tripe
mammy
valor
slurp
sieve
unmet
quirk
baste
rainy
dowel
derby
cavil
gypsy
giant
patch
event
aping
ditch
outgo
query
coach
missy
crony
alter
croak
twirl
emcee
truce
build
youth
never
juicy
tangy
flute
mushy
acute
cedar
bully
poise
broil
arbor
radar
thank
weird
dwarf
piano
curly
kebab
decoy
glass
siege
pouty
fleet
halve
slung
satin
cocoa
spiel
midge
forty
tribe
false
cacao
later
feign
skirt
squat
latch
plumb
whole
abhor
femme
booty
smote
pinch
opera
droop
sever
jiffy
third
glyph
wimpy
level
flout
wrack
leper
dutch
valve
leggy
friar
quack
space
balmy
clean
smart
patty
skunk
tipsy
sushi
turbo
shake
owing
swarm
cruel
pasta
geese
array
rower
empty
elegy
arena
peril
lousy
bayou
spiny
fancy
briar
crimp
unify
usage
batty
honor
dolly
moose
flask
spill
payer
wharf
ledge
equal
admin
wheel
helix
pinky
worry
artsy
rough
sniff
kinky
skier
quail
paddy
shown
lover
abide
spunk
latte
fetid
cheek
showy
syrup
mound
elide
sober
stack
aloud
flail
howdy
prone
biddy
goody
daily
ovoid
waver
agora
ovine
gazer
grace
frisk
toxic
niche
tryst
wrath
stink
waltz
exert
quiet
arrow
mason
cadet
novel
hobby
grant
shift
chaff
arose
cargo
hatch
brave
phase
spire
barge
aptly
boule
totem
putty
scald
final
tonal
lowly
scrub
grade
murky
gonad
rinse
trend
clasp
sorry
milky
twist
sappy
inlet
essay
chock
gauze
leafy
steep
eater
penny
mummy
basic
pried
spree
curve
speed
rogue
quill
rivet
lever
gnash
titan
filet
shrug
think
snout
rocky
rehab
straw
intro
racer
filer
flier
poppy
haste
blame
willy
drown
grail
honey
sadly
motif
spore
worst
lithe
hoard
upper
proxy
quota
organ
quote
tread
hutch
udder
spied
maybe
coral
black
nosey
fight
share
vixen
alien
triad
gripe
court
shuck
still
inbox
shiny
homer
noise
roach
bezel
revue
baler
vying
prove
metro
inept
thick
loath
fibre
timid
demur
local
trash
angle
pride
brush
shunt
brake
opine
raspy
gross
cabin
ninja
swoop
lemur
botch
hovel
drank
snaky
clued
these
asset
bossy
shire
style
scram
caput
feral
ashen
brunt
train
patsy
unfed
tweet
sally
dying
zebra
awoke
mossy
drove
folio
trust
razor
shied
thump
brood
lefty
singe
muddy
butch
breed
salon
leery
kneed
stank
dopey
dress
irony
fussy
wryly
mouth
world
handy
bevel
green
throw
wight
heave
hedge
grass
dwell
piper
spilt
bloom
press
sower
pecan
stone
locus
anode
spelt
spurt
their
sword
laugh
adore
eject
woozy
pound
bushy
krill
hymen
force
haunt
abode
tacky
drake
ennui
easel
brook
amuse
risen
viper
frost
reedy
where
musty
index
aroma
creak
purse
kayak
kiosk
moody
aorta
chore
preen
hater
buyer
found
birth
sight
weigh
beady
fritz
canny
abuse
forum
stand
whelp
sheik
sleek
masse
ardor
cause
forgo
forth
linen
watch
guess
bloat
spear
algae
dilly
proof
dread
spice
clone
tidal
human
farce
adopt
giddy
maxim
brash
onion
fjord
smell
smear
duchy
abled
floss
abyss
chump
gaunt
slice
tweak
nobly
lurch
theft
savor
layer
crypt
lobby
riser
unfit
stark
musky
poker
binge
expel
briny
spell
dandy
brink
ruder
creed
oddly
death
twine
tango
stein
enemy
hefty
dingy
lyric
ovary
flesh
smirk
tatty
hunky
omega
grate
mucky
rouge
union
bleak
gamer
rural
haven
inert
iliac
swash
grave
fairy
cutie
natal
glade
rarer
mural
drama
antic
nerve
cheer
admit
bunny
liege
point
grand
retch
coupe
grope
match
taffy
broke
cheap
squad
assay
debar
rebut
unset
nicer
macro
parse
early
guile
favor
curse
utile
diary
cough
lower
apple
bigot
pizza
flaky
bused
stead
shape
fence
staff
flyer
smack
atoll
olden
shirk
tasty
plied
tooth
incur
payee
skate
askew
until
glaze
evict
rover
whisk
canoe
treat
godly
bible
pasty
newly
sandy
tough
crone
cumin
extol
quoth
theme
carol
depot
oxide
snuff
ratty
parer
cider
fleck
magma
idler
fetal
abbey
biome
fifty
pearl
actor
frame
sharp
plate
datum
vaunt
stint
alert
shank
spark
fetus
quart
taunt
harem
wrist
model
stilt
pitch
donor
slave
betel
knock
wrest
freed
maize
moldy
poser
testy
lease
ample
saint
limbo
skill
scion
lemon
stunk
lucky
mange
synod
erect
rumba
mocha
hyena
minus
sweat
wagon
cubic
sweet
wrong
otter
tulle
towel
gauge
daisy
opium
blown
gruel
debit
piece
medic
teach
cling
cross
river
foray
ratio
graze
purer
bulky
bowel
entry
taint
minor
itchy
apnea
wispy
scaly
storm
teary
spike
camel
prowl
eclat
shade
pique
delay
twang
tawny
verge
tabby
petal
slosh
lymph
lumpy
reach
chart
heron
torus
sneak
dusky
crust
canon
vapor
corer
juice
thong
tulip
prune
exact
outer
screw
dizzy
grove
slime
renew
tiara
louse
motto
fable
dough
agony
harry
beget
stuck
mogul
given
taboo
cloak
stake
mount
white
scale
anvil
stale
filly
beefy
alike
beard
shave
moult
frock
spoil
aback
heath
flare
flood
solve
segue
talon
curvy
buxom
blunt
unzip
golly
diode
torso
await
slope
adult
swept
issue
every
sumac
salad
amass
among
solar
rapid
slyly
elope
crept
repay
leach
utter
soapy
amber
morph
quark
aphid
bonus
sauce
rusty
wreck
midst
party
apart
deter
guilt
phony
wrote
trick
pinto
niece
probe
fewer
jumpy
grimy
basal
papal
amend
wield
bongo
idiot
avoid
chase
foamy
ethos
beach
shell
ideal
unlit
vegan
rabbi
inter
small
lucid
rupee
tepee
gnome
mouse
amity
ditty
thumb
cramp
resin
shalt
marsh
dowdy
relay
depth
bloke
trial
armor
ralph
minim
windy
uncle
value
prior
pushy
since
droit
gaffe
graft
guppy
ninth
woken
cloth
shark
dirge
lingo
older
naval
gamma
widen
nadir
tacit
media
furor
stove
stout
chafe
cried
puppy
whale
smelt
solid
adage
forge
terse
fuzzy
livid
ruddy
image
sleep
allow
pubic
embed
lunch
month
neigh
annex
covey
upset
scorn
chard
suave
finch
guise
bleep
tease
today
miner
scuba
cover
husky
blurt
cobra
swing
foist
ebony
lunar
faith
fluid
decal
fecal
loose
atone
large
ascot
voila
tumor
slash
bagel
rigid
nylon
leaky
steak
eying
paste
stick
khaki
facet
story
seedy
threw
often
flour
queue
grain
loyal
shirt
seize
tight
aglow
brief
stage
gorge
viral
filth
stunt
whose
fiery
chunk
debug
tuber
mauve
giver
plaid
parka
label
stool
doubt
humph
cress
vivid
jelly
motor
stiff
stomp
known
hotel
rodeo
banal
exile
bilge
erode
class
navel
rotor
bosom
agate
caste
pupal
truck
prose
anime
tutor
paint
radii
swami
witty
lumen
chain
caddy
blind
women
logic
catch
sewer
fault
swish
smash
shook
boast
basil
metal
belie
roomy
abate
inane
lasso
creme
grime
exult
plait
creep
north
glove
frond
ounce
shrew
plain
wrung
shelf
curry
wooly
berry
cease
duvet
frill
feast
meaty
drier
gaily
tweed
pupil
manly
munch
child
aloof
cacti
bread
civic
posse
impel
input
chime
ozone
elbow
wafer
punch
verso
ember
sloth
yacht
drool
crave
tiger
fatty
wedge
sprig
deign
swell
china
dense
fresh
llama
gruff
tally
perky
snuck
cairn
while
sneer
using
brace
buddy
money
torch
quick
puree
nudge
badly
fetch
salty
right
sting
pesky
plush
tunic
track
borne
movie
knave
truer
smite
suite
rabid
disco
skulk
jolly
snore
stung
pansy
vicar
suing
mafia
shove
quest
wager
piety
humus
dryer
rebel
mania
queen
board
steam
needy
polka
swine
booby
spicy
blade
other
crank
gland
frown
route
dicey
round
elate
waive
vomit
demon
lying
genie
sound
slush
react
cluck
funky
judge
sinew
mulch
pygmy
alive
voice
vinyl
chant
shock
proud
clerk
grill
hinge
agile
bluff
usurp
curio
rigor
billy
shaky
humor
clink
prude
lunge
skull
rally
plume
savoy
rhyme
urban
braid
myrrh
mango
first
chord
dance
pudgy
drunk
greet
whiff
gassy
break
mucus
blimp
teeth
error
wince
trade
stare
crumb
caper
silky
drink
awake
belch
flick
genre
plump
valid
bicep
picky
cache
photo
octal
cleft
chuck
slimy
broad
burst
occur
grape
abase
mower
elude
shawl
ferry
bunch
crest
rearm
spout
clash
koala
realm
legal
aside
tenth
least
dimly
flack
aider
riper
valet
affix
taste
swill
trace
epoxy
grind
jerky
crane
daunt
trout
angst
mourn
outdo
libel
swift
snide
plaza
wound
limit
furry
carry
slunk
south
basis
bathe
surge
slink
hasty
alibi
berth
amiss
rayon
pulpy
weave
froth
baton
beret
learn
scare
scree
hoist
trawl
bylaw
aunty
crazy
liken
churn
crude
scrum
refit
nasty
lupus
could
offal
rebar
snort
holly
mirth
vodka
bulge
panic
adobe
envoy
gleam
gulch
chili
puffy
amaze
zonal
umbra
pivot
diver
offer
globe
girly
reply
alarm
pixie
savvy
virus
split
major
spade
lipid
sixth
album
edict
undue
block
extra
sully
jewel
flash
coven
deuce
stall
medal
tepid
remit
twice
might
erase
annoy
swoon
group
ethic
frank
toast
doing
witch
evade
onset
weary
gloat
hippy
smith
nymph
under
swirl
ghoul
skiff
spawn
silly
crier
baggy
vigor
cigar
freer
terra
drawl
coyly
adept
gecko
shorn
above
wacky
bluer
venue
slide
hound
gusto
alone
going
delta
crime
scoop
karma
chirp
minty
brawl
strut
guild
exalt
hurry
dodgy
truth
nomad
start
leech
prawn
islet
sugar
serum
warty
champ
guest
stoic
relax
randy
axion
scent
lusty
steed
crock
paper
shard
macho
shall
knead
palsy
optic
scary
mealy
gourd
renal
dunce
junta
blast
pedal
recap
quash
bleat
piggy
aisle
reuse
chick
chalk
civil
endow
banjo
colon
cagey
labor
anger
rifle
young
blitz
sweep
wreak
which
total
pooch
soggy
bliss
lofty
thief
marry
risky
topaz
magic
safer
reign
stave
stamp
alloy
strip
email
table
flora
flunk
finer
heart
snake
grown
drill
cliff
angry
light
lanky
habit
bugle
dumpy
crawl
wordy
edify
reset
house
sauna
posit
whine
after
sheen
noisy
welch
smoke
recur
greed
infer
crowd
goofy
hairy
conch
steal
gipsy
augur
thyme
porch
chaos
floor
gully
kitty
dozen
noose
defer
rerun
saucy
ready
clown
clout
beast
chair
knoll
spasm
wring
clung
scamp
would
manic
harpy
begat
verse
worth
joker
downy
winch
avian
afire
heard
jumbo
glory
ankle
arise
horde
hazel
enjoy
stair
crick
sepia
hippo
scalp
those
audio
dryly
joist
golem
brass
spurn
covet
eager
dealt
madly
study
short
focal
afoul
lurid
slept
store
droll
drain
prize
clump
whoop
sonic
field
waist
acorn
slate
thing
dwelt
lilac
uncut
fixer
three
bingo
shame
ultra
scarf
circa
diner
bland
melee
freak
gravy
stern
ivory
beech
troop
throb
tried
viola
loopy
blaze
title
fauna
chasm
shoal
smock
ridge
gloss
amble
devil
sheet
plunk
felon
smile
mercy
built
pixel
caulk
sleet
comic
hardy
beset
bench
fanny
shaft
tract
naive
tamer
stoke
taken
voter
clove
exist
chide
stony
whirl
donut
scowl
perch
geeky
chute
clear
shone
imply
ranch
unity
meant
patio
crass
venom
groom
unwed
hover
crash
scour
miser
peach
burnt
lager
leapt
polyp
conic
tenor
vague
fella
excel
ensue
denim
thorn
sassy
villa
plead
price
pesto
scrap
bacon
along
shady
horny
vowel
fatal
twixt
teddy
sperm
earth
decry
paler
axiom
creek
sloop
bless
glare
phone
trope
sense
shine
parry
sixty
ionic
stray
score
ombre
ocean
tenet
stood
yeast
eagle
gloom
waxen
flung
idyll
dirty
bound
bobby
dogma
trump
shore
brute
boozy
blink
crisp
growl
leant
choke
slick
alley
spank
dowry
junto
hussy
fugue
peace
saute
surer
super
great
chess
flair
align
vogue
scene
relic
ficus
moist
salvo
tarot
flame
mimic`

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bank);

/***/ }),

/***/ "./src/words.js":
/*!**********************!*\
  !*** ./src/words.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let Allwords = `women
nikau
swack
feens
fyles
poled
clags
starn
bindi
woops
fanos
cabin
souct
trass
shoat
lefty
durra
hypes
junta
baisa
bises
kipps
sable
abacs
thurl
nurrs
saris
wroth
venal
texas
soman
linds
laden
nolos
pixie
calms
chert
oxbow
groma
nomen
potae
noyed
fifty
emerg
shtup
aspic
shone
junky
louns
babka
roton
abaft
hykes
nipas
inbye
kaing
pukus
muils
snowy
piled
brook
avens
baiza
edger
fawns
genii
mavis
argal
assay
cocas
shash
wrath
thins
karat
tunny
mudge
syped
chose
zupas
hants
leech
lyric
winds
mened
momus
usher
qophs
ombus
gavel
swive
slant
firns
beigy
unlid
flegs
wangs
awner
claut
ceded
manos
fuggy
bunde
shute
snoke
bulky
cents
agama
chess
ranid
flurr
dewar
night
porks
voema
cimex
samfu
query
snipy
glens
kests
peril
falls
urges
krunk
tased
folia
orgia
verve
rinks
choko
hully
fakey
durgy
polje
sects
giant
iftar
hayed
elfed
likes
sword
banty
blech
daubs
exies
tetra
agros
shier
kines
yanks
herma
bitte
spook
ribby
fazes
faqir
pluck
devos
bares
looks
sepad
blats
splay
wimpy
husos
forge
femes
irony
hurra
annoy
macas
phons
gymps
sepic
horde
redox
raise
venom
balks
houff
bivvy
farci
sodas
salvo
gumbo
monad
tidal
jammy
gurly
gapes
drere
seems
bouge
ollas
fakir
fetta
thesp
trots
sixes
parps
rewed
wakes
gades
hired
ferny
orals
faxes
surds
larns
sophs
malts
delos
vixen
hosts
drawn
indow
oddly
grume
radix
sacra
spoom
poopy
datos
salse
skean
loess
sownd
boast
tragi
noyau
yeven
blore
tawas
furor
dotes
thief
dacks
pilus
wader
ralph
dropt
illth
paged
humor
great
neves
ratio
lordy
sonic
gybes
shama
limed
salal
aorta
beach
glogg
abris
sayne
mince
dukes
sloth
laked
exeem
troys
kehua
studs
lummy
rhumb
ardeb
yeads
liney
salat
tappa
zilch
yeggs
girly
hoots
parev
gusle
awake
umiak
swang
dunts
ridgy
fakie
seils
seels
kagus
yodhs
sools
richt
runds
snark
domed
glede
urbia
laiks
keech
pinna
ebook
flips
lewis
corse
camus
swaps
delis
hamed
zowee
egers
atmas
xeric
apery
beryl
ocher
lysol
pokal
watap
metic
burns
dibbs
vares
cruor
snods
probs
undue
scaur
thole
sexed
onion
zoril
nance
deffo
prize
curds
bazar
milko
cowed
rager
corps
audio
boofy
hollo
hapax
jeune
idant
swiss
catch
gript
spewy
roble
waurs
beeps
kales
prest
geals
tater
tassa
bocce
ulans
ahull
sheik
elegy
plops
scrip
zaire
laddy
dings
punka
pacey
bilgy
chewy
hemps
jolts
greet
leans
squit
tromp
flume
rower
penne
umbra
palmy
tunas
cleek
flimp
pedal
cuppy
bundu
dweeb
pupas
prude
alter
nyaff
laxer
gerbe
anime
nieve
bwazi
brule
cider
roneo
nirls
kaugh
oases
fewer
pinny
sault
carvy
ultra
kloof
spazz
spoil
logie
orang
fices
atocs
fungi
kilos
amnia
glads
chaft
lusts
toxin
boozy
yourn
medal
maras
sowse
enmew
mains
olpae
tride
nival
loure
crook
spied
ketas
labis
tossy
yapon
tweer
peris
kudzu
odals
rosed
noser
crena
heist
pervy
amaze
neons
mirid
mured
helve
hepar
demic
besaw
molls
annex
warks
smews
warby
fayer
minks
ripes
hacek
spait
audad
clack
afros
greve
dwaal
bayts
ottar
diels
tansy
ikons
craps
phpht
glass
talar
umrah
yesks
toter
waifs
limby
alure
elint
exude
annas
sputa
ettin
oaker
yerks
noils
trier
yulan
ghast
tuile
kylin
cadet
molys
dobro
barry
disme
tifos
betid
sonar
butte
dojos
befog
noles
guyot
avels
kneel
suety
biali
perve
kieve
faves
stims
qibla
sprig
cited
tinas
profs
gamay
simis
duads
picks
sweer
sippy
mound
hault
gouts
zobos
shaws
fosse
vawte
telia
soggy
dopes
sheal
crape
jimmy
swale
loans
strop
pizes
synes
kiers
agley
matzo
bands
blahs
lymph
lysis
ruche
anion
chomp
dikas
volta
luffs
howso
quiff
bling
clomb
upper
dumps
buddy
caron
upped
shite
raxed
kamis
sweal
creep
albee
taint
bitsy
abyss
gadje
spaul
shiny
fusts
yeeds
cusks
deely
smolt
lanky
unwon
ology
anise
foram
scops
rakia
banjo
domic
hoody
shott
sooth
panim
lathi
licit
machi
vetch
boffo
belch
downa
tofus
wulls
steno
hoten
snoep
meted
halls
tryke
lovat
vardy
modal
updry
lythe
nidus
stave
kanji
poted
stabs
pargo
slews
cirri
grosz
pooks
pimps
emmys
flies
nelly
felly
nuffs
amity
vodun
stock
cacti
skips
whops
apian
acted
bawty
lande
tufts
besot
mewls
sunns
pulus
paint
gouch
scrag
quote
louis
heeds
jihad
minus
unban
ranke
licht
ishes
grees
gimpy
paren
nudzh
thawy
toras
laten
enoki
limey
biked
grans
emmas
enews
aweel
sedum
askew
arish
fusee
tolas
carve
rayle
emits
dampy
fakes
meson
gaita
fauve
slung
vowel
goffs
fogou
vinic
ratan
becke
algal
manis
gelds
erred
pekoe
flitt
dotty
tronc
loirs
firie
gonks
joles
lumen
sensa
undid
dhobi
tuner
skail
homey
alack
clear
slums
mange
weamb
papas
smoot
buats
hooka
recco
agars
plank
bolas
bolix
hashy
easel
wasps
sexto
queer
wacke
crits
moria
uncos
kibei
parly
ebbet
rusks
kibbe
buppy
zeals
glout
bigly
stool
avale
wales
fermi
unred
puppy
swayl
peage
bingy
verts
baaed
mogul
beany
debel
mifty
levis
gowfs
winks
musha
bayes
bidet
starr
cloye
ennui
hussy
cosey
coset
darcy
iodid
treks
tsars
groof
razoo
polls
clame
pilei
bunns
donko
fedex
vasal
enema
gaffe
slash
prise
mandi
solve
dames
hullo
snarl
monty
wuxia
beige
reech
solus
doggy
evohe
papal
dolce
awork
cedar
youse
mamey
icily
scoup
zonda
whamo
serry
coyed
amine
mudra
clews
proof
horny
jarul
falaj
clons
limbs
anyon
lanch
muled
kirri
kroon
skees
gothy
james
chirr
yarta
rayas
femme
kasha
milos
asyla
tanks
unbox
umber
crine
situp
singe
pyrex
flote
yogis
scrow
kypes
esses
istle
jeeps
zendo
rough
tight
stewy
scent
arett
yelts
apode
hoaed
ivies
heids
twire
sighs
coppy
jotun
chems
benes
jebel
swaly
holks
doest
fluky
wares
cusso
reist
darbs
peans
erven
peeoy
curls
sways
blaud
nowts
proso
zooid
liard
oundy
sughs
jehus
cotts
guess
teste
bizes
loipe
liart
gitch
mauds
mufti
vutty
haver
diker
score
araks
wekas
nuked
nervy
spiff
orbed
buyer
routs
impel
truly
presa
whats
naans
seams
flint
rives
matai
culpa
frere
wazir
logon
gungy
wrang
fenis
rakes
fores
duroc
ailed
clous
toyon
sawer
tikis
withy
embed
subas
dadas
bacca
epees
kamas
earst
prole
cimar
dirts
strep
mount
lacet
wrier
nites
nomas
rearm
yclad
galed
owsen
tints
sculk
culet
swamp
homie
keens
genny
split
anvil
stoln
sazes
pesky
bento
witan
besit
clubs
causa
weids
theic
fitch
deere
kelim
chare
simas
madam
jumbo
pronk
enols
jails
tohos
kagos
plues
aboil
bangs
graze
kauri
rewin
weize
hadji
misdo
parma
urent
laich
panni
deary
coses
exome
mohel
poems
axoid
chump
puked
apers
claro
slade
fetts
mutts
rural
vower
argan
stook
muids
budge
arvos
cynic
fasci
jurel
grand
gynie
garbs
cuffs
beget
abled
artel
miens
shops
piums
maxis
kwela
rigid
vends
farts
asana
viers
later
haith
motte
kokas
cooed
drent
ekkas
whata
sweir
borne
karas
heats
etude
regna
resew
bulbs
balus
order
jibba
cocoa
hauds
exuls
spuer
frena
karos
these
skier
sclim
jaggy
coost
kulfi
rhomb
rejon
jupon
awarn
bowie
spets
pipet
debug
folie
moyle
rauns
sooms
carpi
proas
siren
shyly
doers
walks
doric
smees
skeed
ricin
lassu
aboma
qaids
asper
scull
glost
chord
brant
kefir
topic
gibel
nimps
zigan
twirp
lazes
pawls
wells
coned
wembs
frats
genom
quota
brunt
spout
tache
trunk
wifed
acini
coast
manta
coopt
tabid
dauds
crank
untie
nasal
shine
sauls
yeuky
sturt
odder
gucks
lungs
dight
rawer
rykes
limns
stoit
crumb
dewed
moldy
kreep
frith
opsin
bools
kempy
kohas
slurp
nudie
ephas
email
skosh
tolly
speks
patio
congo
kanes
swile
kneed
merge
ycled
hewgh
loyal
stens
blent
alapa
gulag
medle
nagor
lulls
sawah
spier
poufs
lunch
stupe
sewen
shend
dirls
trows
iched
hello
leery
lowse
boron
aunts
trash
naiks
crows
poult
emove
inorb
local
rorid
pumie
gloom
bolus
fogie
peach
erick
guppy
lurgy
popes
veges
taken
redye
spred
sugar
reird
chubs
grail
paler
ydred
stoas
exile
child
yaars
snide
snips
album
rebit
mochs
looby
raphe
tawny
pioys
makar
cowan
slipt
tyros
saith
caved
colts
unrip
pases
saran
tykes
allod
ovals
festa
puers
pight
treif
cocky
feeds
blads
gouks
brail
skald
feted
realo
allot
delph
oumas
sklim
shlep
angle
silts
stand
jibed
frows
tayra
sculp
dicht
spags
pebas
nurse
prows
hubby
togas
helot
hangs
neele
pools
bidis
hoers
abuts
serif
scuba
copsy
lumme
numbs
yogic
sober
biped
lawks
mixen
yurts
hokey
stied
gowan
chary
pendu
rojak
punga
soree
hoods
sefer
mabes
plume
dowel
shrug
oucht
vista
fatwa
diode
kents
swoun
barps
obiit
hosta
kanga
sophy
quich
bravi
skied
spaza
faurd
karts
waide
coper
broke
gayer
pieta
pengo
lokes
amole
cruet
busty
rewon
jorum
shave
maths
jotas
sifts
kophs
nisus
pucer
sekos
nadas
punky
ameba
lupin
iambs
revel
wiles
vairy
tesla
ouped
skite
teads
cusec
citer
ratel
gleam
lends
hater
saims
strig
kalpa
foamy
drats
dowse
atimy
opepe
basho
bield
hasty
rheas
filer
moors
skirl
slogs
sayed
hoord
thaim
hetes
roast
hitch
roins
jhala
levee
woven
cites
yacht
maile
ancon
divvy
romal
gapos
bedim
roded
wagga
banda
swear
linny
welkt
nixes
yangs
slorm
splat
skelp
perdy
comby
spike
ender
sapid
muhly
agger
arose
chops
mitis
gompa
skids
nines
leges
baric
psora
bayer
disas
bribe
bower
tawse
pyxed
coven
purin
sokol
tuffs
ileus
grebo
seeps
spicy
ninon
floes
mozes
chant
tasso
dauts
wenge
cabal
mammy
yuppy
ginny
karma
softs
yirrs
morse
newsy
renga
grues
alang
ahold
chaos
pyned
gemmy
solid
conus
dryas
burks
thraw
cotta
rurus
octan
resee
poncy
balls
sybil
vesta
wonts
kilty
reedy
charr
upled
aidos
epoxy
surra
soils
barfi
guyse
aryls
convo
nepit
lakes
maize
neper
zooty
voted
murti
izzat
glaur
bohos
pelas
lomes
jambs
semes
donne
middy
barge
jazzy
moose
sicks
loggy
xylan
noons
judge
toaze
roids
doeth
palla
luvvy
farer
treyf
oculi
shuts
ureal
yummy
octas
cased
slump
argle
bigos
janns
gnaws
scags
pouks
plaps
vrils
swash
cline
fuffy
viffs
neeps
birls
quoll
duped
barde
porty
byway
siree
stria
hushy
ingot
genre
kists
deens
begin
mooli
retox
noway
camos
alary
tommy
ulnar
fetwa
oshac
tower
elute
brool
thoft
beset
rebuy
slays
amble
blady
fetor
pimas
coits
daggy
crore
metho
noyes
eejit
luter
beare
nills
relet
delve
spunk
eying
curio
kolas
wiver
apiol
meals
malls
zooms
kades
psych
harks
soars
juice
fremd
joule
laund
ovine
aggry
zitis
spite
guimp
powan
knops
spade
bully
muser
taboo
tress
fatso
thine
cardy
dorad
lepra
ulcer
lamer
huzzy
yucca
cital
aloes
dowdy
acned
danks
villi
crams
appel
heart
lakhs
talls
clans
squat
yowed
synth
grebe
telos
annal
props
hilar
metre
arled
shorn
aarti
swamy
crias
float
flesh
tinty
dedal
above
sonse
minar
tanna
tikes
salts
madid
poupt
lager
maced
guilt
reccy
sever
hoove
scyes
kafir
tangy
hillo
scant
comal
simul
liner
stele
borax
azygy
mises
tiges
roary
spiky
lived
waxed
duded
brers
cowps
grips
roons
pilar
poser
cesta
thill
huhus
waxer
testy
phage
loins
grama
flexo
pound
dobes
kaput
ratal
cacks
upjet
henry
javel
resus
weepy
fussy
onely
mirin
gests
shura
akene
bohea
haler
wames
grufe
amiga
kaama
synch
duked
raser
shwas
width
rehem
eyras
tates
preys
knave
raper
litho
solas
zuzim
batch
biggs
smirr
dryad
skeef
hanky
imply
sujee
xylyl
cheat
bords
ilial
bowne
silos
samel
cater
gleis
sicko
primy
pechs
tiros
glams
becks
wilis
rowie
goold
ligne
aures
spelk
pepla
fired
devil
goxes
corni
sicky
tutus
pians
zymes
viold
staig
roose
undos
dolma
qanat
moust
doole
soger
agios
nalla
garda
kylie
eking
fairs
snell
urped
rumly
brack
chiel
valse
frier
psalm
flays
lucks
karri
mensa
luxer
spahi
aurar
moory
ensue
cameo
dwams
cuber
urbex
walie
reggo
ankus
irids
ervil
slopy
greed
snoop
mugga
zoeal
poyse
ivory
urena
eruct
trave
ranee
flubs
holme
rhone
jutty
tanky
whirl
limit
prosy
joker
sneed
asset
czars
lefts
ouzel
moats
nicad
tawer
softy
creme
lemel
modes
dopas
sopor
cleat
lomed
unica
talks
hutch
ulnas
abbed
azure
excel
hicks
eloge
onlay
dobie
krans
shiur
idees
puhas
oxims
eched
plims
terse
molds
corby
heave
rifts
lucre
puker
heady
sabre
frogs
cuing
sabes
frets
occam
abohm
tases
baffs
quais
black
mumms
gnats
roost
lites
linin
boars
sorgo
hists
apage
sural
kobos
churl
twill
puzel
tholi
greek
humpy
enjoy
genas
cotes
cohog
snary
kavas
poyou
fairy
peeve
levas
colby
qubit
terfs
cromb
cogue
zoppa
thens
herds
hests
poney
oaths
oxids
tirls
huers
diddy
rorie
radon
syned
apeak
smeke
wises
lehrs
direr
buffo
laced
peise
hertz
mitts
zaida
bloop
kydst
boygs
amies
zayin
gifts
rebar
viols
gluts
motza
begar
nomic
mummy
poofs
besat
hajes
jetes
niffy
rifle
frust
footy
hemal
copse
foids
bison
horst
tomos
mused
joled
rimae
spill
crops
gogga
parch
fades
hyrax
ewked
garum
flame
kutis
fovea
capos
fords
harns
fives
dwarf
gross
redia
colds
hogan
vlogs
soare
dowly
looky
spalt
tined
hills
trims
fraud
sorry
fritt
horal
mamas
gummy
cangs
torcs
kerne
feral
pharm
queys
looie
ofter
pygal
sites
geste
pooed
ragis
rapid
start
besom
justs
skugs
shogi
haoma
slurb
lezzy
datto
intra
amoks
spies
sukhs
rater
broil
waive
intil
vomit
breid
syrup
axons
curch
fauld
cupel
knish
drake
faena
dogey
shily
pyets
chavs
airth
genie
salop
zebub
twite
rayed
teats
culty
jures
snafu
mosey
kvell
cigar
zonks
yelps
ulnae
swole
rotor
buaze
wootz
trail
speal
odeum
mongs
milch
draft
harls
rugae
quoad
innit
kelpy
aphis
davit
manus
bobos
point
atrip
twirl
waspy
wynds
santo
gnarl
phyla
ponks
grrls
tiler
semie
clump
sidhe
naves
dooms
swath
daynt
donee
waffs
blebs
fouer
mpret
feese
seise
napas
civil
qualm
darre
hands
decaf
ramie
trial
folic
estop
peeks
bride
mines
stunk
spars
tabis
aiery
frugs
cycad
solan
dairy
bries
emule
comus
guaco
pager
ramen
louie
gowds
zaris
duars
voile
witty
kidel
pulka
ascon
skios
jarls
finos
noirs
stale
azole
womby
short
umiaq
exeat
heare
pined
leben
malus
vizir
cycle
seism
limma
zones
dells
north
drain
pouch
timon
caums
wakfs
sowce
doeks
caids
roily
shiel
tense
hakam
timer
wends
clips
serac
fagin
tummy
clint
honor
namer
ummas
boked
lobed
gluey
pards
scend
resod
bored
fleys
jinns
agita
pened
edits
biffo
blain
yabas
radar
yucky
veale
caboc
skelm
yabba
runts
waddy
lemme
merse
celli
fones
itchy
lower
towts
bleat
mekka
chibs
crump
meads
konbu
shmoe
jubas
bhats
prion
phene
dicey
nashi
halse
apish
rafts
queue
moved
currs
oboli
souks
boxes
gorps
zocco
ergot
wafts
ruins
saser
aghas
gyral
kulan
index
sapan
poake
tavas
madre
afald
bidon
tumps
asdic
combe
nubia
scowp
aider
mutis
taber
emoji
trets
spugs
dench
fight
fatly
sires
storm
kudos
scogs
hyphy
unhat
mille
mommy
misgo
piles
cadee
poops
youth
latke
bufos
drape
budas
tunes
clime
bayle
mails
lauan
yarto
skoal
ytost
guyed
luxed
kebob
mosed
sekts
pizza
hurts
eeven
freit
bingo
micra
rouls
riffs
afoot
egest
duddy
bombs
uprun
kebab
chowk
vinew
upbow
jokes
dagga
temse
sofas
godet
fuzil
yocks
shews
ditts
spork
felon
moron
gator
sneak
licks
hajis
gigot
cerci
tubby
whizz
spims
aloha
arval
leper
dribs
bubas
blets
rabid
began
drops
petti
pinko
sixmo
sigil
grypt
rolag
logia
adorn
hoagy
appui
rudie
vlies
tepee
cramp
byded
scaud
icing
warst
fubar
apace
poral
reifs
cavel
tolan
leash
sushi
avyze
pikul
gloss
unces
aging
thank
payor
tempt
calyx
bawks
malva
goads
miaul
trooz
pasty
luaus
rotan
mowed
preon
tocos
nasty
armet
porae
boose
amass
cuddy
gyron
hooly
safes
gaitt
bemud
queen
neddy
hodad
spray
steal
lerps
vizor
muset
riems
mofos
jawed
camps
slues
feers
faced
vespa
admen
riced
lifes
teene
foxie
stown
marri
jones
cists
plays
mouch
yonic
droll
lifts
antes
third
worth
proul
boned
arums
tutty
ovary
turme
moten
rubby
nazis
aurae
eusol
adsum
gazes
usure
leggo
chino
loper
dargs
owler
eilds
sting
terga
payer
nears
hemes
eupad
naker
kilts
roque
gilet
pandy
sills
fomes
coude
hypha
mooks
lubra
fangs
sulph
frill
bails
gooby
pelau
unmix
ajwan
maims
atuas
mingy
cacao
cored
wirer
boule
tians
birrs
mensh
riels
sound
dawts
toney
syver
spode
prore
micos
miler
deros
snick
labra
weest
vasty
jobed
aisle
rugby
cobby
ingan
dines
maneh
bauds
tunds
smear
coths
pasts
daffs
quipo
renin
slake
laers
dumbo
slove
booed
leish
molts
titre
sweed
hover
leavy
visor
antra
pogos
cycas
dawah
razee
poaka
bedad
stowp
ryots
ceili
panes
molto
coats
afrit
mneme
awdls
molly
hoosh
cyano
rekes
dosai
slaws
daals
speck
neigh
press
saury
toman
lists
birsy
smote
petar
brute
lisks
glazy
rears
teres
zoned
etens
armil
aroma
sloot
bardy
hecht
mobey
garbe
drawl
facet
entry
paean
nobly
mirvs
bisks
rebid
algid
gists
radge
ticks
ariot
daint
ester
pudus
reffo
parse
spool
siler
jades
aizle
trite
livid
ouphs
drily
sages
kebar
ratas
bykes
evets
upend
skank
tryst
fiest
laufs
marra
adage
sadly
clefs
conns
dazer
shore
estoc
naive
apays
atoms
trapt
angel
decko
gryde
dates
gimel
kanzu
kranz
payee
iodic
story
mushy
canon
paled
shogs
cerne
loser
seers
alaap
nided
snore
tizzy
henna
ribes
updos
gauze
helps
vuggs
teddy
veers
shaya
alkos
ranks
plica
regos
axils
kempt
eigne
lassi
waqfs
zizel
nooky
noses
volks
beard
taggy
beedi
senvy
mieve
teels
dulia
pores
slomo
boyla
haars
claes
pongs
tongs
musth
telex
bluid
walla
haick
deevs
smout
gaols
inane
arhat
reeve
frags
marms
pavin
earls
rents
bylaw
mayed
putid
other
crock
bouks
yolks
stalk
goods
durzi
yaups
capon
ammos
arked
unrig
elain
slept
giust
shies
caned
sheds
jooks
soums
incus
shads
skart
cyton
polar
blini
mesne
fumer
gauch
hadst
ahead
croci
muzak
topes
tegua
lauch
dinic
cills
eruvs
tween
joins
gypos
trank
birle
layup
cadis
pises
cabre
grace
trust
sojas
harpy
yukes
trews
opera
keema
undee
guild
entia
swoop
chias
boyed
armer
thymy
comms
aroba
curvy
quino
jiggy
payed
lifer
mirly
neist
betes
baghs
golps
paseo
mucky
coals
mohur
cabby
bolos
fikes
sorbs
chaya
feyly
divan
reuse
pisos
dempt
bowse
damns
laugh
waulk
mason
hexad
ruder
ohone
swish
hazed
gundy
jauks
gaths
gajos
scand
neive
ummah
skyte
comes
khazi
toyer
scrog
juror
buses
fazed
stott
seame
urvas
wards
vinal
gaspy
deash
oggin
hause
tweel
touse
groks
hwyls
plump
tafia
niffs
nodal
patus
laura
yoick
germs
tozed
laids
feare
ginks
saice
camel
flisk
swops
labia
tusks
auloi
halid
masse
mercs
kooks
ryals
slops
macks
doilt
meres
moult
wairs
hauld
strae
baddy
kraut
lemes
songs
grogs
comfy
topis
cares
bowls
atmos
losed
gadjo
warbs
laces
bepat
vulns
glime
lytta
pilaw
murls
anode
meers
casco
mulse
grabs
agues
burnt
dalle
wince
murly
hempy
olios
pubco
lardy
gulas
gilas
lungi
elans
haros
belly
rojis
carte
beery
clied
budos
soppy
sowed
winos
valis
jagra
peers
sally
ablet
plast
cyclo
crabs
taluk
jucos
metif
labda
lethe
mucks
kaiks
gamer
treed
manty
wheft
spitz
orval
grece
easts
swire
grout
septs
eaved
bhaji
duply
trams
lited
smuts
nexus
mures
bubba
teeny
aggie
nymph
elsin
piler
ympes
ewest
pisco
blays
guqin
tatty
enlit
dongs
antic
hyena
spear
skegg
ether
slobs
blees
steds
brawl
ohing
warts
seare
rider
alant
gleys
urged
gaids
vigas
coomy
mbira
aloin
rubin
rabis
copes
grots
kerky
reate
cytes
gelee
hobby
flams
anile
dawns
flors
raked
filar
stull
cleve
floss
trice
salut
chapt
palsy
doobs
scena
rials
agloo
serow
cocco
leses
mixes
meows
inter
cinct
wagyu
skogs
pingo
clary
toils
atopy
suers
tubar
saver
monas
nouns
mulie
leare
slane
prior
elfin
refel
botte
bumph
rabbi
peepe
mural
blubs
foist
yuans
derny
stede
quoif
topaz
cunit
wined
sharp
kakis
mahwa
aleck
botts
saunt
snort
clipt
alods
jibbs
ayahs
eject
arses
yonis
inert
blate
skies
sooty
found
evhoe
gilly
dummy
fixes
runic
poods
swain
rosti
shame
feats
amnio
himbo
enate
eards
luged
abets
venae
kings
tuple
bubus
aspis
turrs
exode
agent
gynae
syren
write
ratus
genip
alews
glued
yourt
outre
loupe
twice
kabab
under
remex
rudes
dicta
shaul
scabs
cobbs
seton
wooly
gazoo
jirds
skill
jaups
etape
cells
gunny
rakis
alien
ulnad
dauby
tolts
pious
walds
servo
movie
livre
ooped
ergon
dosha
toque
mochy
quilt
belle
uhuru
yappy
loses
neaps
garbo
berks
javas
shtik
algae
prank
booms
embar
liars
wikis
covet
dashy
noule
cosie
kybos
trock
fisks
baccy
trape
homas
turds
voulu
pylon
yearn
kacha
amend
rutty
fluke
beath
ricey
grovy
sengi
leese
sists
purls
adred
krill
rorty
shams
mells
murky
sasse
gombo
slims
shays
phial
knags
fudge
loner
shoji
degas
hocus
loche
still
bunks
slang
hodja
breme
birks
perdu
waste
dusky
snarf
chivy
zezes
house
zoris
cheep
freer
flung
buist
iring
moops
blurs
skink
ensky
cadre
babas
felts
culls
avers
doner
cinqs
meany
koban
apism
mopey
embow
mings
decks
skyfs
chelp
potsy
pudsy
hiant
felch
sycee
enfix
ganof
muxed
roper
plied
lants
hanap
pipes
assam
rayon
dogma
visas
yesty
noels
beted
gauzy
meshy
terce
augur
moist
murri
dater
foyer
yaird
stiff
erect
unrid
seder
delfs
assot
fabby
nixed
mered
amuck
cease
oleos
boggy
quair
beady
vaded
combs
wodge
baels
reran
chain
baffy
cooks
souce
sedge
zouks
whams
phots
oulks
tasks
chich
guyle
piste
couta
palsa
japed
caman
savoy
inrun
gippo
kooky
pudic
laval
molla
crith
frump
orris
dodge
nexts
wrest
chile
woose
yente
lidos
gonef
sluff
googs
courd
jokey
hires
alans
demob
whilk
stews
spice
grows
aalii
carob
liefs
motto
smell
swads
yokes
varec
twerp
kokum
recal
roker
adown
lento
dimly
volae
tocky
thoro
rogue
sedan
shins
orfes
sammy
winch
dowle
oboes
wisps
foals
ended
voars
rance
basta
fleas
bosie
monie
favas
wasts
wilja
briar
petre
kugel
snare
suave
glode
safer
testa
ragas
chins
dozen
blues
razed
sates
basal
gleba
hiked
gofer
cymol
fisty
zatis
fests
pinup
muddy
scail
idler
hafiz
surfy
comic
chars
slope
jouks
diane
dorrs
oxter
field
ictus
rathe
kusso
decor
marks
incog
loris
paolo
tehrs
train
smeik
flues
adoze
gemma
wried
towse
plats
chape
hapus
sneck
chirm
tuktu
recce
chado
fonly
burly
anana
rumor
urial
files
grund
paste
areal
lemma
aided
preen
rondo
rosin
lyses
hejra
ledge
heths
masks
stole
using
plumy
roved
afire
laith
tumpy
belay
baler
vozhd
sithe
koura
navel
taels
flock
duxes
pommy
geist
ginch
quake
rewax
pawky
cures
negus
braxy
sanko
below
betel
copay
arrow
wield
sozin
knees
bench
ancho
reorg
sowth
spaed
absit
regal
fells
lunge
riled
stirp
hucks
siroc
hymen
crisp
rumal
erevs
hatch
haets
clows
wordy
umami
royne
hoved
genic
senas
thana
padis
luach
pwned
diazo
thews
culch
osmol
tenny
hosed
smock
leafs
thrae
ursid
beray
umpie
nonet
caged
tombs
amido
bliss
drest
margs
euros
algin
hangi
table
holes
latah
reans
upsey
sewin
welch
fordo
spate
outta
yechy
aphid
phizz
posho
snail
abele
bortz
oller
blaes
doums
huzza
sylva
oches
whirs
yexes
aptly
campi
speos
fuses
gorge
bekah
winey
finks
gurls
faker
horme
aural
akees
donut
siped
carrs
quirk
bravo
swami
crees
intis
waxes
cades
flane
cooer
balmy
cavil
solar
shark
nonis
prowl
ceria
agaze
quats
chons
raced
bunje
resin
prang
risks
cloys
snoek
uncoy
skegs
parve
eliad
skyed
yeans
brusk
crepe
burke
glean
orgic
buras
spued
clavi
smoor
ebony
cafes
helos
toshy
howes
robin
berth
volti
handy
serge
fayed
forex
surah
sibbs
reify
smith
stead
ochry
purse
scrob
ossia
missa
rises
faver
mutes
seven
undug
libri
viler
avail
knout
miked
fugue
unais
aspro
fyrds
skunk
soyas
tikas
baloo
galvo
nawab
kirns
grana
kissy
hopes
galea
manul
denim
benis
caped
folly
daych
sista
zooea
sutra
hyoid
unsod
ogler
samas
gauje
green
embus
urubu
wazoo
sawed
escar
unlaw
roods
debur
leant
wetas
fubby
mozos
butty
neral
glent
stars
nanos
hyper
emyds
ponga
picra
saids
ileac
arias
toyos
cates
roots
manes
leggy
monal
regar
prick
sowls
moves
boffs
ciggy
gopik
nutsy
bawdy
cetes
puris
liras
whits
ikats
unwit
salix
tetes
belon
nomad
chits
lithe
heaps
crapy
yowie
sudsy
board
sorns
hadal
snush
wheal
yarrs
poove
kayos
taker
sidle
pukey
babel
resty
cooky
feres
tents
almeh
senor
beads
rhody
scaup
phyle
targa
confs
burps
rived
bumpy
etnas
unlet
bialy
gypsy
cymar
mores
fumet
gamic
mizzy
telco
spoon
abbot
snaps
gaddi
orzos
waned
forum
infos
kedgy
frees
imams
kepis
spire
unarm
flash
latte
fonds
trigo
acker
dazed
roate
skeet
ephor
sacks
mezze
pareo
omens
repel
stoup
naggy
dawed
gairs
lazos
huggy
tonne
poddy
sagas
slart
skool
pedro
stoat
scalp
treys
ouija
terek
chirl
spawn
cajun
bunco
sanes
baize
bauks
warns
haugh
gybed
cysts
begum
apgar
woads
boons
bajri
hinds
whids
temes
herns
clade
slush
blist
filmy
creak
braky
privy
boing
abore
agile
coeds
casks
ramee
kilns
easer
vault
cocos
jills
dites
oppos
fetas
pinto
holon
duals
achar
cajon
lisle
sherd
maxes
biogs
scurf
cutes
growl
myopy
filly
filum
vaped
romeo
spawl
grate
knell
orbit
scars
swopt
bevvy
dalts
truss
aroha
candy
sheep
blear
lathy
peaze
daube
ginzo
sairs
lotto
sakia
specs
etuis
zizit
kukus
aunes
raged
kvass
bonks
pater
vegie
micas
belah
going
papaw
tonka
rooms
matey
zexes
parra
brios
scuft
grist
cowls
oread
palpi
minty
wreck
onned
aroid
vairs
scall
locks
ratha
sypes
touzy
roues
sexts
grimy
farms
mages
troop
sybbe
kalam
howdy
nicht
ayrie
strap
sigla
fraim
daunt
poboy
germy
roule
vouge
whisk
tippy
roums
bouts
carer
equal
hinky
hajji
topoi
picky
botas
verry
maids
prese
lusks
naunt
sents
moder
trior
quill
grime
chums
hoxed
skene
lowly
merls
debes
apart
dizen
oleic
facia
spang
borks
oribi
smeek
flory
temed
terms
vrows
boils
bogan
blins
zygon
caaed
syces
yards
elope
wenny
quite
gazed
pones
nabes
silds
pavan
havoc
halva
harms
unked
frorn
unset
tahas
plait
revie
dunny
daraf
marid
agree
fence
erhus
cunei
fleck
wages
artsy
bocci
cauls
centu
ameer
navew
gyred
abrim
goths
wains
comte
curie
kiefs
fecal
fruit
neems
yills
feuds
oidia
izars
hunky
pumps
nicks
docht
ennog
darts
walis
meter
hoyle
again
downs
rheme
tapen
feued
jimpy
cubit
arefy
fucus
shoed
opter
napoo
juicy
kandy
ravin
tushy
nanas
silen
poots
kurus
nomos
lymes
dikey
loved
aioli
bubbe
pioye
roams
pesto
timbo
carns
optic
skeer
zappy
tarsi
imari
paver
pleat
ibrik
chuse
fleam
onkus
blond
corbe
owche
feart
gulls
izard
haole
dwelt
pampa
japer
mazer
pucks
playa
orgue
debud
doomy
chays
doubt
wongi
virga
malms
limbi
suite
crura
raile
crips
porno
after
kabob
apsos
rasta
beaut
hutia
serfs
roguy
tazze
unfit
urman
arame
paras
nosed
daurs
zygal
fixed
tenor
dolts
saner
begun
azide
abaca
facta
rabic
kofta
macro
hefte
whigs
viral
waits
areae
throe
flabs
fenks
jurat
scraw
sowle
dried
stoop
agate
hable
douse
gobbi
droke
situs
burgs
tenth
thymi
doter
morph
coste
zoppo
broth
siker
dwang
quipu
oxlip
stain
botel
zooey
prigs
hoise
stipe
betta
nemas
cursi
aviso
graft
bobak
taiko
braks
aduki
serve
ketes
daily
doxed
lurry
shist
smugs
kembo
gimme
medii
wisha
enter
rynds
fonda
jesus
pains
butoh
tegus
adits
loued
ledum
oakum
roupy
flawn
drole
gleed
cyber
ledes
wries
hours
deawy
laigh
soily
ached
rocky
volet
segol
owled
avine
bodle
knelt
wroke
borde
foley
swobs
mould
rimes
punks
smaak
haint
lysin
afear
jeers
vitex
polly
jeels
firer
keros
peens
glebe
relic
cubeb
elogy
abamp
lucid
clart
shmek
wadts
gulpy
rooky
balun
onery
conia
brede
lades
tifts
kayak
scorn
bunas
skits
salto
divos
torsi
hairy
azlon
girls
marly
mutha
adder
vatic
gular
roked
vehme
arsis
leady
rigol
borak
ionic
zuppa
snibs
latus
tammy
smart
manor
llano
haggs
warty
blocs
nugae
segni
oracy
scurs
reamy
blade
mumps
brier
retem
libra
laree
begem
apted
acute
hefts
brent
wicky
primi
asura
grrrl
titer
herye
sheen
fusty
cnida
agoge
lowne
sicht
odahs
panne
gibus
gases
neese
bobas
hippo
steem
lotos
sowar
gamba
ashet
parts
final
gemot
deman
snake
urnal
shank
eaves
dancy
albas
pulks
finis
snirt
punas
paven
nohow
joust
rosts
cruds
piend
salsa
lingy
girrs
trade
stony
makos
poori
stats
tenty
faffy
jager
hoses
noise
dutch
mamma
porge
yirds
paper
raias
howls
spurs
roans
flota
ungod
tweet
fyces
krait
yamen
oxeye
fique
gadso
theft
bewet
fease
patte
tacts
craft
moses
canal
oscar
wails
allay
pyots
rhyme
await
heled
rimed
prong
manto
axone
gassy
shape
repot
trull
wipes
wedel
jerks
breem
swank
wahoo
tilak
siens
doily
sours
yomim
yowes
glugs
inion
malas
spoot
elite
coate
palps
pried
hylic
aedes
dinna
slipe
molar
paspy
reame
jafas
recti
tonga
hoars
dandy
crack
clamp
beals
hamza
imine
steen
soths
spial
talak
dryly
atria
relit
teems
elmen
prana
taata
mesic
droil
ylems
seine
wimps
front
trait
mimeo
login
borts
merer
larky
zoaea
sorra
galut
gurdy
shaps
quare
rusma
chirt
lacer
vogie
bourd
shrub
filed
hoiks
uplit
rozet
duras
koses
rawin
yucas
gully
avize
stile
calos
amirs
merks
rouse
sweat
epopt
eniac
sizel
pedis
argil
rungs
repos
soled
doffs
lycra
pyins
scapa
roomy
woons
aguti
cumin
whomp
roils
vezir
bokeh
krais
sirih
doabs
gayly
colza
boyar
wyted
lepid
emure
phang
curns
tices
glial
jeely
rupia
rimus
strim
brink
flics
thuya
mulct
potin
almud
wilga
liege
tulle
slips
campo
rusty
maser
murre
perea
jives
crame
yewen
ragus
oared
sieur
taxus
codec
troke
sager
moups
ulvas
lense
lasso
china
tulip
damme
corso
agave
pyoid
toffy
cadie
weeke
slubs
alder
thrum
kraal
maron
gloat
aimed
buffe
pitta
bolts
lassy
dowar
india
mawks
weeks
token
purrs
yippy
marah
apsis
axled
shook
heald
biers
hijab
nifes
derms
iambi
hound
jobes
byrls
idyll
skyer
odyls
idols
torta
conin
smowt
kalis
puces
eerie
uneth
kerve
chaws
writs
baulk
badge
flows
irons
shady
panto
conne
chaps
perse
tared
brank
lover
masty
vifda
plouk
gambo
scary
eikon
shewn
ealed
liger
palis
demoi
morne
caxon
gooly
heedy
paddy
newel
hedge
blimp
garni
toits
ferly
forel
kumys
twoer
mafic
weedy
demes
virtu
fujis
liter
geode
druxy
recto
puffa
paths
bobac
fared
noisy
memos
fitna
tondi
baned
rupee
noble
gadge
debit
faiks
hasks
cuzes
showy
decos
loopy
small
ymolt
gippy
blood
rhino
fugie
poulp
drips
chais
crown
booky
comer
abuse
widen
menge
odism
barra
massy
sonde
modii
gatch
berms
lushy
yarns
hones
shchi
piper
crusy
hurly
banco
staid
metol
rules
ollav
spins
hexed
gills
amain
sooey
scamp
groin
codex
estro
yelks
saheb
hissy
mikes
rotes
varus
doits
asses
sheaf
owrie
goosy
aread
tread
brith
yogin
yobby
konks
sayid
tains
carbs
knubs
ramps
ictal
skiff
rines
easle
seifs
maker
deems
begot
visto
liber
super
moues
piths
tramp
dital
lobes
caner
flops
zills
eggar
civvy
noted
calmy
colog
piccy
fouet
chads
tarts
teras
hayer
lawed
mango
jeats
newer
niter
pacos
brize
potoo
evens
among
aurum
fayre
patin
jubes
gonch
sewar
gamin
alvar
moers
frowy
risps
ravey
noria
dazes
titch
myope
shalm
oncus
morel
types
wheat
bothy
rubel
baken
bliny
tarps
sleek
mixte
courb
suede
topek
lilac
resit
nubby
eater
pomos
biota
might
boysy
angas
rozit
vises
pries
egret
weets
lurch
piton
craze
vaute
kazoo
goras
fluff
nerks
serrs
skive
rigor
chiro
dolls
imago
myall
kaons
thigh
nerds
dinos
hoser
zloty
waked
weird
wooer
getup
amnic
trays
drusy
clomp
agrin
quash
sewan
kythe
messy
fusil
dizzy
dadah
tacos
saucy
quale
gourd
venue
skran
sidas
cones
vacua
gwine
pours
apses
lurve
pawns
carle
proms
xerus
daris
intro
rukhs
dives
moble
cadge
adult
jerky
yarfa
shoot
zanja
soops
golly
wauls
khats
fadge
lated
ydrad
shaly
yikes
derat
inbox
ninny
zeins
redos
dwalm
kanae
acold
locus
faith
drank
vivda
vired
velar
cered
tiled
mecca
runny
dixie
fiber
apple
recap
judgy
sango
ileum
sitka
fuzed
ethyl
wafer
napes
hohed
boner
breds
cloak
selah
raggs
tubas
scans
monic
pilea
lenti
coves
lairs
brins
vined
mikva
dyads
goaty
capes
faked
droit
oozed
borgo
seirs
swift
milks
deity
taiga
chirp
agila
terai
greys
nerdy
moira
scuta
snubs
vague
cedes
hared
viced
stems
woods
leers
banes
talky
heeze
rello
limax
repay
durrs
kevil
cutup
chard
tolus
glees
aiver
pical
redes
spake
sease
soces
leats
fados
brims
bundt
joual
paces
drove
farro
bibes
gighe
whort
bulgy
crome
miltz
largo
hards
globi
mites
raree
crave
padle
serai
obeys
emong
ember
petty
accas
larum
haram
horns
ombre
hoxes
ourie
laxly
triol
prems
plash
ryked
frass
diked
revue
dhols
inlay
nying
dhals
tries
firry
perry
abray
shola
obols
cruft
frigs
boite
deray
merle
sered
cooch
stirk
miasm
blown
calks
gobby
zanza
choco
dayan
scaff
swags
laldy
souse
fouth
bough
elect
hooks
araba
tyred
shrew
steed
iches
rowdy
sider
blobs
tenia
lazar
clams
uhlan
sythe
brawn
bebop
orach
wryer
gecks
musty
setal
arere
fides
dowps
klang
taxis
dinks
older
highs
aloof
silty
donna
maiko
imbar
whaup
goles
pikey
binds
touts
comae
quail
nosey
routh
twals
buhrs
adyta
imshi
hakim
qursh
lycea
thees
igged
pryer
aping
snigs
pilum
haded
basen
dodgy
unity
tuber
yoker
coqui
urase
garth
abode
feint
hakes
boart
owner
binks
biros
speel
liman
yapps
plebs
expat
liane
gotta
khuds
hives
salic
brast
foule
heigh
annul
bavin
ceaze
boets
ruggy
solum
pages
cawed
fella
shall
subby
tepoy
embay
heuch
trugs
wisht
peace
brick
moyas
slaid
reddy
ponts
pilis
puree
jarps
bunny
vealy
sabin
jabot
zilas
sheas
thous
aidoi
bruin
pomes
rotal
lapis
organ
horks
refed
sayer
volte
ricks
fills
anker
hares
gaits
frost
merch
ariki
praos
rotis
devon
weeny
dufus
lined
knuts
fondu
toped
waved
rebut
baggy
pause
podgy
drows
hench
meffs
renay
agria
poupe
years
creed
bludy
cusps
niqab
indue
peart
gowns
grain
mouls
rores
zimbi
musks
fling
leads
clued
caphs
knawe
swill
hoors
lapel
osmic
sorbo
axles
kapok
gesso
tibia
scuff
grews
dingy
bedew
tondo
rizas
mungs
freed
stipa
sweys
flong
webby
murid
melba
syrah
mezzo
blank
obeli
goofy
zacks
nukes
realm
giron
gripe
picul
whish
knack
would
pyxes
penis
segue
toyed
cornu
cagot
lirot
sport
minor
brood
choke
ronts
scald
mashy
frize
jiber
poked
shiva
horah
talcy
torot
cowry
atoks
besee
tarty
doper
scrap
wacko
laths
denis
draps
shako
nanna
griff
brust
lalls
erupt
derry
tajes
animi
serks
ranis
quirt
ready
parrs
pinon
lapse
wager
heirs
turms
jacky
ouzos
ayins
cloke
snows
pease
invar
ungag
motty
arars
radii
shown
noily
splog
flump
midge
piety
nudge
piers
bound
karoo
calla
cilia
spans
netts
gowls
hokku
goris
stood
cours
kogal
tryps
locie
patly
scows
enemy
sangh
kbars
thuja
maggs
stupa
evert
plows
grize
withs
quods
yager
meets
hafts
keyed
churn
raupo
nizam
apayd
nikah
fists
brake
fluty
aecia
belts
kindy
ghaut
atoke
blitz
shoos
birse
flack
dykon
lores
spain
covin
oobit
hurls
minim
begad
shuck
basse
arena
rugal
piezo
muggy
hiems
bason
naras
galah
chair
cryer
moody
amide
polis
heame
yealm
fucks
caird
smarm
zazen
clone
yetis
crick
crass
fundi
vleis
enzym
nixie
rival
arbor
jirga
faces
ankhs
sabra
avise
tousy
beefs
lisps
opine
phase
gites
tiyin
gawsy
jomos
wryly
doggo
lyams
murra
kotos
adays
gable
gulps
worst
means
moola
thars
fezzy
roped
cawks
yirth
argon
curst
oomph
wonks
coapt
bawds
geese
bedes
dulse
signa
pilot
drugs
dault
arise
glias
grads
aflaj
coral
mimer
couch
skuas
wyled
pecky
abler
spina
ploys
sumac
sling
sagos
foxes
fiefs
lunks
skell
fiere
charm
amlas
fanga
jarks
fishy
piony
heben
saros
dited
roosa
cibol
pokey
yrapt
rappe
pacer
lipes
geres
shojo
dices
dwell
spink
hevea
lying
drunk
graip
build
scute
fames
blame
gucky
retia
dangs
fears
diffs
wadds
sited
psyop
indri
wooed
plier
fuels
slojd
magma
tapas
loups
golds
fural
sibyl
pukes
taigs
eiked
cokes
alfas
toise
chick
force
trugo
genoa
sprue
gnars
skein
aweto
modge
cross
alums
sunny
phare
surat
cutch
cower
graal
inker
donor
faros
baser
thuds
didie
muggs
ditto
khets
ribas
cowks
allow
slunk
vanda
ponzu
neals
goons
palls
rejig
tuque
ravel
cutty
towny
vials
knurl
notal
sinds
bahus
fraus
retry
tugra
crocs
halms
manas
ceres
dishy
calps
binge
cosec
hovea
tenet
gumps
phuts
keyer
fudgy
raird
whorl
offal
grump
noint
mulla
creek
lough
docus
mincy
colly
techy
blaze
sofar
dynes
tests
clegs
elpee
borms
nulla
haute
funny
satay
grade
yelms
atony
dools
gutta
paans
kills
harim
mossy
pelts
karst
raven
poxes
plods
grief
nauch
ozzie
boink
tufty
silva
vital
camis
dated
erses
kawas
foams
xenic
thegn
lacks
antsy
eclat
riots
rumps
snood
coxed
scoog
roted
dosas
barny
agons
pinky
ichor
ramis
crios
farle
trist
malis
lepta
yenta
sangs
nerol
whens
kotch
vroom
knows
gyppy
lumps
prent
orles
elude
owies
tenno
civie
fully
vivas
conic
coffs
quoin
therm
parer
gloze
marts
maces
oonts
toing
timid
oncer
hawse
miser
promo
pally
daled
tawie
cacas
early
stags
mesto
gorse
perks
trace
tails
pawer
punto
amrit
saics
jambu
emyde
elemi
hecks
delts
galas
grone
dough
moral
faint
rases
fouds
avast
gelts
gaffs
dicky
serin
witch
exits
doura
perps
adobe
inset
stopt
dials
tamis
fehme
amowt
bluey
pogge
apert
glims
nebek
meths
neifs
pohed
miter
grith
furrs
bombo
think
blude
trats
jolly
meved
since
wanze
reens
algum
pipis
champ
fresh
mebos
karns
pirns
pekin
woker
barca
letup
azine
snowk
fiscs
mangy
titan
sesey
hefty
styli
rindy
moots
crony
bubal
clean
oxime
mento
hedgy
vimen
tacan
sewer
spend
jetty
tuxes
swart
karsy
seamy
drays
empty
homme
duvet
ergos
vughy
fuddy
honds
makis
quaky
whelp
sugos
britt
groan
poley
seats
bevor
froth
drubs
boult
weber
glady
biont
botes
danio
fleer
swipe
kojis
legal
gived
eased
gibes
dorps
minds
wizen
dryer
dotal
copen
brond
sodom
logan
clops
hansa
shags
saute
wecht
scrae
tarot
hilch
laics
fiers
drack
pooch
vills
swabs
marsh
jongs
snash
chark
coaly
kiack
doucs
space
mynah
pulls
avoid
etwee
wrote
stall
scams
lunes
jomon
civet
clapt
blink
koras
irked
manic
miner
dopey
basic
pills
plasm
unite
tachs
waite
geyer
soral
crays
decry
alula
bunia
obang
close
brill
royst
duros
mache
drone
clots
nache
brigs
penny
bungs
lacey
tatou
nonas
cholo
refer
swerf
bardo
kirby
bints
layer
plumb
frack
brisk
butut
stond
alias
alike
hazer
kaiak
garre
tabla
rhyne
sudor
tusky
kench
wawls
cedis
cohen
loads
ruddy
maxed
nummy
sexes
yoops
repeg
agist
adopt
learn
lulus
meats
plong
grass
pilch
untax
chocs
speed
tamal
saist
gyoza
hallo
aredd
styte
worse
honed
weirs
roral
kyars
adrad
mamee
codes
venus
heads
zingy
baths
poler
droog
tinny
ukase
grigs
choon
hooty
ditch
emacs
audit
mungo
tings
speer
fiked
trest
dewan
pouts
uteri
pitas
faffs
goier
senes
tutor
gyved
cloff
aside
gulph
pinta
dorky
gamed
shoyu
alkie
chola
clunk
olein
flans
bawls
dowed
cards
downy
trois
pinch
kilim
janty
graph
armor
decad
timed
trine
daker
spall
bream
marka
veena
jiffs
corno
lotta
clipe
sampi
nitid
waldo
towzy
dados
linac
cauri
logic
store
draff
beths
pursy
lotsa
stern
wider
taxon
pleon
tomes
stell
texes
jenny
mirks
stulm
banak
demit
hosey
syboe
flaps
zibet
afara
suids
flank
chest
pixes
spyre
moras
raine
allel
theek
ocker
solde
villa
jasey
screw
judas
haafs
maqui
vauts
cupid
ngoma
chock
rudds
abate
wojus
croon
dread
ajuga
manky
nutso
pardi
ayres
gents
debar
ruses
lamps
nancy
haulm
darks
bilks
hythe
stage
dikes
mondo
bairn
totty
brame
swans
uraei
zests
wirra
repin
icier
overt
calid
loons
added
coyau
goory
darer
conch
dacha
musos
scowl
yodle
madly
lathe
surfs
deism
dered
skrik
yupon
wally
feoff
zoeae
fetus
niger
ensew
debby
kurre
mokis
ejido
swell
clang
carat
abysm
gamas
tires
hiker
whelm
cooly
quate
feast
choof
cushy
jacks
tilts
mamie
forms
livor
veles
prahu
sappy
sarin
wamed
fuzee
udons
lupus
dured
fibro
clads
epics
ideas
colls
cants
coxib
flirt
sleds
loofs
kelty
snogs
zoner
slebs
chizz
subha
verge
honan
pygmy
bider
acing
tolar
posed
yates
serre
rinds
compt
hoven
covey
mambo
meane
crunk
eisel
keeks
rubes
moled
floor
carls
dover
pigmy
quiet
chimp
circa
schwa
names
amuse
nadir
hents
virge
thong
zebus
tinct
petit
solah
droob
coirs
swoln
ngaio
vamps
rivel
shirt
trins
acmic
fyked
marae
cogie
rhies
zeros
ardor
slice
prism
scone
yowls
which
sayon
tymps
feods
acres
dries
teloi
lurgi
busti
pikau
cases
tinea
trump
reney
nempt
yawey
assez
bunds
minis
wites
fugle
cumec
airts
cured
beamy
naled
gleet
ticky
gomer
ahind
thowl
sculs
gride
plaid
tares
torte
dirty
xoana
cubby
verbs
leuch
hales
heyed
honks
romps
ashed
ferry
globy
radio
rants
helio
brise
briki
byres
flava
aware
hopak
dooly
boppy
relax
clung
shyer
marse
shote
recta
gliff
racon
fuffs
forme
posse
lands
genro
eevns
mirth
nidor
ruers
prays
quads
abram
puffs
bourg
idiot
axing
stive
apnea
exalt
platy
habus
pushy
flogs
ippon
typic
nicol
ruffe
fumed
xenon
alowe
sprew
dewax
tumor
astir
chawk
almas
scart
lutea
laika
sarks
lowts
heavy
tasty
ample
hairs
koppa
lures
saint
aglee
cocci
hiply
thack
kutas
souls
jugal
abrin
sired
traps
preve
rowme
stick
azurn
tyers
lysed
caple
bourn
tophi
prier
kangs
docks
zonae
almah
ecads
navar
datal
ysame
punji
jukus
gurus
nails
rowen
units
taira
porny
girth
gadid
raxes
chynd
oxide
hippy
eyrie
globs
gongs
betas
fated
kawed
pulli
auxin
bombe
birds
apoop
soddy
capot
extol
quern
feign
pagod
tying
pipas
abhor
lagan
sooky
evict
hayle
sorus
trick
elbow
lieve
skimp
begat
extra
dealt
stays
farcy
cooze
fleek
queme
drums
bumfs
lochs
expos
huias
hogen
mythi
quass
idled
edges
gates
raped
lavas
caese
porgy
immit
taunt
axmen
lippy
copra
whack
skews
trefa
jalop
filch
tripy
miffs
duomi
narky
honey
fugio
oints
yuzus
proud
chiks
aired
moner
flown
sends
buroo
sumph
taler
amber
cakes
kerry
untin
tetri
brosy
probe
amped
newed
niece
croak
rezes
skody
mixed
parvo
pseud
doona
gipon
vuggy
fizzy
tweed
krona
cowal
rekey
jelly
fares
wanle
stedd
viver
thagi
groom
humus
wrens
leany
melty
pants
knaps
odist
unkid
tribe
woful
ivied
codas
rohes
kievs
snipe
tuans
ceorl
month
halma
limpa
traik
ainee
darzi
fixit
orixa
array
vying
appay
arroz
ulama
slily
depth
broch
durst
ident
tolls
guard
abmho
goels
gynos
spays
quags
circs
abuna
peaks
smirk
bezel
vexed
wowed
guano
valid
crews
spean
leave
willy
whoso
natch
imido
bests
bluds
plane
aggri
curli
coxal
angst
speir
loran
ansae
spane
kalif
jambo
throw
dirge
bandy
toles
coifs
nitre
stere
baled
cense
bloat
expel
rinse
crime
absey
welts
ungum
glair
squaw
count
hinny
fours
xylol
voter
agene
renew
mochi
spoof
buhls
homer
cuish
gored
simba
crout
booay
poesy
ghost
veals
rings
musts
roups
rumbo
guava
cided
indie
sarky
isles
atone
aceta
valve
range
naris
deice
shuns
scums
trods
dorts
usurp
alway
chogs
syncs
hails
poind
sense
lawin
yamun
nould
wasms
polka
bwana
rudis
clept
salty
teaed
kente
adeem
alate
khaph
stomp
erose
widow
dsobo
monte
anigh
sceat
gibli
naffs
clats
devot
reata
hules
gusli
plaza
stimy
coled
swats
notch
joint
usnea
cruck
hiree
adbot
viola
onset
casts
eared
amiss
imbed
hurst
siled
hints
sepoy
kombu
humic
viner
thorn
kasme
menta
gusla
gilts
loops
palki
trads
upsee
jibes
auris
parle
kiter
elder
looed
price
synod
omovs
hided
goopy
sorts
wifey
reast
chela
armed
carom
seepy
spree
samek
nomoi
mocha
spiel
regma
houfs
feyed
belee
lolls
eskar
snaky
dream
rangs
envoy
gipsy
blart
gater
koker
glume
perce
benny
asway
cinch
balms
stean
palet
cunts
cides
filks
yacks
ceils
thing
wurst
ulzie
dower
tythe
moove
spats
loral
frays
flaks
basis
wonga
blert
wexed
sorda
heast
umphs
porer
cerge
pshaw
lakin
karks
kulas
needy
quean
barky
jewel
glaze
grisy
clout
ninth
paris
canny
bonne
jocos
vaned
netop
tichy
cooey
loped
until
boord
mooch
dying
banns
caked
loges
razes
comet
aygre
assai
aking
bewig
egads
poort
gobis
suber
gigue
weals
alone
bezzy
orant
kyack
owlet
sains
woody
whows
sewel
pinks
haply
roopy
tuath
nurdy
nazes
lynes
horsy
aback
picas
glibs
watts
virid
kauru
morts
pudor
toppy
trued
sloom
games
lazzi
macer
dwale
abase
solos
bajra
tigon
peony
scope
thebe
misch
zarfs
recut
facts
usage
waker
chank
perst
teuch
aways
buoys
sweet
coped
rolls
hance
daisy
reels
yirks
blaer
vales
cheka
sente
tools
backs
clays
vouch
unpen
lotte
soapy
glans
biled
pilao
xebec
marls
babes
gulet
stare
noggs
berme
fires
korat
unlit
corms
sumis
frape
scrod
smalm
micro
leaze
mints
virus
lairy
lunas
cymae
nduja
bromo
mires
teaks
quays
parka
slack
strow
agers
bogue
books
joist
jumby
dunno
thiol
nanua
smurs
torch
keirs
bland
grise
works
resow
meint
yoked
goyim
marle
todde
pesos
mawky
zobus
shelf
ouens
ovens
teiid
anima
minae
derns
fluor
wiggy
seron
kanas
booze
tinge
foggy
aerie
artis
psion
bafts
disco
bolds
kenos
festy
marge
natal
nirly
dense
lares
spail
vogue
redid
gigas
owned
ixora
cheth
funds
docos
zebec
chips
quist
biffs
feels
elchi
yitie
guise
toled
amour
moper
modus
simps
noxes
alifs
waded
koala
chara
arson
stake
rusts
ngati
slaty
strum
khaya
hooch
harps
wings
flask
sprad
drear
lilos
tatie
tales
rebop
taxer
ranas
skims
fiars
sizes
zupan
minge
pukas
grouf
senza
humph
derro
yawns
takis
beans
corns
riles
longs
gamma
winze
stoke
keets
marvy
wayed
byked
pansy
padma
dudes
gares
blits
taals
dared
loofa
lodes
genty
attap
lotas
podge
lours
cubes
stobs
epoch
arcos
omits
purda
drink
etyma
alaps
olive
pubis
reins
chana
besti
burrs
dooks
cable
schul
ketol
abune
frizz
gelid
sonly
gonzo
vitta
adept
tines
zaman
unfix
liens
bozos
thali
linns
tauon
toddy
canty
socko
pervo
thein
sneds
kyles
jaggs
swarf
towsy
pucan
phono
aides
heles
cines
holds
reeds
blite
piney
cento
caret
jiver
urger
syker
fiery
ethne
sures
nobby
saags
ridge
brads
meous
dhole
poovy
varan
wicca
jembe
howfs
prims
howks
bodes
awoke
holed
saman
dukka
thyme
doled
goeth
gormy
unaus
plugs
caste
flier
ludic
vaunt
mover
batta
crepy
brash
ditsy
vatus
reses
aland
cahow
sargo
craal
colin
gesse
tacky
neemb
scrat
apron
slabs
loams
myrrh
silks
twiny
ardri
scree
haled
guans
agued
cwtch
targe
peags
louse
dhuti
zerks
saves
weils
jutes
plans
bussu
berko
wents
gnarr
tolyl
acerb
minos
boomy
fubsy
jeffs
toile
acock
abyes
argue
gusts
mazed
otaku
chaco
autos
align
goral
tahrs
jasps
amino
panga
dully
indew
apaid
gynny
cyder
brows
ontic
tewel
octet
okapi
brags
stich
slate
pirog
vives
pelfs
zebra
snift
pubic
sames
lurks
tanto
mucid
derth
drier
marcs
impis
bines
ninja
bouse
myths
suete
orcin
enure
bilby
straw
grapy
hawms
tally
refly
pyros
pepsi
gaily
stuck
grant
paves
horis
imped
naevi
troat
plews
bijou
doddy
tilth
fungo
ponty
spuds
towns
hyleg
knoll
skate
toffs
abuzz
humfs
teers
bogie
blots
essay
immix
comma
diary
prexy
mills
dexie
teals
crimp
drill
axite
strag
larva
cozen
semis
sonsy
winge
chout
wised
loves
genus
fjeld
melds
yules
rices
fumes
never
ticca
ascus
stonk
remet
grope
paced
nowls
noter
tacho
gabba
wadis
gazon
dolor
chore
ament
akita
wrate
needs
meeds
jupes
sines
berry
maned
shule
cages
wanky
awash
ankle
borel
mussy
piano
chuts
savor
ticed
unapt
phlox
humid
gawky
fluid
recur
hejab
poppy
haiku
resat
plunk
usque
pawks
baste
objet
bases
wicks
unzip
zedas
steek
roofs
satai
twain
arris
polts
gaunt
gloam
ducts
ables
boors
spule
wroot
denet
sonny
discs
puddy
filos
icons
plena
maiks
crazy
gibed
pubes
sulfo
yomps
orcas
casky
conge
drouk
heard
laker
mecks
glaik
windy
glare
kiddy
rotls
sords
axiom
every
bared
gazar
gimps
veils
wrick
rared
motif
uncut
divna
amort
ousel
frise
leuds
yeses
cover
bulla
limen
dyers
motel
dahls
redub
zulus
kynds
famed
mozed
katis
gebur
scody
metes
chics
fecht
myoma
passe
fidge
shahs
diebs
ovate
gluer
fetal
peeps
offed
ocean
reink
cauld
punce
gores
echos
phish
dicts
spoke
progs
hunts
flocs
blaff
conks
gleds
flunk
mausy
urson
rubli
fiche
pures
boost
padre
pulpy
fiver
lanai
lexis
silex
share
fleme
breed
cheek
vagal
lytic
vakil
ojime
tyran
sorex
wists
upbye
metro
chefs
friar
kahal
battu
mares
quoit
heals
bleys
kaies
arils
kinds
remen
zesty
ginge
tozie
ascot
polys
tarry
spumy
pulik
clink
seans
gerne
saved
steil
brats
tways
vomer
tiddy
deans
kinks
gamey
herry
bajus
erase
piets
aesir
shakt
maund
queyn
chufa
nerve
massa
lapje
teend
seize
seyen
thanx
delly
exams
buxom
teade
sient
equip
grens
dupes
broad
sowff
panax
tabor
spark
andro
hoops
inurn
phese
diner
guest
samps
heils
tyees
crier
rarks
kopek
bizzo
yucks
wudus
bachs
neeld
pesty
sitar
tepid
braws
bolls
psoai
gobar
birch
ruled
naval
fytte
manna
typos
gambs
shoon
elide
squad
derma
quids
unman
prill
amyls
pands
breis
hunch
salle
paise
ayelp
limba
emmer
skers
sweel
soups
rouen
ferms
robes
scugs
zippy
embox
arced
knars
rorts
snead
enarm
savey
shand
tides
watch
aleph
whaps
crems
stein
gawds
jivey
sants
igloo
coyly
emote
deeps
boyos
chill
mumus
pecke
world
holly
kaury
twits
zetas
coted
haiks
appal
thete
volva
jinne
theme
hoppy
yeesh
nerts
pully
booth
gutsy
leaks
lubed
rages
taped
shirr
percs
admix
spirt
favor
hulls
lions
stour
gonia
bunts
kukri
whirr
bikie
tosas
tsade
sucky
hilus
yecch
guars
rhyta
togae
manse
baker
odium
youks
oncet
reign
juked
frati
jeons
turns
acidy
tizes
sandy
evils
yukky
pouff
uveal
tynes
hoing
inspo
forty
raits
uredo
wited
spifs
tanty
boaks
mayos
softa
shied
rones
whipt
gutty
yeast
relay
utile
coots
speld
duchy
magus
locum
jehad
whins
idles
slimy
exact
ghoul
jocky
kores
gouge
rutin
clown
smile
tauts
trema
zings
mists
alley
voice
hoggs
genal
toged
lawer
dhoti
speil
linky
ogmic
delay
kadis
bomas
sloid
grown
plotz
tutti
ducky
wrast
galop
kicky
hinge
ajiva
dorsa
sugan
tempo
sigma
hosen
seely
rebus
getas
fribs
tzars
abies
meves
hawks
fetch
yumps
bruit
spald
waugh
zorro
curry
roist
skoff
crudy
viper
ronde
uvula
malam
loden
bitou
nandu
towed
slyer
palms
ephah
trone
yauds
sores
ruana
yfere
deled
wizes
milky
raths
zoism
piker
cobza
cronk
dinge
haika
bahts
metal
suets
chunk
commy
ovoid
weels
surgy
jacal
beaty
gamps
zambo
vichy
mawns
yores
mooed
smore
miles
ogres
gouty
trove
prune
reest
break
fecit
debts
taxes
hider
rouge
daces
benty
afars
dimbo
reeks
brens
halfa
aswim
flyby
laver
sansa
narcs
goura
fifth
vinyl
frown
outgo
halts
nulls
acyls
alays
eidos
edema
bemad
rangi
tones
triff
dowry
senti
tuffe
peggy
trike
hulks
rewan
limes
gerah
zlote
breve
skort
mauri
ashen
danny
uncap
bonze
bulks
ewhow
glory
naams
patka
fesse
unfed
wonky
ulpan
scale
feaze
lazed
fools
boeps
sabha
podia
digit
subah
torii
sunks
milfs
haufs
swage
octad
tabby
humps
durum
tawts
warez
teffs
vrous
sonce
kains
cully
sware
creds
knock
peghs
ancle
faery
mumsy
ambit
hexer
koffs
nabis
defis
dobra
lengs
caves
giver
caver
abear
carex
waler
lycee
musky
homed
amins
imino
belie
nacho
eland
argol
sukuk
pends
octyl
verra
mania
visne
reman
lytes
teeth
eyots
evade
kelts
tical
nowty
gaups
proem
taper
inept
deify
sinhs
frits
dants
kaifs
rales
ozeki
smack
duces
obeah
vails
murry
sauce
frock
adore
bosky
bloke
koels
priss
unpin
haven
pines
hymns
hotty
budis
zymic
runed
fates
glaum
camas
remit
abask
sycon
butts
mamba
flaky
limos
desse
ahint
snuff
flary
sused
taupe
speat
laevo
aleft
touch
rowed
alarm
girns
oater
boxla
slain
gally
cymas
moong
clift
waltz
annat
jamon
forky
wived
arets
tiers
gluon
tucks
bagel
pudgy
voces
snits
capul
maven
rownd
goose
deign
grein
ackee
dungy
retro
birth
secco
manga
kohls
flyer
tubae
unpay
atlas
baurs
mixup
ureic
ragee
proke
ernes
setae
panko
vapes
menad
cirls
offie
grind
sulfa
orpin
aegis
colic
hinau
bunya
pulas
beano
socle
scath
biter
trope
pugil
bifid
siver
toper
ostia
spams
melon
hongs
eagre
yacca
ambos
algas
overs
focal
attar
elver
dreer
serra
stroy
duets
hells
beaks
bhoot
ahing
hates
roset
froze
lapin
mauts
obits
gyans
nopal
focus
bazoo
dozes
argus
kight
flits
rides
smerk
tratt
admit
loamy
bevue
nyssa
pyats
naric
auric
gerle
plink
track
cecum
dwine
dicks
clogs
batty
socas
phony
loast
raggy
titup
newts
duper
piked
aport
prief
modem
leafy
folio
stong
sposh
shaft
medic
tenne
vegas
snyes
shope
drool
poilu
twang
novas
nighs
edile
brees
neats
solon
arete
redux
douce
ruing
volts
ammon
sheel
sizar
herls
teams
rache
deils
scaly
chica
thang
slaps
arvee
renig
rosit
mothy
seres
treen
spasm
runes
erics
pance
canto
lipid
ixias
model
katas
tacit
daddy
toads
bezil
dents
lemur
lowes
irate
baldy
ogeed
tench
ports
buffy
tithe
veiny
frank
hooey
bovid
tonus
irade
jumar
shtum
chimb
scuds
perts
mvule
hesps
laxed
lease
bight
rayne
vicar
jirre
sunna
hasps
deers
blook
stack
tulpa
lumas
sixte
goats
nabla
patty
dzhos
pions
missy
fiqhs
lovie
dunks
agood
refry
carta
burls
janny
ledgy
puffy
doted
peels
cruse
canoe
tatus
pokes
awmry
nides
cozie
namma
owres
satem
sabir
sados
ruffs
pibal
toast
celeb
goony
femur
kitty
plack
eensy
ariel
peals
cargo
yipes
preif
knits
cloam
segos
theow
datum
galax
nolls
lyssa
roman
yawed
kyloe
knosp
zippo
oriel
kidge
gawks
coups
biner
smorg
pelon
skens
amici
olden
aquas
flirs
wools
roust
skirt
toted
emeus
kiley
hoghs
flood
daric
cripe
gools
nimbi
stude
lobos
hizen
gonof
sylph
outdo
sepia
yales
raves
bundy
mourn
unsay
quyte
lotah
viand
scoop
dreks
human
bilbo
aidas
chang
taxed
kubie
culex
grame
punch
bakes
trans
jalap
toked
couth
cribs
scuzz
hanch
thumb
touze
naira
narks
taros
wedgy
kitul
djinn
chalk
morns
oasis
rains
scrub
toner
dawks
stirs
obied
sixty
hynde
pagri
swing
boyfs
jowar
sotol
sehri
flout
pasha
asker
stela
briny
sands
barks
earns
steer
heugh
recit
cache
holms
wussy
craig
lowry
doors
dawen
sough
lopes
reges
baton
gilds
refix
luted
flews
salps
lanes
mylar
hemin
lanas
monos
axels
ordos
binal
scaws
taits
ickle
chive
liven
tweak
rifer
sield
laari
aruhe
bawns
quart
rubus
joked
lever
creel
lests
doved
bells
gemel
wraps
style
bukes
aloed
nurls
alkyl
asked
bract
zowie
socks
nards
kipes
whips
plaas
large
waney
cuppa
skint
eyres
biker
shear
earnt
cubic
swail
plesh
nones
woofs
brogs
rangy
stire
togue
saree
buffi
jedis
barbs
barro
apeek
hebes
freon
dimes
bocks
cleep
sleys
mulls
malwa
taces
cosed
thema
hilts
druid
schmo
botty
washy
vulva
siles
fitts
eosin
tenge
trogs
deads
gussy
boong
skirr
turnt
fixer
tophs
seric
ditzy
fichu
their
dulls
niefs
mixer
tubed
relie
mimic
union
winns
pulps
guide
hoist
finny
lamia
hulky
tupik
joyed
wispy
yield
staws
dildo
jujus
certy
awned
sayst
urari
tided
triac
bitty
laxes
koaps
geoid
omber
casas
being
altho
lured
linen
keeps
knife
bonny
brane
ettle
droop
built
vases
curer
wilts
luxes
timps
posts
vulgo
hades
hiver
vibex
basij
kerfs
trons
advew
roshi
ogees
cluey
flake
finca
cavas
raids
darns
yechs
khaki
okras
moths
gunge
talon
moxie
motts
jumps
biles
condo
uptak
brown
alamo
corey
borty
chyme
suses
barbe
pogey
elven
porch
scats
ethic
wears
bibbs
joeys
check
vendu
foils
milor
karzy
meris
zante
umble
lofty
stope
epris
cesse
whear
whyda
proxy
bowed
quayd
kheda
pappy
jougs
carks
plant
biome
peavy
wades
oaten
mouth
samba
kimbo
inure
dooce
upran
kayle
ferer
doses
ronte
smoky
braza
goary
vinca
burro
doseh
incle
hanks
yogee
pocky
arepa
reach
pelta
lyart
ngwee
comix
impot
furzy
swine
toned
amban
users
hings
crare
busky
soras
urine
kaids
pinot
derig
lumpy
dowie
mimsy
mapau
wushu
amply
doges
buzzy
skeen
opium
basto
meath
achoo
rummy
zonal
mavie
taste
jocko
dowls
moans
golem
aeons
misty
gramp
yages
exons
withe
pelma
creps
hoied
wacky
pents
futon
gaucy
earth
bruts
rajah
predy
legge
peare
sohur
study
rubai
dures
snars
palas
tangi
oiled
ligge
mihas
bokes
dusty
soupy
pakka
gulfy
ritzy
gummi
drome
poxed
sikas
abeam
pipit
gnawn
sweep
ngana
sowfs
totes
nonyl
emmet
ziffs
dumky
three
buiks
rishi
arras
bursa
benne
razer
dreys
ruble
capiz
educe
yokel
sirup
veery
pates
resto
tavah
bowrs
kells
stogy
keeve
mends
ludes
puler
jests
smalt
salmi
iller
curbs
arcus
azote
adios
novum
major
arbas
caper
sagum
mardy
lahar
clote
pulse
emics
tepal
ziram
psoas
bales
ghyll
hight
unjam
kraft
agami
choky
sowne
oubit
gasps
fused
ceiba
crues
franc
calls
plain
caeca
raved
gadis
basti
antis
sones
elops
perch
vices
pheer
young
glitz
doody
stums
resay
bowet
legit
pulis
knarl
loose
ylike
sabot
leary
bugle
folds
unled
elate
campy
mokos
kudus
madge
mayor
tired
blued
comas
racks
kaphs
false
bathe
value
cauda
chirk
issue
rille
vodka
fents
deave
ronin
longe
teins
hudud
towel
coign
thirl
jingo
mucus
riyal
quina
domal
stash
flora
powny
preop
bluff
basts
bivia
crane
raffs
styes
stink
squid
dumka
brays
place
wauks
mowas
beres
acrid
saiga
sysop
gonys
mongo
calve
vitro
first
egged
micky
denay
roach
vells
mitch
gammy
films
isbas
berob
choom
muton
freet
layed
stork
awing
heapy
south
brews
fient
yahoo
ratoo
vakas
zimbs
piani
fault
yacka
blest
worts
munga
oldie
leccy
kohen
olpes
sijos
peery
ahigh
meynt
neuks
knobs
retie
smoko
bants
fends
teind
sechs
toots
aitus
gauss
abcee
primp
pricy
vegos
crate
slive
roger
arnas
depot
niner
pikis
wagon
boxen
roric
rowts
naiad
brush
trend
bigae
sakes
perns
sture
wexes
prone
goner
krewe
given
bahut
crude
unary
neums
rands
necks
parge
sodic
daiko
tewed
ethal
ottos
scarp
coria
swirl
oupas
boots
diota
where
matlo
dipso
leapt
atoll
lovey
feuar
segar
unget
luger
pured
preps
pilaf
pipal
tough
teary
noops
cacky
porta
nodus
shunt
scape
stend
fiats
forks
jaunt
rumpo
chack
negro
defog
cloth
osier
worms
glade
opens
frate
maire
boeuf
wrawl
stonn
odors
vires
caneh
quena
volar
zakat
badly
goban
trigs
kiore
brass
zombi
turks
gyrus
pupus
barre
powre
retch
rumpy
melik
skins
goofs
diwan
tuyer
vents
abort
throb
crool
kiddo
pikas
nocks
stoep
maybe
fulls
duple
kiaat
dormy
rhime
avows
kondo
coles
limbo
pyxie
barmy
zurfs
uncia
bolar
ficin
lamed
cried
benga
blatt
chuck
wants
inkle
cadgy
gumma
sprod
bambi
seeld
askos
decoy
flail
error
gyals
nonce
ching
leeks
basks
hurry
doorn
ileal
slows
pluto
omlah
lucky
bosun
devas
paedo
shack
fluyt
debag
leach
sadis
savvy
alcid
butyl
litre
spume
tears
clour
cavie
opahs
scene
abord
cesti
heels
firks
imaum
nenes
kiang
refit
fidos
reaps
acari
cream
coley
dirke
moray
furth
whist
skear
dobla
muons
somas
onces
dukas
hemic
cebid
kolos
pewit
valet
turfs
dores
piped
gotch
times
bhais
opted
winna
quant
aigas
keels
farce
cuffo
vison
jeton
cruel
fined
urban
anele
cezve
huffs
gyros
fiord
milty
paten
wills
dalis
longa
soler
croze
klieg
clems
often
waken
truck
barns
lozen
sauna
bices
brung
torse
spale
doree
seeks
hoyas
doser
genua
snots
faxed
krabs
mayan
poets
stove
spaer
nevus
mooly
liang
jesse
plies
felty
fains
suits
parki
dorms
mense
knurr
yabby
capas
katti
kerma
mzees
coble
yokul
sessa
praam
pagle
soldo
lames
kawau
foins
fykes
porin
ootid
bhuna
libel
texts
retag
bossy
junto
hoast
kenaf
chows
clerk
fogle
miaow
elves
dicty
tends
oasts
reset
clave
yoghs
chime
typed
mikra
gaudy
curve
lipos
idyls
maxim
piece
owing
redly
nisei
prees
gruel
shuls
aunty
epode
stows
irone
spoor
silky
eldin
trips
pirls
pence
etics
feces
fader
avgas
panty
jatos
quark
nevel
hexes
lemon
fayne
bawrs
roofy
hobos
moggy
snook
malax
geats
bandh
hikes
jaded
busby
menus
popsy
grege
genet
baron
tract
clank
tardo
droid
outed
oxers
hylas
carol
axial
oyers
tynde
match
welsh
verso
mahua
clype
heres
yawls
doozy
rainy
duppy
veldt
velum
hayey
altos
craic
deets
ebons
unhip
jigot
mosks
lanks
wires
glute
sarod
balsa
hence
baith
showd
rally
pooka
slank
grice
lowns
shool
wetly
woold
sakis
harry
clast
junco
weros
dumbs
tsubo
combo
rimer
tanga
loppy
amate
adhan
whios
khans
power
whole
eyrir
nomes
slype
fract
doats
brugh
hoick
gyppo
welke
odour
anglo
exist
devis
unbar
turfy
jukes
ogive
cella
choli
fango
ummed
yrent
tonks
piert
banya
stang
corgi
drabs
blunt
thorp
dural
conga
offer
agism
vapid
zinky
salep
commo
archi
enows
aster
meare
mercy
moods
renne
adunc
wocks
blunk
yeves
pocks
kyats
worry
sahib
litai
shans
tabun
minny
soote
flair
russe
tempi
whose
uveas
ouphe
racer
whale
iliac
looey
lohan
foray
cloop
aloud
venin
shawn
tuart
crest
taras
sials
quits
gonif
ganef
canso
races
kaims
macaw
panda
molal
grody
avian
malmy
penks
apply
vampy
muses
tonal
dunsh
tasar
shoal
acton
mauve
churr
golfs
henny
adaws
twaes
husky
wefte
defat
cords
loach
pirai
cries
laity
losen
lidar
hoyed
hexyl
tabes
naked
senna
kippa
bodhi
maaed
nerka
matte
dusts
arpen
sauts
emery
undam
jaxie
rooks
perog
rioja
widdy
momma
otary
yodel
vades
addax
wanly
giddy
whets
juvie
pungs
named
siris
horse
fatty
tikka
spell
aggro
fogey
trabs
wheys
druse
beton
melas
alane
tyler
platt
grift
treck
welly
lofts
spyal
hokes
acids
calix
atomy
knots
wrung
mease
sabed
stoai
kyrie
maise
crons
spine
pasta
korma
pokie
sebum
foehn
beefy
mopsy
netes
coypu
rover
drive
smaze
skimo
paxes
sowms
liver
rerig
sipes
blabs
beams
happi
jagas
loord
daven
snack
nooit
coils
kiosk
repla
acmes
tawed
damps
those
satyr
genes
brans
basso
penes
suhur
grave
warms
tosed
klett
demon
woken
bally
redan
pulao
gamut
oorie
lobus
coala
bides
towie
mosso
lyted
lound
pawaw
snool
erbia
sordo
tatts
yucch
money
oohed
swink
skeps
hacks
peaky
powin
tipsy
riant
satin
feeze
mobie
tunic
safed
aheap
herse
gonna
narco
terne
taish
hyped
basan
crags
furol
sauba
pippy
semen
styme
ering
mirex
sheva
whift
bleep
sinus
gyeld
myoid
bluer
haves
gambe
preed
warre
wadge
prats
blips
unwed
skags
wrong
filth
knurs
ainga
raiks
bedye
ronne
butch
biffy
peles
lings
cause
ephod
chews
mirza
jugum
tooth
lorry
moile
woofy
gorms
vivat
bumbo
blend
bania
dozed
rayah
ovist
actin
emend
bleed
smogs
bunjy
spots
firth
drice
plate
pauls
manly
sabal
reave
costs
eorls
pears
coofs
prost
femmy
jells
roses
bongo
varix
ceric
lunar
gismo
boric
kelep
vexes
hides
niton
lamby
media
spivs
sewed
zerda
krubi
hosel
nooks
blase
fecks
inlet
snabs
ebbed
aiyee
ahuru
meiny
boxed
poles
nahal
muzzy
pervs
bated
lammy
harts
barer
pavid
grams
vanes
ohmic
cetyl
dears
spews
sored
arear
clasp
godly
toges
twyer
yurta
thelf
voips
chute
miggs
yeahs
vagus
argot
hypos
parky
dross
halon
sissy
avant
talma
cleft
hurds
ycond
rails
klick
mobby
cogon
septa
smelt
glops
tardy
ornis
esker
woosh
gears
husks
diols
ridic
sikes
aught
leaps
heros
olent
bigha
disks
inwit
packs
jiaos
chide
ybore
fever
wiper
steam
symar
ramal
dirks
strut
koori
pross
there
gauds
etats
event
barye
jinni
gaums
kamik
shawl
zincs
potch
title
scrum
nonny
sades
kotow
ablow
slime
ruler
wases
miche
setts
yuked
scrim
rivet
curfs
imshy
brits
iroko
tours
teens
navvy
chott
flued
ogled
skyrs
bapus
esile
folky
mased
saxes
serer
luser
carts
lieus
glyph
boral
oinks
fanny
shade
visit
quips
kurta
halos
inned
kicks
snaws
simar
hoped
dicer
stear
stone
ganev
dreck
fauna
sieth
prawn
gojis
hokas
breys
thick
syphs
forze
pluff
colon
belga
valor
picot
smite
ogams
jarta
threw
zines
dived
doxes
waled
oflag
nappe
thale
losel
toons
lusty
dhikr
ashes
zoeas
goals
leeps
tyned
frond
goafs
lavra
patsy
enurn
etage
occur
nunny
tsadi
kibes
meril
punny
slags
posit
gawcy
kapas
guiro
pared
whoop
ovolo
vitae
defer
combi
limas
umiac
sunup
choux
palea
infix
curia
votes
terts
hulas
wanks
caddy
caups
billy
gleek
yobbo
whiss
drail
busks
dints
talpa
forza
nihil
hames
laser
goety
crewe
nakfa
belar
gnome
topee
gulfs
fitly
quire
goest
malar
slats
desks
slier
outby
riley
react
manat
iliad
shire
cukes
frame
papes
bassi
douts
misos
aargh
lefte
gavot
cuter
aloft
lance
gloop
quest
pruta
risus
wound
furls
gilpy
gravs
scuts
rebec
broos
refis
palay
typps
bless
holts
koans
tacet
spues
fines
denes
meins
slosh
fugal
usury
cisco
bizzy
dervs
arede
ponds
phoca
mohua
tungs
vireo
pests
quoth
tiyns
domes
hithe
korus
music
bears
cores
pairs
hived
cager
kerel
praty
gives
stair
yites
ficos
doula
jowls
mesas
bluet
foxed
rotch
auger
gosse
glace
rated
ayaya
exeme
shoer
tuina
antar
umras
adzed
route
yorps
norks
woozy
dorty
pryse
revet
yogas
kelly
fancy
cylix
mechs
keeno
whiny
parks
arrah
setup
turbo
signs
ferns
troad
touks
tonic
accoy
remix
celts
seral
yapok
syens
shill
twats
taroc
coked
calif
booai
xylic
usual
woxen
stept
trayf
blogs
kytes
moped
rills
peize
label
rarer
tulsi
adobo
bimah
narre
mazey
pujah
stagy
mopus
loxes
weans
aglus
busts
synds
vauch
mynas
fraps
spaes
bogus
baals
clonk
sapor
strew
hasta
poohs
honky
novae
sided
poynt
nisse
qajaq
allee
tamin
ocrea
jokol
debut
comps
tepas
bunce
adzes
yampy
barms
sniff
anear
pacha
soaks
troll
kluge
typal
grins
sarus
roles
cives
vughs
trild
slish
japan
corks
wokka
gloms
boras
moxas
satis
mucor
natty
jaffa
pling
harem
krone
talas
zinke
wawes
adust
swies
eloin
sucre
fount
dimps
amigo
ruths
wines
artic
gulch
poofy
erode
derby
nippy
rawly
aband
letch
cohab
tazza
sneap
azons
selle
sumps
souts
dunam
sulci
clock
sixer
dingo
attic
sloop
fauns
slots
fifer
caput
rurps
xerox
rebel
coyer
forbs
fiend
scoug
riser
snuck
pheon
linty
lodge
skeds
ochre
ships
bards
molas
gecko
clove
wrapt
nertz
theca
corer
tiles
sanga
grese
noddy
sykes
bosks
talcs
anlas
sirra
kilps
shove
kivas
mythy
fowls
nelis
thaws
kinda
becap
adman
tacks
azans
cepes
logoi
penal
suent
cleik
weeps
yarco
kerns
panel
prods
oping
known
globe
glits
chace
tango
patch
booty
forts
mauls
corny
clods
inust
dales
tilly
gopak
salon
vaper
wigga
bydes
boohs
suras
regur
spard
melee
cakey
laird
nucha
crudo
stane
geeks
dwile
yrneh
stray
brogh
cutto
uptie
whelk
immew
nyala
snoot
donny
laris
suing
milpa
askoi
nikab
strak
teach
wides
solei
fuzzy
tills
premy
moste
canid
fands
rieve
scudo
glift
laded
hawed
monde
sinky
gauge
appuy
shits
talus
color
kelps
lotic
lyase
neeze
wifty
loafs
kites
emeer
prime
grego
eales
pekan
sight
miffy
lownd
reads
conto
sized
katal
spelt
fugly
chiru
dolly
diyas
midgy
furan
coach
hydro
plebe
capri
waxen
pulmo
sauch
rahed
larch
anils
weens
hyson
furry
diver
welds
saugh
vexer
cough
trona
tatar
shots
hilly
along
acers
sedes
scarf
twink
croft
tamps
buchu
aspie
dexes
yowza
slyly
fluey
terry
flamy
motet
nouls
vocab
dogie
punty
skatt
yonks
acorn
okays
locos
bedel
dilli
deshi
wifie
munis
mucro
drupe
holla
frush
tomia
gazer
hears
uncus
plush
esnes
lines
faddy
unbid
wharf
acros
dilly
mhorr
amaut
putts
pagan
quops
words
fenny
chico
snobs
howre
muted
fillo
manet
whaur
gaped
ghest
nates
azoic
lousy
chart
brods
geeps
vangs
shish
dunce
uraos
warps
chugs
lipin
swits
toeas
tapus
sprit
pluot
whiff
hauls
vraic
jaker
scuse
glint
sokah
savin
slued
sakti
geare
carbo
crowd
stoun
peyse
whups
linum
monks
ampul
skiey
hewer
about
nouny
lolly
uplay
rifte
suint
veins
lyres
gogos
ortho
blurt
edify
telic
aurei
graff
boats
poule
clepe
rudas
obese
dance
leres
shuln
eagle
edict
notes
omasa
remap
chasm
mules
swees
slams
latex
axion
podex
roops
dowts
sumos
dills
macho
party
flare
caffs
craws
vaxes
ducat
pukka
links
toros
sully
milts
meuse
duits
tumid
voddy
voxel
boney
plots
rokes
lweis
mengs
fawny
burry
sprag
janes
rowan
muley
sloyd
sards
bowat
musca
certs
poach
nacre
teles
burst
kirks
sleer
erugo
habit
oktas
hewed
video
fauts
liana
wands
pawas
maneb
twixt
rests
grove
sulus
morro
stime
cuspy
urdee
puled
cagey
weete
gusto
canes
gains
stamp
chota
kufis
poses
pombe
slick
snags
posey
geans
fowth
meith
kembs
mysid
aumil
coins
potts
torts
sulks
wanna
leugh
lurid
reefs
sheer
thans
diram
bigot
briss
jived
loave
atman
mowra
tutee
risky
ctene
urare
pujas
fanks
temps
segno
shent
crust
amias
zinco
empts
nests
lobby
group
dusks
vowed
mayst
tangs
glike
motus
rhine
dubbo
eaten
weems
khafs
primo
drags
toran
terra
isled
airns
azyme
spits
bever
pacts
seals
right
nkosi
freak
unbed
oozes
durry
fezes
pekes
doped
gawps
tarns
peins
jural
hamba
diene
sedgy
skyre
lipas
wheel
beast
yojan
rooty
arsed
tyiyn
umbos
stumm
grike
proin
recon
euked
byssi
buret
pithy
anata
rivas
terfe
areic
yarak
choil
linga
jewie
choir
pacta
rates
femal
coarb
jolls
gland
titis
nappa
jerry
pongy
howbe
ylkes
swims
varas
cliff
lords
wedge
summa
gurry
beats
chook
boxty
affix
bungy
diced
varia
redip
luges
jaaps
randy
degus
rakee
lemed
sured
crwth
ewers
geeky
tripe
ureas
newly
jemmy
hatha
munch
stint
logos
plead
cults
binit
casus
menes
didos
acred
agmas
epact
labor
clach
rajes
bents
mairs
breer
voles
susus
goyle
edged
salad
pusle
grays
conky
zanze
stubs
hokis
vests
seaze
smoke
flags
chuff
xenia
funky
loath
sleet
boles
herbs
glove
reive
raver
frons
doing
pride
parae
toxic
bunty
catty
flite
zhomo
takin
bacco
parti
maist
quaff
furze
stade
evoke
wiped
envoi
leone
lilts
azido
schav
rueda
moyls
balky
aulas
gyres
torrs
bites
hudna
sooks
flaws
vants
lingo
tophe
pynes
reoil
moons
skivy
stots
scots
decan
dobby
amids
julep
dares
borer
jeans
kinin
waver
semee
doves
eques
unsew
biggy
shout
codon
risen
bowel
quims
gorsy
kutch
gurge
sensi
podal
ladle
braze
prial
bhels
porns
hongi
weave
saola
antas
pings
dunes
krang
ousts
soots
cains
mower
nitro
paned
fungs
polyp
cheap
kiths
snout
munts
rebbe
ovule
atigi
angry
supra
infra
mudir
peats
dekes
leger
tapes
durns
print
spiny
kemps
anent
taffy
buran
ranch
lasts
butes
tofts
spore
ganch
crush
polio
mayas
kappa
golpe
degum
klong
miaou
ooses
cairn
trout
morat
orlop
milia
flaxy
butle
vivid
larks
nappy
pucka
pecks
brain
gault
quonk
gnash
wolve
yucko
prate
knive
chine
looms
bicep
piggy
eases
zamia
pupil
anted
tinks
alkyd
pomps
ficus
deedy
walls
norms
scold
deair
tinds
zooks
riper
malik
wyles
upter
rowel
alert
stoss
malty
chemo
flute
bongs
robed
moppy
buffa
lader
swore
mucin
sorta
auras
woopy
korai
aquae
soave
beses
cobra
liker
geits
womyn
gripy
amene
chivs
fryer
ovels
ganja
motes
daman
abaka
guids
rahui
salpa
swapt
purer
kheth
lowed
guffs
rehab
flype
whine
tanhs
slaes
kinas
kexes
atilt
dovie
smaik
avion
yince
tenue
otter
girts
saned
least
foots
delft
claim
slink
aline
vibes
dekko
arnut
mouse
spilt
tecta
nowed
tozes
recks
rotte
nares
noups
cleck
talaq
spaws
layin
mulch
ulmin
cress
mewed
maror
exult
jaspe
ictic
vexil
seity
ghees
rapes
mealy
vigia
repps
twilt
crims
perky
masas
eughs
resaw
apods
dicot
unmet
eathe
vints
scour
liers
yerds
wolfs
brach
escot
shiso
reked
rumba
welks
ogles
coure
fille
telae
surly
honda
divis
sties
proto
blare
luffa
muras
halal
lazzo
feebs
cocks
rerun
faine
coney
flawy
lehua
pivot
urali
abash
conte
blive
baits
holey
pouke
paisa
tuned
garms
minas
reeky
bunch
mopes
prads
sajou
chimo
scapi
duett
bores
bobol
swizz
yedes
mawed
coupe
lunts
tagma
ditty
deres
sieve
bhang
ogham
quine
mojos
lobar
louma
boabs
magot
dabba
korun
stops
yours
udals
tiars
pedes
cluck
aspen
pouty
favel
tsuba
wacks
niche
devel
skats
laves
flush
nabob
enact
homes
kopje
riven
wynns
veeps
ditas
gunky
riata
hoper
gazal
exine
kecks
glary
kapus
pissy
drony
stump
roars
foyne
fifes
jilts
sarge
lowan
twerk
galls
mokes
loots
aeros
puggy
sprug
urned
tiara
vocal
sepal
bused
redds
dinky
snath
iodin
daffy
godso
hotel
photo
sobas
lossy
happy
anger
cardi
scare
hikoi
spacy
trees
bread
curny
fasti
pilae
awato
neath
meses
sheet
masts
aboon
crept
klutz
tames
ohias
goody
brief
sorer
umbel
algor
bided
wolds
lards
burse
climb
taxol
padri
wombs
steys
ratch
kynde
coady
bloom
toady
sices
topos
braai
lezes
hunks
roads
putty
pearl
gangs
knowe
huger
kutus
sides
blurb
lavvy
rajas
award
dript
nuder
incel
march
knead
thrip
disci
bendy
bulse
samey
stilb
shred
voled
kazis
keefs
doups
gurns
sloes
dholl
haems
cruve
foody
lauds
paire
aimer
loric
shake
theed
ksars
chyle
heron
carap
jinks
rammy
shale
capex
dungs
bemas
dumas
flour
slits
bonie
leets
arene
raker
deaws
hazan
sluit
leves
whews
zoons
lills
iglus
renal
aulic
fetes
ropes
pikes
crake
azyms
scion
rodes
oaked
jocks
duffs
lezza
effed
newbs
shalt
divas
tharm
grued
machs
jagir
unsex
views
swigs
limps
azury
zaxes
fundy
lints
broom
ducks
frail
hoofs
salol
bubby
kails
tules
sexer
okehs
braid
deked
khors
frist
bosom
afore
whoot
parry
styre
gyves
blows
brock
burgh
purge
bimbo
heder
yaffs
hijra
gugas
erica
gandy
lotes
execs
gruff
lomas
cions
lusus
waged
noris
louts
runty
lears
metis
taxor
yufts
alibi
nuddy
jambe
seles
bogey
vibey
upset
momes
helix
quick
sadza
peece
filmi
flick
bouns
areas
triad
skelf
beaus
mahoe
rotos
typto
donas
exert
kesar
sakai
yoofs
bufty
wingy
blype
nitty
dress
torso
knaur
vertu
beret
kabar
sinks
hocks
sonne
fifis
resid
rybat
hotch
sadhu
techs
ilium
duing
paals
thunk
pales
afoul
ramin
paved
wilds
ugged
morra
munge
farls
stoor
umpty
redry
gudes
burbs
wheen
penna
hilum
jolty
dozer
kithe
tarre
orate
stilt
tokay
nicer
jours
eyers
unket
court
favus
lirks
huffy
twine
kiwis
maple
scads
bacha
drant
guile
sambo
kevel
lahal
gager
peppy
truth
sloan
level
toric
nebel
yagis
reiks
skyey
items
ranga
hazel
sucks
wiser
fatal
vinas
airer
tried
jodel
babus
cobia
pecan
inked
squab
ritts
amens
slide
scala
coxae
crost
allyl
titty
leaky
mater
zoist
drama
unify
rasps
bergs
pauas
gayal
mated
chevy
evite
teggs
fried
typey
soken
cohoe
larnt
enorm
baboo
deles
basin
pitch
ataxy
antre
turps
unsaw
powns
appro
lotus
antae
makes
tronk
squib
chals
supes
iotas
nixer
snugs
vegan
dixit
leear
ugali
caulk
adapt
scatt
draco
teils
mazut
fanon
saker
peres
murva
bates
sunis
wigan
desis
rased
bleak
kinky
salue
pated
varve
wavey
arret
noahs
input
thilk
vinos
ixtle
pyric
yexed
trems
amove
nutty
coded
delta
prink
bocca
mesel
sella
quasi
vigil
seeds
tiffs
polks
swelt
shock
shets
wiled
cames
bitts
squiz
finer
canns
wifes
obias
stunt
actor
nimbs
fards
hoves
brava
flaff
pyran
jawan
sowps
oxies
issei
pacas
guana
cozey
voids
bring
bagie
memes
spods
shirs
wolly
sleep
gisms
soole
ulema
bonds
boree
crans
saddo
shell
boded
laved
ceroc
crash
allis
ought
treat
kaika
mucho
poeps
muxes
eight
zincy
forby
frisk
whump
diact
blume
ither
poise
dolia
based
inner
pooja
indol
akela
slugs
frosh
cabas
beers
whity
psoae
kendo
ikans
jello
doyly
cooms
yawny
lunet
gusty
boyau
equid
exing
polos
gales
curdy
soldi
chief
yeuks
magic
runch
rumen
dorse
pells
duels
blimy
rewth
takky
hoked
mauzy
brose
gnows
pavis
dohyo
tores
bulls
amice
mirky
hakea
akkas
blams
endue
hiois
oiler
jisms
banks
pepos
mavin
novel
petri
awave
cauks
sizer
gizmo
perms
batik
vodou
admin
boche
lichi
robot
bevel
rares
pashm
amahs
cotan
hough
vigor
finds
hygge
waist
scran
pzazz
takhi
swoon
quack
ligan
zineb
sutta
pawed
ponce
elvan
ethos
spank
lurer
hyles
tupek
glues
bimas
emirs
swede
debye
laksa
norma
duans
macle
dagos
biach
mizen
hying
koine
shere
roves
silly
leirs
intel
buffs
bakra
reede
kaval
retax
hovel
shlub
wring
reefy
agast
mujik
blash
ounce
reals
tooms
kokam
toker
egmas
tasse
beaux
lased
numen
yiked
kulak
oaken
paska
cuits
tubal
igapo
brere
japes
pratt
cuifs
flims
midst
islet
lered
finch
anomy
arsey
kuzus
orlon
mousy
sneer
claps
sadhe
barfs
kuias
jewed
readd
piing
could
wanty
tenon
wight
soyle
urite
soaps
stymy
porky
swith
luces
omrah
steak
agone
isnae
nanny
dulce
inarm
ollie
cozed
maill
ricer
liken
round
ketch
gobos
shawm
scrab
ursae
foods
river
repro
apres
civic
rowth
wowee
samen
leams
razor
cissy
nurds
naeve
trios
judos
tranq
troth
flyte
visie
sales
tsked
pumas
aldol
bulge
borna
acais
unsee
ludos
ratos
unlay
locis
wakas
bones
unmew
burqa
sprog
state
virls
clash
curat
houri
cires
torsk
shris
thrid
scoff
flosh
sluse
mawrs
hahas
doyen
boobs
aglet
meant
chere
woman
slurs
purpy
honer
siege
gamme
shift
truer
ropey
alist
agape
plonk
pleas
surer
frory
nagas
filet
pudge
khoum
spiry
tirrs
dimer
croup
dules
odeon
shoes
imide
emmew
ceder
bitos
loids
ofays
dwaum
wrist
mocks
ciels
icers
voila
bible
balas
phone
nudes
vrouw
imids
juves
haunt
incur
saick
whoof
ripen
tells
dorks
shush
pyres
krays
sorel
merry
sidha
sears
braes
gobbo
melic
yarer
douma
namus
drams
shirk
tendu
cloud
wives
faugh
drown
credo
melts
pules
zabra
dippy
farad
cling
xrays
fetid
nodes
flexi
douks
pized
eaned
umped
cloot
darga
clues
chiao
bunko
sperm
kacks
gules
demur
shiai
bumps
carse
pixel
anoas
wreak
infer
helms
speak
ormer
swept
cuvee
fusel
sinew
caber
naped
bogle
touns
curly
obole
bancs
clits
ihram
heath
jakey
crypt
raita
deter
cared
velds
mutch
skull
hoons
shorl
rawns
pangs
aight
veily
fossa
lutes
spurn
horas
jerid
bousy
hazes
tilde
succi
sudds
stank
panic
giros
demos
poppa
donah
culms
musse
wuddy
tweep
mohos
lexes
ghats
abbey
colas
sojus
cutin
shaky
mezes
bonce
twist
mined
soyuz
mesal
kaneh
buteo
anura
mulga
fritz
rumes
scopa
deuce
viewy
lyard
dunch
glisk
tanti
bacon
gryke
gosht
pewee
midis
ulyie
blaws
tapir
kuris
doxie
weigh
strad
fuero
kliks
unpeg
henge
stets
octal
vasts
sokes
ezine
shard
paeon
fifed
staph
mates
merel
decay
sybow
musar
yolky
coxes
educt
sward
vilde
purty
kibla
gaumy
boogy
tanas
alcos
boody
herms
skols
varna
cheer
pappi
frore
hyens
bronc
chats
acnes
howff
bayou
aldea
forte
mulsh
mohrs
renos
stung
gooey
abaya
duroy
bezes
tanka
hammy
volve
embog
briks
trant
scoot
rewet
selva
gaged
likin
crone
urate
steps
costa
wytes
yakow
liked
carps
apter
rymme
hanse
beech
poons
forth
alloy
penie
bowes
rheum
seiza
sings
fails
spayd
hoary
figos
wared
mucic
cohos
slubb
banal
tokos
coact
buggy
kikoi
yukos
deids
vised
lawns
weeds
sprat
mafia
ingle
class
gings
glows
benet
skeos
addle
cusum
puton
douar
riads
leman
strip
jotty
basil
dined
wheep
dhows
tamer
dorba
lorel
girsh
muirs
moits
hooky
levin
exfil
paoli
gryce
holos
pyxis
sined
erned
verse
petal
lubes
dolci
taube
ramet
pints
llama
yests
burds
cello
brome
flats
styed
yummo
yauld
shive
twins
dhaks
mitre
stuff
uncle
bajan
sells
prose
light
venge
noobs
rucks
whare
pipul
spare
oleum
addio
grasp
verst
glide
feals
axman
sutor
wests
bayed
peaty
cutis
griot
kyaks
imbue
qapik
omers
fleet
spica
lenos
wrack
yrivd
egger
feria
bantu
jefes
filii
paiks
thugs
axile
brace
balds
waacs
thewy
kibbi
coved
johns
jumpy
odyle
riped
reaks
flied
scout
kokra
tewit
oners
kedge
praus
bokos
inula
walty
veney
prima
hardy
chams
bends
mauby
chode
latch
plums
yetts
loxed
hains
coder
yarks
endew
djins
kreng
fonts
brume
click
goors
bilge
kamme
drave
nidal
alefs
trues
fries
brine
staun
lenis
bikes
shivs
kadai
foyle
reais
gabby
rites
aulos
jiffy
qadis
takes
flamm
prove
scups
rusas
while
gunks
muter
moles
burfi
yerba
proyn
botch
smits
truce
vines
azoth
xysts
cutie
curet
stuns
tauld
leeze
kited
plook
pails
shero
damar
putti
aahed
cabob
carry
tocks
sdayn
dolos
culti
astun
whang
cyans
glums
areca
gants
abers
takas
tokes
booby
prams
sheol
artal
eager
matts
muntu
qorma
bucko
unwet
rakus
liths
fjord
prase
totem
reams
sulky
diets
grape
brand
calfs
emcee
awful
rodeo
micht
dogan
gasts
deist
malic
jonty
didst
kumis
doles
bobby
pisky
garis
sdein
ragde
murrs
bonza
moobs
sassy
stivy
eyass
gravy
quell
tenes
putto
aguna
kakas
ahent
houts
denar
debus
coati
boxer
wilco
doris
quins
herby
hakus
maars
jnana
mangs
awols
furca
wuses
pardy
chafe
carby
bucku
mimed
dsomo
paysd
blags
ambry
abide
drift
carny
farse
lives
folks
blush
fleur
abaci
tubes
fanum
netty
weary
sower
inapt
gated
reded
ecrus
gursh
snies
udder
today
stent
mimes
stoae
ehing
linos
noose
scudi
weald
ducal
sixth
maria
teths
fitte
bodge
notum
feyer
gaper
spado
lumbi
dowds
steme
taser
grids
parol
bucks
abbas
neume
yells
trawl
raspy
towze
bushy
deeve
rexes
yeard
rifty
spile
rushy
ungot
loony
salet
umbre
shims
forgo
matin
nabks
twank
saber
humas
azuki
quint
jeeze
waves
ceros
dawds
donga
decal
joram
chase
trill
drook
cippi
tease
dodos
wired
hakas
girds
royal
detox
desex
idiom
ploye
weise
ideal
coops
torus
talea
goers
dosed
lambs
haily
sylis
unbag
wormy
altar
wersh
hauns
deeds
oaves
merit
miros
mosts
grill
hamal
murex
dreed
regie
bundh
muist
groat
alpha
shows
daine
flobs
tuism
puses
taver
tryma
yakka
nazir
duomo
sared
fusks
klaps
gleby
coomb
proll
ragga
redon
troak
junks
perai
harsh
white
grunt
grubs
stylo
smirs
canst
toses
dinar
woald
maerl
cubed
pyral
tipis
cutey
muffs
sated
kapow
motey
fohns
coram
geest
sopra
moire
mobes
skaws
icker
skulk
bipod
aliya
avert
babul
tamed
lenes
steel
snees
sisal
bonus
bisom
haffs
spide
halfs
sasin
rocks
surge
vitas
funks
marry
scram
outro
pinas
pownd
stark
nairu
noxal
aleye
thane
mihis
dumpy
brave
jowly
pique
fugus
theta
twigs
utter
lindy
rends
inerm
kinos
bings
milds
myops
impro
yorks
saine
roven
spurt
befit
halve
cecal
micks
gelly
ratty
blind
dorbs
blowy
matza
jowed
compo
peter
potes
crogs
nalas
saggy
enrol
boson
bytes
tryer
amman
dally
masus
idola
wanes
ozone
minke
goldy
feist
linux
litas
nemns
froes
hokum
staps
canna
xysti
pongo
plyer
morae
sworn
skets
geyan
hated
jakes
hydra
gowks
gooky
bills
pitot
flees
poker
bhuts
chaff
omega
crawl
ryper
bemix
smash
cozes
fendy
dynel
musit
rolfs
neafe
jelab
gaurs
hirer
felid
aglow
alecs
almug
betty
haste
ataps
copal
newie
reply
nifty
anole
opals
blawn
incut
males
fouat
tufas
pupae
wawas
plage
arles
draws
tapet
vapor
nylon
swarm
gages
wiels
teugh
thump
stoic
eider
ayont
moted
dashi
gonad
salve
figgy
linch
scray
snebs
sharn
biddy
squeg
myxos
penni
reiki
biccy
wefts
arpas
seedy
fouls
dearn
donsy
ajies
torah
sises
smush
peons
murks
exurb
meaty
natis
rente
potty
chave
wamus
halwa
block
calpa
lowps
terns
fable
lases
solds
moony
chili
kylix
ramus
aitch
soles
fasts
lawny
almes
yugas
ripps
kyang
coden
prunt
barby
maare
celom
divot
vaire
bassy
cooee
blast
adieu
nongs
serum
gappy
crise
swots
sails
batts
aloos
waift
gushy
kisan
xylem
lurex
claws
staff
cools
total
curse
cloze
gytes
wauff
deare
macon
mazes
eches
endow
swung
beaky
pares
khadi
hotly
moils
tiger
rotas
beets
mools
goops
khoja
water
cundy
pilau
alive
steep
beins
twier
deals
thigs
mases
punts
tyres
ploat
agony
burin
giber
corky
petto
aches
merde
naifs
lamas
selfs
taths
lolog
baked
fuzes
pored
hoard
firms
kants
dregs
frabs
yawps
potto
stout
rabat
tapis
speug
pilow
koros
clies
tawai
burka
pareu
mired
benni
kerbs
loury
dhaba
image
tabus
abbes
telly
motis
ghazi
cymes
onium
zaidy
outer
rasse
deoxy
zilla
spart
ixnay
grype
riggs
stoma
leuco
tarok
balti
fanal
nitry
facer
shrow
faded
whims
doven
pozzy
drees
spect
spent
hends
ovoli
fanes
trode
teaze
motor
geums
grits
kames
death`

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Allwords);


/***/ }),

/***/ "./node_modules/svelte/easing/index.mjs":
/*!**********************************************!*\
  !*** ./node_modules/svelte/easing/index.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "linear": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.identity),
/* harmony export */   "backIn": () => (/* binding */ backIn),
/* harmony export */   "backInOut": () => (/* binding */ backInOut),
/* harmony export */   "backOut": () => (/* binding */ backOut),
/* harmony export */   "bounceIn": () => (/* binding */ bounceIn),
/* harmony export */   "bounceInOut": () => (/* binding */ bounceInOut),
/* harmony export */   "bounceOut": () => (/* binding */ bounceOut),
/* harmony export */   "circIn": () => (/* binding */ circIn),
/* harmony export */   "circInOut": () => (/* binding */ circInOut),
/* harmony export */   "circOut": () => (/* binding */ circOut),
/* harmony export */   "cubicIn": () => (/* binding */ cubicIn),
/* harmony export */   "cubicInOut": () => (/* binding */ cubicInOut),
/* harmony export */   "cubicOut": () => (/* binding */ cubicOut),
/* harmony export */   "elasticIn": () => (/* binding */ elasticIn),
/* harmony export */   "elasticInOut": () => (/* binding */ elasticInOut),
/* harmony export */   "elasticOut": () => (/* binding */ elasticOut),
/* harmony export */   "expoIn": () => (/* binding */ expoIn),
/* harmony export */   "expoInOut": () => (/* binding */ expoInOut),
/* harmony export */   "expoOut": () => (/* binding */ expoOut),
/* harmony export */   "quadIn": () => (/* binding */ quadIn),
/* harmony export */   "quadInOut": () => (/* binding */ quadInOut),
/* harmony export */   "quadOut": () => (/* binding */ quadOut),
/* harmony export */   "quartIn": () => (/* binding */ quartIn),
/* harmony export */   "quartInOut": () => (/* binding */ quartInOut),
/* harmony export */   "quartOut": () => (/* binding */ quartOut),
/* harmony export */   "quintIn": () => (/* binding */ quintIn),
/* harmony export */   "quintInOut": () => (/* binding */ quintInOut),
/* harmony export */   "quintOut": () => (/* binding */ quintOut),
/* harmony export */   "sineIn": () => (/* binding */ sineIn),
/* harmony export */   "sineInOut": () => (/* binding */ sineInOut),
/* harmony export */   "sineOut": () => (/* binding */ sineOut)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");


/*
Adapted from https://github.com/mattdesl
Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
*/
function backInOut(t) {
    const s = 1.70158 * 1.525;
    if ((t *= 2) < 1)
        return 0.5 * (t * t * ((s + 1) * t - s));
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}
function backIn(t) {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
}
function backOut(t) {
    const s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
}
function bounceOut(t) {
    const a = 4.0 / 11.0;
    const b = 8.0 / 11.0;
    const c = 9.0 / 10.0;
    const ca = 4356.0 / 361.0;
    const cb = 35442.0 / 1805.0;
    const cc = 16061.0 / 1805.0;
    const t2 = t * t;
    return t < a
        ? 7.5625 * t2
        : t < b
            ? 9.075 * t2 - 9.9 * t + 3.4
            : t < c
                ? ca * t2 - cb * t + cc
                : 10.8 * t * t - 20.52 * t + 10.72;
}
function bounceInOut(t) {
    return t < 0.5
        ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
        : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}
function bounceIn(t) {
    return 1.0 - bounceOut(1.0 - t);
}
function circInOut(t) {
    if ((t *= 2) < 1)
        return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}
function circIn(t) {
    return 1.0 - Math.sqrt(1.0 - t * t);
}
function circOut(t) {
    return Math.sqrt(1 - --t * t);
}
function cubicInOut(t) {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}
function cubicIn(t) {
    return t * t * t;
}
function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}
function elasticInOut(t) {
    return t < 0.5
        ? 0.5 *
            Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t) *
            Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
        : 0.5 *
            Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0)) *
            Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) +
            1.0;
}
function elasticIn(t) {
    return Math.sin((13.0 * t * Math.PI) / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}
function elasticOut(t) {
    return (Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0);
}
function expoInOut(t) {
    return t === 0.0 || t === 1.0
        ? t
        : t < 0.5
            ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
            : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
}
function expoIn(t) {
    return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}
function expoOut(t) {
    return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
}
function quadInOut(t) {
    t /= 0.5;
    if (t < 1)
        return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
}
function quadIn(t) {
    return t * t;
}
function quadOut(t) {
    return -t * (t - 2.0);
}
function quartInOut(t) {
    return t < 0.5
        ? +8.0 * Math.pow(t, 4.0)
        : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}
function quartIn(t) {
    return Math.pow(t, 4.0);
}
function quartOut(t) {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}
function quintInOut(t) {
    if ((t *= 2) < 1)
        return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
}
function quintIn(t) {
    return t * t * t * t * t;
}
function quintOut(t) {
    return --t * t * t * t * t + 1;
}
function sineInOut(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
}
function sineIn(t) {
    const v = Math.cos(t * Math.PI * 0.5);
    if (Math.abs(v) < 1e-14)
        return 1;
    else
        return 1 - v;
}
function sineOut(t) {
    return Math.sin((t * Math.PI) / 2);
}




/***/ }),

/***/ "./node_modules/svelte/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/svelte/index.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvelteComponent": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentTyped),
/* harmony export */   "afterUpdate": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.afterUpdate),
/* harmony export */   "beforeUpdate": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.beforeUpdate),
/* harmony export */   "createEventDispatcher": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.createEventDispatcher),
/* harmony export */   "getAllContexts": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getAllContexts),
/* harmony export */   "getContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getContext),
/* harmony export */   "hasContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.hasContext),
/* harmony export */   "onDestroy": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onDestroy),
/* harmony export */   "onMount": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onMount),
/* harmony export */   "setContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.setContext),
/* harmony export */   "tick": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.tick)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");



/***/ }),

/***/ "./node_modules/svelte/internal/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/svelte/internal/index.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlTag": () => (/* binding */ HtmlTag),
/* harmony export */   "HtmlTagHydration": () => (/* binding */ HtmlTagHydration),
/* harmony export */   "SvelteComponent": () => (/* binding */ SvelteComponent),
/* harmony export */   "SvelteComponentDev": () => (/* binding */ SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* binding */ SvelteComponentTyped),
/* harmony export */   "SvelteElement": () => (/* binding */ SvelteElement),
/* harmony export */   "action_destroyer": () => (/* binding */ action_destroyer),
/* harmony export */   "add_attribute": () => (/* binding */ add_attribute),
/* harmony export */   "add_classes": () => (/* binding */ add_classes),
/* harmony export */   "add_flush_callback": () => (/* binding */ add_flush_callback),
/* harmony export */   "add_location": () => (/* binding */ add_location),
/* harmony export */   "add_render_callback": () => (/* binding */ add_render_callback),
/* harmony export */   "add_resize_listener": () => (/* binding */ add_resize_listener),
/* harmony export */   "add_styles": () => (/* binding */ add_styles),
/* harmony export */   "add_transform": () => (/* binding */ add_transform),
/* harmony export */   "afterUpdate": () => (/* binding */ afterUpdate),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "append_dev": () => (/* binding */ append_dev),
/* harmony export */   "append_empty_stylesheet": () => (/* binding */ append_empty_stylesheet),
/* harmony export */   "append_hydration": () => (/* binding */ append_hydration),
/* harmony export */   "append_hydration_dev": () => (/* binding */ append_hydration_dev),
/* harmony export */   "append_styles": () => (/* binding */ append_styles),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "attr": () => (/* binding */ attr),
/* harmony export */   "attr_dev": () => (/* binding */ attr_dev),
/* harmony export */   "attribute_to_object": () => (/* binding */ attribute_to_object),
/* harmony export */   "beforeUpdate": () => (/* binding */ beforeUpdate),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "binding_callbacks": () => (/* binding */ binding_callbacks),
/* harmony export */   "blank_object": () => (/* binding */ blank_object),
/* harmony export */   "bubble": () => (/* binding */ bubble),
/* harmony export */   "check_outros": () => (/* binding */ check_outros),
/* harmony export */   "children": () => (/* binding */ children),
/* harmony export */   "claim_component": () => (/* binding */ claim_component),
/* harmony export */   "claim_element": () => (/* binding */ claim_element),
/* harmony export */   "claim_html_tag": () => (/* binding */ claim_html_tag),
/* harmony export */   "claim_space": () => (/* binding */ claim_space),
/* harmony export */   "claim_svg_element": () => (/* binding */ claim_svg_element),
/* harmony export */   "claim_text": () => (/* binding */ claim_text),
/* harmony export */   "clear_loops": () => (/* binding */ clear_loops),
/* harmony export */   "component_subscribe": () => (/* binding */ component_subscribe),
/* harmony export */   "compute_rest_props": () => (/* binding */ compute_rest_props),
/* harmony export */   "compute_slots": () => (/* binding */ compute_slots),
/* harmony export */   "createEventDispatcher": () => (/* binding */ createEventDispatcher),
/* harmony export */   "create_animation": () => (/* binding */ create_animation),
/* harmony export */   "create_bidirectional_transition": () => (/* binding */ create_bidirectional_transition),
/* harmony export */   "create_component": () => (/* binding */ create_component),
/* harmony export */   "create_in_transition": () => (/* binding */ create_in_transition),
/* harmony export */   "create_out_transition": () => (/* binding */ create_out_transition),
/* harmony export */   "create_slot": () => (/* binding */ create_slot),
/* harmony export */   "create_ssr_component": () => (/* binding */ create_ssr_component),
/* harmony export */   "current_component": () => (/* binding */ current_component),
/* harmony export */   "custom_event": () => (/* binding */ custom_event),
/* harmony export */   "dataset_dev": () => (/* binding */ dataset_dev),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "destroy_block": () => (/* binding */ destroy_block),
/* harmony export */   "destroy_component": () => (/* binding */ destroy_component),
/* harmony export */   "destroy_each": () => (/* binding */ destroy_each),
/* harmony export */   "detach": () => (/* binding */ detach),
/* harmony export */   "detach_after_dev": () => (/* binding */ detach_after_dev),
/* harmony export */   "detach_before_dev": () => (/* binding */ detach_before_dev),
/* harmony export */   "detach_between_dev": () => (/* binding */ detach_between_dev),
/* harmony export */   "detach_dev": () => (/* binding */ detach_dev),
/* harmony export */   "dirty_components": () => (/* binding */ dirty_components),
/* harmony export */   "dispatch_dev": () => (/* binding */ dispatch_dev),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "element": () => (/* binding */ element),
/* harmony export */   "element_is": () => (/* binding */ element_is),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "end_hydrating": () => (/* binding */ end_hydrating),
/* harmony export */   "escape": () => (/* binding */ escape),
/* harmony export */   "escape_attribute_value": () => (/* binding */ escape_attribute_value),
/* harmony export */   "escape_object": () => (/* binding */ escape_object),
/* harmony export */   "escaped": () => (/* binding */ escaped),
/* harmony export */   "exclude_internal_props": () => (/* binding */ exclude_internal_props),
/* harmony export */   "fix_and_destroy_block": () => (/* binding */ fix_and_destroy_block),
/* harmony export */   "fix_and_outro_and_destroy_block": () => (/* binding */ fix_and_outro_and_destroy_block),
/* harmony export */   "fix_position": () => (/* binding */ fix_position),
/* harmony export */   "flush": () => (/* binding */ flush),
/* harmony export */   "getAllContexts": () => (/* binding */ getAllContexts),
/* harmony export */   "getContext": () => (/* binding */ getContext),
/* harmony export */   "get_all_dirty_from_scope": () => (/* binding */ get_all_dirty_from_scope),
/* harmony export */   "get_binding_group_value": () => (/* binding */ get_binding_group_value),
/* harmony export */   "get_current_component": () => (/* binding */ get_current_component),
/* harmony export */   "get_custom_elements_slots": () => (/* binding */ get_custom_elements_slots),
/* harmony export */   "get_root_for_style": () => (/* binding */ get_root_for_style),
/* harmony export */   "get_slot_changes": () => (/* binding */ get_slot_changes),
/* harmony export */   "get_spread_object": () => (/* binding */ get_spread_object),
/* harmony export */   "get_spread_update": () => (/* binding */ get_spread_update),
/* harmony export */   "get_store_value": () => (/* binding */ get_store_value),
/* harmony export */   "globals": () => (/* binding */ globals),
/* harmony export */   "group_outros": () => (/* binding */ group_outros),
/* harmony export */   "handle_promise": () => (/* binding */ handle_promise),
/* harmony export */   "hasContext": () => (/* binding */ hasContext),
/* harmony export */   "has_prop": () => (/* binding */ has_prop),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "insert": () => (/* binding */ insert),
/* harmony export */   "insert_dev": () => (/* binding */ insert_dev),
/* harmony export */   "insert_hydration": () => (/* binding */ insert_hydration),
/* harmony export */   "insert_hydration_dev": () => (/* binding */ insert_hydration_dev),
/* harmony export */   "intros": () => (/* binding */ intros),
/* harmony export */   "invalid_attribute_name_character": () => (/* binding */ invalid_attribute_name_character),
/* harmony export */   "is_client": () => (/* binding */ is_client),
/* harmony export */   "is_crossorigin": () => (/* binding */ is_crossorigin),
/* harmony export */   "is_empty": () => (/* binding */ is_empty),
/* harmony export */   "is_function": () => (/* binding */ is_function),
/* harmony export */   "is_promise": () => (/* binding */ is_promise),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "listen_dev": () => (/* binding */ listen_dev),
/* harmony export */   "loop": () => (/* binding */ loop),
/* harmony export */   "loop_guard": () => (/* binding */ loop_guard),
/* harmony export */   "merge_ssr_styles": () => (/* binding */ merge_ssr_styles),
/* harmony export */   "missing_component": () => (/* binding */ missing_component),
/* harmony export */   "mount_component": () => (/* binding */ mount_component),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "not_equal": () => (/* binding */ not_equal),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "null_to_empty": () => (/* binding */ null_to_empty),
/* harmony export */   "object_without_properties": () => (/* binding */ object_without_properties),
/* harmony export */   "onDestroy": () => (/* binding */ onDestroy),
/* harmony export */   "onMount": () => (/* binding */ onMount),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "outro_and_destroy_block": () => (/* binding */ outro_and_destroy_block),
/* harmony export */   "prevent_default": () => (/* binding */ prevent_default),
/* harmony export */   "prop_dev": () => (/* binding */ prop_dev),
/* harmony export */   "query_selector_all": () => (/* binding */ query_selector_all),
/* harmony export */   "raf": () => (/* binding */ raf),
/* harmony export */   "run": () => (/* binding */ run),
/* harmony export */   "run_all": () => (/* binding */ run_all),
/* harmony export */   "safe_not_equal": () => (/* binding */ safe_not_equal),
/* harmony export */   "schedule_update": () => (/* binding */ schedule_update),
/* harmony export */   "select_multiple_value": () => (/* binding */ select_multiple_value),
/* harmony export */   "select_option": () => (/* binding */ select_option),
/* harmony export */   "select_options": () => (/* binding */ select_options),
/* harmony export */   "select_value": () => (/* binding */ select_value),
/* harmony export */   "self": () => (/* binding */ self),
/* harmony export */   "setContext": () => (/* binding */ setContext),
/* harmony export */   "set_attributes": () => (/* binding */ set_attributes),
/* harmony export */   "set_current_component": () => (/* binding */ set_current_component),
/* harmony export */   "set_custom_element_data": () => (/* binding */ set_custom_element_data),
/* harmony export */   "set_data": () => (/* binding */ set_data),
/* harmony export */   "set_data_dev": () => (/* binding */ set_data_dev),
/* harmony export */   "set_input_type": () => (/* binding */ set_input_type),
/* harmony export */   "set_input_value": () => (/* binding */ set_input_value),
/* harmony export */   "set_now": () => (/* binding */ set_now),
/* harmony export */   "set_raf": () => (/* binding */ set_raf),
/* harmony export */   "set_store_value": () => (/* binding */ set_store_value),
/* harmony export */   "set_style": () => (/* binding */ set_style),
/* harmony export */   "set_svg_attributes": () => (/* binding */ set_svg_attributes),
/* harmony export */   "space": () => (/* binding */ space),
/* harmony export */   "spread": () => (/* binding */ spread),
/* harmony export */   "src_url_equal": () => (/* binding */ src_url_equal),
/* harmony export */   "start_hydrating": () => (/* binding */ start_hydrating),
/* harmony export */   "stop_propagation": () => (/* binding */ stop_propagation),
/* harmony export */   "subscribe": () => (/* binding */ subscribe),
/* harmony export */   "svg_element": () => (/* binding */ svg_element),
/* harmony export */   "text": () => (/* binding */ text),
/* harmony export */   "tick": () => (/* binding */ tick),
/* harmony export */   "time_ranges_to_array": () => (/* binding */ time_ranges_to_array),
/* harmony export */   "to_number": () => (/* binding */ to_number),
/* harmony export */   "toggle_class": () => (/* binding */ toggle_class),
/* harmony export */   "transition_in": () => (/* binding */ transition_in),
/* harmony export */   "transition_out": () => (/* binding */ transition_out),
/* harmony export */   "trusted": () => (/* binding */ trusted),
/* harmony export */   "update_await_block_branch": () => (/* binding */ update_await_block_branch),
/* harmony export */   "update_keyed_each": () => (/* binding */ update_keyed_each),
/* harmony export */   "update_slot": () => (/* binding */ update_slot),
/* harmony export */   "update_slot_base": () => (/* binding */ update_slot_base),
/* harmony export */   "validate_component": () => (/* binding */ validate_component),
/* harmony export */   "validate_each_argument": () => (/* binding */ validate_each_argument),
/* harmony export */   "validate_each_keys": () => (/* binding */ validate_each_keys),
/* harmony export */   "validate_slots": () => (/* binding */ validate_slots),
/* harmony export */   "validate_store": () => (/* binding */ validate_store),
/* harmony export */   "xlink_attr": () => (/* binding */ xlink_attr)
/* harmony export */ });
function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function once(fn) {
    let ran = false;
    return function (...args) {
        if (ran)
            return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
// used internally for testing
function set_now(fn) {
    now = fn;
}
function set_raf(fn) {
    raf = fn;
}

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * For testing purposes only!
 */
function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
    let children = target.childNodes;
    // If target is <head>, there may be children without claim_order
    if (target.nodeName === 'HEAD') {
        const myChildren = [];
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.claim_order !== undefined) {
                myChildren.push(node);
            }
        }
        children = myChildren;
    }
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        // with fast path for when we are on the current longest subsequence
        const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
}
function append_hydration(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
            target.actual_end_child = target.firstChild;
        }
        // Skip nodes of undefined ordering
        while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
            target.actual_end_child = target.actual_end_child.nextSibling;
        }
        if (node !== target.actual_end_child) {
            // We only insert if the ordering of this node should be modified or the parent node is not target
            if (node.claim_order !== undefined || node.parentNode !== target) {
                target.insertBefore(node, target.actual_end_child);
            }
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target || node.nextSibling !== null) {
        target.appendChild(node);
    }
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append_hydration(target, node);
    }
    else if (node.parentNode !== target || node.nextSibling != anchor) {
        target.insertBefore(node, anchor || null);
    }
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
        if (has_prop(obj, k)
            // @ts-ignore
            && exclude.indexOf(k) === -1) {
            // @ts-ignore
            target[k] = obj[k];
        }
    }
    return target;
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
    };
}
function trusted(fn) {
    return function (event) {
        // @ts-ignore
        if (event.isTrusted)
            fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
    }
    else {
        attr(node, prop, value);
    }
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function init_claim_info(nodes) {
    if (nodes.claim_info === undefined) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    init_claim_info(nodes);
    const resultNode = (() => {
        // We first try to find an element after the previous one
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                else if (replacement === undefined) {
                    // Since we spliced before the last_index, we decrease it
                    nodes.claim_info.last_index--;
                }
                return node;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) {
                remove.push(attribute.name);
            }
        }
        remove.forEach(v => node.removeAttribute(v));
        return undefined;
    }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        const dataStr = '' + data;
        if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) {
                return node.splitText(dataStr.length);
            }
        }
        else {
            node.data = dataStr;
        }
    }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function find_comment(nodes, text, start) {
    for (let i = start; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 8 /* comment node */ && node.textContent.trim() === text) {
            return i;
        }
    }
    return nodes.length;
}
function claim_html_tag(nodes) {
    // find html opening tag
    const start_index = find_comment(nodes, 'HTML_TAG_START', 0);
    const end_index = find_comment(nodes, 'HTML_TAG_END', start_index);
    if (start_index === end_index) {
        return new HtmlTagHydration();
    }
    init_claim_info(nodes);
    const html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
    detach(html_tag_nodes[0]);
    detach(html_tag_nodes[html_tag_nodes.length - 1]);
    const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
    for (const n of claimed_nodes) {
        n.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
    }
    return new HtmlTagHydration(claimed_nodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    }
    catch (e) {
        // do nothing
    }
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    select.selectedIndex = -1; // no option should be selected
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, bubbles = false) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor() {
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
class HtmlTagHydration extends HtmlTag {
    constructor(claimed_nodes) {
        super();
        this.e = this.n = null;
        this.l = claimed_nodes;
    }
    c(html) {
        if (this.l) {
            this.n = this.l;
        }
        else {
            super.c(html);
        }
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert_hydration(this.t, this.n[i], anchor);
        }
    }
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}
function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node) => {
        result[node.slot || 'default'] = true;
    });
    return result;
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        managed_styles.forEach(info => {
            const { stylesheet } = info;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            info.rules = {};
        });
        managed_styles.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
function getAllContexts() {
    return get_current_component().$$.context;
}
function hasContext(key) {
    return get_current_component().$$.context.has(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            started = true;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = (program.b - t);
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            if (info.blocks[i] === block) {
                                info.blocks[i] = null;
                            }
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function update_await_block_branch(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved } = info;
    if (info.current === info.then) {
        child_ctx[info.value] = resolved;
    }
    if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
    }
    info.block.p(child_ctx, dirty);
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, attrs_to_add) {
    const attributes = Object.assign({}, ...args);
    if (attrs_to_add) {
        const classes_to_add = attrs_to_add.classes;
        const styles_to_add = attrs_to_add.styles;
        if (classes_to_add) {
            if (attributes.class == null) {
                attributes.class = classes_to_add;
            }
            else {
                attributes.class += ' ' + classes_to_add;
            }
        }
        if (styles_to_add) {
            if (attributes.style == null) {
                attributes.style = style_object_to_string(styles_to_add);
            }
            else {
                attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
            }
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += ' ' + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += ' ' + name;
        }
        else if (value != null) {
            str += ` ${name}="${value}"`;
        }
    });
    return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
    const style_object = {};
    for (const individual_style of style_attribute.split(';')) {
        const colon_index = individual_style.indexOf(':');
        const name = individual_style.slice(0, colon_index).trim();
        const value = individual_style.slice(colon_index + 1).trim();
        if (!name)
            continue;
        style_object[name] = value;
    }
    for (const name in style_directive) {
        const value = style_directive[name];
        if (value) {
            style_object[name] = value;
        }
        else {
            delete style_object[name];
        }
    }
    return style_object;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function escape_attribute_value(value) {
    return typeof value === 'string' ? escape(value) : value;
}
function escape_object(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = escape_attribute_value(obj[key]);
    }
    return result;
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return '';
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(context || (parent_component ? parent_component.$$.context : [])),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true && boolean_attributes.has(name) ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : '';
}
function style_object_to_string(style_object) {
    return Object.keys(style_object)
        .filter(key => style_object[key])
        .map(key => `${key}: ${style_object[key]};`)
        .join(' ');
}
function add_styles(style_object) {
    const styles = style_object_to_string(style_object);
    return styles ? ` style="${styles}"` : '';
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            const { on_mount } = this.$$;
            this.$$.on_disconnect = on_mount.map(run).filter(is_function);
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        disconnectedCallback() {
            run_all(this.$$.on_disconnect);
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function append_hydration_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append_hydration(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function insert_hydration_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert_hydration(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
    }
}
function detach_before_dev(after) {
    while (after.previousSibling) {
        detach_dev(after.previousSibling);
    }
}
function detach_after_dev(before) {
    while (before.nextSibling) {
        detach_dev(before.nextSibling);
    }
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev('SvelteDOMSetDataset', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
class SvelteComponentTyped extends SvelteComponentDev {
    constructor(options) {
        super(options);
    }
}
function loop_guard(timeout) {
    const start = Date.now();
    return () => {
        if (Date.now() - start > timeout) {
            throw new Error('Infinite loop detected');
        }
    };
}




/***/ }),

/***/ "./node_modules/svelte/transition/index.mjs":
/*!**************************************************!*\
  !*** ./node_modules/svelte/transition/index.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blur": () => (/* binding */ blur),
/* harmony export */   "crossfade": () => (/* binding */ crossfade),
/* harmony export */   "draw": () => (/* binding */ draw),
/* harmony export */   "fade": () => (/* binding */ fade),
/* harmony export */   "fly": () => (/* binding */ fly),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "slide": () => (/* binding */ slide)
/* harmony export */ });
/* harmony import */ var _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../easing/index.mjs */ "./node_modules/svelte/easing/index.mjs");
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");



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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function blur(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicInOut, amount = 5, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const f = style.filter === 'none' ? '' : style.filter;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `opacity: ${target_opacity - (od * u)}; filter: ${f} blur(${u * amount}px);`
    };
}
function fade(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.linear } = {}) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
    };
}
function fly(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
    };
}
function slide(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut } = {}) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const border_top_width = parseFloat(style.borderTopWidth);
    const border_bottom_width = parseFloat(style.borderBottomWidth);
    return {
        delay,
        duration,
        easing,
        css: t => 'overflow: hidden;' +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `height: ${t * height}px;` +
            `padding-top: ${t * padding_top}px;` +
            `padding-bottom: ${t * padding_bottom}px;` +
            `margin-top: ${t * margin_top}px;` +
            `margin-bottom: ${t * margin_bottom}px;` +
            `border-top-width: ${t * border_top_width}px;` +
            `border-bottom-width: ${t * border_bottom_width}px;`
    };
}
function scale(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut, start = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const sd = 1 - start;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
    };
}
function draw(node, { delay = 0, speed, duration, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicInOut } = {}) {
    let len = node.getTotalLength();
    const style = getComputedStyle(node);
    if (style.strokeLinecap !== 'butt') {
        len += parseInt(style.strokeWidth);
    }
    if (duration === undefined) {
        if (speed === undefined) {
            duration = 800;
        }
        else {
            duration = len / speed;
        }
    }
    else if (typeof duration === 'function') {
        duration = duration(len);
    }
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `stroke-dasharray: ${t * len} ${u * len}`
    };
}
function crossfade(_a) {
    var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
    const to_receive = new Map();
    const to_send = new Map();
    function crossfade(from, node, params) {
        const { delay = 0, duration = d => Math.sqrt(d) * 30, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut } = (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.assign)((0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.assign)({}, defaults), params);
        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const opacity = +style.opacity;
        return {
            delay,
            duration: (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.is_function)(duration) ? duration(d) : duration,
            easing,
            css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
        };
    }
    function transition(items, counterparts, intro) {
        return (node, params) => {
            items.set(params.key, {
                rect: node.getBoundingClientRect()
            });
            return () => {
                if (counterparts.has(params.key)) {
                    const { rect } = counterparts.get(params.key);
                    counterparts.delete(params.key);
                    return crossfade(rect, node, params);
                }
                // if the node is disappearing altogether
                // (i.e. wasn't claimed by the other list)
                // then we need to supply an outro
                items.delete(params.key);
                return fallback && fallback(node, params, intro);
            };
        };
    }
    return [
        transition(to_send, to_receive, false),
        transition(to_receive, to_send, true)
    ];
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _global_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.css */ "./src/global.css");
/* harmony import */ var _App_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.svelte */ "./src/App.svelte");




const app = new _App_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
	target: document.body
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map