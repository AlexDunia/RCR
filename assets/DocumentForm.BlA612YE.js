import{J,r as v,c as R,b as n,i as a,e as o,q as x,s as p,G as _,F as m,f as k,t as u,n as b,H as h,K,N as Z}from"./vendor.BkLxJZRI.js";import{_ as Q}from"./index.D9hZA4Ik.js";const X={class:"input-group"},W={key:0,class:"skeleton-loader label-skeleton"},Y={key:1},N={key:2,class:"skeleton-loader input-skeleton"},ee={class:"input-group"},te={key:0,class:"skeleton-loader label-skeleton"},se={key:1},oe={key:2,class:"skeleton-loader skeleton-textarea"},ne={class:"input-group"},ae={key:0,class:"skeleton-loader label-skeleton"},le={key:1},ie={key:2,class:"skeleton-loader input-skeleton"},re={key:3},de={class:"agents-list"},ce=["src","alt"],ue=["onClick"],pe={key:0,class:"skeleton-loader label-skeleton"},me={key:1},ve={key:0,class:"file-upload-container"},ke=["onDrop"],he={class:"upload-text"},ge=["onClick"],ye=["id","onChange","accept"],_e={key:0,class:"selected-files"},be={class:"file-info"},Ce={key:0,width:"20",height:"20",viewBox:"0 0 20 20",fill:"none"},fe=["src","alt"],xe={class:"file-details"},we={class:"file-name"},De={class:"file-size"},Le=["onClick"],Fe=["onUpdate:modelValue","placeholder"],Me=["onUpdate:modelValue"],Ae={value:"",disabled:"",selected:""},Ve=["value"],Be=["onUpdate:modelValue","type","placeholder"],Se={key:0,class:"modal"},je={class:"modal-content"},Ue={class:"modal-header"},Ee={class:"modal-body"},Ie={class:"agents-grid"},qe=["onClick"],He=["src","alt"],$e={class:"agent-info"},ze={class:"agent-name"},Pe={class:"agent-experience"},Ge={class:"modal-footer"},Oe={__name:"DocumentForm",props:{fields:{type:Array,required:!0},isLoading:{type:Boolean,default:!1}},emits:["submit"],setup(r,{emit:M}){const w=r,A=M,l=J({}),V=v({}),g=v(!1),C=v(""),c=v([]),y=v(!1);w.fields.forEach(s=>{s.type==="file"?l[s.name]=[]:l[s.name]=""});const B=[{id:1,name:"John Doe",email:"john@example.com",avatar:"/avatars/john.jpg",experience:5},{id:2,name:"Jane Smith",email:"jane@example.com",avatar:"/avatars/jane.jpg",experience:8}],S=R(()=>{const s=C.value.toLowerCase();return B.filter(t=>t.name.toLowerCase().includes(s)||t.email.toLowerCase().includes(s))}),j=s=>c.value.some(t=>t.id===s.id),U=s=>{const t=c.value.findIndex(e=>e.id===s.id);t===-1?c.value.push(s):c.value.splice(t,1)},E=s=>{const t=c.value.findIndex(e=>e.id===s.id);t!==-1&&c.value.splice(t,1)},I=()=>{const s={};return l.title||(s.title="Document title is required"),l.description||(s.description="Document description is required"),w.fields.forEach(t=>{t.required&&!l[t.name]&&(s[t.name]=`${t.label} is required`)}),V.value=s,Object.keys(s).length===0},q=()=>{I()&&A("submit",{...l,agents:c.value})},H=s=>{document.getElementById(s).click()},$=(s,t)=>{const e=Array.from(s.target.files);l[t]||(l[t]=[]),D(e,t)},z=(s,t)=>{s.preventDefault(),y.value=!1;const e=Array.from(s.dataTransfer.files);l[t]||(l[t]=[]),D(e,t)},D=(s,t)=>{l[t]||(l[t]=[]),s.forEach(e=>{const d={file:e,name:e.name,size:e.size,type:e.type,preview:f(e.type)?URL.createObjectURL(e):null};l[t].push(d)})},P=(s,t)=>{const e=l[s][t];e.preview&&URL.revokeObjectURL(e.preview),l[s].splice(t,1)},L=s=>s.includes("pdf")||s.includes("doc")||s.includes("xls")||s.includes("ppt"),f=s=>s.includes("image/"),G=s=>s.preview,O=s=>L(s)?"document-icon":f(s)?"image-icon":"generic-icon",T=s=>{if(s===0)return"0 Bytes";const t=1024,e=["Bytes","KB","MB","GB"],d=Math.floor(Math.log(s)/Math.log(t));return parseFloat((s/Math.pow(t,d)).toFixed(2))+" "+e[d]};return(s,t)=>(a(),n("form",{onSubmit:h(q,["prevent"]),class:"document-form"},[o("div",X,[r.isLoading?(a(),n("div",W)):(a(),n("label",Y,"Document Title")),r.isLoading?(a(),n("div",N)):p((a(),n("input",{key:3,"onUpdate:modelValue":t[0]||(t[0]=e=>l.title=e),type:"text",placeholder:"Enter document title",required:""},null,512)),[[_,l.title]])]),o("div",ee,[r.isLoading?(a(),n("div",te)):(a(),n("label",se,"Document Description")),r.isLoading?(a(),n("div",oe)):p((a(),n("textarea",{key:3,"onUpdate:modelValue":t[1]||(t[1]=e=>l.description=e),placeholder:"Enter document description",rows:"3",required:""},null,512)),[[_,l.description]])]),o("div",ne,[r.isLoading?(a(),n("div",ae)):(a(),n("label",le,"Associated Agents")),r.isLoading?(a(),n("div",ie)):(a(),n("div",re,[o("div",de,[(a(!0),n(m,null,k(c.value,e=>(a(),n("div",{key:e.id,class:"agent-item"},[o("img",{src:e.avatar,alt:e.name,class:"agent-avatar"},null,8,ce),o("span",null,u(e.name),1),o("button",{type:"button",onClick:d=>E(e),class:"remove-agent"},"×",8,ue)]))),128))]),o("button",{type:"button",onClick:t[2]||(t[2]=e=>g.value=!0),class:"add-agent-btn"}," + Add Agent ")]))]),(a(!0),n(m,null,k(r.fields,e=>{var d;return a(),n("div",{key:e.name,class:"input-group"},[r.isLoading?(a(),n("div",pe)):(a(),n("label",me,u(e.label),1)),r.isLoading?(a(),n("div",{key:2,class:b(["skeleton-loader",{"skeleton-textarea":e.type==="textarea"},{"input-skeleton":e.type!=="textarea"}])},null,2)):(a(),n(m,{key:3},[e.type==="file"?(a(),n("div",ve,[o("div",{class:b(["file-upload-area",{dragging:y.value}]),onDrop:h(i=>z(i,e.name),["prevent"]),onDragover:t[3]||(t[3]=h(()=>{},["prevent"])),onDragenter:t[4]||(t[4]=h(()=>y.value=!0,["prevent"])),onDragleave:t[5]||(t[5]=h(()=>y.value=!1,["prevent"]))},[t[10]||(t[10]=o("div",{class:"upload-icon"},[o("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},[o("path",{d:"M12 12V19M12 12L15 15M12 12L9 15M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 7.01349 15.8767 7.03857C14.9827 4.67583 12.6997 3 10 3C6.13401 3 3 6.13401 3 10C3 12.2501 4.07741 14.2509 5.75 15.4805",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})])],-1)),o("div",he,[t[9]||(t[9]=o("span",null,"Drag & drop files here or",-1)),o("button",{type:"button",class:"browse-button",onClick:i=>H(e.name)},"Browse files",8,ge)]),t[11]||(t[11]=o("div",{class:"upload-formats"}," Supported formats: PDF, DOC, XLS, PPT, JPG, PNG, GIF, TIFF, HEIC ",-1)),o("input",{id:e.name,type:"file",onChange:i=>$(i,e.name),accept:e.accept,multiple:"",class:"hidden"},null,40,ye)],42,ke),((d=l[e.name])==null?void 0:d.length)>0?(a(),n("div",_e,[(a(!0),n(m,null,k(l[e.name],(i,F)=>(a(),n("div",{key:F,class:"file-item"},[o("div",be,[o("div",{class:b(["file-icon",O(i.type)])},[L(i.type)?(a(),n("svg",Ce,t[12]||(t[12]=[o("path",{d:"M7.5 9.16667H12.5M7.5 12.5H10.8333M6.66667 2.5H13.3333L17.5 6.66667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H6.66667ZM13.3333 2.5V6.66667H17.5L13.3333 2.5Z",stroke:"currentColor","stroke-width":"1.67","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)]))):f(i.type)?(a(),n("img",{key:1,src:G(i),class:"file-preview",alt:i.name},null,8,fe)):x("",!0)],2),o("div",xe,[o("span",we,u(i.name),1),o("span",De,u(T(i.size)),1)])]),o("button",{type:"button",onClick:Te=>P(e.name,F),class:"remove-file"},t[13]||(t[13]=[o("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none"},[o("path",{d:"M13.3333 5L6.66667 11.6667M6.66667 5L13.3333 11.6667",stroke:"#EF4444","stroke-width":"1.67","stroke-linecap":"round","stroke-linejoin":"round"})],-1)]),8,Le)]))),128))])):x("",!0)])):e.type==="textarea"?p((a(),n("textarea",{key:1,"onUpdate:modelValue":i=>l[e.name]=i,placeholder:e.placeholder,rows:"4"},null,8,Fe)),[[_,l[e.name]]]):e.type==="select"?p((a(),n("select",{key:2,"onUpdate:modelValue":i=>l[e.name]=i},[o("option",Ae,"Select "+u(e.label.toLowerCase()),1),(a(!0),n(m,null,k(e.options,i=>(a(),n("option",{key:i,value:i},u(i),9,Ve))),128))],8,Me)),[[K,l[e.name]]]):p((a(),n("input",{key:3,"onUpdate:modelValue":i=>l[e.name]=i,type:e.type,placeholder:e.placeholder},null,8,Be)),[[Z,l[e.name]]])],64))])}),128)),g.value?(a(),n("div",Se,[o("div",je,[o("div",Ue,[t[14]||(t[14]=o("h3",null,"Select Agents",-1)),o("button",{type:"button",onClick:t[6]||(t[6]=e=>g.value=!1),class:"close-modal"},"×")]),o("div",Ee,[p(o("input",{type:"text","onUpdate:modelValue":t[7]||(t[7]=e=>C.value=e),placeholder:"Search agents...",class:"search-input"},null,512),[[_,C.value]]),o("div",Ie,[(a(!0),n(m,null,k(S.value,e=>(a(),n("div",{key:e.id,class:b(["agent-card",{selected:j(e)}]),onClick:d=>U(e)},[o("img",{src:e.avatar,alt:e.name,class:"agent-avatar"},null,8,He),o("div",$e,[o("span",ze,u(e.name),1),o("span",Pe,u(e.experience)+" years exp.",1)])],10,qe))),128))])]),o("div",Ge,[o("button",{type:"button",onClick:t[8]||(t[8]=e=>g.value=!1),class:"btn-primary"},"Done")])])])):x("",!0),t[15]||(t[15]=o("button",{type:"submit",class:"btn-primary"},"Proceed",-1))],32))}},Ke=Q(Oe,[["__scopeId","data-v-70c2c20d"]]);export{Ke as D};
