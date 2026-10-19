import './assets/styles/style.css'
import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

import App from './App.vue'
import AuthRepository from './core/apis/auth/AuthRepository'
import AuthService from './core/apis/auth/AuthService'
import ChatRepository from './core/apis/chat/ChatRepository'
import ChatService from './core/apis/chat/ChatService'
import ContactRepository from './core/apis/contact/ContactRepository'
import ContactService from './core/apis/contact/ContactService'
import EmailRepository from './core/apis/email/EmailRepository'
import EmailService from './core/apis/email/EmailService'
import FolderRepository from './core/apis/folder/FolderRepository'
import FolderService from './core/apis/folder/FolderService'
import ProgressRepository from './core/apis/progress/ProgressRepository'
import ProgressService from './core/apis/progress/ProgressService'
import PuzzleRepository from './core/apis/puzzle/PuzzleRepository'
import PuzzleService from './core/apis/puzzle/PuzzleService'
import SeenRepository from './core/apis/seen/SeenRepository'
import SeenService from './core/apis/seen/SeenService'
import StaticFileRepository from './core/apis/static-file/StaticFileRepository'
import StaticFileService from './core/apis/static-file/StaticFileService'
import TrashRepository from './core/apis/trash/TrashRepository'
import TrashService from './core/apis/trash/TrashService'
import UserRepository from './core/apis/user/UserRepository'
import UserService from './core/apis/user/UserService'
import router from './router'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

const app = createApp(App)

app.provide('AuthService', new AuthService(new AuthRepository()))
app.provide('ChatService', new ChatService(new ChatRepository()))
app.provide('ContactService', new ContactService(new ContactRepository()))
app.provide('EmailService', new EmailService(new EmailRepository()))
app.provide('FolderService', new FolderService(new FolderRepository()))
app.provide('ProgressService', new ProgressService(new ProgressRepository()))
app.provide('PuzzleService', new PuzzleService(new PuzzleRepository()))
app.provide('SeenService', new SeenService(new SeenRepository()))
app.provide('StaticFileService', new StaticFileService(new StaticFileRepository()))
app.provide('TrashService', new TrashService(new TrashRepository()))
app.provide('UserService', new UserService(new UserRepository()))

app.use(createPinia())
app.use(router)

app.mount('#app')

router.isReady().then(() => {
    nextTick(() => {
        ScrollTrigger.refresh()
    })
})

window.addEventListener('load', () => ScrollTrigger.refresh())
setTimeout(() => ScrollTrigger.refresh(), 1000)
