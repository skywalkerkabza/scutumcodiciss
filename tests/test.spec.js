const { test, expect } = require('@playwright/test');

test.describe('Scutum Codicis Website Tests', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://codicis.vercel.app/');
  });

  test('Navbar links are visible', async () => {
    await expect(page.locator('nav#navbar')).toBeVisible();
    await expect(page.locator('a[href="#home"]')).toBeVisible();
    await expect(page.locator('a[href="#what"]:has-text("What")')).toBeVisible(); // Specific selector for the "What" link
    await expect(page.locator('a[href="#who"]')).toBeVisible();
    await expect(page.locator('a[href="#contacts"]')).toBeVisible();
  });

  test('Showcase section is visible with correct text', async () => {
    await expect(page.locator('header#showcase')).toBeVisible();
    await expect(page.locator('header#showcase')).toContainText('Elevate Your Software\'s Integrity');
    await expect(page.locator('header#showcase')).toContainText('Scutum Codicis(Shield of the Code) ensures');
  });

  test('What We Do section is visible with correct content', async () => {
    await expect(page.locator('section#what')).toBeVisible();
    await expect(page.locator('section#what')).toContainText('What We Do');
    await expect(page.locator('section#what')).toContainText('Banking Software Testing');
    await expect(page.locator('section#what')).toContainText('Financial Assessment Management');
  });

  test('Main Website Test', async () => {
    // Verify Page Title
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Scutum Codicis Pty(LTD) | Software Testing for Finance & Banking');

    // Click "Elevate Your Software's Integrity" button
    await page.locator('text=Elevate Your Software\'s Integrity Scutum Codicis(Shield of the Code) ensures').click();

    // Assert "What We Do" heading text
    const whatWeDoHeading = await page.locator('.l-heading');
    await expect(whatWeDoHeading).toBeVisible();
    const headingText = await whatWeDoHeading.textContent();
    expect(headingText).toContain("Elevate Your Software's Integrity"); 

    // Click "Clients" section
    await page.locator('#clients').click();

    // Assert presence of client logos
    const clientLogos = await page.locator('.items img');
   // await expect(clientLogos.count()).toBeGreaterThan(0); // Check for at least one logo

    // Click "Contact Us" section
    await page.locator('text=Contact Us Please use the form below to contact us:').click();

    // Assert visibility of contact form
    const contactForm = await page.locator('.contact-form form');
    await expect(contactForm).toBeVisible();

    // Additional Assertions for Form Elements
    const nameInput = await page.locator('#name');
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveAttribute('type', 'text');  // Check for input type

    const emailInput = await page.locator('#email');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('type', 'email');  // Check for input type
  });

  test('Footer is visible with correct copyright information', async () => {
    await expect(page.locator('footer.main-footer')).toBeVisible();
    await expect(page.locator('footer.main-footer')).toContainText('2024 Scutum Codicis Pty(LTD). All Rights Reserved');
  });

  test.afterEach(async () => {
    await page.close();
  });
});
