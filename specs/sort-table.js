// REMOVE THE BELOW CODE BEFORE START THE EXERCISE
async function getArr(item){
    const itemProm = item.map(async (item) => {
        return await item.getText();
    });        
    return await Promise.all(itemProm);     
 }

 async function waitForSort(sort, field, timeOut = 3000) {
    await browser.waitUntil(
        async () => (sort === await $(`//*[@tabulator-field="${field}"][@role="columnheader"]`).getAttribute("aria-sort")),
        {
            timeout: timeOut,
            interval: 500,
            timeoutMsg: `expected field not found`            
        }        
    );
}

describe('Check app', function () {
    this.beforeAll('Should login', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $("#spinner").waitForDisplayed({ reverse: true, timeout: 5000 });
    });

    it('check id table', async function () {        
        await $(`//*[text()="Id"]`).click();
        await waitForSort('asc','id');        
        let items = await $$("//*[@tabulator-field='id'][@class ='tabulator-cell']");       
        const ascId = await getArr(items);        
        console.log(ascId);                   
        await $(`//*[text()="Id"]`).click();
        await waitForSort('desc','id');
        items = await $$("//*[@tabulator-field='id'][@class ='tabulator-cell']");
        const descId = await getArr(items);
        console.log(descId);

        expect(ascId.sort((a, b) => b - a)).toEqual(descId);
    });

    it('check name table', async function () {        
        await $(`//*[text()="Name"]`).click();
        await waitForSort('asc','name');        
        let items = await $$("//*[@tabulator-field='name'][@class ='tabulator-cell']");
        const ascName = await getArr(items); 
        console.log(ascName);         
        await $(`//*[text()="Name"]`).click();
        await waitForSort('desc','name');
        items = await $$("//*[@tabulator-field='name'][@class ='tabulator-cell']");
        const descName = await getArr(items);          
        console.log(descName);
         
        expect(ascName.sort().reverse()).toEqual(descName); 
    });

    it('check age table', async function () {        
        await $(`//*[text()="Age"]`).click();
        await waitForSort('asc','age'); 
        let items = await $$("//*[@tabulator-field='age'][@class ='tabulator-cell']"); 
        const ascAge = await getArr(items);
        console.log(ascAge);         
        await $(`//*[text()="Age"]`).click();
        await waitForSort('desc','age');
        items = await $$("//*[@tabulator-field='age'][@class ='tabulator-cell']"); 
        const descAge = await getArr(items);        
        console.log(descAge);
        
        expect(ascAge.sort((a, b) => b - a)).toEqual(descAge);  
    });
});   
                
        
         





