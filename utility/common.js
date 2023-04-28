import { expect} from '@playwright/test';

export async function clickElement(page,locator)
{
  await page
    .waitForSelector(locator),
  await page
    .locator(locator).click() 
}

export async function inputTextBasedPlaceholder(page,placeholdertext,inputtet)
{
  await page
    .getByPlaceholder(placeholdertext)
    .fill(inputtet);
}

export async function verifyText(page,locator,text)
{
  await page
    .waitForSelector(locator);
  const textContent=  await page
    .locator(locator).textContent()
    console.log(textContent)
    expect(textContent).toEqual(text)

}