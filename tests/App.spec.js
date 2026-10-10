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

  it('starts the progress bar at 0%', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia()],
      },
    })

    expect(wrapper.get('.loading-screen__bar').attributes('style')).toContain('width: 0%')
  })

  it('fills the progress bar gradually while it waits', async () => {
    vi.useFakeTimers()
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia()],
      },
    })

    await vi.advanceTimersByTimeAsync(600)

    const width = Number(wrapper.get('.loading-screen__bar').attributes('style').match(/width: (\d+)%/)[1])
    expect(width).toBeGreaterThan(0)
    expect(width).toBeLessThan(100)

    vi.useRealTimers()
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

    await vi.advanceTimersByTimeAsync(1200)

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

    await vi.advanceTimersByTimeAsync(5000)

    expect(wrapper.text()).toContain('Bienvenid@')

    window.dispatchEvent(new Event('load'))
    await vi.advanceTimersByTimeAsync(300)

    expect(wrapper.text()).toContain('El último archivo de Clara')

    readyStateSpy.mockRestore()
    vi.useRealTimers()
  })
})