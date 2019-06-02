import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _67f55d98 = () => interopDefault(import('../pages/posts.vue' /* webpackChunkName: "pages/posts" */))
const _ca385b06 = () => interopDefault(import('../pages/user/index.vue' /* webpackChunkName: "pages/user/index" */))
const _476f525e = () => interopDefault(import('../pages/user/one.vue' /* webpackChunkName: "pages/user/one" */))
const _f5635fb6 = () => interopDefault(import('../pages/user/_id.vue' /* webpackChunkName: "pages/user/_id" */))
const _237566b3 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _c43dbb84 = () => interopDefault(import('../pages/_category.vue' /* webpackChunkName: "pages/_category" */))
const _688e8241 = () => interopDefault(import('../pages/_category/index.vue' /* webpackChunkName: "pages/_category/index" */))
const _6f878e00 = () => interopDefault(import('../pages/_category/_subCategory.vue' /* webpackChunkName: "pages/_category/_subCategory" */))
const _0239ff83 = () => interopDefault(import('../pages/_category/_subCategory/index.vue' /* webpackChunkName: "pages/_category/_subCategory/index" */))
const _003806ab = () => interopDefault(import('../pages/_category/_subCategory/_id.vue' /* webpackChunkName: "pages/_category/_subCategory/_id" */))
const _924360a4 = () => interopDefault(import('../pages/_slug/index.vue' /* webpackChunkName: "pages/_slug/index" */))
const _8f6dda70 = () => interopDefault(import('../pages/_slug/comments.vue' /* webpackChunkName: "pages/_slug/comments" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/posts",
      component: _67f55d98,
      name: "posts"
    }, {
      path: "/user",
      component: _ca385b06,
      name: "user"
    }, {
      path: "/user/one",
      component: _476f525e,
      name: "user-one"
    }, {
      path: "/user/:id",
      component: _f5635fb6,
      name: "user-id"
    }, {
      path: "/",
      component: _237566b3,
      name: "index"
    }, {
      path: "/:category",
      component: _c43dbb84,
      children: [{
        path: "",
        component: _688e8241,
        name: "category"
      }, {
        path: ":subCategory",
        component: _6f878e00,
        children: [{
          path: "",
          component: _0239ff83,
          name: "category-subCategory"
        }, {
          path: ":id",
          component: _003806ab,
          name: "category-subCategory-id"
        }]
      }]
    }, {
      path: "/:slug",
      component: _924360a4,
      name: "slug"
    }, {
      path: "/:slug/comments",
      component: _8f6dda70,
      name: "slug-comments"
    }],

    fallback: false
  })
}
