import { test, expect } from '@playwright/test';
import { loginToMatrackDashboard } from './utils/new_login_dashboard_matrack_HT';

test('DEVICES HISTORICALLY AT A LOCATION', async ({ page }) => {
  // Set timeout for the entire test
  test.setTimeout(480000); // 8 minutes for the entire test
  
  // Perform login using the utility function
  await loginToMatrackDashboard(page);

  // Wait for the dashboard to be fully loaded
  await page.waitForTimeout(30000);

  // Navigate to Device Historically at a Location with better error handling
  console.log('Attempting to navigate to Device Historically at a Location...');
  
  // First hover over Reports menu to expand it
  console.log('Select Section of Device Historically at a Location...');
  // adding details to create LandMark
  await page.locator('.divSearchDeviceWithinAddress .txtSearchAddress').fill('San Ramon, CA, United States');
  //wait for 2 seconds and click on bottom arrow key to select the address from dropdown
  await page.waitForTimeout(2000);
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(2000);
  await page.keyboard.press('Enter');

  await page.locator('.divSearchDeviceWithinAddress .txtRadius').fill('350');

  await page.waitForTimeout(2000);
  // Generate Report
  await page.locator('.divSearchDeviceWithinAddress .submit').click();

  // add wait time of maximum 5 minutes 
  await page.waitForTimeout(300000);
  
  // Check sorting for specific columns once table is loaded
  console.log('Checking column sorting...');

  // Name column
  await page.locator('.secDeviceInAddress #tblDevicesInAddress th:has-text("Name")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secDeviceInAddress #tblDevicesInAddress th:has-text("Name")').click();
  await page.waitForTimeout(2000);

  // Imei column
  await page.locator('.secDeviceInAddress #tblDevicesInAddress th:has-text("Imei")').click();
  await page.waitForTimeout(2000);
  await page.locator('.secDeviceInAddress #tblDevicesInAddress th:has-text("Imei")').click();
  await page.waitForTimeout(2000);
 
  // Address In Location column
  const mostRecent = page.locator('#tblDevicesInAddress th')
    .filter({ hasText: /^Address In Location$/ });
  await mostRecent.first().click();
  await page.waitForTimeout(2000);
  await mostRecent.first().click();
  await page.waitForTimeout(2000);

  // Address In Date Time column
  const secondMostRecent = page.locator('#tblDevicesInAddress th')
    .filter({ hasText: /^Address In Date Time$/ });
  await secondMostRecent.first().click();
  await page.waitForTimeout(2000);
  await secondMostRecent.first().click();
  await page.waitForTimeout(2000);

  // // Last Ping column
  // const thirdMostRecent = page.locator('#tblDevicesInAddress th')
  //   .filter({ hasText: /^Last Ping$/ });
  // await thirdMostRecent.first().click();
  // await page.waitForTimeout(2000);
  // await thirdMostRecent.first().click();
  // await page.waitForTimeout(2000);


  // // Speed column
  // await page.locator('.secDeviceInAddress #tblTrackReport th:has-text("Speed")').click();
  // await page.waitForTimeout(2000);
  // await page.locator('.secDeviceInAddress #tblTrackReport th:has-text("Speed")').click();
  // await page.waitForTimeout(2000);

  

  // // Contract Status column
  // await page.locator('#divAllDeviceCurrentLocation #tblAllDeviceReport th:has-text("Contract Status")').click();
  // await page.waitForTimeout(2000);
  // await page.locator('#divAllDeviceCurrentLocation #tblAllDeviceReport th:has-text("Contract Status")').click();
  // await page.waitForTimeout(2000);

  // // Contract# column
  // await page.locator('#divAllDeviceCurrentLocation #tblAllDeviceReport th:has-text("Contract#")').click();
  // await page.waitForTimeout(2000);
  // await page.locator('#divAllDeviceCurrentLocation #tblAllDeviceReport th:has-text("Contract#")').click();
  // await page.waitForTimeout(2000);

  // check page limit is working
  const pageLimit = page.locator('.secDeviceInAddress  select[name="tblDevicesInAddress_length"]');
  await pageLimit.selectOption('25');
  await page.waitForTimeout(5000);
  // Change page limit to 10 again
  await pageLimit.selectOption('10');

  //check search box is working
  const searchInput2 = page.locator('.secDeviceInAddress #tblDevicesInAddress_filter input[type="search"]');
  await searchInput2.fill('868038074418303');
  await page.waitForTimeout(1000);
  // to clear search box
  await searchInput2.press('Control+a');
  await searchInput2.press('Delete');
  await page.waitForTimeout(1000);
  
  

  // //check pagination is working
  // const pagination = page.locator('#divAllDeviceCurrentLocation #tblAllDeviceReport_paginate li.page-item');
  // for (const page of pagination) {
  //   await page.click();
  //   await page.waitForTimeout(1000);
  // }

  // //check export buttons "Excel", "PDF", "CSV" is working
  // const exportButtons = page.locator('#divAllDeviceCurrentLocation button:has-text("Excel"), button:has-text("PDF"), button:has-text("CSV")');
  // for (const button of exportButtons) {
  //   await button.click();
  //   await page.waitForTimeout(1000);
  // }
});