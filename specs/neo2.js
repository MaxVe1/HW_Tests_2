// REMOVE THE BELOW CODE BEFORE START THE EXERCISE
async function getArr(item){
    const itemProm = item.map(async (item) => {
        return await item.getText();
    });        
    const arrS = await Promise.all(itemProm);
    return arrS;
 }

describe('Check app', function () {
    it('check table values', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
      
        await browser.pause(3000);       
              
        await $(`//*[text()="Id"]`).click();
        const ids = await $$("//*[@tabulator-field='id'][@class ='tabulator-cell']");       
        const idsArr = await getArr(ids);          
        await $(`//*[text()="Id"]`).click();
        const ids2 = await $$("//*[@tabulator-field='id'][@class ='tabulator-cell']");
        const idsArr2 = await getArr(ids2);

        console.log(idsArr);
        console.log(idsArr2);        
        expect(idsArr.sort((a, b) => b - a)).toEqual(idsArr2);
        await browser.pause(2000);

        await $(`//*[text()="Name"]`).click();        
        const names = await $$("//*[@tabulator-field='name'][@class ='tabulator-cell']");
        const namesArr = await getArr(names); 
        await $(`//*[text()="Name"]`).click();
        const names2 = await $$("//*[@tabulator-field='name'][@class ='tabulator-cell']");
        const namesArr2 = await getArr(names2);

        console.log(namesArr);  
        console.log(namesArr2);
        expect(namesArr.sort().reverse()).toEqual(namesArr2);
        await browser.pause(2000);

        await $(`//*[text()="Age"]`).click(); 
        const ages = await $$("//*[@tabulator-field='age'][@class ='tabulator-cell']"); 
        const agesArr = await getArr(ages);
        await $(`//*[text()="Age"]`).click();
        const ages2 = await $$("//*[@tabulator-field='age'][@class ='tabulator-cell']"); 
        const agesArr2 = await getArr(ages2);

        console.log(agesArr);
        console.log(agesArr2);        
        expect(agesArr.sort().reverse()).toEqual(agesArr2);
        await browser.pause(3000);        
        
    });
});   
                
        
         





