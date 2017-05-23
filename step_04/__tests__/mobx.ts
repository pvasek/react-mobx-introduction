import  "mocha";
import { assert } from "chai";
import { observable, autorun, action, computed } from 'mobx';

it("count rectangle", function() {
    class Rectangle {
        @observable width = 100;
        @observable height = 100;
        
        constructor(){
        autorun(() => console.log("width: " + this.width + ", height: " + this.height + ", area: " + this.area));
        }
    
        @computed get area(){
            return this.width * this.height;              
        }
        @action setRect(width, height){
            this.width = width;
            this.height = height;
        }
    }
    const rect = new Rectangle();
    rect.setRect(50, 150);
    rect.setRect(200, 10);
    assert.equal(rect.area, 2000);
});