import {AppName, AppSubComp} from "./App";
import {ModuleA} from "@platf/ModuleA";
import {CompA} from "@/components/CompA";
import {ModuleT} from "@platf/ModuleT";
import {dataMata} from "@/dataMata";

const data = [AppName, ModuleA, AppSubComp, CompA, ModuleT, dataMata];

data.forEach(item => {
    console.log(item);
    const p = document.createElement('p')
    p.textContent = JSON.stringify(item);
    document.body.appendChild(p);
})



