import{d as I,r as u,c as a}from"./vendor.BkLxJZRI.js";const h=I("education",()=>{const o=u([]),r=u(null),S=a(()=>o.value),f=a(()=>r.value),d=a(()=>e=>o.value.find(n=>n.id===e));function i(){try{const e=localStorage.getItem("educationSessions");e&&(o.value=JSON.parse(e))}catch(e){console.error("Error loading sessions from localStorage:",e)}}function s(){try{localStorage.setItem("educationSessions",JSON.stringify(o.value))}catch(e){console.error("Error saving sessions to localStorage:",e)}}function v(e){o.value.push(e),s(),t(e)}function g(e){const n=o.value.findIndex(y=>y.id===e.id);n!==-1&&(o.value[n]=e,s(),r.value&&r.value.id===e.id&&t(e))}function m(e){o.value=o.value.filter(n=>n.id!==e),s(),r.value&&r.value.id===e&&c()}function t(e){r.value=e,localStorage.setItem("currentSession",JSON.stringify(e))}function l(){try{const e=localStorage.getItem("currentSession");e&&(r.value=JSON.parse(e))}catch(e){console.error("Error loading current session from localStorage:",e)}}function c(){r.value=null,localStorage.removeItem("currentSession")}return i(),l(),{sessions:o,currentSession:r,getAllSessions:S,getCurrentSession:f,getSessionById:d,loadAllSessions:i,saveAllSessions:s,addSession:v,updateSession:g,deleteSession:m,setCurrentSession:t,loadCurrentSession:l,clearCurrentSession:c}});export{h as u};
