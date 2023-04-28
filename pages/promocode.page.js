import { expect} from '@playwright/test';
import * as action from '../utility/common'
import * as homepage from '../pages/home.page'



export async function enterPromoCode(page,promocode)
{
    await homepage.selectValuesAndClick(page,'#departing','#returning','0','5')
    await await page.locator('#promotional_code').fill(promocode);
}

export async function verifyInvalidPromoCodeMessage(page,promocode)
{
    const codeMessage = "Sorry, code "+ promocode + " is not valid"
    await action.verifyText(page,'.promo_code',codeMessage)
    
}

export async function verifyValidPromoCodeMessage(page,promocode,discount)
{
    const codeMessage = "Promotional code " + promocode + " used: " + discount + " discount!"
    await action.verifyText(page,'.promo_code',codeMessage)

}