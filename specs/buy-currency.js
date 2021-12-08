async function waitForText(selector, text, timeOut = 3000) {
    await browser.waitUntil(
        async () => (                
            expect(JSON.parse(await selector.getHTML(false))).toEqual(text),
        {
            timeout: timeOut,
            timeoutMsg: `Object not found`            
        }        
    ))
}
describe('Check app', function () {
    this.beforeAll('Should login', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $("#spinner").waitForDisplayed({ reverse: true, timeout: 5000 });
    }); 
    it('Buy currency', async function () {
          const dataB = await $("script#database");
          await $('#sum-to-buy').click();
          await $('#sum-to-buy').addValue("1");
          await waitForText(dataB, [{ num: "1" }]) 
          await $('#sum-to-buy').addValue("2");
          await waitForText(dataB, [{ num: "1" },{ num: "2" }]);
          await $('#sum-to-buy').addValue("3");
          await waitForText(dataB, [{ num: "1" },{ num: "2" },{ num: "3" }]);
          await $('#sum-to-buy').addValue("4");
          await waitForText(dataB, [{ num: "1" },{ num: "2" },{ num: "3" },{ num: "4" }]);
          await $("//button[text()='Buy']").click();
          
          const rate = await $('#currency-rate').getText();
          console.log(rate);  
          const resText = await $('#withdrew').getText();
          console.log(resText);
          const res = resText.split('=> ');      
        
          expect(Number(rate)*1234).toEqual(Number(res[1]));
          await browser.pause(5000);
    });
});   
 



