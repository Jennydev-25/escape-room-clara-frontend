import { afterEach, beforeEach, vi } from "vitest";
import { enableAutoUnmount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

Object.defineProperty(window, "matchMedia", {
    writable: true,
    enumerable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

gsap.registerPlugin(ScrollTrigger)

beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
})

enableAutoUnmount(afterEach)
