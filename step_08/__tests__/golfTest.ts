import { ShotListModel, ShotModel } from "../DataModel";
import  "mocha";
import { assert } from "chai";

it("from point should be the same as to point of a previous shot", function () {
    let shotListModel = new ShotListModel;
    shotListModel.shots.push(new ShotModel({from:{x:2, y:3}, to:{x:10, y:12}}, 0));
    shotListModel.onAddShot();
    assert.equal(10, shotListModel.shots[1].from.point.x);
    assert.equal(12, shotListModel.shots[1].from.point.y);
});

it("from point should be [0;0] if there is no previous point", function(){
    let shotListModel = new ShotListModel;
    shotListModel.onAddShot();
    assert.equal(0, shotListModel.shots[0].from.point.x);
    assert.equal(0, shotListModel.shots[0].from.point.y);
})

it("to point should be [0;0] when is added", function(){
    let shotListModel = new ShotListModel;
    shotListModel.onAddShot();
    assert.equal(0, shotListModel.shots[0].to.point.x);
    assert.equal(0, shotListModel.shots[0].to.point.y);
    shotListModel.shots[0].to.point.x = 8;
    shotListModel.shots[0].to.point.y = 12;
    shotListModel.onAddShot();
    assert.equal(0, shotListModel.shots[1].to.point.x);
    assert.equal(0, shotListModel.shots[1].to.point.y);
});