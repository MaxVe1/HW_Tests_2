// REMOVE THE BELOW CODE BEFORE START THE EXERCISE
describe('Check app', function () {
    it('should login and check color', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
      
        await browser.pause(3000); 
        
        await $('#sum-to-buy').click();
        await $('#sum-to-buy').addValue("1");       
        await browser.pause(3000);
        await $('#sum-to-buy').addValue("2");
        await browser.pause(3000);        
        await $('#sum-to-buy').addValue("3");
        await browser.pause(3000);       
        await $('#sum-to-buy').addValue("4");
        await browser.pause(3000);
        await $("//button[text()='Buy']").click();
        
        const rate = await $('#currency-rate').getText();
        console.log(rate);  
        const resText = await $('#withdrew').getText();
        console.log(resText);
        const res = resText.split('=> ');      
        
        expect(Number(rate)*1234).toEqual(Number(res[1]));
        // if(! Number(rate)*1234 === Number(res[1])){
        //     throw new Error(`Wrong Values`);
        // }else {
        //     console.log(`RESULT:   ${Number(rate)*1234 === Number(res[1])}`);
        // }       
        await browser.pause(5000);               
    });
});   
                
        
         





