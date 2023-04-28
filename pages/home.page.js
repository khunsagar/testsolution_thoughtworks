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

export async function verifyTextOnSearchResultPage(page)
{
    await action.verifyText(page,'#content > h2','Search Results')
    await action.verifyText(page,'p>a',' Back')
}
export async function validateSeatAvailableText(page)
{
    await this.verifyTextOnSearchResultPage(page)
    await this.verifyCommonMessageOnSearchResultPage(page)
   
}

export async function verifyCommonMessageOnSearchResultPage(page)
{
    await action.verifyText(page,'#content > p:nth-child(2)','Seats available!')
    await action.verifyText(page,'#content > p:nth-child(3)','Call now on 0800 MARSAIR to book!')
}

export async function selectValuesAndClick(page,departureLocator,returnLocator,departureValue,returningValue)
{

    await  action.clickElement(page,departureLocator)
    await this.selectOption(page,'Departing',departureValue)
    await  action.clickElement(page,returnLocator)
    await this.selectOption(page,'Departing',returningValue)
    await  this.clickSearchButton(page)

}
export async function validateNoSeatAvailableMessage(page)
{

    await this.selectReturnAndDepartureValues(page,'#departing','#returning','0','3')
    await  this.clickSearchButton(page)
    await this.validateNoSeatAvailableText(page)

}

export async function validateSeatAvailableMessage(page)
{
    await this.selectReturnAndDepartureValues(page,'#departing','#returning','0','5')
    await  this.clickSearchButton(page)
    await  this.validateSeatAvailableText(page)
} 

export async function validateInvalidCombination(page)
{
    await this.selectReturnAndDepartureValues(page,'#departing','#returning','0','1')
    await  this.clickSearchButton(page)
    await this.validateInvalidCombinationMessage(page)

}

export async function validateNoSeatAvailableText(page)
{
    await this.verifyTextOnSearchResultPage(page)
    await action.verifyText(page,'#content > p:nth-child(2)','Sorry, there are no more seats available.')
    
}

export async function validateInvalidCombinationMessage(page)
{
    await this.verifyTextOnSearchResultPage(page)
    await action.verifyText(page,'#content > p:nth-child(2)','Unfortunately, this schedule is not possible. Please try again.')    
}

export async function validateMessageNoValueSelectedInDeparture(page)
{
    await this.selectReturnAndDepartureValues(page,'#departing','#returning','','5')
    await  this.clickSearchButton(page)
}

export async function validateMessageNoValueSelectedInReturn(page)
{
    await this.selectReturnAndDepartureValues(page,'#departing','#returning','0','')

}

export async function validateMessageNoValue(page)
{
    await this.selectReturnAndDepartureValues(page,'#departing','#returning','','')

}

export async function enterPromoCode(page,promocode)
{
    await this.selectReturnAndDepartureValues(page,'#departing','#returning','1','2')
    await page.getByLabel('Promotional Code').click();
    await page.getByLabel('Promotional Code').fill(promocode);
}

export async function verifyInvalidPromoCodeMessage(page,promocode)
{
    const codeMessage = "Sorry, code"+promocode+ "is not valid"
    await action.verifyText(page,'.promo_code',codeMessage)
    await this.validateSeatAvailableText(page)
}

export async function verifyValidPromoCodeMessage(page,promocode,discount)
{
    const codeMessage = "Promotional code " + promocode + " used: " + str(discount) + "discount!"
    await action.verifyText(page,'.promo_code',codeMessage)
    await this.validateSeatAvailableText(page)

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