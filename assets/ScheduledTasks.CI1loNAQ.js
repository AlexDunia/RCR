import{m as V,r as p,c as C,o as N,h as b,b as o,i,F as _,f as h,e as a,p as m,j as d,k as g,l as v,t as l,n as D}from"./vendor.BkLxJZRI.js";import{T as $,a as B}from"./TaskNavigation.Dj8AAwZQ.js";import{_ as f}from"./index.D9hZA4Ik.js";const I={class:"scheduled-tasks"},L={key:0,class:"tasks-loading-skeleton"},M={key:1,class:"empty-state"},j={key:2,class:"tasks-list"},z={class:"task-header"},F={class:"task-title"},H={class:"task-date"},O={class:"task-body"},J={class:"task-description"},A={class:"task-footer"},E={class:"task-actions"},R=["onClick"],U={__name:"ScheduledTaskList",setup(y){const k=V(),n=p(!0),c=p([]),u=C(()=>c.value.filter(t=>t.status==="scheduled")),w=t=>t?new Date(t).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"No date",T=t=>{if(!t.description||t.description.length===0)return"No description provided";const s=t.description.join(" ");return s.length>100?s.substring(0,100)+"...":s},S=t=>{const s={...t,status:"in_progress",startedAt:new Date().toISOString()},r=c.value.map(e=>e.id===t.id?s:e);localStorage.setItem("tasks",JSON.stringify(r)),k.push(`/tasks/${t.id}`)},x=()=>{n.value=!0,setTimeout(()=>{try{const t=localStorage.getItem("tasks");t&&(c.value=JSON.parse(t))}catch(t){console.error("Failed to load tasks:",t)}finally{n.value=!1}},800)};return N(()=>{x()}),(t,s)=>{const r=b("router-link");return i(),o("div",I,[n.value?(i(),o("div",L,[(i(),o(_,null,h(3,e=>a("div",{key:e,class:"task-skeleton"},s[0]||(s[0]=[m('<div class="task-skeleton-header" data-v-093786e0><div class="task-skeleton-title" data-v-093786e0></div><div class="task-skeleton-date" data-v-093786e0></div></div><div class="task-skeleton-body" data-v-093786e0><div class="task-skeleton-text" data-v-093786e0></div><div class="task-skeleton-text short" data-v-093786e0></div></div><div class="task-skeleton-footer" data-v-093786e0><div class="task-skeleton-badge" data-v-093786e0></div><div class="task-skeleton-actions" data-v-093786e0></div></div>',3)]))),64))])):u.value.length===0?(i(),o("div",M,[s[2]||(s[2]=m('<div class="empty-state-icon" data-v-093786e0><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-v-093786e0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-093786e0></path></svg></div><h2 class="empty-state-title" data-v-093786e0>No scheduled tasks</h2><p class="empty-state-description" data-v-093786e0>You don&#39;t have any scheduled tasks yet. Create a new task to get started.</p>',3)),d(r,{to:"/tasks/create",class:"empty-state-btn"},{default:g(()=>s[1]||(s[1]=[v(" Create Task ")])),_:1})])):(i(),o("div",j,[(i(!0),o(_,null,h(u.value,e=>(i(),o("div",{key:e.id,class:"task-card"},[a("div",z,[a("h2",F,l(e.title),1),a("div",H,[s[3]||(s[3]=a("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",class:"icon"},[a("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})],-1)),v(" "+l(w(e.startDate)),1)])]),a("div",O,[a("p",J,l(T(e)),1)]),a("div",A,[a("div",{class:D(["task-priority",`priority-${e.priority.toLowerCase()}`])},l(e.priority),3),a("div",E,[d(r,{to:`/tasks/${e.id}`,class:"task-action-btn view"},{default:g(()=>s[4]||(s[4]=[v(" View Details ")])),_:2},1032,["to"]),a("button",{class:"task-action-btn start",onClick:K=>S(e)}," Start Task ",8,R)])])]))),128))]))])}}},Y=f(U,[["__scopeId","data-v-093786e0"]]),q={class:"task-home"},G={__name:"ScheduledTasks",setup(y){return(k,n)=>(i(),o("div",q,[d($),d(B),d(Y)]))}},X=f(G,[["__scopeId","data-v-a6ca11d8"]]);export{X as default};
