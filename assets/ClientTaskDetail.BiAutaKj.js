import{r as c,c as F,a as wt,w as gt,o as Ct,g as _t,b as i,e as t,z as Z,n as p,t as l,q as v,l as w,p as yt,F as g,f as j,M as ft,m as Mt,i as a,A as O}from"./vendor.BkLxJZRI.js";import{_ as bt,b as Dt,d as At}from"./index.D9hZA4Ik.js";const xt={class:"admin-task-view"},jt={class:"task-header-section"},Lt={class:"header-container"},Tt={class:"status-content"},Bt={class:"task-title"},Vt={class:"task-meta"},Ht={class:"task-id"},$t={class:"task-status"},St={class:"admin-actions"},It={class:"task-content"},Nt={class:"content-container"},Rt={key:0,class:"loading-state"},Et={key:1,class:"error-state"},Ft={key:2,class:"task-grid"},Zt={class:"task-main-column"},Ut={class:"task-section task-summary"},Jt={class:"summary-grid"},Pt={class:"summary-item"},Ot={class:"summary-content"},zt={class:"summary-value"},qt={class:"summary-item"},Gt={class:"summary-content"},Kt={class:"summary-value"},Wt={key:0,class:"summary-item"},Qt={class:"summary-content"},Xt={class:"summary-value"},Yt={key:1,class:"summary-item"},te={class:"summary-content"},ee={class:"summary-value"},se={key:2,class:"summary-item"},oe={class:"summary-content"},ne={class:"summary-value"},ae={class:"task-section"},ie={key:0,class:"description-content"},le={class:"description-list"},re={key:1,class:"empty-state"},de={class:"task-section"},ce={class:"timeline"},ue={class:"timeline-content"},ve={class:"timeline-header"},he={class:"activity-title"},me={class:"activity-time"},ke={class:"activity-description"},pe={key:0,class:"activity-metadata"},we={class:"task-sidebar"},ge={class:"task-section people-section"},Ce={class:"subsection"},_e={key:0,class:"people-list"},ye={class:"person-info"},fe=["data-name"],Me=["src","alt"],be={class:"person-details"},De={class:"person-name"},Ae={class:"person-email"},xe={class:"person-actions"},je=["onClick"],Le=["onClick"],Te={key:1,class:"empty-state"},Be={class:"subsection"},Ve={key:0,class:"people-list"},He={class:"person-info"},$e=["data-name"],Se=["src","alt"],Ie={class:"person-details"},Ne={class:"person-name"},Re={class:"person-email"},Ee={class:"person-actions"},Fe=["onClick"],Ze=["onClick"],Ue={key:1,class:"empty-state"},Je={key:0,class:"task-section attachments-section"},Pe={class:"attachments-list"},Oe={class:"attachment-info"},ze={class:"attachment-details"},qe={class:"attachment-name"},Ge={class:"attachment-size"},Ke={class:"attachment-actions"},We=["onClick"],Qe=["onClick"],Xe={class:"bottom-actions"},Ye={class:"action-container"},ts=["disabled"],es={key:0,class:"modal-overlay"},ss={class:"modal-container"},os={class:"modal-content delete-confirmation"},ns={class:"modal-actions"},as={key:1,class:"modal-overlay"},is={class:"modal-container"},ls={class:"modal-content"},rs={class:"modal-header"},ds={key:2,class:"modal-overlay"},cs={class:"modal-container"},us={class:"modal-content"},vs={class:"modal-header"},hs={key:3,class:"modal-overlay"},ms={class:"modal-container"},ks={class:"modal-content delete-confirmation"},ps={class:"modal-actions"},ws={key:4,class:"modal-overlay"},gs={class:"modal-container"},Cs={class:"modal-content delete-confirmation"},_s={class:"modal-actions"},ys={__name:"ClientTaskDetail",setup(fs){const B=_t(),C=Mt(),U=Dt(),M=At(),s=c(null),V=c(!0),H=c(null),$=c(!1),S=c(!1),I=c(!1),L=c(!1),T=c(!1),b=c(null),D=c(null),_=c(!1),d=c(null),z=F(()=>s.value&&!["completed","cancelled"].includes(s.value.status)),q=F(()=>s.value&&!["completed","cancelled"].includes(s.value.status)),G=c([{type:"created",title:"Task Created",description:"Task was created by John Doe",timestamp:new Date(Date.now()-7*24*60*60*1e3)},{type:"assigned",title:"Agent Assigned",description:"Jane Smith was assigned to the task",timestamp:new Date(Date.now()-6*24*60*60*1e3),metadata:{agent:{id:1,name:"Jane Smith",avatar:"/path/to/avatar.jpg"}}},{type:"status_changed",title:"Status Updated",description:'Task status changed from "Draft" to "In Progress"',timestamp:new Date(Date.now()-5*24*60*60*1e3)}]);wt(()=>{U.setLayout({hideSidebar:!1,hideHeader:!1,background:"#F9FAFB"})});const N=()=>{C.back()},K=()=>{C.push(`/admin/client-task/${s.value.id}/edit?clientId=${H.value}`)},W=()=>{$.value=!0},Q=async()=>{try{await M.deleteTask(s.value.id),C.push(`/clients/${H.value}?tab=tasks`)}catch(o){console.error("Error deleting task:",o)}},X=()=>{S.value=!0},Y=()=>{I.value=!0},tt=o=>{b.value=o,L.value=!0},et=async()=>{!s.value||!b.value||(s.value.agents=s.value.agents.filter(o=>o!==b.value),s.value.agentDetails=s.value.agentDetails.filter(o=>o.id!==b.value),L.value=!1,b.value=null,_.value=E())},st=o=>{D.value=o,T.value=!0},ot=async()=>{!s.value||!D.value||(s.value.clients=s.value.clients.filter(o=>o!==D.value),s.value.clientDetails=s.value.clientDetails.filter(o=>o.id!==D.value),T.value=!1,D.value=null,_.value=E())},nt=o=>{C.push(`/agent/${o}`)},at=o=>{C.push(`/clients/${o}`)},it=()=>{},lt=async o=>{try{const u=await(await fetch(o.url)).blob(),h=window.URL.createObjectURL(u),r=document.createElement("a");r.href=h,r.download=o.name,document.body.appendChild(r),r.click(),window.URL.revokeObjectURL(h),r.remove()}catch(e){console.error("Error downloading file:",e)}},rt=async o=>{try{await M.deleteTaskAttachment(s.value.id,o),s.value=await M.getTaskById(s.value.id)}catch(e){console.error("Error deleting attachment:",e)}},A=o=>o?new Date(o).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}).replace(",",""):"N/A",dt=o=>{if(!o)return"";const e=o.replace("_"," ");return e.charAt(0).toUpperCase()+e.slice(1)},ct=(o,e)=>{if(!o||!e)return"N/A";const u=new Date(o),r=new Date(e)-u;if(r<6e4)return"Less than a minute";if(r<36e5){const k=Math.floor(r/6e4);return`${k} minute${k!==1?"s":""}`}if(r<864e5){const k=Math.floor(r/36e5),f=Math.floor(r%36e5/6e4);return`${k} hour${k!==1?"s":""} ${f>0?`${f} minute${f!==1?"s":""}`:""}`}const x=Math.floor(r/864e5),y=Math.floor(r%864e5/36e5);return`${x} day${x!==1?"s":""} ${y>0?`${y} hour${y!==1?"s":""}`:""}`},R=o=>o?o.split(" ").map(e=>e.charAt(0)).join("").toUpperCase().substring(0,2):"",J=o=>{const e=o.target,u=e.parentElement,h=u.getAttribute("data-name");e.remove(),u.textContent=R(h),u.classList.remove("has-image")},ut=o=>{if(!o)return"0 B";const e=1024,u=["B","KB","MB","GB"],h=Math.floor(Math.log(o)/Math.log(e));return`${parseFloat((o/Math.pow(e,h)).toFixed(2))} ${u[h]}`},vt=o=>({created:"PlusCircleIcon",assigned:"UserPlusIcon",status_changed:"RefreshIcon"})[o]||"CircleIcon",ht=o=>{switch(o.type){case"assigned":return"AssignedAgentMetadata";default:return null}},E=()=>{if(!d.value||!s.value)return!1;const o=JSON.stringify({title:s.value.title,status:s.value.status,priority:s.value.priority,startDate:s.value.startDate,endDate:s.value.endDate,startTime:s.value.startTime,endTime:s.value.endTime,agents:s.value.agents,clients:s.value.clients,agentDetails:s.value.agentDetails,clientDetails:s.value.clientDetails,attachments:s.value.attachments}),e=JSON.stringify({title:d.value.title,status:d.value.status,priority:d.value.priority,startDate:d.value.startDate,endDate:d.value.endDate,startTime:d.value.startTime,endTime:d.value.endTime,agents:d.value.agents,clients:d.value.clients,agentDetails:d.value.agentDetails,clientDetails:d.value.clientDetails,attachments:d.value.attachments});return o!==e};gt(s,()=>{_.value=E()},{deep:!0});const mt=async()=>{if(!(!s.value||!_.value))try{await M.updateTask(s.value.id,s.value),d.value=JSON.parse(JSON.stringify(s.value)),_.value=!1,C.back()}catch(o){console.error("Error saving task:",o)}},kt=F(()=>s.value?s.value.title&&s.value.startDate&&s.value.endDate&&s.value.startTime&&s.value.endTime:!1);return Ct(()=>{setTimeout(()=>{U.setLayout({hideSidebar:!0,hideHeader:!0,background:"#f9fafb"})},50),V.value=!0,B.query.clientId&&(H.value=parseInt(B.query.clientId)),setTimeout(()=>{const o=B.params.id;s.value=M.getTaskById(o),d.value=JSON.parse(JSON.stringify(s.value)),V.value=!1},500)}),(o,e)=>{var u,h,r,x,y,k,f,P;return a(),i("div",xt,[t("header",jt,[t("div",Lt,[t("div",{class:"back-button",onClick:N},e[5]||(e[5]=[t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M19 12H5M5 12L12 19M5 12L12 5",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1),t("span",null,"Back",-1)])),t("div",{class:p(["task-status-banner",(u=s.value)==null?void 0:u.status])},[t("div",Tt,[t("div",{class:p(["status-indicator",(h=s.value)==null?void 0:h.status])},null,2),t("h1",Bt,l((r=s.value)==null?void 0:r.title),1),t("div",Vt,[t("span",Ht,"#"+l((x=s.value)==null?void 0:x.id),1),t("span",$t,l(dt((y=s.value)==null?void 0:y.status)),1),t("span",{class:p(["task-priority",(f=(k=s.value)==null?void 0:k.priority)==null?void 0:f.toLowerCase()])},l((P=s.value)==null?void 0:P.priority)+" Priority ",3)])]),t("div",St,[z.value?(a(),i("button",{key:0,class:"action-btn edit",onClick:K},e[6]||(e[6]=[t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1),w(" Edit Task ")]))):v("",!0),q.value?(a(),i("button",{key:1,class:"action-btn delete",onClick:W},e[7]||(e[7]=[t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M3 6H5H21",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1),w(" Delete Task ")]))):v("",!0)])],2)])]),t("main",It,[t("div",Nt,[V.value?(a(),i("div",Rt,e[8]||(e[8]=[t("div",{class:"spinner"},null,-1),t("p",null,"Loading task details...",-1)]))):s.value?(a(),i("div",Ft,[t("div",Zt,[t("section",Ut,[t("div",Jt,[t("div",Pt,[e[13]||(e[13]=t("div",{class:"summary-icon created"},[t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M12 8V12L15 15",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})])],-1)),t("div",Ot,[e[12]||(e[12]=t("div",{class:"summary-label"},"Created",-1)),t("div",zt,l(A(s.value.createdAt)),1)])]),t("div",qt,[e[15]||(e[15]=yt('<div class="summary-icon scheduled" data-v-4a1a5fa1><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-4a1a5fa1><path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-4a1a5fa1></path><path d="M16 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-4a1a5fa1></path><path d="M8 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-4a1a5fa1></path><path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-4a1a5fa1></path></svg></div>',1)),t("div",Gt,[e[14]||(e[14]=t("div",{class:"summary-label"},"Scheduled",-1)),t("div",Kt,l(A(s.value.startDate)),1)])]),s.value.startedAt?(a(),i("div",Wt,[e[17]||(e[17]=t("div",{class:"summary-icon started"},[t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M5 3V7M19 3V7M3 11H21M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M12 15H12.01M16 15H16.01M8 15H8.01M12 19H12.01M16 19H16.01M8 19H8.01",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})])],-1)),t("div",Qt,[e[16]||(e[16]=t("div",{class:"summary-label"},"Started",-1)),t("div",Xt,l(A(s.value.startedAt)),1)])])):v("",!0),s.value.completedAt?(a(),i("div",Yt,[e[19]||(e[19]=t("div",{class:"summary-icon completed"},[t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M22 4L12 14.01L9 11.01",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})])],-1)),t("div",te,[e[18]||(e[18]=t("div",{class:"summary-label"},"Completed",-1)),t("div",ee,l(A(s.value.completedAt)),1)])])):v("",!0),s.value.startedAt&&s.value.completedAt?(a(),i("div",se,[e[21]||(e[21]=t("div",{class:"summary-icon duration"},[t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M12 6V12L16 14",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})])],-1)),t("div",oe,[e[20]||(e[20]=t("div",{class:"summary-label"},"Duration",-1)),t("div",ne,l(ct(s.value.startedAt,s.value.completedAt)),1)])])):v("",!0)])]),t("section",ae,[e[22]||(e[22]=t("h2",{class:"section-title"},"Description",-1)),s.value.description&&s.value.description.length>0?(a(),i("div",ie,[t("ul",le,[(a(!0),i(g,null,j(s.value.description,(n,m)=>(a(),i("li",{key:m,class:"description-item"},l(n.replace(/^- /,"")),1))),128))])])):(a(),i("div",re," No description provided for this task. "))]),t("section",de,[e[23]||(e[23]=t("h2",{class:"section-title"},"Activity Timeline",-1)),t("div",ce,[(a(!0),i(g,null,j(G.value,(n,m)=>(a(),i("div",{key:m,class:"timeline-item"},[t("div",{class:p(["timeline-icon",n.type])},[(a(),Z(O(vt(n.type))))],2),t("div",ue,[t("div",ve,[t("span",he,l(n.title),1),t("span",me,l(A(n.timestamp)),1)]),t("p",ke,l(n.description),1),n.metadata?(a(),i("div",pe,[(a(),Z(O(ht(n))))])):v("",!0)])]))),128))])])]),t("div",we,[t("section",ge,[e[32]||(e[32]=t("div",{class:"section-header"},[t("h2",{class:"section-title"},"People Involved")],-1)),t("div",Ce,[t("div",{class:"subsection-header"},[e[25]||(e[25]=t("h3",{class:"subsection-title"},"Assigned Agents",-1)),t("button",{class:"add-person-btn",onClick:X},e[24]||(e[24]=[t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M12 5V19M5 12H19",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1),w(" Add Agent ")]))]),s.value.agentDetails&&s.value.agentDetails.length>0?(a(),i("div",_e,[(a(!0),i(g,null,j(s.value.agentDetails,n=>(a(),i("div",{key:n.id,class:"person-card"},[t("div",ye,[t("div",{class:p(["person-avatar agent",{"has-image":n.avatar}]),"data-name":n.name},[n.avatar?(a(),i("img",{key:0,src:n.avatar,alt:n.name,onError:J},null,40,Me)):(a(),i(g,{key:1},[w(l(R(n.name)),1)],64))],10,fe),t("div",be,[t("div",De,l(n.name),1),t("div",Ae,l(n.email||"No email provided"),1)])]),t("div",xe,[t("button",{class:"action-icon",onClick:m=>nt(n.id),title:"View Profile"},e[26]||(e[26]=[t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)]),8,je),t("button",{class:"action-icon",onClick:m=>tt(n.id),title:"Remove"},e[27]||(e[27]=[t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M18 6L6 18M6 6L18 18",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)]),8,Le)])]))),128))])):(a(),i("div",Te," No agents assigned to this task "))]),t("div",Be,[t("div",{class:"subsection-header"},[e[29]||(e[29]=t("h3",{class:"subsection-title"},"Assigned Clients",-1)),t("button",{class:"add-person-btn",onClick:Y},e[28]||(e[28]=[t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M12 5V19M5 12H19",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1),w(" Add Client ")]))]),s.value.clientDetails&&s.value.clientDetails.length>0?(a(),i("div",Ve,[(a(!0),i(g,null,j(s.value.clientDetails,n=>(a(),i("div",{key:n.id,class:"person-card"},[t("div",He,[t("div",{class:p(["person-avatar client",{"has-image":n.avatar}]),"data-name":n.name},[n.avatar?(a(),i("img",{key:0,src:n.avatar,alt:n.name,onError:J},null,40,Se)):(a(),i(g,{key:1},[w(l(R(n.name)),1)],64))],10,$e),t("div",Ie,[t("div",Ne,l(n.name),1),t("div",Re,l(n.email||"No email provided"),1)])]),t("div",Ee,[t("button",{class:"action-icon",onClick:m=>at(n.id),title:"View Profile"},e[30]||(e[30]=[t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)]),8,Fe),t("button",{class:"action-icon",onClick:m=>st(n.id),title:"Remove"},e[31]||(e[31]=[t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M18 6L6 18M6 6L18 18",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)]),8,Ze)])]))),128))])):(a(),i("div",Ue," No clients assigned to this task "))])]),s.value.attachments&&s.value.attachments.length>0?(a(),i("section",Je,[t("div",{class:"section-header"},[e[34]||(e[34]=t("h2",{class:"section-title"},"Attachments",-1)),t("button",{class:"add-attachment-btn",onClick:it},e[33]||(e[33]=[t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M12 5V19M5 12H19",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1),w(" Add File ")]))]),t("div",Pe,[(a(!0),i(g,null,j(s.value.attachments,(n,m)=>(a(),i("div",{key:m,class:"attachment-item"},[t("div",Oe,[e[35]||(e[35]=t("div",{class:"attachment-icon"},[t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M7 21C5.89543 21 5 20.1046 5 19V3C5 1.89543 5.89543 1 7 1H14L19 6V19C19 20.1046 18.1046 21 17 21H7Z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M13 1V7H19",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})])],-1)),t("div",ze,[t("span",qe,l(n.name),1),t("span",Ge,l(ut(n.size)),1)])]),t("div",Ke,[t("button",{class:"action-icon",onClick:pt=>lt(n),title:"Download"},e[36]||(e[36]=[t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M7 10L12 15L17 10",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M12 15V3",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)]),8,We),t("button",{class:"action-icon",onClick:pt=>rt(n.id),title:"Delete"},e[37]||(e[37]=[t("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M18 6L6 18M6 6L18 18",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)]),8,Qe)])]))),128))])])):v("",!0)])])):(a(),i("div",Et,[e[9]||(e[9]=t("div",{class:"error-icon"},[t("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})])],-1)),e[10]||(e[10]=t("h2",null,"Task Not Found",-1)),e[11]||(e[11]=t("p",null,"We couldn't find the task you're looking for. It may have been deleted or moved.",-1)),t("button",{class:"primary-button",onClick:N},"Return to Tasks")]))])]),t("div",Xe,[t("div",Ye,[t("button",{class:"cancel-btn",onClick:N},"Cancel"),t("button",{class:p(["save-btn",{"has-changes":_.value}]),onClick:mt,disabled:!kt.value}," Save Changes ",10,ts)])]),(a(),Z(ft,{to:"body"},[$.value?(a(),i("div",es,[t("div",ss,[t("div",os,[e[38]||(e[38]=t("h3",null,"Delete Task",-1)),e[39]||(e[39]=t("p",null,"Are you sure you want to delete this task? This action cannot be undone.",-1)),t("div",ns,[t("button",{class:"cancel-btn",onClick:e[0]||(e[0]=n=>$.value=!1)},"Cancel"),t("button",{class:"delete-btn",onClick:Q},"Delete")])])])])):v("",!0),S.value?(a(),i("div",as,[t("div",is,[t("div",ls,[t("div",rs,[e[41]||(e[41]=t("h3",null,"Add Agent",-1)),t("button",{class:"close-btn",onClick:e[1]||(e[1]=n=>S.value=!1)},e[40]||(e[40]=[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M18 6L6 18M6 6L18 18",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)]))])])])])):v("",!0),I.value?(a(),i("div",ds,[t("div",cs,[t("div",us,[t("div",vs,[e[43]||(e[43]=t("h3",null,"Add Client",-1)),t("button",{class:"close-btn",onClick:e[2]||(e[2]=n=>I.value=!1)},e[42]||(e[42]=[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M18 6L6 18M6 6L18 18",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)]))])])])])):v("",!0),L.value?(a(),i("div",hs,[t("div",ms,[t("div",ks,[e[44]||(e[44]=t("h3",null,"Remove Agent",-1)),e[45]||(e[45]=t("p",null,"Are you sure you want to remove this agent from the task?",-1)),t("div",ps,[t("button",{class:"cancel-btn",onClick:e[3]||(e[3]=n=>L.value=!1)},"Cancel"),t("button",{class:"delete-btn",onClick:et},"Remove")])])])])):v("",!0),T.value?(a(),i("div",ws,[t("div",gs,[t("div",Cs,[e[46]||(e[46]=t("h3",null,"Remove Client",-1)),e[47]||(e[47]=t("p",null,"Are you sure you want to remove this client from the task?",-1)),t("div",_s,[t("button",{class:"cancel-btn",onClick:e[4]||(e[4]=n=>T.value=!1)},"Cancel"),t("button",{class:"delete-btn",onClick:ot},"Remove")])])])])):v("",!0)]))])}}},Ds=bt(ys,[["__scopeId","data-v-4a1a5fa1"]]);export{Ds as default};
