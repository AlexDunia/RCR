import{r as f,o as h,a as k,b as c,i as l,x as w,y as x,n as V,m as $,c as S,j as d,q as y,k as u,e as s,F as A,f as L,z as N,t as m,p as B,l as p,h as C}from"./vendor.BkLxJZRI.js";import{u as P}from"./propertyStore.BdPrXHKc.js";import{_,c as I}from"./index.D9hZA4Ik.js";const T={__name:"AnimationWrapper",props:{delay:{type:Number,default:0},duration:{type:Number,default:600},distance:{type:Number,default:30},noAnimation:{type:Boolean,default:!1}},setup(v){const a=v,i=f(!1),e=f(null),t=f(null);return h(()=>{if(a.noAnimation){i.value=!0;return}t.value=new IntersectionObserver(r=>{r.forEach(n=>{n.isIntersecting&&(setTimeout(()=>{i.value=!0},a.delay),t.value.unobserve(n.target))})},{threshold:.1}),e.value&&t.value.observe(e.value),setTimeout(()=>{i.value||(i.value=!0)},a.delay+1e3)}),k(()=>{t.value&&e.value&&(t.value.unobserve(e.value),t.value.disconnect())}),(r,n)=>(l(),c("div",{ref_key:"el",ref:e,class:V(["animation-wrapper",{visible:i.value,"no-animation":a.noAnimation}]),style:x({"--animation-delay":`${a.delay}ms`,"--animation-duration":`${a.duration}ms`,"--animation-distance":`${a.distance}px`})},[w(r.$slots,"default",{},void 0,!0)],6))}},g=_(T,[["__scopeId","data-v-8f2c16ec"]]),z={class:"property-list"},D={key:0,class:"no-listings"},E={key:0,class:"property-grid"},F={class:"property-card"},W={class:"property-image"},Y=["src","alt"],j={class:"property-details"},q={class:"address"},H={class:"price"},M=["onClick"],O={__name:"AgentPersonalListingsView",setup(v){const a=P(),i=$(),e=S(()=>a.properties),t=r=>{i.push(`/property/${r}`)};return(r,n)=>(l(),c("div",z,[d(g,{delay:50},{default:u(()=>[e.value.length===0?(l(),c("div",D,n[0]||(n[0]=[s("p",null,"You currently have no properties listed.",-1)]))):y("",!0)]),_:1}),e.value.length>0?(l(),c("div",E,[(l(!0),c(A,null,L(e.value,(o,b)=>(l(),N(g,{key:o.id,delay:100+b*50,distance:20},{default:u(()=>[s("div",F,[s("div",W,[s("img",{src:o.image,alt:o.name},null,8,Y),n[1]||(n[1]=s("div",{class:"edit-icon"},[s("i",{class:"fas fa-pen"})],-1))]),s("div",j,[s("h3",null,m(o.name),1),s("p",q,m(o.location),1),s("p",H,m(o.price),1),s("button",{onClick:Q=>t(o.id)},"View property",8,M)])])]),_:2},1032,["delay"]))),128))])):y("",!0)]))}},R=_(O,[["__scopeId","data-v-f07fd9fa"]]),U={class:"manage-listings"},G={class:"tab-navigation"},J={class:"tab-item"},K={__name:"ViewListings",setup(v){return I().setTitle("View Listings"),(i,e)=>{const t=C("router-link");return l(),c("div",U,[s("div",G,[d(t,{to:"/add-listing",replace:""},{default:u(()=>e[0]||(e[0]=[s("i",{class:"fas fa-plus-circle"},null,-1),p(" Add Listing ")])),_:1}),s("div",J,[d(t,{to:"/view-listings",class:"special",replace:""},{default:u(()=>e[1]||(e[1]=[s("i",{class:"fas fa-home",id:"special"},null,-1),p(" View Listings ")])),_:1}),e[2]||(e[2]=s("div",{class:"special-underline"},null,-1))]),d(t,{to:"/pending-approvals",class:"pend",replace:""},{default:u(()=>e[3]||(e[3]=[s("i",{class:"fas fa-clock"},null,-1),p(" Pending Approvals ")])),_:1}),d(t,{to:"/drafts",class:"drafts",replace:""},{default:u(()=>e[4]||(e[4]=[s("i",{class:"fas fa-file-alt"},null,-1),p(" Drafts ")])),_:1}),e[5]||(e[5]=s("div",{class:"tab-underline"},null,-1))]),e[6]||(e[6]=B('<br data-v-06d5ccdf><div class="second-special-underline" data-v-06d5ccdf></div><div class="add-property-container" data-v-06d5ccdf><div class="add-property" data-v-06d5ccdf><h2 data-v-06d5ccdf>Your Properties </h2><p data-v-06d5ccdf> A list of all properties on your profile </p></div><div class="search-bar" data-v-06d5ccdf><svg class="search-icon" viewBox="0 0 24 24" data-v-06d5ccdf><circle cx="11" cy="11" r="8" stroke="black" stroke-width="1.5" fill="none" data-v-06d5ccdf></circle><line x1="16" y1="16" x2="22" y2="22" stroke="black" stroke-width="1.5" data-v-06d5ccdf></line></svg><input type="text" placeholder="Search..." data-v-06d5ccdf></div></div>',3)),d(R)])}}},se=_(K,[["__scopeId","data-v-06d5ccdf"]]);export{se as default};
