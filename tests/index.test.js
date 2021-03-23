const index = require('./index.js')

describe("API", () => {
it('sum: adds 1 + 2 to equal 3', async done =>{
  expect(sum(1, 2)).toEqual(3);
  done()
    })

 it('sub: finds difference', async done =>{
     expect(sub(9, 6)).toEqual(3)
     done()
 })   
})
