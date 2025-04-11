import{r as h,o as ot,b as a,i as e,e as t,q as C,u as W,F as m,f as b,t as d,n as M,z as N,A as j,l as J,p as D,y as G,H as lt,J as it,g as nt,j as rt,s as ct,v as vt}from"./vendor.BkLxJZRI.js";import{_ as dt}from"./index.D9hZA4Ik.js";const ut=()=>{const H=h(!1),S=h(null),v=h([{id:"X",name:"X",data:[70,55,30,40,20,80,55],lastUpdated:"2023-10-15T10:00:00Z",totalFollowers:20},{id:"Facebook",name:"Facebook",data:[70,55,30,40,20,80,55],lastUpdated:"2023-10-15T10:00:00Z",totalFollowers:20},{id:"LinkedIn",name:"LinkedIn",data:[70,55,30,40,20,80,55],lastUpdated:"2023-10-15T10:00:00Z",totalFollowers:20}]);return{socialPlatforms:v,isLoading:H,error:S,fetchSocialMediaData:async(F=null)=>{H.value=!0,S.value=null;try{await new Promise(k=>setTimeout(k,500)),v.value=[{id:"X",name:"X",data:[70,55,30,40,20,80,55],lastUpdated:new Date().toISOString(),totalFollowers:20},{id:"Facebook",name:"Facebook",data:[70,55,30,40,20,80,55],lastUpdated:new Date().toISOString(),totalFollowers:20},{id:"LinkedIn",name:"LinkedIn",data:[70,55,30,40,20,80,55],lastUpdated:new Date().toISOString(),totalFollowers:20}],console.log("Social media data loaded")}catch(k){console.error("Error fetching social media data:",k),S.value=k.message||"Failed to load social media data"}finally{H.value=!1}}}},ht={class:"social-graphs-section"},gt={key:0,class:"grid grid-cols-1 md:grid-cols-3 gap-6"},pt={key:1,class:"bg-red-50 p-4 rounded-lg text-red-600"},mt={key:2,class:"grid grid-cols-1 md:grid-cols-3 gap-6"},bt={class:"flex justify-between items-center mb-6"},ft={class:"flex items-center"},wt={class:"font-semibold text-gray-900"},yt={class:"flex justify-between items-center mb-6"},_t={class:"text-sm text-gray-500"},xt={class:"relative"},kt=["onClick"],Ct={key:0,class:"absolute right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 w-36"},$t={class:"relative h-40"},Lt={class:"absolute left-8 right-0 top-0 bottom-5 flex items-end justify-between"},Mt={key:0,class:"absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2"},St=["onMouseenter"],Ft={class:"text-xs text-gray-400 mt-1"},It={class:"mt-4 text-center"},Dt=["onClick"],Ht={class:"bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-auto"},Vt={class:"flex justify-between items-center mb-6"},zt={class:"flex items-center"},Tt={class:"text-xl font-semibold"},Pt={class:"relative h-64 mt-8 mb-8"},Nt={class:"absolute left-12 right-0 top-0 bottom-8 flex items-end justify-between"},jt={key:0,class:"absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2"},Bt=["onMouseenter"],At={class:"text-sm text-gray-400 mt-2"},Ut={class:"border-t border-gray-200 pt-6"},Et={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},Xt={class:"bg-gray-50 p-4 rounded"},Zt={class:"text-xl font-semibold"},Ot={class:"bg-gray-50 p-4 rounded"},Wt={class:"text-xl font-semibold"},Gt={__name:"SocialMediaGraphs",setup(H){const S={template:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
    </svg>
  `},v={template:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  `},f={template:`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  `},{socialPlatforms:F,isLoading:k,error:w,fetchSocialMediaData:V}=ut(),u=h(null),y=h(null),I=h(!1),_=h(null),B=r=>{switch(r){case"X":return S;case"Facebook":return v;case"LinkedIn":return f;default:return null}},A=r=>{switch(r){case"X":return"bg-[#000000]";case"Facebook":return"bg-[#1877F2]";case"LinkedIn":return"bg-[#0A66C2]";default:return"bg-gray-500"}},U=r=>{switch(r){case"X":return"#000000";case"Facebook":return"#1877F2";case"LinkedIn":return"#0A66C2";default:return"#6B7280"}},z=(r,o=!1)=>{const $=o?["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],x=(new Date().getDay()-(6-r))%7;return $[x<0?x+7:x]},E=r=>r?new Date(r).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}):"",q=r=>{u.value===r?u.value=null:u.value=r},X=r=>{_.value=r,I.value=!0,u.value=null},Z=()=>{I.value=!1,_.value=null};return ot(()=>{V();const r=o=>{u.value&&!o.target.closest(".relative")&&(u.value=null)};return document.addEventListener("click",r),()=>{document.removeEventListener("click",r)}}),(r,o)=>{var $,T,x,O,l,s;return e(),a("div",ht,[o[13]||(o[13]=t("h2",{class:"text-xl font-semibold mb-6"},"Social Media Insights",-1)),W(k)?(e(),a("div",gt,[(e(),a(m,null,b(3,n=>t("div",{key:n,class:"bg-white rounded-lg p-6 border border-gray-200 animate-pulse"},o[2]||(o[2]=[t("div",{class:"h-6 bg-gray-200 rounded w-1/3 mb-4"},null,-1),t("div",{class:"h-40 bg-gray-100 rounded"},null,-1)]))),64))])):W(w)?(e(),a("div",pt,d(W(w)),1)):(e(),a("div",mt,[(e(!0),a(m,null,b(W(F),n=>(e(),a("div",{key:n.id,class:"bg-white rounded-lg p-6 border border-gray-200"},[t("div",bt,[t("div",ft,[t("div",{class:M(["w-8 h-8 rounded flex items-center justify-center mr-3",A(n.id)])},[(e(),N(j(B(n.id)),{class:"w-5 h-5 text-white"}))],2),t("h3",wt,d(n.name),1)]),o[3]||(o[3]=t("a",{href:"#",class:"text-xs text-gray-500 hover:text-gray-700"},"view all",-1))]),t("div",yt,[t("div",_t,d(n.totalFollowers)+" followers ",1),t("div",xt,[t("button",{class:"text-sm text-gray-700 border border-gray-200 rounded px-3 py-1 flex items-center",onClick:g=>q(n.id)},o[4]||(o[4]=[J(" Last 7 days "),t("svg",{class:"w-4 h-4 ml-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 9l-7 7-7-7"})],-1)]),8,kt),u.value===n.id?(e(),a("div",Ct,o[5]||(o[5]=[D('<div class="py-1" data-v-471caab8><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-v-471caab8>Last 7 days</a><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-v-471caab8>Last 14 days</a><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-v-471caab8>Last 30 days</a><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-v-471caab8>Last 90 days</a></div>',1)]))):C("",!0)])]),t("div",$t,[o[6]||(o[6]=D('<div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400" data-v-471caab8><div data-v-471caab8>100</div><div data-v-471caab8>75</div><div data-v-471caab8>50</div><div data-v-471caab8>25</div><div data-v-471caab8>0</div></div><div class="absolute left-6 right-0 top-0 h-full" data-v-471caab8><div class="h-full flex flex-col justify-between" data-v-471caab8><div class="border-t border-gray-100 h-0" data-v-471caab8></div><div class="border-t border-gray-100 h-0" data-v-471caab8></div><div class="border-t border-gray-100 h-0" data-v-471caab8></div><div class="border-t border-gray-100 h-0" data-v-471caab8></div><div class="border-t border-gray-100 h-0" data-v-471caab8></div></div></div>',2)),t("div",Lt,[(e(!0),a(m,null,b(n.data,(g,p)=>(e(),a("div",{key:p,class:"relative flex flex-col items-center",style:{width:"14%"}},[y.value===`${n.id}-${p}`?(e(),a("div",Mt,d(g),1)):C("",!0),t("div",{class:"w-1/2 rounded-t transition-all duration-300",style:G({height:`${g}%`,backgroundColor:U(n.id)}),onMouseenter:L=>y.value=`${n.id}-${p}`,onMouseleave:o[0]||(o[0]=L=>y.value=null)},null,44,St),t("div",Ft,d(z(p)),1)]))),128))])]),t("div",It,[t("button",{class:"text-indigo-600 text-sm font-medium hover:text-indigo-800",onClick:g=>X(n)},o[7]||(o[7]=[t("svg",{class:"w-4 h-4 inline-block mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"})],-1),J(" EXPAND ")]),8,Dt)])]))),128))])),I.value?(e(),a("div",{key:3,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",onClick:lt(Z,["self"])},[t("div",Ht,[t("div",Vt,[t("div",zt,[t("div",{class:M(["w-10 h-10 rounded flex items-center justify-center mr-3",A((($=_.value)==null?void 0:$.id)||"")])},[(e(),N(j(B(((T=_.value)==null?void 0:T.id)||"")),{class:"w-6 h-6 text-white"}))],2),t("h3",Tt,d((x=_.value)==null?void 0:x.name)+" Insights",1)]),t("button",{onClick:Z,class:"text-gray-500 hover:text-gray-700"},o[8]||(o[8]=[t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)]))]),t("div",Pt,[o[9]||(o[9]=D('<div class="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-400" data-v-471caab8><div data-v-471caab8>100</div><div data-v-471caab8>75</div><div data-v-471caab8>50</div><div data-v-471caab8>25</div><div data-v-471caab8>0</div></div><div class="absolute left-10 right-0 top-0 h-full" data-v-471caab8><div class="h-full flex flex-col justify-between" data-v-471caab8><div class="border-t border-gray-100 h-0" data-v-471caab8></div><div class="border-t border-gray-100 h-0" data-v-471caab8></div><div class="border-t border-gray-100 h-0" data-v-471caab8></div><div class="border-t border-gray-100 h-0" data-v-471caab8></div><div class="border-t border-gray-100 h-0" data-v-471caab8></div></div></div>',2)),t("div",Nt,[(e(!0),a(m,null,b((O=_.value)==null?void 0:O.data,(n,g)=>{var p;return e(),a("div",{key:g,class:"relative flex flex-col items-center",style:{width:"14%"}},[y.value===`modal-${g}`?(e(),a("div",jt,d(n),1)):C("",!0),t("div",{class:"w-1/2 rounded-t transition-all duration-300",style:G({height:`${n}%`,backgroundColor:U(((p=_.value)==null?void 0:p.id)||"")}),onMouseenter:L=>y.value=`modal-${g}`,onMouseleave:o[1]||(o[1]=L=>y.value=null)},null,44,Bt),t("div",At,d(z(g,!0)),1)])}),128))])]),t("div",Ut,[o[12]||(o[12]=t("h4",{class:"font-semibold mb-4"},"Additional Insights",-1)),t("div",Et,[t("div",Xt,[o[10]||(o[10]=t("div",{class:"text-sm text-gray-500"},"Total Followers",-1)),t("div",Zt,d((l=_.value)==null?void 0:l.totalFollowers),1)]),t("div",Ot,[o[11]||(o[11]=t("div",{class:"text-sm text-gray-500"},"Last Updated",-1)),t("div",Wt,d(E((s=_.value)==null?void 0:s.lastUpdated)),1)])])])])])):C("",!0)])}}},qt=dt(Gt,[["__scopeId","data-v-471caab8"]]),Jt={class:"post-detail"},Rt={class:"post-preview-card"},Kt={class:"post-header"},Qt={class:"post-meta"},Yt={class:"post-date"},te={key:0},ee={key:1},ae={key:2},se={key:0,class:"creator-badge"},oe={class:"creator-name"},le={class:"post-content"},de={key:0,class:"truncated-content"},ie={key:1,class:"expanded-content"},ne={class:"mb-4"},re={class:"images-grid"},ce=["src","alt"],ve={class:"filter-section"},ue={class:"filter-buttons"},he=["onClick"],ge={key:0,class:"post-overview"},pe={class:"platform-info"},me={class:"stats-grid"},be={class:"stat-label"},fe={class:"stat-value"},we={key:1,class:"post-overview"},ye={class:"graphs-section"},_e={class:"graph-header"},xe={class:"platform-info"},ke={class:"platform-name"},Ce={class:"graph-actions"},$e=["onClick"],Le=["onClick"],Me=["onClick"],Se={class:"graph-container"},Fe={class:"graph-grid"},Ie={class:"y-axis"},De={class:"graph-bars"},He=["onMouseenter"],Ve={class:"x-label"},ze={key:0,class:"tooltip"},Te={class:"modal-header"},Pe={class:"expanded-graph-container"},Ne={class:"graph-grid"},je={class:"y-axis"},Be={class:"graph-bars"},Ae=["onMouseenter"],Ue={class:"x-label"},Ee={key:0,class:"tooltip"},Xe={class:"modal-footer"},Ze={__name:"PostDetail",setup(H){const S=nt(),v=h(null),f=h("All"),F=h(!1),k=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],w=it({platformId:null,index:-1}),V=h(!1),u=h(""),y=h([{id:"X",name:"X",data:[70,55,30,40,20,80,55],lastUpdated:"2023-10-15T10:00:00Z",totalFollowers:20},{id:"Facebook",name:"Facebook",data:[70,55,30,40,20,80,55],lastUpdated:"2023-10-15T10:00:00Z",totalFollowers:20},{id:"LinkedIn",name:"LinkedIn",data:[70,55,30,40,20,80,55],lastUpdated:"2023-10-15T10:00:00Z",totalFollowers:20}]),I=h({likes:600,comments:1500,shares:3006,impressions:15e3,reach:180,videoViews:"No videos posted",avgWatchTime:"Null"}),_=async()=>{try{console.log("Social media data loaded")}catch(l){console.error("Error fetching social media data:",l)}};ot(()=>{const l=S.params.id,s=JSON.parse(localStorage.getItem("posts")||"[]"),n=JSON.parse(localStorage.getItem("draftPosts")||"[]"),p=[...s,...n].find(L=>L.id===Number(l));p?v.value=p:v.value={id:Number(l),title:"Real Estate Market Trends 2025",content:"Here's my review on the 2025 real estate thing Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. hdtknsh ksusnl proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",status:"published",creationDate:new Date().toISOString(),lastEdited:new Date().toISOString(),images:["/images/house1.jpg","/images/house2.jpg","/images/house3.jpg"]},_()});const B=l=>{f.value=l;const s={X:{likes:200,retweets:500,comments:1002,impressions:5e3,linkClicks:"No links found",quotes:60},Facebook:{likes:200,comments:500,shares:1002,impressions:5e3,reach:60,videoViews:"No videos posted",avgWatchTime:"Null"},LinkedIn:{likes:200,comments:500,shares:1002,impressions:5e3,reach:60,videoViews:"No videos posted",avgWatchTime:"Null"},All:{likes:600,comments:1500,shares:3006,impressions:15e3,reach:180,videoViews:"No videos posted",avgWatchTime:"Null"}};I.value=s[l]},A=l=>{console.log(`View all clicked for: ${l}`)},U=l=>{console.log(`Dropdown clicked for: ${l}`)},z=(l,s)=>{w.platformId=l,w.index=s},E=()=>{w.platformId=null,w.index=-1},q=l=>{u.value=l,V.value=!0},X=()=>{V.value=!1},Z=()=>{const l=y.value.find(s=>s.id===u.value);return l?l.name:""},r=()=>{const l=y.value.find(s=>s.id===u.value);return l?l.data:[]},o=()=>{const l=y.value.find(n=>n.id===u.value);return l?new Date(l.lastUpdated).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}):""},$=l=>({X:{template:`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      `},Facebook:{template:`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      `},LinkedIn:{template:`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      `}})[l],T=()=>{F.value=!F.value},x=l=>l?new Date(l).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"}):"",O=l=>l.replace(/([A-Z])/g," $1").split(" ").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" ");return(l,s)=>{var n,g,p,L,R,K,Q,Y,tt,et,at,st;return e(),a("div",Jt,[t("div",Rt,[t("div",Kt,[t("div",Qt,[s[2]||(s[2]=t("h2",null,"Post details",-1)),t("div",Yt,[((n=v.value)==null?void 0:n.status)==="published"?(e(),a("span",te,"Published: "+d(x((g=v.value)==null?void 0:g.publishedDate)),1)):((p=v.value)==null?void 0:p.status)==="scheduled"?(e(),a("span",ee,"Scheduled for: "+d(x((L=v.value)==null?void 0:L.scheduledDate)),1)):(e(),a("span",ae,"Created: "+d(x((R=v.value)==null?void 0:R.creationDate)),1))]),(K=v.value)!=null&&K.creator?(e(),a("div",se,[s[1]||(s[1]=t("span",{class:"creator-label"},"Created by:",-1)),t("span",oe,d((Q=v.value)==null?void 0:Q.creator.name),1),t("span",{class:M(["creator-role",(Y=v.value)==null?void 0:Y.creator.role])},d((tt=v.value)==null?void 0:tt.creator.role),3)])):C("",!0),s[3]||(s[3]=D('<div class="platform-icons" data-v-95a5f763><div class="platform-icon-wrapper bg-[#000000]" data-v-95a5f763><svg viewBox="0 0 24 24" fill="currentColor" class="icon text-white" data-v-95a5f763><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-v-95a5f763></path></svg></div><div class="platform-icon-wrapper bg-[#1877F2]" data-v-95a5f763><svg viewBox="0 0 24 24" fill="currentColor" class="icon text-white" data-v-95a5f763><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" data-v-95a5f763></path></svg></div><div class="platform-icon-wrapper bg-[#0A66C2]" data-v-95a5f763><svg viewBox="0 0 24 24" fill="currentColor" class="icon text-white" data-v-95a5f763><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-v-95a5f763></path></svg></div></div>',1))]),s[4]||(s[4]=D('<div class="engagement-summary" data-v-95a5f763><div class="engagement-item" data-v-95a5f763><span class="icon-wrapper text-blue-600" data-v-95a5f763>❤️</span><span class="count" data-v-95a5f763>100</span></div><div class="engagement-item" data-v-95a5f763><span class="icon-wrapper text-gray-600" data-v-95a5f763>💬</span><span class="count" data-v-95a5f763>100</span></div><div class="engagement-item" data-v-95a5f763><span class="icon-wrapper text-gray-600" data-v-95a5f763>✖️</span></div></div>',1))]),t("div",le,[F.value?(e(),a("div",ie,[t("p",ne,d((at=v.value)==null?void 0:at.content),1),t("div",re,[(e(!0),a(m,null,b((st=v.value)==null?void 0:st.images,(i,c)=>(e(),a("div",{key:c,class:"image-container"},[t("img",{src:i,alt:"Post image "+(c+1),class:"post-image"},null,8,ce)]))),128))])])):(e(),a("p",de,d((et=v.value)==null?void 0:et.content.substring(0,100))+"...",1))]),t("button",{class:"view-more-btn",onClick:T},d(F.value?"Show less":"View more"),1)]),t("div",ve,[s[5]||(s[5]=t("span",{class:"filter-label"},"Filter Insights",-1)),t("div",ue,[(e(),a(m,null,b(["All","X","Facebook","LinkedIn"],i=>t("button",{key:i,class:M(["filter-btn",{active:f.value===i}]),onClick:c=>B(i)},[i!=="All"?(e(),N(j($(i)),{key:0,class:"platform-icon"})):C("",!0),J(" "+d(i),1)],10,he)),64))])]),f.value!=="All"?(e(),a("div",ge,[t("div",{class:M(["platform-header",f.value.toLowerCase()])},[t("div",pe,[(e(),N(j($(f.value)),{class:"platform-icon"})),t("div",null,[t("h3",null,d(f.value)+" Statistics",1),s[6]||(s[6]=t("p",null,"for @alexdunia_",-1))])])],2),t("div",me,[(e(!0),a(m,null,b(I.value,(i,c)=>(e(),a("div",{key:c,class:"stat-card"},[t("span",be,d(O(c)),1),t("span",fe,d(i),1)]))),128))])])):(e(),a("div",we)),s[8]||(s[8]=D('<div class="post-overview" data-v-95a5f763><div class="overview-header" data-v-95a5f763><div class="logo-container" data-v-95a5f763><div class="logo-placeholder" data-v-95a5f763>RC</div></div><div class="overview-title" data-v-95a5f763><h3 data-v-95a5f763>Post overview across <span data-v-95a5f763>all platforms</span></h3><p data-v-95a5f763>All data shown here is the combination of all platforms for this single post</p></div></div><div class="analytics-cards" data-v-95a5f763><div class="analytics-card" data-v-95a5f763><div class="card-title" data-v-95a5f763>All Followers</div><div class="card-value" data-v-95a5f763>20</div></div><div class="analytics-card" data-v-95a5f763><div class="card-title" data-v-95a5f763>Audience growth</div><div class="card-value" data-v-95a5f763>20</div></div><div class="analytics-card" data-v-95a5f763><div class="card-title" data-v-95a5f763>New Followers</div><div class="card-value" data-v-95a5f763>20</div></div><div class="analytics-card" data-v-95a5f763><div class="card-title" data-v-95a5f763>New Followers</div><div class="card-value" data-v-95a5f763>20</div></div></div></div>',1)),t("div",ye,[(e(!0),a(m,null,b(y.value,i=>ct((e(),a("div",{key:i.id,class:"graph-card"},[t("div",_e,[t("div",xe,[t("div",{class:M(["platform-icon-container",`bg-${i.id.toLowerCase()}`])},[(e(),N(j($(i.id)),{class:"w-8 h-8 text-white"}))],2),t("span",ke,d(i.name),1)]),t("div",Ce,[t("button",{class:"expand-btn",onClick:c=>q(i.id)},"Expand",8,$e),t("button",{class:"view-all-link",onClick:c=>A(i.id)},"View all",8,Le),t("div",{class:"time-filter",onClick:c=>U(i.id)},s[7]||(s[7]=[t("span",null,"Last 7 days",-1),t("svg",{class:"dropdown-icon",viewBox:"0 0 20 20",fill:"currentColor"},[t("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1)]),8,Me)])]),t("div",Se,[t("div",Fe,[t("div",Ie,[(e(),a(m,null,b(6,c=>t("div",{class:"y-tick",key:c},d((6-c)*20),1)),64))]),t("div",De,[(e(!0),a(m,null,b(i.data,(c,P)=>(e(),a("div",{class:"bar-container",key:P,onMouseenter:Oe=>z(i.id,P),onMouseleave:E},[t("div",{class:M(["bar",`${i.id.toLowerCase()}-bar`]),style:G({height:`${c}%`})},null,6),t("div",Ve,d(k[P]),1),w.platformId===i.id&&w.index===P?(e(),a("div",ze,d(c),1)):C("",!0)],40,He))),128))])])])])),[[vt,f.value==="All"||f.value===i.id]])),128))]),V.value?(e(),a("div",{key:2,class:"modal-overlay",onClick:X},[t("div",{class:"modal-content",onClick:s[0]||(s[0]=lt(()=>{},["stop"]))},[t("div",Te,[t("h3",null,d(Z())+" Insights",1),t("button",{class:"close-btn",onClick:X},"×")]),t("div",Pe,[t("div",Ne,[t("div",je,[(e(),a(m,null,b(6,i=>t("div",{class:"y-tick",key:i},d((6-i)*20),1)),64))]),t("div",Be,[(e(!0),a(m,null,b(r(),(i,c)=>(e(),a("div",{class:"bar-container",key:c,onMouseenter:P=>z(u.value,c),onMouseleave:E},[t("div",{class:M(["bar",`${u.value.toLowerCase()}-bar`]),style:G({height:`${i}%`})},null,6),t("div",Ue,d(k[c]),1),w.platformId===u.value&&w.index===c?(e(),a("div",Ee,d(i),1)):C("",!0)],40,Ae))),128))])])]),t("div",Xe,[t("p",null,"Last updated: "+d(o()),1)])])])):C("",!0),rt(qt)])}}},qe=dt(Ze,[["__scopeId","data-v-95a5f763"]]);export{qe as default};
