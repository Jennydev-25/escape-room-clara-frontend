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
