(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{685:function(t,e,n){"use strict";n.r(e),n.d(e,"CountUp",(function(){return r}));n(177),n(391),n(34),n(153),n(392);var o=function(){return(o=Object.assign||function(t){for(var i,a=1,s=arguments.length;a<s;a++)for(var e in i=arguments[a])Object.prototype.hasOwnProperty.call(i,e)&&(t[e]=i[e]);return t}).apply(this,arguments)},r=function(){function t(t,i,a){var s=this;this.target=t,this.endVal=i,this.options=a,this.version="2.0.7",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){s.startTime||(s.startTime=t);var i=t-s.startTime;s.remaining=s.duration-i,s.useEasing?s.countDown?s.frameVal=s.startVal-s.easingFn(i,0,s.startVal-s.endVal,s.duration):s.frameVal=s.easingFn(i,s.startVal,s.endVal-s.startVal,s.duration):s.countDown?s.frameVal=s.startVal-(s.startVal-s.endVal)*(i/s.duration):s.frameVal=s.startVal+(s.endVal-s.startVal)*(i/s.duration),s.countDown?s.frameVal=s.frameVal<s.endVal?s.endVal:s.frameVal:s.frameVal=s.frameVal>s.endVal?s.endVal:s.frameVal,s.frameVal=Number(s.frameVal.toFixed(s.options.decimalPlaces)),s.printValue(s.frameVal),i<s.duration?s.rAF=requestAnimationFrame(s.count):null!==s.finalEndVal?s.update(s.finalEndVal):s.callback&&s.callback()},this.formatNumber=function(t){var i,a,e,n,o,r=t<0?"-":"";if(i=Math.abs(t).toFixed(s.options.decimalPlaces),e=(a=(i+="").split("."))[0],n=a.length>1?s.options.decimal+a[1]:"",s.options.useGrouping){o="";for(var l=0,c=e.length;l<c;++l)0!==l&&l%3==0&&(o=s.options.separator+o),o=e[c-l-1]+o;e=o}return s.options.numerals&&s.options.numerals.length&&(e=e.replace(/[0-9]/g,(function(t){return s.options.numerals[+t]})),n=n.replace(/[0-9]/g,(function(t){return s.options.numerals[+t]}))),r+s.options.prefix+e+n+s.options.suffix},this.easeOutExpo=function(t,i,a,s){return a*(1-Math.pow(2,-10*t/s))*1024/1023+i},this.options=o(o({},this.defaults),a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(i),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined"}return t.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold){this.finalEndVal=t;var a=this.countDown?1:-1;this.endVal=t+a*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=t,this.finalEndVal=null;this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},t.prototype.start=function(t){this.error||(this.callback=t,this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},t.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},t.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},t.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},t.prototype.printValue=function(t){var i=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=i:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=i:this.el.innerHTML=i},t.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},t.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: "+t,null)},t.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},t}()},687:function(t,e,n){var o,r,l;n(28),n(177),n(9),n(16),n(60);var c=n(69);!function(d,m){"object"==c(e)&&void 0!==t?t.exports=m(n(685)):(r=[n(685)],void 0===(l="function"==typeof(o=m)?o.apply(e,r):o)||(t.exports=l))}(0,(function(t){"use strict";var e=("Function",function(t){return Object.prototype.toString.call(t)==="[object ".concat("Function","]")}),i={__countup__:t.CountUp,name:"VueCountUp",props:{delay:{type:Number,required:!1,default:0},endVal:{type:Number,required:!0},options:{type:Object,required:!1}},data:function(){return{instance:null}},watch:{endVal:{handler:function(t){this.instance&&e(this.instance.update)&&this.instance.update(t)},deep:!1}},methods:{create:function(){var e=this;if(!e.instance){var n=e.$el,i=new t.CountUp(n,e.endVal,e.options);i.error||(e.instance=i,e.delay<0?e.$emit("ready",i,t.CountUp):setTimeout((function(){return i.start((function(){return e.$emit("ready",i,t.CountUp)}))}),e.delay))}},destroy:function(){this.instance=null},printValue:function(t){if(this.instance&&e(this.instance.printValue))return this.instance.printValue(t)},start:function(t){if(this.instance&&e(this.instance.start))return this.instance.start(t)},pauseResume:function(){if(this.instance&&e(this.instance.pauseResume))return this.instance.pauseResume()},reset:function(){if(this.instance&&e(this.instance.reset))return this.instance.reset()},update:function(t){if(this.instance&&e(this.instance.update))return this.instance.update(t)}},mounted:function(){this.create()},beforeDestroy:function(){this.destroy()}};return function(t,e){void 0===e&&(e={});e.insertAt}(),function(t,e,n,i,s,o,r,a,u,l){"boolean"!=typeof r&&(a,a=r,r=!1);var c,d="function"==typeof n?n.options:n;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0),d._scopeId=i,c)if(d.functional){var p=d.render;d.render=function(t,e){return c.call(e),p(t,e)}}else{var m=d.beforeCreate;d.beforeCreate=m?[].concat(m,c):[c]}return n}({render:function(){var t=this.$createElement;return(this._self._c||t)("span")},staticRenderFns:[]},0,i,"data-v-0abbdf5a",0,0,void 0,void 0)}))},688:function(t,e,n){"use strict";n.r(e);var o={props:{accountName:{type:String,required:!0}},methods:{fallbackAvatar:function(t){t.target.src="https://ui-avatars.com/api/?name=".concat(this.accountName,"&size=100")}}},r=n(25),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("img",{attrs:{src:"https://avatar.pixeos.art/avatar/"+this.accountName},on:{error:function(e){return t.fallbackAvatar(e)}}})}),[],!1,null,null,null);e.default=component.exports},691:function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxOCA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1OSAoODYxMjcpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPmVwbXR5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9ImRlc2t0b3AiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC40Ij4KICAgICAgICA8cmVjdCBpZD0iZXBtdHkiIHN0cm9rZT0iI0IxQjFCMSIgZmlsbD0iI0NERDRFNiIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIxNyIgaGVpZ2h0PSI1IiByeD0iMSI+PC9yZWN0PgogICAgPC9nPgo8L3N2Zz4="},692:function(t,e,n){var content=n(698);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("94591122",content,!0,{sourceMap:!1})},693:function(t,e,n){"use strict";n.r(e);var o={props:["proposals"],data:function(){return{voteTypes:[{value:1,name:"Y",fullName:"Yes"},{value:0,name:"A",fullName:"Abstain"},{value:2,name:"N",fullName:"No"}],categories:{0:"Governance Proposal",1:"Marketing",2:"Design",3:"Technical",4:"Other"}}},methods:{print:function(t){console.log(t)}}},r=(n(697),n(25)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.proposals?o("div",{staticClass:"proposals"},[t.proposals.length>0?o("div",t._l(t.proposals,(function(e){return o("nuxt-link",{key:e.id,staticClass:"box has-shadow-outside is-narrow",attrs:{to:"/proposals/"+e.id}},[o("div",{staticClass:"columns is-desktop is-gapless"},[o("div",{staticClass:"has-text-weight-light column  is-10"},[e.title?o("b",[null!=e.vote_counts[1]&&null!=e.vote_counts[2]?o("span",{staticClass:"icon"},[e.vote_counts[1].value>e.vote_counts[2].value?o("img",{attrs:{src:n(695)}}):e.vote_counts[1].value<e.vote_counts[2].value?o("img",{attrs:{src:n(696)}}):o("img",{attrs:{src:n(691)}})]):o("span",{staticClass:"icon"},[o("img",{attrs:{src:n(691)}})]),t._v("\n            #"+t._s(e.id)+": "+t._s(t._f("truncate")(e.title,60)))]):o("b",[t._v("...")]),t._v(" "),o("div",{staticClass:"has-text-weight-light"},[Object.keys(e).includes("vote_status")?o("small",{staticClass:"vote_indicator"},[o("span",{class:{"is-dark":0===e.vote_status,"is-danger":2===e.vote_status,"is-success":1===e.vote_status},attrs:{"data-tooltip":"You voted: "+t.voteTypes.find((function(t){return t.value,e.vote_status,t.name})).fullName}},[o("font-awesome-icon",{attrs:{icon:["fas","check-square"]}})],1)]):t._e(),t._v(" "),o("small",[e.cycle?o("div",{staticClass:"tag"},[t._v("C"+t._s(e.cycle))]):o("div",{staticClass:"tag"},[t._v("N/A")])]),t._v(" "),o("small",{staticClass:"mr-1"},[t._v(" by "),o("nuxt-link",{attrs:{to:"/account/"+e.author}},[t._v(t._s(e.author))])],1),t._v(" "),o("small",t._l(e.pay,(function(e,n){return o("span",{key:n},[n>0?o("span",[t._v(",")]):t._e(),t._v(" "+t._s(t.$wallet.formatNumber(parseInt(e.field_0.quantity)))+" EFX")])})),0)])]),t._v(" "),o("div",{staticClass:"column is-2 has-text-left-mobile has-text-right-desktop has-text-left-tablet"},[o("div",{staticClass:"tag",class:{"is-success":"ACTIVE"==e.status,"is-warning":"DRAFT"==e.status,"is-link":"PENDING"==e.status,"is-dark":"CLOSED"==e.status}},[t._v(t._s(e.status))])])])])})),1):o("h5",{staticClass:"has-text-centered subtitle"},[t._v("\n    No Proposals\n  ")])]):t._e()}),[],!1,null,"1f768672",null);e.default=component.exports},695:function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTggMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU5ICg4NjEyNykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+dXA8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iZGVza3RvcCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbC1vcGFjaXR5PSIwLjEiPgogICAgICAgIDxwYXRoIGQ9Ik05LjM1MzU1MzM5LDEuMDYwNjYwMTcgQzkuMTU4MjkxMjQsMC44NjUzOTgwMjYgOC44NDE3MDg3NiwwLjg2NTM5ODAyNiA4LjY0NjQ0NjYxLDEuMDYwNjYwMTcgTDEuMDYwNjYwMTcsOC42NDY0NDY2MSBDMC45NjY4OTE5ODMsOC43NDAyMTQ4IDAuOTE0MjEzNTYyLDguODY3MzkxNzYgMC45MTQyMTM1NjIsOSBDMC45MTQyMTM1NjIsOS4yNzYxNDIzNyAxLjEzODA3MTE5LDkuNSAxLjQxNDIxMzU2LDkuNSBMMTYuNTg1Nzg2NCw5LjUgQzE2LjcxODM5NDcsOS41IDE2Ljg0NTU3MTYsOS40NDczMjE1OCAxNi45MzkzMzk4LDkuMzUzNTUzMzkgQzE3LjEzNDYwMiw5LjE1ODI5MTI0IDE3LjEzNDYwMiw4Ljg0MTcwODc2IDE2LjkzOTMzOTgsOC42NDY0NDY2MSBMOS4zNTM1NTMzOSwxLjA2MDY2MDE3IFoiIGlkPSJ1cCIgc3Ryb2tlPSIjNTFCNDQxIiBmaWxsPSIjNTFCNDQxIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg=="},696:function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTggMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU5ICg4NjEyNykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+ZG93bjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJkZXNrdG9wIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsLW9wYWNpdHk9IjAuMSI+CiAgICAgICAgPHBhdGggZD0iTTkuMzUzNTUzMzksMS4wNjA2NjAxNyBDOS4xNTgyOTEyNCwwLjg2NTM5ODAyNiA4Ljg0MTcwODc2LDAuODY1Mzk4MDI2IDguNjQ2NDQ2NjEsMS4wNjA2NjAxNyBMMS4wNjA2NjAxNyw4LjY0NjQ0NjYxIEMwLjk2Njg5MTk4Myw4Ljc0MDIxNDggMC45MTQyMTM1NjIsOC44NjczOTE3NiAwLjkxNDIxMzU2Miw5IEMwLjkxNDIxMzU2Miw5LjI3NjE0MjM3IDEuMTM4MDcxMTksOS41IDEuNDE0MjEzNTYsOS41IEwxNi41ODU3ODY0LDkuNSBDMTYuNzE4Mzk0Nyw5LjUgMTYuODQ1NTcxNiw5LjQ0NzMyMTU4IDE2LjkzOTMzOTgsOS4zNTM1NTMzOSBDMTcuMTM0NjAyLDkuMTU4MjkxMjQgMTcuMTM0NjAyLDguODQxNzA4NzYgMTYuOTM5MzM5OCw4LjY0NjQ0NjYxIEw5LjM1MzU1MzM5LDEuMDYwNjYwMTcgWiIgaWQ9ImRvd24iIHN0cm9rZT0iI0M4MUQwMCIgZmlsbD0iI0M4MUQwMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOS4wMDAwMDAsIDUuMDAwMDAwKSBzY2FsZSgxLCAtMSkgdHJhbnNsYXRlKC05LjAwMDAwMCwgLTUuMDAwMDAwKSAiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+"},697:function(t,e,n){"use strict";n(692)},698:function(t,e,n){(e=n(58)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),e.push([t.i,"@import url(https://use.typekit.net/kej5qyk.css);"]),e.push([t.i,'.proposals .media-left[data-v-1f768672]{min-width:72px}.vote-result[data-v-1f768672]:after{content:" - "}.vote-result[data-v-1f768672]:last-of-type:after{content:""}.media[data-v-1f768672]{flex-wrap:wrap}.icon[data-v-1f768672]{height:23px;width:40px}small.vote_indicator[data-v-1f768672]{margin-left:14px}',""]),t.exports=e},780:function(t,e,n){"use strict";n.r(e);n(28),n(71),n(61),n(125),n(39),n(55),n(34),n(126),n(153),n(70),n(47);var o=n(3),r=n(687),l=n.n(r),c=n(688),d=n(693),m={components:{Avatar:c.default,ICountUp:l.a,Proposals:d.default},head:function(){return{title:this.account.name+"'s Account"}},data:function(){return{loadingLogout:!1,loadingProposals:!1,loadingVotes:!1,loadingDiscord:!1,account:{name:this.$route.params.name},proposals:null,voteTypes:[{value:1,name:"Yes"},{value:2,name:"No"},{value:0,name:"Abstain"}],votes:null}},computed:{wallet:function(){return this.$wallet?this.$wallet.wallet:null},myAccount:function(){return this.wallet&&this.wallet.auth&&this.wallet.auth.accountName===this.account.name},currentCycle:function(){return this.$dao.proposalConfig?this.$dao.proposalConfig.current_cycle:null}},watch:{currentCycle:function(){this.getProposals()}},created:function(){this.wallet&&this.wallet.accountName===this.account.name||this.getAccountInfo(),this.getProposals(),this.getVotes()},methods:{getAccountInfo:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$wallet.getDaoMember(t.account.name);case 3:if(n=e.sent,console.log(n),t.$set(t.account,"signedConstitution",!!n),!n){e.next=16;break}return t.$set(t.account,"registration_time",new Date("".concat(n.registration_time,"Z"))),e.next=10,t.$wallet.getStake(t.account.name);case 10:e.sent.map((function(e){if(e.amount.includes("EFX")){var n=parseFloat(e.amount.replace(" ".concat("EFX"),"")),o=t.$wallet.calculateStakeAge(n,e.last_claim_time,e.last_claim_age),r=t.$wallet.calculateEfxPower(n,o);t.$set(t.account,"efxStaked",n),t.$set(t.account,"stakeAge",o),t.$set(t.account,"power",r)}else if(e.amount.includes("NFX")){var l=parseFloat(e.amount.replace(" ".concat("NFX"),""));t.$set(t.account,"nfxStaked",l)}})),t.account.power||t.$set(t.account,"power",0),o=t.$wallet.calculateVotePower(t.account.power,t.account.nfxStaked),t.$set(t.account,"canVote",t.$wallet.canVote()),t.$set(t.account,"votes",o);case 16:e.next=21;break;case 18:e.prev=18,e.t0=e.catch(0),console.log(e.t0);case 21:case"end":return e.stop()}}),e,null,[[0,18]])})))()},getProposals:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loadingProposals=!0,!t.$dao.proposalConfig){e.next=16;break}return e.prev=2,e.next=5,t.$eos.rpc.get_table_rows({code:"daoproposals",scope:"daoproposals",table:"proposal",key_type:"name",index_position:2,lower_bound:t.account.name,limit:100});case 5:data=e.sent,t.moreProposals=data.more,t.nextKey=data.next_key,t.proposals=data.rows.filter((function(e){return e.author===t.account.name})),t.proposals.forEach(function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(n){var o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o="CLOSED",0===n.state&&(o=n.cycle?n.cycle===t.currentCycle?"ACTIVE":"PENDING":"DRAFT"),t.$set(n,"status",o),e.prev=3,e.next=6,t.$dao.getIpfsContent(n.content_hash);case 6:r=e.sent,t.$set(n,"title",r.title),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}()),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),console.log(e.t0);case 15:t.loadingProposals=!1;case 16:case"end":return e.stop()}}),e,null,[[2,12]])})))()},getVotes:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loadingVotes=!0,e.prev=1,n={code:"daoproposals",scope:"daoproposals",table:"vote",key_type:"name",index_position:3,lower_bound:t.account.name,upper_bound:t.account.name,limit:100},e.next=5,t.$eos.rpc.get_table_rows(n);case 5:data=e.sent,t.votes?t.votes=t.votes.concat(data.rows):t.votes=data.rows,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0);case 12:t.loadingVotes=!1;case 13:case"end":return e.stop()}}),e,null,[[1,9]])})))()},logout:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loadingLogout=!0,e.next=3,t.$transit.logout();case 3:t.loadingLogout=!1;case 4:case"end":return e.stop()}}),e)})))()}}},h=n(25),component=Object(h.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mt-5"},[n("div",[n("div",{staticClass:"box"},[n("div",{staticClass:"media"},[n("div",{staticClass:"media-left"},[n("div",{staticClass:"image is-128x128"},[n("avatar",{attrs:{"account-name":t.account.name}})],1)]),t._v(" "),n("div",{staticClass:"media-content"},[n("div",{staticClass:"mb-4"},[n("span",{staticClass:"subtitle is-3 is-family-sans-serif"},[t._v(t._s(t.account.name))])]),t._v(" "),t.account.signedConstitution?n("div",[n("div",{staticClass:"mb-4"},[t.account.votes>=0?n("ICountUp",{staticClass:"is-size-5 power",attrs:{options:{prefix:"Vote power ",suffix:""},"end-val":t.account.votes}}):t._e()],1),t._v(" "),n("div",[n("small",[t._v("Joined "),t.account.registration_time?n("span",[t._v(t._s(t.$moment(t.account.registration_time).fromNow()))]):n("span",[t._v("..")])])])]):!1===t.account.signedConstitution?n("div",[n("h5",[t._v("Not a DAO Member")])]):n("div",[n("h5",[t._v("Loading..")])])])])])]),t._v(" "),n("div",{staticClass:"box mt-5"},[t.myAccount?n("h4",{staticClass:"box-title subtitle"},[t._v("\n      Your Proposals\n    ")]):n("h4",{staticClass:"box-title subtitle"},[t._v("\n      Proposals by "+t._s(t.account.name)+"\n    ")]),t._v(" "),t.loadingProposals?n("div",[t._v("\n      Loading Proposals..\n    ")]):t.proposals&&t.proposals.length>0?n("proposals",{attrs:{proposals:t.proposals}}):t.proposals?n("div",[t._v("\n      No Proposals\n    ")]):n("div",[t._v("\n      Could not retrieve proposals\n    ")]),t._v(" "),n("div",{staticClass:"has-text-centered mt-4"},[t.myAccount?n("nuxt-link",{staticClass:"button is-secondary is-wide m-2",attrs:{to:"/proposals/new"}},[t._v("\n      New Proposal\n    ")]):t._e(),t._v(" "),n("nuxt-link",{staticClass:"button is-secondary is-outlined is-wide m-2",attrs:{to:"/proposals"}},[t._v("\n      All Proposals\n    ")])],1)],1),t._v(" "),n("div",{staticClass:"box"},[t.myAccount?n("h4",{staticClass:"box-title subtitle"},[t._v("\n      Your Votes\n    ")]):n("h4",{staticClass:"box-title subtitle"},[t._v("\n      Votes from "+t._s(t.account.name)+"\n    ")]),t._v(" "),t.loadingVotes?n("div",[t._v("\n      Loading Votes..\n    ")]):t.votes&&t.votes.length>0?n("div",t._l(t.votes,(function(e){return n("nuxt-link",{key:e.id,staticClass:"columns is-vcentered is-mobile",attrs:{to:"/proposals/"+e.proposal_id}},[n("div",{staticClass:"column"},[n("div",[t._v("\n            Proposal "),n("b",[t._v(t._s(e.proposal_id))])])]),t._v(" "),n("div",{staticClass:"column has-text-centered"},[n("b",{class:{"has-text-success":1===e.type,"has-text-danger":2===e.type}},[t._v(t._s(t.voteTypes.find((function(t){return t.value===e.type})).name))])]),t._v(" "),n("div",{staticClass:"column has-text-centered"},[t._v("\n          "+t._s(e.weight)+"\n        ")])])})),1):t.votes?n("div",[t._v("\n      No Votes\n    ")]):n("div",[t._v("\n      Could not retrieve votes\n    ")])])])}),[],!1,null,"2786e3a0",null);e.default=component.exports;installComponents(component,{Avatar:n(688).default,Proposals:n(693).default})}}]);