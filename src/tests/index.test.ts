import Arithmetic  from './index'

const arithmetic = new Arithmetic()

describe("API", () => {
 
// SUM  
it('sum: adds 1 + 2 to equal 3', async done =>{
  const result : number = arithmetic.sum(1, 2)
  expect(result).toBe(3) 
  done()
    })

 // DIFF   
 it('sub: finds difference', async done =>{
    const result: number = arithmetic.sub(9, 6)
    expect(result).toBe(3)
     done()
 })   
})


