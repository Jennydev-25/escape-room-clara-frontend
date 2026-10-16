import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import ResumenView from '@/views/user/ResumenView.vue'

// monta el resumen con los servicios que se le indiquen
const mountResumen = (services = {}) => mount(ResumenView, {
    global: {
        plugins: [router, createPinia()],
        provide: {
            AuthService: { logout: vi.fn() },
            UserService: { getProfile: vi.fn().mockResolvedValue({ getAlias: () => 'jugador_01' }) },
            ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 1, getTimeSpentSeconds: () => 0 }) },
            FolderService: { listFolders: vi.fn().mockResolvedValue([]) },
            ...services,
        },
    },
})

describe('ResumenView', () => {
    it('shows the real alias of the player in the greeting', async () => {
        const wrapper = mountResumen({ UserService: { getProfile: vi.fn().mockResolvedValue({ getAlias: () => 'marta_v' }) } })
        await flushPromises()

        expect(wrapper.text()).toContain('Hola de nuevo, marta_v')
    })

    it('shows the real alias of the player in the header', async () => {
        const wrapper = mountResumen({ UserService: { getProfile: vi.fn().mockResolvedValue({ getAlias: () => 'marta_v' }) } })
        await flushPromises()

        expect(wrapper.get('.dashboard-header__alias').text()).toBe('marta_v')
    })

    it('renders the resumen subtitle', () => {
        const wrapper = mountResumen()

        expect(wrapper.text()).toContain('Aquí tienes un resumen de tu progreso en el caso. El portátil de Clara guardará todo lo que vayas reconstruyendo.')
    })

    it('marks "Resumen" as the active section in the sidebar', async () => {
        useAuthStore().setSession('jwt-token', 'refresh-token')
        await router.push('/resumen')

        const wrapper = mountResumen()

        const activeLink = wrapper.find('[aria-current="page"]')
        expect(activeLink.text()).toBe('Resumen')
    })

    it('renders the case summary card heading', () => {
        const wrapper = mountResumen()

        expect(wrapper.text()).toContain('Sumario de la investigación')
        expect(wrapper.text()).toContain('Comenzar investigación')
        expect(wrapper.text()).toContain('Pendiente de inicio')
    })

    it('renders the chapter progress row', () => {
        const wrapper = mountResumen()

        expect(wrapper.text()).toContain('Capítulo 0 de 17')
        expect(wrapper.text()).toContain('0% completado')
    })

    it('shows the chapter the player is in and the percentage completed', async () => {
        const wrapper = mountResumen({ ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 5, getTimeSpentSeconds: () => 0 }) } })
        await flushPromises()

        expect(wrapper.text()).toContain('Capítulo 5 de 17')
        expect(wrapper.text()).toContain('24% completado')
    })

    it('starts the first chapter without any percentage once the player has spent time in the case', async () => {
        const wrapper = mountResumen({ ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 1, getTimeSpentSeconds: () => 30 }) } })
        await flushPromises()

        expect(wrapper.text()).toContain('Capítulo 1 de 17')
        expect(wrapper.text()).toContain('0% completado')
    })

    it('moves to the second chapter with the first one completed when the player solves the first puzzle', async () => {
        const wrapper = mountResumen({ ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 2, getTimeSpentSeconds: () => 60 }) } })
        await flushPromises()

        expect(wrapper.text()).toContain('Capítulo 2 de 17')
        expect(wrapper.text()).toContain('6% completado')
    })

    it('fills the progress bar according to the percentage completed', async () => {
        const wrapper = mountResumen({ ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 5, getTimeSpentSeconds: () => 0 }) } })
        await flushPromises()

        expect(wrapper.get('.resumen-view__progress-bar div').attributes('style')).toContain('width: 24%')
    })

    it('shows 100% and the last chapter when the player has solved all the chapters', async () => {
        const wrapper = mountResumen({ ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 18, getTimeSpentSeconds: () => 0 }) } })
        await flushPromises()

        expect(wrapper.text()).toContain('Capítulo 17 de 17')
        expect(wrapper.text()).toContain('100% completado')
    })

    it('shows the time spent in the case as hours, minutes and seconds', async () => {
        const wrapper = mountResumen({ ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 1, getTimeSpentSeconds: () => 3725 }) } })
        await flushPromises()

        expect(wrapper.text()).toContain('01:02:05')
    })

    it('keeps two digits for each part of the time spent', async () => {
        const wrapper = mountResumen({ ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 1, getTimeSpentSeconds: () => 59 }) } })
        await flushPromises()

        expect(wrapper.text()).toContain('00:00:59')
    })

    it('shows the last folder the player has unlocked as the active one', async () => {
        const folders = [{ getName: () => '00_LEEME' }, { getName: () => '01_TOMAS' }]
        const wrapper = mountResumen({
            FolderService: { listFolders: vi.fn().mockResolvedValue(folders) },
            ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 2, getTimeSpentSeconds: () => 0 }) },
        })
        await flushPromises()

        expect(wrapper.text()).toContain('Carpeta activa01_TOMAS')
    })

    it('shows no active folder while the case has not started, even with the first folder unlocked', async () => {
        const folders = [{ getName: () => '00_LEEME' }]
        const wrapper = mountResumen({ FolderService: { listFolders: vi.fn().mockResolvedValue(folders) } })
        await flushPromises()

        expect(wrapper.text()).toContain('Carpeta activaNinguna')
    })

    it('shows the first folder as the active one once the player has spent time in the case', async () => {
        const folders = [{ getName: () => '00_LEEME' }]
        const wrapper = mountResumen({
            FolderService: { listFolders: vi.fn().mockResolvedValue(folders) },
            ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 1, getTimeSpentSeconds: () => 30 }) },
        })
        await flushPromises()

        expect(wrapper.text()).toContain('Carpeta activa00_LEEME')
    })

    it('marks the case as in progress when the player has solved a chapter', async () => {
        const wrapper = mountResumen({ ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 3, getTimeSpentSeconds: () => 0 }) } })
        await flushPromises()

        expect(wrapper.text()).toContain('En progreso')
        expect(wrapper.text()).not.toContain('Pendiente de inicio')
    })

    it('marks the case as in progress when the player has spent time in the first chapter', async () => {
        const wrapper = mountResumen({ ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 1, getTimeSpentSeconds: () => 30 }) } })
        await flushPromises()

        expect(wrapper.text()).toContain('En progreso')
    })

    it('marks the case as finished in green when the player has solved all the chapters', async () => {
        const wrapper = mountResumen({ ProgressService: { getProgress: vi.fn().mockResolvedValue({ getCurrentChapter: () => 18, getTimeSpentSeconds: () => 0 }) } })
        await flushPromises()

        const badge = wrapper.get('.resumen-view__case-badge')
        expect(badge.text()).toBe('Finalizado')
        expect(badge.classes()).toContain('text-success')
    })

    it('renders the case info tiles', () => {
        const wrapper = mountResumen()

        expect(wrapper.text()).toContain('Tiempo en el caso')
        expect(wrapper.text()).toContain('00:00:00')
        expect(wrapper.text()).toContain('Carpeta activa')
        expect(wrapper.text()).toContain('Ninguna')
    })

    it('renders the start investigation button', () => {
        const wrapper = mountResumen()

        const button = wrapper.findAll('button').find((b) => b.text().includes('Comenzar'))
        expect(button.exists()).toBe(true)
    })

    it('goes to the game desktop when the start button is clicked', async () => {
        const push = vi.spyOn(router, 'push').mockResolvedValue()
        const wrapper = mountResumen()

        const button = wrapper.findAll('button').find((b) => b.text().includes('Comenzar'))
        await button.trigger('click')

        expect(push).toHaveBeenCalledWith('/escritorio')
        push.mockRestore()
    })
})
