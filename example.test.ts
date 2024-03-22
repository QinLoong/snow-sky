
import {expect,test,describe,vi, Mocked} from 'vitest'
import { testFn ,request} from './utils'
import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>
test('test common matcher',()=>{
    const name = 'viking'
    expect(name).toBe('viking')
    expect(2+2).toBe(4)
})

describe('function',()=>{
    test('create a mock function',()=>{
        const callback = vi.fn()
        testFn(12,callback)
        expect(callback).toHaveBeenCalled()
        expect(callback).toHaveBeenCalledWith(12)
    })

    test('spy on method',()=>{

    })

    test('mock third party module',async () =>{
         axios.get
    })
})