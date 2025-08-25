import { test, expect } from '@playwright/test';
import { loginToMatrackDashboard } from './utils/new_login_dashboard_matrack_HT';

test('RE-ORDERS & SHIPPING', async ({ page }) => {
  // Set timeout for the entire test
  test.setTimeout(600000); // 10 minutes for the entire test
  
  // Perform login using the utility function
  await loginToMatrackDashboard(page);

  // Wait for the dashboard to be fully loaded
  await page.waitForTimeout(60000);

  // Navigate to Location History with better error handling
  console.log('Attempting to navigate to RE-ORDERS & SHIPPING...');
  
  // Try multiple selectors to find and click the Geofencing menu
  console.log('Attempting to click RE-ORDERS & SHIPPING menu...');
  const accountInfoMenuSelectors = [
    page.locator('a:has-text("RE-ORDERS & SHIPPING")'),
    page.getByRole('link', { name: 'RE-ORDERS & SHIPPING' }),
    page.locator('#aReorderShipment'),
    page.locator('.nav-item:has-text("RE-ORDERS & SHIPPING")')
  ];

  let accountInfoMenuClicked = false;
  for (const selector of accountInfoMenuSelectors) {
    try {
      await selector.waitFor({ state: 'visible', timeout: 60000 });
      await selector.click();
      console.log('Successfully clicked RE-ORDERS & SHIPPING menu');
      accountInfoMenuClicked = true;
      await page.waitForTimeout(60000); // Wait for menu animation
      break;
    } catch (e) {
      console.log(`RE-ORDERS & SHIPPING menu selector failed: ${e.message}`);
      continue;
    }
  }

  if (!accountInfoMenuClicked) {
    throw new Error('Failed to click RE-ORDERS & SHIPPING menu');
  }


  // Wait for All Unit Current Status page to load
  console.log('Waiting for RE-ORDERS & SHIPPING page to load...');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(60000); // Wait for menu animation
  
  // Check sorting for specific columns
  console.log('Checking column sorting...');
  /*
  // Unit column
  await page.locator('.secDealershipLandmarkShipment #tbldevicesTable th:has-text("Name")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secDealershipLandmarkShipment #tbldevicesTable th:has-text("Name")').click();
  await page.waitForTimeout(2000);

  // Last Activity column
  await page.locator('.secDealershipLandmarkShipment #tbldevicesTable th:has-text("IMEI")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secDealershipLandmarkShipment #tbldevicesTable th:has-text("IMEI")').click();
  await page.waitForTimeout(2000);

  // Location column
  await page.locator('.secDealershipLandmarkShipment #tbldevicesTable th:has-text("Device Type")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secDealershipLandmarkShipment #tbldevicesTable th:has-text("Device Type")').click();
  await page.waitForTimeout(2000);

  // Motion Status column
  await page.locator('.secDealershipLandmarkShipment #tbldevicesTable th:has-text("Added On")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secDealershipLandmarkShipment #tbldevicesTable th:has-text("Added On")').click();
  await page.waitForTimeout(2000);

  // Battery column  
  await page.locator('.secDealershipLandmarkShipment #tbldevicesTable th:has-text("Notes")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secDealershipLandmarkShipment #tbldevicesTable th:has-text("Notes")').click();
  await page.waitForTimeout(2000);

  
  const searchInput = page.locator('.secDealershipLandmarkShipment input[type="search"]');
  await searchInput.fill('1085 Asset');
  await page.waitForTimeout(2000);
  //clear the search box
  await searchInput.fill('');
  await page.waitForTimeout(2000);
  
  // check page limit is working
  const pageLimit = page.locator('.secDealershipLandmarkShipment select[name="tbldevicesTable_length"]');
  await pageLimit.selectOption('25');
  await page.waitForTimeout(2000);
  await pageLimit.selectOption('10');
  await page.waitForTimeout(2000);

  //check pagination is working
   console.log('Testing pagination...');
   const paginationButtons = page.locator('.secDealershipLandmarkShipment #tbldevicesTable_paginate li.page-item a');
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
  const exportButtons = page.locator('.secDealershipLandmarkShipment a.buttons-excel, .secDealershipLandmarkShipment a.buttons-csv, .secDealershipLandmarkShipment a.buttons-pdf');
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
 */
   //add wait time of 10 seconds 
   await page.waitForTimeout(10000);//check pagination is working
  
});