import { expect} from '@playwright/test';
import * as action from '../utility/common'


export async function checkReturnAndDepartureOnHomePage(page)
{
  const departing = await page.locator('label[for="departing"]').textContent()
  const returning = await page.locator('label[for="returning"]').textContent()
  expect(departing).toEqual('Departing')
  expect(returning).toEqual('Returning')
  console.log(departing)
  console.log(returning)

}

export async function checkDepartureLisForDecemberAndJuly(page)
{
    await  page.locator('#departing').click()
    const departureOption =  await page.locator('#departing>option').count()
    console.log(departureOption)
    const departureMonth = ['Select...','July','December','July (next year)','December (next year)','July (two years from now)','December (two years from now)']
    for(let i =0 ; i<departureOption;i++)
    {
    const selectors =  await page.locator('#departing>option').nth(i).textContent()
    expect(departureMonth.includes(selectors)).toBe(true);

    }
}

export async function selectOption(page,locator,optionValue)
{
    await page.getByRole('combobox', { name: locator }).selectOption(optionValue);
    await page.getByText(locator).click();
}



export async function clickSearchButton(page)
{
   await action.clickElement(page,'input[value="Search"]')
}



export async function selectValuesAndClick(page,departureLocator,returnLocator,departureValue,returningValue)
{

    await  action.clickElement(page,departureLocator)
    await this.selectOption(page,'Departing',departureValue)
    await  action.clickElement(page,returnLocator)
    await this.selectOption(page,'Returning',returningValue)
    
}


export async function verifyTextBookTicket()
{
    const bookTicket = await page.locator('#content > form > h3').textContent()
    await action.verifyText(page,bookTicket,'Book a ticket to the red planet now!')
}

export async function clickBookTicketText()
{   await this.verifyTextBookTicket(page)
    await page.getByRole('heading', { name: 'Book a ticket to the red planet now!' }).click();
}

export async function clickMarsAirLogo()
{
    await page.getByRole('link', { name: 'MarsAir' }).click();
    const checkHomePage = await page.locator('#content > h2').textContent()
     await action.verifyText(page,checkHomePage,'Welcome to MarsAir!')
}