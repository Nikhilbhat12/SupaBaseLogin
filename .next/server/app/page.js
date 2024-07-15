(()=>{var e={};e.id=931,e.ids=[931],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},41808:e=>{"use strict";e.exports=require("net")},71017:e=>{"use strict";e.exports=require("path")},85477:e=>{"use strict";e.exports=require("punycode")},12781:e=>{"use strict";e.exports=require("stream")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},59796:e=>{"use strict";e.exports=require("zlib")},16447:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>u,routeModule:()=>x,tree:()=>c}),r(59821),r(2143),r(35866);var s=r(23191),a=r(88716),i=r(37922),o=r.n(i),n=r(95231),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let c=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,59821)),"C:\\Users\\nikhi\\OneDrive\\Desktop\\Project\\SupaBaseLogin\\app\\page.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,2143)),"C:\\Users\\nikhi\\OneDrive\\Desktop\\Project\\SupaBaseLogin\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["C:\\Users\\nikhi\\OneDrive\\Desktop\\Project\\SupaBaseLogin\\app\\page.tsx"],d="/page",p={require:r,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},74287:(e,t,r)=>{Promise.resolve().then(r.bind(r,98687))},98687:(e,t,r)=>{"use strict";r.d(t,{default:()=>u});var s=r(10326),a=r(33071),i=r(17577),o=r(90772),n=r(82782),l=r(35047),c=r(58806);let u=()=>{let[e,t]=(0,i.useState)(null),r=(0,c.a)(e=>e.setUser),[u,d]=(0,i.useState)([]);(0,c.a)(e=>e.user);let p=(0,n.e)(),x=(0,l.useRouter)(),m=async()=>{let{data:e,error:s}=await p.auth.getUser();if(s){console.error("Error fetching user:",s.message);return}let a=e?.user;t(a),r(a)};async function g(){try{let{data:e,error:t}=await p.from("blogs").select("*");if(t)throw t;d(e),console.log("Blogs retrieved successfully:",e)}catch(e){console.error("Error retrieving blogs:",e.message)}}return((0,i.useEffect)(()=>{m()},[]),(0,i.useEffect)(()=>{e&&g()},[e]),null!==e)?(0,s.jsxs)("div",{children:[(0,s.jsxs)("p",{className:"fixed left-0 top-20 w-full flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-6    backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit gap-5 items-center",children:[(0,s.jsxs)("code",{className:"font-mono font-bold",children:["Hello"," ",(e?.user?.user_metadata?.full_name||e?.user_metadata?.full_name)??"user","!"]}),s.jsx(o.z,{onClick:()=>{x.push("/dashboard")},variant:"outline",children:"Add a new Blog"})]}),s.jsx("div",{className:"mt-20 fixed mb-90 overflow-y-auto h-[calc(100vh-10rem)]",children:u&&u.length>0?s.jsx("div",{className:"grid grid-cols-1 gap-4",children:u.map(e=>(0,s.jsxs)(a.Zb,{className:"shadow-md mb-4 mx-4 sm:mx-10 flex flex-col sm:flex-row",children:[s.jsx("div",{className:"flex-shrink-0",children:s.jsx("img",{src:`https://hsuaakcahbyougsgblxw.supabase.co/storage/v1/object/public/images/${e.file_url}`,alt:"Blog Image",className:"w-80 h-40 rounded-lg"})}),(0,s.jsxs)("div",{className:"flex-grow p-4",children:[s.jsx("h3",{className:"text-xl font-bold mb-2",children:e.title}),s.jsx("p",{className:"text-gray-700 mb-4",children:e.description}),s.jsx("div",{className:"flex space-x-2"})]})]},e.id))}):s.jsx("p",{className:"text-gray-600",children:"No blogs found."})})]}):s.jsx("p",{className:"fixed left-0 top-30 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl    dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30",children:"Please Login to view content\xa0"})}},59821:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var s=r(19510),a=r(68570);let i=(0,a.createProxy)(String.raw`C:\Users\nikhi\OneDrive\Desktop\Project\SupaBaseLogin\components\ui\UserGreetText.tsx`),{__esModule:o,$$typeof:n}=i;i.default;let l=(0,a.createProxy)(String.raw`C:\Users\nikhi\OneDrive\Desktop\Project\SupaBaseLogin\components\ui\UserGreetText.tsx#default`);function c(){return s.jsx("main",{className:"flex flex-col items-center1 justify-between",children:s.jsx("div",{className:"z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex",children:s.jsx(l,{})})})}}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[948,614,621,634,25],()=>r(16447));module.exports=s})();