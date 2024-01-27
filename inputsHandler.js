import Sketch from './index.js';
import ColorPicker from './colorPicker.js';
import { Color } from 'three';

const dAValue  = document.getElementById("dAValue");
const dASlider = document.getElementById("dASlider");

const dBValue  = document.getElementById("dBValue");
const dBSlider = document.getElementById("dBSlider");

const fValue  = document.getElementById("fValue");
const fSlider = document.getElementById("fSlider");

const kValue  = document.getElementById("kValue");
const kSlider = document.getElementById("kSlider");

const speedValue  = document.getElementById("speedValue");
const speedSlider = document.getElementById("speedSlider");

const funValue  = document.getElementById("funValue");
const funSlider = document.getElementById("funSlider");

const ar = document.getElementById("ar");
const ag = document.getElementById("ag");
const ab = document.getElementById("ab");

const br = document.getElementById("br");
const bg = document.getElementById("bg");
const bb = document.getElementById("bb");

const cr = document.getElementById("cr");
const cg = document.getElementById("cg");
const cb = document.getElementById("cb");

const dr = document.getElementById("dr");
const dg = document.getElementById("dg");
const db = document.getElementById("db");

const regrowbtn = document.getElementById("regrow");

function SetValue(element, value){
    element.innerText = Math.round(value*10000)/10000; 
}

const sk = new Sketch({
    dom: document.getElementById('container')
});
const colorPicker = new ColorPicker({
    dom: document.getElementById('colorPickerCanvas')
});


function SetA(){
    colorPicker.SetA(ar.value, ag.value, ab.value);
    sk.         SetA(ar.value, ag.value, ab.value);
}

function SetB(){
    colorPicker.SetB(br.value, bg.value, bb.value);
    sk.         SetB(br.value, bg.value, bb.value);
}

function SetC(){
    colorPicker.SetC(cr.value, cg.value, cb.value);
    sk.         SetC(cr.value, cg.value, cb.value);
}

function SetD(){
    colorPicker.SetD(dr.value, dg.value, db.value);
    sk.         SetD(dr.value, dg.value, db.value);
}

SetValue(dAValue, dASlider.value);
SetValue(dBValue, dBSlider.value);
SetValue(fValue, fSlider.value);
SetValue(kValue, kSlider.value);
SetValue(speedValue, speedSlider.value);
SetValue(funValue, funSlider.value);
SetA();
SetB();
SetC();
SetD();

dASlider.addEventListener('input', e => {
    SetValue(dAValue, dASlider.value)
    sk.materialA.uniforms.diffusionA.value = dASlider.value;
});
dBSlider.addEventListener('input', e => {
    SetValue(dBValue, dBSlider.value)
    sk.materialA.uniforms.diffusionB.value = dBSlider.value;
});
fSlider.addEventListener('input', e =>  {
    SetValue(fValue, fSlider.value)
    sk.materialA.uniforms.f.value = fSlider.value;
});
kSlider.addEventListener('input', e =>  {
    SetValue(kValue, kSlider.value)
    sk.materialA.uniforms.k.value = kSlider.value;
});
speedSlider.addEventListener('input', e =>  {
    SetValue(speedValue, speedSlider.value)
    sk.speed = speedSlider.value;
});
funSlider.addEventListener('input', e =>  {
    SetValue(funValue, funSlider.value)
    sk.materialA.uniforms.fun.value = funSlider.value; 
});

regrowbtn.addEventListener('click', e => {sk.reset()});

ar.addEventListener('input', e => {SetA()});
ag.addEventListener('input', e => {SetA()});
ab.addEventListener('input', e => {SetA()});
br.addEventListener('input', e => {SetB()});
bg.addEventListener('input', e => {SetB()});
bb.addEventListener('input', e => {SetB()});
cr.addEventListener('input', e => {SetC()});
cg.addEventListener('input', e => {SetC()});
cb.addEventListener('input', e => {SetC()});
dr.addEventListener('input', e => {SetD()});
dg.addEventListener('input', e => {SetD()});
db.addEventListener('input', e => {SetD()});


//Add speed slider too
//Regrow
