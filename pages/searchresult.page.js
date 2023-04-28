import { expect} from '@playwright/test';
import * as action from '../utility/common'

export async function verifyTextOnSearchResultPage(page)
{
    await action.verifyText(page,'#content > h2','Search Results')
    await action.verifyText(page,'p>a',' Back')
    
}
export async function validateSeatAvailableText(page)
{
    await this.verifyTextOnSearchResultPage(page)
    await action.verifyText(page,'#content > p:nth-child(2)','Seats available!')
    await action.verifyText(page,'#content > p:nth-child(4)','Call now on 0800 MARSAIR to book!')
}


export async function verifyCommonMessageOnSearchResultPage(page)
{
    await action.verifyText(page,'#content > p:nth-child(2)','Seats available!')
    await action.verifyText(page,'#content > p:nth-child(3)','Call now on 0800 MARSAIR to book!')
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