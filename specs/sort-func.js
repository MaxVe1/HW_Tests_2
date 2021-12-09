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

async function checkForSorts(sort, arr1, arr2 ){   
            switch(sort){            
            case 'asc':                               
                expect(arr2.sort((a, b) => a - b)).toEqual(arr1);
                break;             
            case 'desc':
                if(isNaN(Number(arr1[0]))) {
                expect(arr2.sort().reverse()).toEqual(arr1)
                }else{                 
                expect(arr2.sort((a, b) => b - a)).toEqual(arr1)
                }                   
                break;      
                     
            default: throw new Error(`Wrong values`); 
        }         
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
        const arrCopy = Array.from(ascId);
        await checkForSorts('asc', ascId, arrCopy )

        await $(`//*[text()="Id"]`).click();
        await waitForSort('desc','id');
        items = await $$("//*[@tabulator-field='id'][@class ='tabulator-cell']");
        const descId = await getArr(items);
        await checkForSorts('desc', descId ,arrCopy);
        console.log(descId);        
    });

    it('check name table', async function () {        
        await $(`//*[text()="Name"]`).click();
        await waitForSort('asc','name');        
        let items = await $$("//*[@tabulator-field='name'][@class ='tabulator-cell']");
        const ascName = await getArr(items); 
        console.log(ascName);
        const arrCopy = Array.from(ascName);
        await checkForSorts('asc', ascName ,arrCopy);        
        await $(`//*[text()="Name"]`).click();
        await waitForSort('desc','name');
        items = await $$("//*[@tabulator-field='name'][@class ='tabulator-cell']");
        const descName = await getArr(items);
        console.log(descName);
        await checkForSorts('desc', descName,arrCopy);   
    });

    it('check age table', async function () {        
        await $(`//*[text()="Age"]`).click();
        await waitForSort('asc','age'); 
        let items = await $$("//*[@tabulator-field='age'][@class ='tabulator-cell']"); 
        const ascAge = await getArr(items);
        console.log(ascAge);
        const arrCopy = Array.from(ascAge);
        await checkForSorts('asc', ascAge ,arrCopy);         
        await $(`//*[text()="Age"]`).click();
        await waitForSort('desc','age');
        items = await $$("//*[@tabulator-field='age'][@class ='tabulator-cell']"); 
        const descAge = await getArr(items);
        console.log(descAge);
        await checkForSorts('desc', descAge , arrCopy);    
    });
});   
                
        
         





