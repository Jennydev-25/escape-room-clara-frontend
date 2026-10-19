import process from 'node:process'
import { test, expect } from '@playwright/test'

test.describe('home', () => {
  test('muestra el título del juego y el botón Investigar', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('h1')).toContainText('El último archivo de Clara')
    await expect(page.getByRole('button', { name: 'Investigar' })).toBeVisible()
  })

  test('no tiene scroll horizontal en este tamaño de pantalla', async ({ page }) => {
    await page.goto('/')

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )

    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('el botón Investigar abre el panel de acceso con el formulario', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Investigar' }).click()

    await expect(page.getByRole('dialog')).toBeVisible()
    await page.getByRole('tab', { name: 'Iniciar sesión' }).click()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Contraseña')).toBeVisible()
  })
})

test.describe('rutas protegidas', () => {
  for (const ruta of ['/perfil', '/resumen', '/escritorio']) {
    test(`${ruta} sin sesión devuelve a la home`, async ({ page }) => {
      await page.goto(ruta)

      await expect(page).toHaveURL('/')
    })
  }
})

// Flujo completo contra el backend real: solo se ejecuta si se pasan las credenciales de un jugador de prueba
test.describe('flujo del jugador', () => {
  test.skip(!process.env.E2E_EMAIL || !process.env.E2E_PASSWORD, 'Faltan E2E_EMAIL y E2E_PASSWORD')

  test('inicia sesión, ve su resumen y entra al escritorio de ClaraOS', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Investigar' }).click()
    await page.getByRole('tab', { name: 'Iniciar sesión' }).click()
    await page.getByLabel('Email').fill(process.env.E2E_EMAIL)
    await page.getByLabel('Contraseña').fill(process.env.E2E_PASSWORD)
    await page.getByRole('button', { name: 'Iniciar sesión' }).last().click()

    await expect(page).toHaveURL(/\/resumen/)
    await page.getByRole('button', { name: 'Comenzar' }).click()

    await expect(page).toHaveURL(/\/escritorio/)
    await expect(page.getByRole('heading', { name: 'Escritorio de ClaraOS', includeHidden: true })).toBeAttached()
  })
})
