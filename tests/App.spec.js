import { describe, it, expect, vi } from 'vitest'
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
    vi.useFakeTimers()
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia()],
      },
    })

    vi.advanceTimersByTime(1200)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('El último archivo de Clara')
    vi.useRealTimers()
  })

  it('keeps the loading screen until the window finishes loading, even past the minimum duration', async () => {
    vi.useFakeTimers()
    const readyStateSpy = vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading')

    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia()],
      },
    })

    vi.advanceTimersByTime(5000)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Bienvenid@')

    window.dispatchEvent(new Event('load'))
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('El último archivo de Clara')

    readyStateSpy.mockRestore()
    vi.useRealTimers()
  })
})