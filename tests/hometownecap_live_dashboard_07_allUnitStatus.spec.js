import { test, expect } from '@playwright/test';
import { loginToMatrackDashboard } from './utils/new_login_dashboard_matrack_HT';

test('All Unit Current Status Report', async ({ page }) => {
  // Set timeout for the entire test
  test.setTimeout(600000); // 10 minutes for the entire test
  
  // Perform login using the utility function
  await loginToMatrackDashboard(page);

  // Wait for the dashboard to be fully loaded
  await page.waitForTimeout(30000);

  // Navigate to Location History with better error handling
  console.log('Attempting to navigate to All Unit Current Status...');
  
  // First hover over Reports menu to expand it
 /*
  console.log('Hovering over Reports menu...');
  const reportsMenu = page.locator('a:has-text("Reports")');
  await reportsMenu.hover();
  await page.waitForTimeout(2000); // Wait for menu animation
 */
  // Then click on "All Unit Current Status" link
  console.log('Clicking All Unit Current Status...');
  const allUnitStatus = page.locator('.aViewAllUnits').first();
  await allUnitStatus.click();
  await page.waitForTimeout(30000);

  // Wait for All Unit Current Status page to load
  console.log('Waiting for All Unit Current Status page to load...');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000); // Wait for menu animation
  
  // Check sorting for specific columns
  console.log('Checking column sorting...');
  
  // Unit column
  await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Unit")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Unit")').click();
  await page.waitForTimeout(2000);

  // Last Activity column
  await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Last Activity")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Last Activity")').click();
  await page.waitForTimeout(2000);

  // Location column
  await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Location")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Location")').click();
  await page.waitForTimeout(2000);

  // Motion Status column
  await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Motion Status")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Motion Status")').click();
  await page.waitForTimeout(2000);

  // Battery column  
  await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Battery")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Battery")').click();
  await page.waitForTimeout(2000);

  // // Dealership column
  // await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Dealership")').click();
  // await page.waitForTimeout(2000);
  // await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Dealership")').click();
  // await page.waitForTimeout(2000);

  // // Contract Status column
  // await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Contract Status")').click();
  // await page.waitForTimeout(2000);
  // await page.locator('.secViewAllUnits #tblAllDeviceReport th:has-text("Contract Status")').click();
  // await page.waitForTimeout(2000);

  // // Contract# column
  // await page.locator('#divAllDeviceCurrentLocation #tblAllDeviceReport th:has-text("Contract#")').click();
  // await page.waitForTimeout(2000);
  // await page.locator('#divAllDeviceCurrentLocation #tblAllDeviceReport th:has-text("Contract#")').click();
  // await page.waitForTimeout(2000);
  
  // check page limit is working
  const pageLimit = page.locator('.secViewAllUnits select[name="tblAllDeviceReport_length"]');
  await pageLimit.selectOption('25');
  await page.waitForTimeout(1000);
  await pageLimit.selectOption('10');
  await page.waitForTimeout(1000);
  
  //check search box is working
  const searchInput = page.locator('.secViewAllUnits input[type="search"]');
  await searchInput.fill('BE1620L -822042');
  await page.waitForTimeout(1000);
  await searchInput.fill('');
  await page.waitForTimeout(1000);

  //check pagination is working
  console.log('Testing pagination...');
  const paginationButtons = page.locator('.secViewAllUnits #tblAllDeviceReport_paginate li.page-item a');
  const paginationCount = await paginationButtons.count();
  
  if (paginationCount > 0) {
    console.log(`Found ${paginationCount} pagination buttons`);
    for (let i = 0; i < Math.min(paginationCount, 3); i++) { // Test first 3 pages to avoid long test
      const button = paginationButtons.nth(i);
      const isDisabled = await button.evaluate(el => el.classList.contains('disabled') || el.parentElement.classList.contains('disabled'));
      
      if (!isDisabled) {
        console.log(`Clicking pagination button ${i + 1}`);
        await button.click();
        await page.waitForTimeout(2000); // Wait for page to load
      }
    }
  } else {
    console.log('No pagination buttons found - table may have only one page');
  }

  //check export buttons "Excel", "PDF", "CSV" is working
  console.log('Testing export buttons...');
  const exportButtons = page.locator('.secViewAllUnits a.buttons-csv, .secViewAllUnits a.buttons-excel, .secViewAllUnits a.buttons-pdf');
  const exportCount = await exportButtons.count();
  
  if (exportCount > 0) {
    console.log(`Found ${exportCount} export buttons`);
    for (let i = 0; i < exportCount; i++) {
      const button = exportButtons.nth(i);
      const buttonText = await button.textContent();
      console.log(`Clicking export button: ${buttonText}`);
      await button.click();
      
      // Set different timeouts based on export type
      if (buttonText && buttonText.toLowerCase().includes('pdf')) {
        await page.waitForTimeout(120000); // 2 minutes for PDF
        console.log('PDF export completed (2 min timeout)');
      } else if (buttonText && (buttonText.toLowerCase().includes('csv') || buttonText.toLowerCase().includes('excel'))) {
        await page.waitForTimeout(15000); // 15 seconds for CSV and Excel
        console.log(`${buttonText} export completed (15 sec timeout)`);
      } else {
        await page.waitForTimeout(5000); // Default 5 seconds for unknown types
        console.log(`${buttonText} export completed (default timeout)`);
      }
    }
  } else {
    console.log('No export buttons found');
  }

  //add wait time of 10 seconds 
  await page.waitForTimeout(10000);//check pagination is working
  
});