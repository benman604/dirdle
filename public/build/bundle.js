(()=>{"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function l(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t){return 0===Object.keys(t).length}function s(t){return null==t?"":t}new Set;let i,u=!1;function a(t,e){t.appendChild(e)}function f(t,e,n){t.insertBefore(e,n||null)}function h(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function g(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function m(){return p(" ")}function $(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function w(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function b(t){i=t}function v(){if(!i)throw new Error("Function called outside component initialization");return i}function k(){const t=v();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const l=function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(e,n);o.slice().forEach((e=>{e.call(t,l)}))}}}new Map;const _=[],x=[],C=[],E=[],j=Promise.resolve();let T=!1;function M(t){C.push(t)}const L=new Set;let O=0;function N(){const t=i;do{for(;O<_.length;){const t=_[O];O++,b(t),S(t.$$)}for(b(null),_.length=0,O=0;x.length;)x.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];L.has(e)||(L.add(e),e())}C.length=0}while(_.length);for(;E.length;)E.pop()();T=!1,L.clear(),b(t)}function S(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}const q=new Set;let A;function B(t,e){t&&t.i&&(q.delete(t),t.i(e))}function z(t,e,n,o){if(t&&t.o){if(q.has(t))return;q.add(t),A.c.push((()=>{q.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const G="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;let H;function K(t){t&&t.c()}function W(t,n,r,c){const{fragment:s,on_mount:i,on_destroy:u,after_update:a}=t.$$;s&&s.m(n,r),c||M((()=>{const n=i.map(e).filter(l);u?u.push(...n):o(n),t.$$.on_mount=[]})),a.forEach(M)}function Y(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function D(e,l,r,c,s,a,f,d=[-1]){const g=i;b(e);const p=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:s,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l.context||(g?g.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:l.target||g.$$.root};f&&f(p.root);let m=!1;if(p.ctx=r?r(e,l.props||{},((t,n,...o)=>{const l=o.length?o[0]:n;return p.ctx&&s(p.ctx[t],p.ctx[t]=l)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](l),m&&function(t,e){-1===t.$$.dirty[0]&&(_.push(t),T||(T=!0,j.then(N)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(e,t)),n})):[],p.update(),m=!0,o(p.before_update),p.fragment=!!c&&c(p.ctx),l.target){if(l.hydrate){u=!0;const t=($=l.target,Array.from($.childNodes));p.fragment&&p.fragment.l(t),t.forEach(h)}else p.fragment&&p.fragment.c();l.intro&&B(e.$$.fragment),W(e,l.target,l.anchor,l.customElement),u=!1,N()}var $;b(g)}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]),"function"==typeof HTMLElement&&(H=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:t}=this.$$;this.$$.on_disconnect=t.map(e).filter(l);for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}disconnectedCallback(){o(this.$$.on_disconnect)}$destroy(){Y(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){this.$$set&&!c(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});class F{$destroy(){Y(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){this.$$set&&!c(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const{window:P}=G;function R(t,e,n){const o=t.slice();return o[9]=e[n],o[11]=n,o}function I(t){let e,n,o,l=t[4](t[11],t[2])+"";return{c(){e=g("th"),n=p(l),w(e,"class",o=s(t[3](t[11],t[2],t[0]))+" svelte-1p64mb4")},m(t,o){f(t,e,o),a(e,n)},p(t,r){4&r&&l!==(l=t[4](t[11],t[2])+"")&&y(n,l),5&r&&o!==(o=s(t[3](t[11],t[2],t[0]))+" svelte-1p64mb4")&&w(e,"class",o)},d(t){t&&h(e)}}}function J(e){let n,o,l,r={length:e[1].length},c=[];for(let t=0;t<r.length;t+=1)c[t]=I(R(e,r,t));return{c(){n=g("tr");for(let t=0;t<c.length;t+=1)c[t].c()},m(t,r){f(t,n,r);for(let t=0;t<c.length;t+=1)c[t].m(n,null);o||(l=$(P,"keydown",e[5]),o=!0)},p(t,[e]){if(31&e){let o;for(r={length:t[1].length},o=0;o<r.length;o+=1){const l=R(t,r,o);c[o]?c[o].p(l,e):(c[o]=I(l),c[o].c(),c[o].m(n,null))}for(;o<c.length;o+=1)c[o].d(1);c.length=r.length}},i:t,o:t,d(t){t&&h(n),d(c,t),o=!1,l()}}}function Q(t,e,n){const o=k();let{correct:l}=e,{state:r}=e,c="",s="waiting,".repeat(l.length).split(",");function i(t){if("typing"==r&&c.length<=l.length){if("Enter"==t.key&&c.length==l.length)return void async function(){let t=l,e={};for(let n=0;n<c.length;n++)c[n]==l[n]?(s[n]="green",t=t.replace(c[n],""),null==e[c[n]]&&(e[c[n]]=0),e[c[n]]++):s[n]="black";let i={};for(let e=0;e<c.length;e++)i[c[e]]=(u=t,a=c[e],u.split(a).length-1);var u,a;for(let t=0;t<c.length;t++)i[c[t]]>0&&"green"!=s[t]&&(s[t]="yellow",i[c[t]]--);let f={black:[],yellow:[],green:[]};for(let t=0;t<c.length;t++)f[s[t]].push(c[t]);window.updateKeyboard(f),n(0,r=c==l?"correct":"incorrect"),setTimeout((()=>{o("message",{state:r})}),100)}();"Backspace"==t.key?n(2,c=c.substring(0,c.length-1)):1==t.key.length&&c.length<l.length&&n(2,c+=t.key.toLowerCase())}}return window.keypress.push(i),t.$$set=t=>{"correct"in t&&n(1,l=t.correct),"state"in t&&n(0,r=t.state)},[r,l,c,function(t){return t==c.length&&"waiting"!=r?"cursor":s[t]},function(t){return t<c.length?c[t]:" "},i]}const U=class extends F{constructor(t){super(),D(this,t,Q,J,r,{correct:1,state:0})}};function V(t,e,n){const o=t.slice();return o[4]=e[n],o}function X(t,e,n){const o=t.slice();return o[7]=e[n],o}function Z(t){let e,n,o,l,r,c=t[7]+"";function i(){return t[2](t[7])}return{c(){e=g("button"),n=p(c),w(e,"class",o=s(t[0][t[7]])+" svelte-jreht7")},m(t,o){f(t,e,o),a(e,n),l||(r=$(e,"click",i),l=!0)},p(n,l){t=n,1&l&&o!==(o=s(t[0][t[7]])+" svelte-jreht7")&&w(e,"class",o)},d(t){t&&h(e),l=!1,r()}}}function tt(t){let e,n,o=t[4],l=[];for(let e=0;e<o.length;e+=1)l[e]=Z(X(t,o,e));return{c(){e=g("div");for(let t=0;t<l.length;t+=1)l[t].c();n=m(),w(e,"class","row svelte-jreht7")},m(t,o){f(t,e,o);for(let t=0;t<l.length;t+=1)l[t].m(e,null);a(e,n)},p(t,r){if(3&r){let c;for(o=t[4],c=0;c<o.length;c+=1){const s=X(t,o,c);l[c]?l[c].p(s,r):(l[c]=Z(s),l[c].c(),l[c].m(e,n))}for(;c<l.length;c+=1)l[c].d(1);l.length=o.length}},d(t){t&&h(e),d(l,t)}}}function et(e){let n,o,l,r=e[1],c=[];for(let t=0;t<r.length;t+=1)c[t]=tt(V(e,r,t));return{c(){n=g("main"),o=g("br"),l=m();for(let t=0;t<c.length;t+=1)c[t].c()},m(t,e){f(t,n,e),a(n,o),a(n,l);for(let t=0;t<c.length;t+=1)c[t].m(n,null)},p(t,[e]){if(3&e){let o;for(r=t[1],o=0;o<r.length;o+=1){const l=V(t,r,o);c[o]?c[o].p(l,e):(c[o]=tt(l),c[o].c(),c[o].m(n,null))}for(;o<c.length;o+=1)c[o].d(1);c.length=r.length}},i:t,o:t,d(t){t&&h(n),d(c,t)}}}function nt(t,e,n){let o={};return window.updateKeyboard=function(t){for(let e of Object.keys(t))for(let l of t[e])n(0,o[l]=e,o);n(0,o),console.log(o)},[o,["qwertyuiop","asdfghjkl","←zxcvbnm→"],t=>{!function(t){"←"==t&&(t="Backspace"),"→"==t&&(t="Enter");for(let e of window.keypress)e({key:t})}(t)}]}const ot=class extends F{constructor(t){super(),D(this,t,nt,et,r,{})}};function lt(t,e,n){const o=t.slice();return o[10]=e[n],o[12]=n,o}function rt(t){let e,n;return{c(){e=g("strong"),n=p(t[3]),w(e,"class","svelte-g9h8lv")},m(t,o){f(t,e,o),a(e,n)},p(t,e){8&e&&y(n,t[3])},d(t){t&&h(e)}}}function ct(e){let n,o,l,r,c;return{c(){n=g("strong"),n.textContent="You won!",o=m(),l=g("button"),l.textContent="New Game",w(n,"class","svelte-g9h8lv"),w(l,"class","svelte-g9h8lv")},m(t,s){f(t,n,s),f(t,o,s),f(t,l,s),r||(c=$(l,"click",e[6]),r=!0)},p:t,d(t){t&&h(n),t&&h(o),t&&h(l),r=!1,c()}}}function st(t){let e,n,o,l,r,c,s,i,u,d;return{c(){e=g("strong"),e.textContent="You lost!",n=m(),o=g("p"),l=p("The word was "),r=p(t[0]),c=p("."),s=m(),i=g("button"),i.textContent="New Game",w(e,"class","svelte-g9h8lv"),w(o,"class","svelte-g9h8lv"),w(i,"class","svelte-g9h8lv")},m(h,g){f(h,e,g),f(h,n,g),f(h,o,g),a(o,l),a(o,r),a(o,c),f(h,s,g),f(h,i,g),u||(d=$(i,"click",t[7]),u=!0)},p(t,e){1&e&&y(r,t[0])},d(t){t&&h(e),t&&h(n),t&&h(o),t&&h(s),t&&h(i),u=!1,d()}}}function it(t){let e,n;return e=new U({props:{state:t[5](t[12],t[1]),correct:t[0]}}),e.$on("message",t[4]),{c(){K(e.$$.fragment)},m(t,o){W(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.state=t[5](t[12],t[1])),1&n&&(o.correct=t[0]),e.$set(o)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){Y(e,t)}}}function ut(t){let e,n,l,r,c,s,i,u,p,$,y,b,v,k,_,x,C,E,j,T,M=""!=t[3]&&rt(t),L="win"==t[1]&&ct(t),O="lose"==t[1]&&st(t),N={length:t[2]},S=[];for(let e=0;e<N.length;e+=1)S[e]=it(lt(t,N,e));const q=t=>z(S[t],1,1,(()=>{S[t]=null}));return j=new ot({}),j.$on("keyclick",at),{c(){e=g("main"),n=g("div"),l=g("h1"),l.textContent="WORDLE",r=m(),c=g("a"),c.textContent="Github",s=m(),i=g("a"),i.textContent="Origional",u=m(),p=g("br"),$=g("br"),y=m(),M&&M.c(),b=m(),L&&L.c(),v=m(),O&&O.c(),k=m(),_=g("br"),x=m(),C=g("table");for(let t=0;t<S.length;t+=1)S[t].c();E=m(),K(j.$$.fragment),w(l,"class","svelte-g9h8lv"),w(c,"href","https://github.com/benman604/Wordle"),w(c,"class","svelte-g9h8lv"),w(i,"href","https://www.powerlanguage.co.uk/wordle/"),w(i,"class","svelte-g9h8lv"),w(p,"class","svelte-g9h8lv"),w($,"class","svelte-g9h8lv"),w(n,"class","message svelte-g9h8lv"),w(C,"class","svelte-g9h8lv"),w(e,"class","svelte-g9h8lv")},m(t,o){f(t,e,o),a(e,n),a(n,l),a(n,r),a(n,c),a(n,s),a(n,i),a(n,u),a(n,p),a(n,$),a(n,y),M&&M.m(n,null),a(n,b),L&&L.m(n,null),a(n,v),O&&O.m(n,null),a(e,k),a(e,_),a(e,x),a(e,C);for(let t=0;t<S.length;t+=1)S[t].m(C,null);a(e,E),W(j,e,null),T=!0},p(t,[e]){if(""!=t[3]?M?M.p(t,e):(M=rt(t),M.c(),M.m(n,b)):M&&(M.d(1),M=null),"win"==t[1]?L?L.p(t,e):(L=ct(t),L.c(),L.m(n,v)):L&&(L.d(1),L=null),"lose"==t[1]?O?O.p(t,e):(O=st(t),O.c(),O.m(n,null)):O&&(O.d(1),O=null),55&e){let n;for(N={length:t[2]},n=0;n<N.length;n+=1){const o=lt(t,N,n);S[n]?(S[n].p(o,e),B(S[n],1)):(S[n]=it(o),S[n].c(),B(S[n],1),S[n].m(C,null))}for(A={r:0,c:[],p:A},n=N.length;n<S.length;n+=1)q(n);A.r||o(A.c),A=A.p}},i(t){if(!T){for(let t=0;t<N.length;t+=1)B(S[t]);B(j.$$.fragment,t),T=!0}},o(t){S=S.filter(Boolean);for(let t=0;t<S.length;t+=1)z(S[t]);z(j.$$.fragment,t),T=!1},d(t){t&&h(e),M&&M.d(),L&&L.d(),O&&O.d(),d(S,t),Y(j)}}}function at(t){return console.log(t.detail.key),{key:t.detail.key}}function ft(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t)+t)}function ht(t,e,n){k();let o="",l=0,r=o.length,c=[];window.keypress=[],window.keycolor=[];let s="";var i;return i=()=>{""==o&&fetch(`https://fly.wordfinderapi.com/api/search?length=${ft(5,7)}&dictionary=wwf2&word_sorting=points&group_by_length=true&page_size=1&page_token=${ft(0,50)}`).then((t=>t.json())).then((t=>{n(0,o=t.word_pages[0].word_list[0].word.toLowerCase()),n(2,r=o.length),n(1,l=0),c=[]}))},v().$$.on_mount.push(i),[o,l,r,s,function(t){if(null!=t.detail.message)n(3,s=t.detail.message),setTimeout((()=>{n(3,s="")}),1e3),n(1,l--,l);else{let e=t.detail.state;c.push(e),"correct"==e?n(1,l="win"):"incorrect"==e&&(l+1>=r?n(1,l="lose"):n(1,l++,l))}},function(t){return t==l?"typing":t>l?"waiting":c[t]},()=>{window.location.reload()},()=>{window.location.reload()}]}new class extends F{constructor(t){super(),D(this,t,ht,ut,r,{})}}({target:document.body})})();