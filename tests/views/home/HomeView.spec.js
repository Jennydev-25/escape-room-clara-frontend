import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/home/HomeView.vue'
import Header from '@/components/home/Header.vue'

const openPanel = vi.fn()

const HeroStub = defineComponent({
    setup(_, { expose }) {
        expose({ openPanel })
        return () => null
    },
})

const mountHomeView = () => mount(HomeView, {
    global: {
        stubs: { Header: true, Hero: HeroStub, Story: true, About: true, Contact: true, Footer: true },
    },
})

describe('HomeView', () => {
    beforeEach(() => {
        openPanel.mockClear()
        window.scrollTo = vi.fn()
    })

    it('plays the background video slowly', () => {
        const wrapper = mountHomeView()

        expect(wrapper.get('video').element.playbackRate).toBe(0.4)
    })

    it('goes back to the top and opens the access panel when the header asks for it', async () => {
        const wrapper = mountHomeView()

        wrapper.findComponent(Header).vm.$emit('abrir-acceso', 'register')

        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
        expect(openPanel).toHaveBeenCalledWith('register')
    })
})
