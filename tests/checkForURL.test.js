import {checkForURL} from "../src/client/js/checkForURL";
import {describe, expect} from "@jest/globals";

describe('URL Validation',()=>{
   test('It should return true', ()=>{
       expect(checkForURL('https://www.youtube.com/')).toBe(true);
   });

   test('It should return false',()=>{
      expect(checkForURL('http:www.youtube,con')).toBe(false);
   });
});

