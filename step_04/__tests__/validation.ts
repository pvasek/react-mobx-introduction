import  "mocha";
import { assert } from "chai";
import { maxLength, isRequired } from "../validations";

describe("max length", function(){
    it("max length should return error in case the length is longer", function() {
        const result = maxLength("012345678901234567");
        assert.equal(result.length, 1);
    });

    it("max length should NOT return error in case the length is shorter", function() {
        const result = maxLength("0123456789012345");
        assert.equal(result.length, 0);
    });
});

describe("is required", function(){
    it("is required should return error in case the value is empty", function() {
        const result = isRequired('');
        assert.equal(result.length, 1);
    });

    it("is required should NOT return error in case the value is NOT empty", function() {
        const result = isRequired('0123');
        assert.equal(result.length, 0);
    });
});