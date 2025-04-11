import{c as _,r as p,o as G,m as J,w as U,b as l,e,j as q,s as k,z,q as A,l as D,F as g,f as C,k as W,n as f,t as r,I as K,i,H as N}from"./vendor.BkLxJZRI.js";import{C as Q}from"./ConfirmationModal.BTB_lDus.js";import{M as X}from"./MarketingContentLoader.DBTRSD-D.js";import{g as Z,a as R,i as ee,j as te,h as se,_ as oe}from"./index.D9hZA4Ik.js";import"./Loader.DmE7AJNn.js";function ae(E){const m=()=>R().currentRole,n=_(()=>m()),h=v=>se(v,n.value),d=v=>te(v,n.value),u=v=>ee(v,n.value),b=_(()=>Z(n.value)),T=_(()=>n.value==="admin"),y=_(()=>n.value==="agent");return{can:h,canAny:d,canAll:u,permissions:b,role:n,isAdmin:T,isAgent:y}}const ie={class:"social-platforms"},ne={class:"social-platforms__header"},le={class:"tab-navigation"},re=["onClick"],de={key:0,class:"tab-button__count"},ce={class:"posts-container"},ue=["onClick"],ve=["src","alt"],me={class:"post-card__title"},he={class:"post-card__schedule"},pe=["onClick"],ge=["onClick"],fe={key:1,class:"empty-state"},_e={class:"social-profiles-section"},be={class:"profiles-list"},ke={class:"profile-icon"},De={class:"profile-info"},ye={class:"profile-stats"},Se={class:"social-insights-section"},Te={class:"insights-grid"},Pe={class:"insight-card"},we={class:"insight-value"},Ce={class:"insight-card"},xe={class:"insight-value"},Me={class:"insight-card"},Ie={class:"insight-value"},Ae={class:"insight-card"},Ne={class:"insight-value"},Re={__name:"SocialPlatforms",setup(E){const m=J(),n=p("scheduled"),h=p(!1),d=p({title:"",message:"",type:"",confirmText:"",cancelText:"Cancel",action:null}),u=p(null),{can:b}=ae(),T=R(),y=_(()=>T.currentRole==="admin");G(()=>{if(y.value){m.replace("/marketing-tools/admin-social");return}console.log("SocialPlatforms component mounted"),x()}),U(()=>m.currentRoute.value.query,()=>{y.value||(console.log("Route query changed, reloading data"),x())},{immediate:!0});const v=[{id:"drafts",name:"Drafts"},{id:"scheduled",name:"Scheduled"},{id:"published",name:"Published"}],c=p([{id:1,title:"Mastering client connections for better results",image:"https://picsum.photos/800/600?random=1",creationDate:"2024-12-01T10:00:00",scheduledDate:"2024-12-05T10:00:00",status:"scheduled"},{id:2,title:"How to showcase your properties effectively",image:"https://picsum.photos/800/600?random=2",creationDate:"2023-12-03T09:15:00",publishedDate:"2023-12-03T09:15:00",status:"published"},{id:3,title:"5 Tips for Real Estate Photography",image:"https://picsum.photos/800/600?random=3",creationDate:"2023-12-02T14:30:00",publishedDate:"2023-12-02T14:30:00",status:"published"},{id:4,title:"Market Trends: December 2023",image:"https://picsum.photos/800/600?random=4",creationDate:"2023-12-01T11:20:00",publishedDate:"2023-12-01T11:20:00",status:"published"},{id:5,title:"Staging Your Home: A Complete Guide",image:"https://picsum.photos/800/600?random=5",creationDate:"2023-11-30T16:45:00",publishedDate:"2023-11-30T16:45:00",status:"published"},{id:6,title:"Understanding Property Valuations",image:"https://picsum.photos/800/600?random=6",creationDate:"2023-11-29T13:15:00",publishedDate:"2023-11-29T13:15:00",status:"published"}]);function x(){console.log("Loading data in SocialPlatforms");const o=localStorage.getItem("draftPosts");if(o)try{const a=JSON.parse(o);c.value=c.value.filter(s=>s.status!=="drafts"),a.forEach(s=>{c.value.push(s)}),console.log("Loaded drafts:",a)}catch(a){console.error("Error loading drafts:",a)}const t=localStorage.getItem("pendingPost");if(t)try{const a=JSON.parse(t);B(a)}catch(a){console.error("Error loading pending post:",a),localStorage.removeItem("pendingPost")}}const M=_(()=>c.value.filter(o=>o.status===n.value)),I=o=>c.value.filter(t=>t.status===o).length,P=o=>new Date(o).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}),L=()=>{b("create-social-posts")?m.push("/marketing-tools/social-platforms/create"):alert("You do not have permission to create posts")},O=o=>{b("edit-social-posts")?m.push(`/marketing-tools/social-platforms/edit/${o.id}`):alert("You do not have permission to edit posts")},$=o=>{b("delete-social-posts")?(u.value=o,h.value=!0,d.value={title:"Delete Post",message:`Are you sure you want to delete "${o.title}"?`,type:"danger",confirmText:"Delete",action:"delete"}):alert("You do not have permission to delete posts")},B=o=>{u.value=o,h.value=!0,d.value={title:"Save to Drafts",message:"You have unsaved changes. Would you like to save this post to drafts?",type:"info",confirmText:"Save to Drafts",cancelText:"Discard",action:"saveToDrafts"}},H=o=>{o.id||(o.id=Date.now()),o.status="drafts",o.creationDate||(o.creationDate=new Date().toISOString());const t=c.value.findIndex(s=>s.id===o.id);t===-1?c.value.push(o):c.value[t]=o;const a=c.value.filter(s=>s.status==="drafts");localStorage.setItem("draftPosts",JSON.stringify(a)),localStorage.removeItem("pendingPost"),n.value="drafts"},V=()=>{if(u.value){if(d.value.action==="delete"){const o=c.value.findIndex(t=>t.id===u.value.id);if(o!==-1&&(c.value.splice(o,1),u.value.status==="drafts")){const t=c.value.filter(a=>a.status==="drafts");localStorage.setItem("draftPosts",JSON.stringify(t))}}else d.value.action==="saveToDrafts"&&H(u.value);h.value=!1,u.value=null}},Y=()=>{d.value.action==="saveToDrafts"&&localStorage.removeItem("pendingPost"),h.value=!1,u.value=null},F=o=>{console.log("Navigating to post detail page",o.id),m.push(`/marketing-tools/social-platforms/post/${o.id}`)},j=p([{id:"facebook",name:"Facebook",icon:"fb",handle:"@yourbusiness",followers:1250,engagement:3.2},{id:"instagram",name:"Instagram",icon:"ig",handle:"@yourbusiness",followers:2800,engagement:4.7},{id:"twitter",name:"Twitter",icon:"tw",handle:"@yourbusiness",followers:965,engagement:2.1}]),S=p({impressions:"15,872",engagement:"3.8",clickThrough:"2.4",audienceGrowth:"+185"});return(o,t)=>{const a=K("can");return i(),l("div",ie,[e("div",ne,[k((i(),l("button",{class:"create-post-button",onClick:L},t[0]||(t[0]=[e("span",{class:"create-post-button__icon"},"+",-1),D(" CREATE POST ")]))),[[a,"create-social-posts"]]),e("div",le,[(i(),l(g,null,C(v,s=>e("button",{key:s.id,class:f(["tab-button",{"tab-button--active":n.value===s.id}]),onClick:w=>n.value=s.id},[D(r(s.name)+" ",1),I(s.id)?(i(),l("span",de,r(I(s.id)),1)):A("",!0)],10,re)),64))])]),q(X,null,{default:W(()=>[e("div",ce,[M.value.length?(i(),l("div",{key:0,class:f(["posts-list",{"posts-list--grid":n.value==="published"}])},[(i(!0),l(g,null,C(M.value,s=>(i(),l("article",{key:s.id,class:f(["post-card",{"post-card--grid":n.value==="published"}]),onClick:w=>F(s)},[e("div",{class:f(["post-card__thumbnail",{"post-card__thumbnail--grid":n.value==="published"}])},[e("img",{src:s.image,alt:s.title},null,8,ve)],2),e("div",{class:f(["post-card__content",{"post-card__content--grid":n.value==="published"}])},[e("h3",me,r(s.title),1),e("p",he,[s.status==="drafts"?(i(),l(g,{key:0},[D(" Created: "+r(P(s.creationDate)),1)],64)):s.status==="scheduled"?(i(),l(g,{key:1},[D(" Scheduled for: "+r(P(s.scheduledDate)),1)],64)):(i(),l(g,{key:2},[D(" Published: "+r(P(s.publishedDate||s.creationDate)),1)],64))])],2),e("div",{class:f(["post-card__actions",{"post-card__actions--grid":n.value==="published"}])},[k((i(),l("button",{class:"action-button action-button--edit",onClick:N(w=>O(s),["stop"]),"aria-label":"Edit post"},t[1]||(t[1]=[e("svg",{class:"action-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})],-1)]),8,pe)),[[a,"edit-social-posts"]]),k((i(),l("button",{class:"action-button action-button--delete",onClick:N(w=>$(s),["stop"]),"aria-label":"Delete post"},t[2]||(t[2]=[e("svg",{class:"action-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1)]),8,ge)),[[a,"delete-social-posts"]])],2)],10,ue))),128))],2)):(i(),l("div",fe,t[3]||(t[3]=[e("p",null,"No posts found in this category.",-1)])))])]),_:1}),k((i(),l("div",_e,[t[5]||(t[5]=e("h2",null,"Your Social Media Profiles",-1)),e("div",be,[(i(!0),l(g,null,C(j.value,s=>(i(),l("div",{class:"profile-card",key:s.id},[e("div",ke,r(s.icon),1),e("div",De,[e("h3",null,r(s.name),1),e("p",null,r(s.handle),1),e("div",ye,[e("span",null,r(s.followers)+" followers",1),e("span",null,r(s.engagement)+"% engagement",1)])]),t[4]||(t[4]=e("button",{class:"profile-action"},"Manage",-1))]))),128))])])),[[a,"access-social-profiles"]]),k((i(),l("div",Se,[t[14]||(t[14]=e("h2",null,"Social Media Insights",-1)),e("div",Te,[e("div",Pe,[t[6]||(t[6]=e("h3",null,"Impressions",-1)),e("div",we,r(S.value.impressions),1),t[7]||(t[7]=e("div",{class:"insight-trend positive"},"+12.5%",-1))]),e("div",Ce,[t[8]||(t[8]=e("h3",null,"Engagement",-1)),e("div",xe,r(S.value.engagement)+"%",1),t[9]||(t[9]=e("div",{class:"insight-trend positive"},"+5.3%",-1))]),e("div",Me,[t[10]||(t[10]=e("h3",null,"Click-through",-1)),e("div",Ie,r(S.value.clickThrough)+"%",1),t[11]||(t[11]=e("div",{class:"insight-trend negative"},"-2.1%",-1))]),e("div",Ae,[t[12]||(t[12]=e("h3",null,"Audience Growth",-1)),e("div",Ne,r(S.value.audienceGrowth),1),t[13]||(t[13]=e("div",{class:"insight-trend positive"},"+8.7%",-1))])])])),[[a,"view-social-insights"]]),h.value?(i(),z(Q,{key:0,title:d.value.title,message:d.value.message,type:d.value.type,"confirm-text":d.value.confirmText,"cancel-text":d.value.cancelText,onConfirm:V,onCancel:Y},null,8,["title","message","type","confirm-text","cancel-text"])):A("",!0)])}}},He=oe(Re,[["__scopeId","data-v-238d8e55"]]);export{He as default};
