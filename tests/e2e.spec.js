

import {expect, test } from '@playwright/test';
import  * as Homepage from '../pages/home.page'


test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running Test ${testInfo.title}`);
  await page.goto('',{ waitUntil: 'networkidle' })
  
});
test('Should there should be departure and return field on search form ', async ({ page }) => {
   await  Homepage.checkReturnAndDepartureOnHomePage(page)
});

test('Should validate there will be no other month apart from july and december  ', async ({ page }) => {
   await Homepage.checkDepartureLisForDecemberAndJuly(page)
 });
test('Should validate message when seats are available ', async ({ page }) => {
  await Homepage.validateSeatAvailableMessage(page)
});

test('Should validate message when combination invalid  ', async ({ page }) => {
    await Homepage.validateInvalidCombination(page)
  });

test('Should validate message when no value selected in departure ', async ({ page }) => {
    await Homepage.validateMessageNoValueSelectedInDeparture(page)
    await Homepage.clickSearchButton(page)
  });

  test('Should validate message when no value selected in return ', async ({ page }) => {
    await Homepage.validateMessageNoValueSelectedInReturn(page)
    await Homepage.clickSearchButton(page)
  });

  test('Should validate message when no value selected in departure and return ', async ({ page }) => {
    await Homepage.validateMessageNoValue(page)
    await Homepage.clickSearchButton(page)
  });

  test.only('Should validate message when customer enter invalid Promo code ', async ({ page }) => { 
    await Homepage.enterPromoCode(page,)
  });

  test('Should validate message when customer enter 10% Discount  Promo code ', async ({ page }) => {
    await Homepage.enterPromoCode(page,'AF1-FJK-001')
    await Homepage.verifyValidPromoCodeMessage(page,'AF1-FJK-001','10%')
  });

  test('Should validate message when customer enter 90% Discount  Promo code ', async ({ page }) => {  
    await Homepage.enterPromoCode(page,'AF9-FJK-009')
    await Homepage.verifyValidPromoCodeMessage(page,'AF1-FJK-001','90%')
  });

  test('Should validate message when customer enter all numbers  Promo code ', async ({ page }) => {  
    await Homepage.enterPromoCode(page,'456-123-005')
    await Homepage.verifyInvalidPromoCodeMessage(page,'456-123-005')
  });

  test('Should validate message when customer enter all special characters Promo code ', async ({ page }) => {  
    await Homepage.enterPromoCode(page,'456-123-005')
    await Homepage.verifyInvalidPromoCodeMessage(page,'456-123-005')
  });

  test('Should validate message when customer enters promotional code with incorrect discount percentage', async ({ page }) => {  
    await Homepage.enterPromoCode(page,'X7C-MNO-789')
    await Homepage.verifyInvalidPromoCodeMessage(page,'X7C-MNO-789')
  });

  test('Should validate message when customer enters promotional code with incorrect check digit', async ({ page }) => {  
    await Homepage.enterPromoCode(page,'X2B-PQR-123')
    await Homepage.verifyInvalidPromoCodeMessage(page,'X2B-PQR-123')
  });

  test('Should validate message when customer enters promotional code with incorrect format', async ({ page }) => {  
    await Homepage.enterPromoCode(page,'XYZ-123-ABC')
    await Homepage.verifyInvalidPromoCodeMessage(page,'XYZ-123-ABC')
  });

  test('Should validate message when customer enters promotional code with extra characters', async ({ page }) => {  
    await Homepage.enterPromoCode(page,'AF1-FJK-001D')
    await Homepage.verifyInvalidPromoCodeMessage(page,'AF1-FJK-001D')

  });

  test('Should validate message when customer enter promotional code with less characters less than 9 character', async ({ page }) => {  
    await Homepage.enterPromoCode(page,'AF1-FJK-00')
    await Homepage.verifyInvalidPromoCodeMessage(page,'AF1-FJK-00')

  });


  test('Should customer cans search seat with 1 year difference ', async ({ page }) => {  
      await Homepage.selectReturnAndDepartureValues(page,'#departing','#returning','0','2')
      await Homepage.clickSearchButton(page)
  });


  test('Should  Error message when customer Search for a trip with a return date before the departure date', async ({ page }) => {  
    await Homepage.selectReturnAndDepartureValues(page,'#departing','#returning','5','2')
    await Homepage.clickSearchButton(page)
  });

  test('Should verify navigation when customer click on  Book a ticket to the red planet now', async ({ page }) => {  
    await Homepage.clickBookTicketText(page);
  });

  test('Should  verify navigation when customer click on marks air logo from the flight search page', async ({ page }) => {  
     await Homepage.clickMarsAirLogo(page)
     
  });

  test('Should  verify navigation when customer click on marks air logo from the  search result page', async ({ page }) => {  
    await Homepage.selectReturnAndDepartureValues(page,'#departing','#returning','0','5')
    await Homepage.clickMarsAirLogo(page)
  });



