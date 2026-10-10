import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

describe('App', () => {
  it('shows the loading screen before the route renders', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia()],
      },
    })

    expect(wrapper.text()).toContain('Bienvenid@')
    expect(wrapper.text()).not.toContain('El último archivo de Clara')
  })

  it('renders the current route inside RouterView', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia()],
      },
    })

    expect(wrapper.text()).toContain('El último archivo de Clara')
  })
})