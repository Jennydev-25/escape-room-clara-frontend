import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '@/components/home/Header.vue'

const mountHeader = () => mount(Header, { attachTo: document.body, global: { stubs: { NavBar: true } } })

function setScroll(position) {
    Object.defineProperty(window, 'scrollY', { value: position, configurable: true, writable: true })
}

function scrollTo(position) {
    setScroll(position)
    window.dispatchEvent(new Event('scroll'))
}

describe('Header', () => {
    afterEach(() => {
        setScroll(0)
    })

    it('stays hidden while the page is at the top', () => {
        const wrapper = mountHeader()

        expect(wrapper.find('.header').exists()).toBe(false)
    })

    it('appears once the page is scrolled down', async () => {
        const wrapper = mountHeader()

        scrollTo(200)
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.header').exists()).toBe(true)
    })

    it('hides again when the page goes back to the top', async () => {
        const wrapper = mountHeader()
        scrollTo(200)
        await wrapper.vm.$nextTick()

        scrollTo(0)
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.header').exists()).toBe(false)
    })

    it('asks to open the login panel when the access button is clicked', async () => {
        const wrapper = mountHeader()
        scrollTo(200)
        await wrapper.vm.$nextTick()

        await wrapper.get('.header__access').trigger('click')

        expect(wrapper.emitted('abrir-acceso')[0]).toEqual(['login'])
    })

    it('stops listening to the scroll when it is removed', () => {
        const removeListener = vi.spyOn(window, 'removeEventListener')
        const wrapper = mountHeader()

        wrapper.unmount()

        expect(removeListener).toHaveBeenCalledWith('scroll', expect.any(Function))
        removeListener.mockRestore()
    })
})
