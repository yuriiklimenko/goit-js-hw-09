const e=document.querySelector("button[data-start]"),t=document.querySelector("button[data-stop]"),r=document.querySelector("body");let d=null;t.disabled=!0,e.addEventListener("click",(e=>{d=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.currentTarget.disabled=!0,t.disabled=!1})),t.addEventListener("click",(t=>{clearInterval(d),e.disabled=!1,t.currentTarget.disabled=!0}));
//# sourceMappingURL=01-color-switcher.a0fee570.js.map
