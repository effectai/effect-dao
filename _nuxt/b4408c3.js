(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{699:function(t,e,n){t.exports=n.p+"img/efx-icon.00fe298.png"},700:function(t,e,n){t.exports=n.p+"img/nfx-icon.7219c59.png"},706:function(t,e,n){var content=n(735);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("d59df062",content,!0,{sourceMap:!1})},707:function(t,e,n){var content=n(737);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("96ac070e",content,!0,{sourceMap:!1})},734:function(t,e,n){"use strict";n(706)},735:function(t,e,n){(e=n(58)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),e.push([t.i,"@import url(https://use.typekit.net/kej5qyk.css);"]),e.push([t.i,".circle canvas{box-shadow:inset -4px -4px 11px 0 #fff,inset 4px 4px 11px 0 #cdd4e6,0 0 29px -22px rgba(215,172,0,.83137);border-radius:100%}",""]),t.exports=e},736:function(t,e,n){"use strict";n(707)},737:function(t,e,n){(e=n(58)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),e.push([t.i,"@import url(https://use.typekit.net/kej5qyk.css);"]),e.push([t.i,"@-webkit-keyframes glow-data-v-a008589c{0%{box-shadow:-4px -4px 10px 0 #fff,4px 4px 10px 0 #cdd4e6,0 0 29px -22px rgba(215,172,0,.83137)}to{box-shadow:-4px -4px 10px 0 #fff,4px 4px 10px 0 #cdd4e6,0 0 40px 15px rgba(215,172,0,.83137)}}@keyframes glow-data-v-a008589c{0%{box-shadow:-4px -4px 10px 0 #fff,4px 4px 10px 0 #cdd4e6,0 0 29px -22px rgba(215,172,0,.83137)}to{box-shadow:-4px -4px 10px 0 #fff,4px 4px 10px 0 #cdd4e6,0 0 40px 15px rgba(215,172,0,.83137)}}.circle .age-amount[data-v-a008589c]{font-size:.75rem}.value-circle[data-v-a008589c]{height:125px;width:125px;margin:-9px auto 0;border-radius:100%;box-shadow:-4px -4px 10px 0 #fff,4px 4px 10px 0 #cdd4e6;background-color:#f0f2f7;display:flex;flex-direction:column;justify-content:center;align-items:center}.value-circle.big[data-v-a008589c]{width:200px;height:200px}.value-circle.glow[data-v-a008589c]{-webkit-animation:glow-data-v-a008589c 2s ease-out infinite alternate;animation:glow-data-v-a008589c 2s ease-out infinite alternate}.value-circle h1[data-v-a008589c]{margin-bottom:0}.notification[data-v-a008589c]{margin-bottom:12px!important}.claim-efx[data-v-a008589c]{margin-top:-7px;margin-right:-12px}.buttons[data-v-a008589c]{margin-top:15px}.buttons button[data-v-a008589c]{margin-right:0;width:100%;font-weight:700}.modal-card-title[data-v-a008589c]{margin-bottom:0!important}.modal-card-body[data-v-a008589c]{border-radius:0!important}.input-lower[data-v-a008589c]{font-size:12px;margin-top:-15px}.new-stake[data-v-a008589c]{margin-top:0;padding-bottom:40px}.new-stake .text[data-v-a008589c]{margin-top:10px}.progress-bar[data-v-a008589c]{margin-top:40px}.stakes .column[data-v-a008589c]{padding:.75rem}.stakes .token-icon[data-v-a008589c]{height:40px;margin-top:-11px;float:left;margin-right:-40px}.stakes .token-icon.nfx[data-v-a008589c]{height:45px;margin-top:-13px}.stakes .claim-btn[data-v-a008589c]{margin-top:20px;margin-bottom:35px}.stakes .claim-efx[data-v-a008589c]{margin-top:-7px;margin-bottom:-7px;margin-right:-15px}",""]),t.exports=e},777:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("h5",{staticClass:"subtitle box-title"},[e("img",{staticClass:"token-icon",attrs:{src:n(699)}}),this._v("Staked EFX\n            ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"has-text-centered is-italic"},[e("small",[this._v("Unstaking takes 5 days")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h5",{staticClass:"subtitle box-title"},[e("img",{staticClass:"token-icon nfx",attrs:{src:n(700)}}),this._v("Staked NFX\n            ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"has-text-centered is-italic"},[e("small",[this._v("Unstaking takes 15 days")])])}],l=(n(28),n(177),n(689),n(391),n(9),n(687)),c=n.n(l),r=n(771),d={components:{ICountUp:c.a,VueCircle:r.a},middleware:["authenticated"],filters:{percentage:function(t,e){return t||(t=0),e||(e=0),t*=100,"".concat(Math.round(t*Math.pow(10,e))/Math.pow(10,e))},formatSeconds:function(t,e){return t||(t=0),"".concat(Math.floor(e.$moment.duration(t,"seconds").asDays()),":").concat(e.$moment.duration(t,"seconds").hours(),":").concat(e.$moment.duration(t,"seconds").minutes(),":").concat(e.$moment.duration(t,"seconds").seconds())}},head:function(){return{title:"Staking"}},data:function(){return{loading:!1,unstakingModal:!1,stakingModal:!1,stakingModalEfx:!1,removeStake:0,addStake:0}},computed:{wallet:function(){return this.$wallet.wallet},nfxStillClaimable:function(){return this.$wallet.nfxStillClaimable},stakeAge:function(){return this.$wallet.stakeAge},power:function(){return this.$wallet.power},efxAvailable:function(){return this.$wallet.efxAvailable},efxStaked:function(){return this.$wallet.efxStaked},nfxAvailable:function(){return this.$wallet.nfxAvailable},nfxStaked:function(){return this.$wallet.nfxStaked},efxUnstaking:function(){return this.$wallet.efxUnstaking},efxUnstakingTime:function(){return this.$wallet.efxUnstakingTime},nfxUnstaking:function(){return this.$wallet.nfxUnstaking},nfxUnstakingTime:function(){return this.$wallet.nfxUnstakingTime},efxCanRefund:function(){return this.$wallet.efxCanRefund},nfxCanRefund:function(){return this.$wallet.nfxCanRefund},signedConstitution:function(){return this.$wallet.signedConstitution}},methods:{trimDecimals:function(t){this.removeStake=Math.floor(1e4*this.removeStake)/1e4,this.addStake=Math.floor(1e4*this.addStake)/1e4},stake:function(){var t=this;this.loading=!0;var e=[];this.stakingModalEfx&&this.efxStaked>0||!this.stakingModalEfx&&this.nfxStaked>0?e.push({account:"efxstakepool",name:"claim",authorization:[{actor:this.wallet.auth.accountName,permission:this.wallet.auth.permission}],data:{owner:this.wallet.auth.accountName,symbol:"4,".concat(this.stakingModalEfx?"EFX":"NFX")}}):e.push({account:"efxstakepool",name:"open",authorization:[{actor:this.wallet.auth.accountName,permission:this.wallet.auth.permission}],data:{owner:this.wallet.auth.accountName,symbol:"4,".concat(this.stakingModalEfx?"EFX":"NFX"),ram_payer:this.wallet.auth.accountName}}),e.push({account:"effecttokens",name:"transfer",authorization:[{actor:this.wallet.auth.accountName,permission:this.wallet.auth.permission}],data:{from:this.wallet.auth.accountName,to:"efxstakepool",quantity:"".concat(Number.parseFloat(this.addStake).toFixed(4)," ").concat(this.stakingModalEfx?"EFX":"NFX"),memo:"stake"}}),this.$wallet.handleTransaction(e).then((function(e){t.$wallet.updateAccount(),t.stakingModal=!1})).finally((function(){t.loading=!1}))},unstake:function(){var t=this,e="".concat(Number.parseFloat(this.removeStake).toFixed(4)," ").concat("EFX");this.stakingModalEfx||(e="".concat(Number.parseFloat(this.removeStake).toFixed(4)," ").concat("NFX")),this.loading=!0;var n=[{account:"efxstakepool",name:"claim",authorization:[{actor:this.wallet.auth.accountName,permission:this.wallet.auth.permission}],data:{owner:this.wallet.auth.accountName,symbol:"4,".concat(this.stakingModalEfx?"EFX":"NFX")}},{account:"efxstakepool",name:"unstake",authorization:[{actor:this.wallet.auth.accountName,permission:this.wallet.auth.permission}],data:{owner:this.wallet.auth.accountName,quantity:e}}];this.$wallet.handleTransaction(n).then((function(e){t.$wallet.updateAccount(),t.stakingModal=!1})).finally((function(){t.loading=!1}))},claimNfx:function(){var t=this;this.loading=!0;var e=[{account:"efxstakepool",name:"claim",authorization:[{actor:this.wallet.auth.accountName,permission:this.wallet.auth.permission}],data:{owner:this.wallet.auth.accountName,symbol:"4,".concat("EFX")}}];this.$wallet.handleTransaction(e).then((function(e){t.$wallet.updateAccount()})).finally((function(){t.loading=!1}))},refund:function(t){var e=this;this.loading=!0;var n=[{account:"efxstakepool",name:"refund",authorization:[{actor:this.wallet.auth.accountName,permission:this.wallet.auth.permission}],data:{owner:this.wallet.auth.accountName,symbol:t}}];this.$wallet.handleTransaction(n).then((function(t){e.$wallet.updateAccount()})).finally((function(){e.loading=!1}))},formatSeconds:function(t,e){return t||(t=0),"".concat(Math.floor(e.$moment.duration(t,"seconds").asDays()),":").concat(e.$moment.duration(t,"seconds").hours(),":").concat(e.$moment.duration(t,"seconds").minutes(),":").concat(e.$moment.duration(t,"seconds").seconds())}}},f=(n(734),n(736),n(25)),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("div",{staticClass:"modal",class:{"is-active":t.stakingModal}},[n("div",{staticClass:"modal-background"}),t._v(" "),n("div",{staticClass:"modal-card"},[n("header",{staticClass:"modal-card-head"},[n("p",{staticClass:"modal-card-title"},[t._v("\n              Stake "+t._s(t.stakingModalEfx?"EFX":"NFX")+"\n            ")]),t._v(" "),n("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(e){t.stakingModal=!1}}})]),t._v(" "),n("section",{staticClass:"modal-card-body"},[t.stakingModalEfx?n("div",{staticClass:"notification is-primary"},[n("div",[n("strong",[t._v("Current Stake")]),t._v(": "+t._s(t.efxStaked)+" EFX")]),t._v(" "),t.addStake>0?n("div",[n("strong",[t._v("New Stake")]),t._v(": "+t._s(parseFloat(t.efxStaked)+parseFloat(t.addStake))+" EFX")]):t._e()]):n("div",{staticClass:"notification is-primary"},[n("div",[n("strong",[t._v("Current Stake")]),t._v(": "+t._s(t.nfxStaked)+" NFX")]),t._v(" "),t.addStake>0?n("div",[n("strong",[t._v("New Stake")]),t._v(": "+t._s(parseFloat(t.nfxStaked)+parseFloat(t.addStake))+" NFX")]):t._e()]),t._v(" "),n("div",{staticClass:"new-stake"},[n("div",{staticClass:"is-pulled-left text"},[t._v("\n                Add Stake:\n              ")]),t._v(" "),n("div",{staticClass:"is-pulled-right"},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.addStake,expression:"addStake",modifiers:{number:!0}}],staticClass:"input is-full",attrs:{type:"number",step:"0.0001",min:"0"},domProps:{value:t.addStake},on:{change:t.trimDecimals,input:function(e){e.target.composing||(t.addStake=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.addStake,expression:"addStake"}],staticClass:"slider is-fullwidth is-medium is-success is-circle",attrs:{step:"1",min:"0",max:t.stakingModalEfx?t.efxAvailable:t.nfxAvailable,type:"range"},domProps:{value:t.addStake},on:{__r:function(e){t.addStake=e.target.value}}}),t._v(" "),n("div",{staticClass:"input-lower"},[n("div",{staticClass:"is-pulled-left"},[t._v("\n                0 "+t._s(t.stakingModalEfx?"EFX":"NFX")+"\n              ")]),t._v(" "),t.stakingModalEfx?n("div",{staticClass:"is-pulled-right"},[t._v("\n                "+t._s(t.efxAvailable)+" EFX\n              ")]):n("div",{staticClass:"is-pulled-right"},[t._v("\n                "+t._s(t.nfxAvailable)+" NFX\n              ")])])]),t._v(" "),n("footer",{staticClass:"modal-card-foot"},[t.stakingModalEfx?n("button",{staticClass:"button is-success is-fullwidth",class:{"is-loading":t.loading},on:{click:t.stake}},[t._v("\n              Stake "+t._s(t.addStake)+" EFX\n            ")]):t.stakingModalEfx?t._e():n("button",{staticClass:"button is-success is-fullwidth",class:{"is-loading":t.loading},on:{click:t.stake}},[t._v("\n              Stake "+t._s(t.addStake)+" NFX\n            ")])])])]),t._v(" "),n("div",{staticClass:"modal",class:{"is-active":t.unstakingModal}},[n("div",{staticClass:"modal-background"}),t._v(" "),n("div",{staticClass:"modal-card"},[n("header",{staticClass:"modal-card-head"},[n("p",{staticClass:"modal-card-title"},[t._v("\n              Unstake "+t._s(t.stakingModalEfx?"EFX":"NFX")+"\n            ")]),t._v(" "),n("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(e){t.unstakingModal=!1}}})]),t._v(" "),n("section",{staticClass:"modal-card-body"},[t.stakingModalEfx?n("div",{staticClass:"notification is-primary"},[n("div",[n("strong",[t._v("Current Stake")]),t._v(": "+t._s(t.efxStaked)+" EFX")]),t._v(" "),t.removeStake>0?n("div",[n("strong",[t._v("New Stake")]),t._v(": "+t._s(Math.max(0,parseFloat(t.efxStaked)-parseFloat(t.removeStake)))+" EFX")]):t._e()]):n("div",{staticClass:"notification is-primary"},[n("div",[n("strong",[t._v("Current Stake")]),t._v(": "+t._s(t.nfxStaked)+" NFX")]),t._v(" "),n("div",[n("strong",[t._v("New Stake")]),t._v(": "+t._s(Math.max(0,parseFloat(t.nfxStaked)-parseFloat(t.removeStake)))+" NFX")])]),t._v(" "),n("div",{staticClass:"new-stake"},[n("div",{staticClass:"is-pulled-left text"},[t._v("\n                Remove Stake:\n              ")]),t._v(" "),n("div",{staticClass:"is-pulled-right"},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.removeStake,expression:"removeStake",modifiers:{number:!0}}],staticClass:"input is-full",attrs:{type:"number",step:"0.0001",min:"0"},domProps:{value:t.removeStake},on:{change:t.trimDecimals,input:function(e){e.target.composing||(t.removeStake=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.removeStake,expression:"removeStake"}],staticClass:"slider is-fullwidth is-medium is-primary is-circle",attrs:{step:"1",min:"0",max:t.stakingModalEfx?t.efxStaked:t.nfxStaked,type:"range"},domProps:{value:t.removeStake},on:{__r:function(e){t.removeStake=e.target.value}}}),t._v(" "),n("div",{staticClass:"input-lower"},[n("div",{staticClass:"is-pulled-left"},[t._v("\n                0 "+t._s(t.stakingModalEfx?"EFX":"NFX")+"\n              ")]),t._v(" "),t.stakingModalEfx?n("div",{staticClass:"is-pulled-right"},[t._v("\n                "+t._s(t.efxStaked)+" EFX\n              ")]):n("div",{staticClass:"is-pulled-right"},[t._v("\n                "+t._s(t.nfxStaked)+" NFX\n              ")])])]),t._v(" "),n("footer",{staticClass:"modal-card-foot"},[t.stakingModalEfx?n("button",{staticClass:"button is-danger is-fullwidth",class:{"is-loading":t.loading},on:{click:t.unstake}},[t._v("\n              Unstake "+t._s(t.removeStake)+" EFX\n            ")]):t.stakingModalEfx?t._e():n("button",{staticClass:"button is-danger is-fullwidth",class:{"is-loading":t.loading},on:{click:t.unstake}},[t._v("\n              Unstake "+t._s(t.removeStake)+" NFX\n            ")])])])]),t._v(" "),t.nfxStillClaimable>0?n("div",{staticClass:"notification is-primary unstake mb-0 is-outlined notif-w-btn"},[t._v("\n        You can claim "),n("b",[t._v(t._s(t.nfxStillClaimable))]),t._v(" NFX.\n        "),n("div",{staticClass:"is-pulled-right notif-btn"},[n("button",{staticClass:"button is-success claim-nfx",on:{click:t.claimNfx}},[t._v("\n            Claim\n          ")])])]):t._e(),t._v(" "),!t.efxCanRefund&&t.efxUnstaking>0?n("div",{staticClass:"notification is-primary has-text-centered unstake mb-0 is-outlined"},[t._v("\n        You have a pending unstake of "),n("b",[t._v(t._s(t.efxUnstaking)+" EFX")]),t._v(" refundable "),n("b",[t._v(t._s(t.$moment(t.efxUnstakingTime+"Z").fromNow()))]),t._v(".\n      ")]):t.efxCanRefund&&t.efxUnstaking>0?n("div",{staticClass:"notification is-primary unstake mb-0 is-outlined"},[t._v("\n        You have an available refund of "),n("b",[t._v(t._s(t.efxUnstaking))]),t._v(" EFX\n        "),n("button",{staticClass:"button is-success is-pulled-right claim-efx",class:{"is-loading":t.loading},on:{click:function(e){return t.refund("4,EFX")}}},[t._v("\n          Refund\n        ")])]):t._e(),t._v(" "),!t.nfxCanRefund&&t.nfxUnstaking>0?n("div",{staticClass:"notification is-primary unstake mb-0 is-outlined has-text-centered"},[t._v("\n        You have a pending unstake of "),n("b",[t._v(t._s(t.nfxUnstaking)+" NFX")]),t._v(" refundable at "),n("b",[t._v(t._s(t.$moment(t.nfxUnstakingTime+"Z").fromNow()))]),t._v(".\n      ")]):t.nfxCanRefund&&t.nfxUnstaking>0?n("div",{staticClass:"notification is-primary unstake mb-0 is-outlined"},[t._v("\n        You have an available refund of "),n("b",[t._v(t._s(t.nfxUnstaking))]),t._v(" NFX\n        "),n("button",{staticClass:"button is-success is-pulled-right claim-efx",class:{"is-loading":t.loading},on:{click:function(e){return t.refund("4,NFX")}}},[t._v("\n          Refund\n        ")])]):t._e(),t._v(" "),n("div",{staticClass:"columns stakes is-multiline mt-5"},[n("div",{staticClass:"column is-half"},[n("div",{staticClass:"box"},[t._m(0),t._v(" "),n("div",{staticClass:"has-text-centered"},[n("h3",{staticClass:"subtitle is-3 has-text-weight-bold"},[n("ICountUp",{attrs:{"end-val":t.efxStaked}}),t._v(" "),n("span",{staticClass:"symbol"},[t._v("EFX")])],1),t._v(" "),n("div",{staticClass:"buttons"},[n("button",{staticClass:"button is-primary is-fullwidth",class:{"is-loading":t.loading},attrs:{disabled:0===t.efxAvailable},on:{click:function(e){t.stakingModal=!0,t.stakingModalEfx=!0,t.addStake=t.efxAvailable}}},[t._v("\n                  Stake EFX\n                ")]),t._v(" "),n("button",{staticClass:"button is-primary is-outlined",class:{"is-loading":t.loading},attrs:{disabled:0===t.efxStaked},on:{click:function(e){t.unstakingModal=!0,t.stakingModalEfx=!0,t.removeStake=0}}},[t._v("\n                  Unstake EFX\n                ")])]),t._v(" "),t._m(1),t._v(" "),n("hr",{staticClass:"has-background-grey-lighter"}),t._v(" "),n("div",[n("a",{attrs:{href:"https://effect.network/token-page/",target:"_blank",rel:"noopener noreferrer"}},[t._v("\n                Get EFX "),n("font-awesome-icon",{attrs:{icon:["fas","external-link-alt"]}})],1)])])])]),t._v(" "),n("div",{staticClass:"column is-half"},[n("div",{staticClass:"box"},[t._m(2),t._v(" "),n("div",{staticClass:"has-text-centered"},[n("h3",{staticClass:"subtitle is-3 has-text-weight-bold"},[n("ICountUp",{attrs:{"end-val":t.nfxStaked}}),t._v(" "),n("span",{staticClass:"symbol"},[t._v("NFX")])],1),t._v(" "),n("div",{staticClass:"buttons"},[n("button",{staticClass:"button is-primary is-fullwidth",class:{"is-loading":t.loading},attrs:{disabled:0===t.nfxAvailable},on:{click:function(e){t.stakingModal=!0,t.stakingModalEfx=!1,t.addStake=t.nfxAvailable}}},[t._v("\n                  Stake NFX\n                ")]),t._v(" "),n("button",{staticClass:"button is-primary is-outlined",class:{"is-loading":t.loading},attrs:{disabled:0===t.nfxStaked},on:{click:function(e){t.unstakingModal=!0,t.stakingModalEfx=!1,t.removeStake=0}}},[t._v("\n                  Unstake NFX\n                ")])]),t._v(" "),t._m(3),t._v(" "),n("hr",{staticClass:"has-background-grey-lighter"}),t._v(" "),n("div",[n("a",{attrs:{href:" https://defibox.io/pool-market-details/437",target:"_blank",rel:"noopener noreferrer","data-tooltip":"NFX can only be bought with EFX"}},[t._v("\n                Get NFX "),n("font-awesome-icon",{attrs:{icon:["fas","external-link-alt"]}})],1)])])])]),t._v(" "),n("div",{staticClass:"column is-half"},[n("div",{staticClass:"box"},[n("h5",{staticClass:"subtitle box-title"},[t._v("\n              Stake AGE\n            ")]),t._v(" "),n("div",{staticClass:"has-text-centered"},[t.stakeAge?n("vue-circle",{staticClass:"mt-2",attrs:{progress:t.stakeAge/864e5*100,size:250,fill:{color:"#d7ac00"},"empty-fill":"rgba(0,0,0,.02)","animation-start-value":0,"insert-mode":"append",thickness:30,"start-angle":-Math.PI,"show-percent":!1}},[n("div",{staticClass:"value-circle"},[n("h1",{staticClass:"title"},[t._v(t._s(t._f("percentage")(t.stakeAge/864e5,1))),n("span",{staticClass:"has-text-weight-light"},[t._v("%")])]),t._v(" "),n("div",{staticClass:"age-amount"},[t._v("\n                    "+t._s(t._f("formatSeconds")(t.stakeAge,this))+"\n                  ")])])]):n("h2",[t._v("\n                ...\n              ")])],1)])]),t._v(" "),n("div",{staticClass:"column is-half"},[n("div",{staticClass:"box",staticStyle:{height:"100%"}},[n("h5",{staticClass:"subtitle box-title"},[t._v("\n              EFX Power\n            ")]),t._v(" "),n("div",{staticClass:"value-circle big mt-6 glow"},[n("div",{staticClass:"has-text-centered"},[n("h3",{staticClass:"has-text-weight-bold is-size-4"},[n("ICountUp",{attrs:{options:{decimalPlaces:0},"end-val":t.power}}),t._v(" "),n("small",{staticClass:"symbol has-text-weight-light is-size-6"},[t._v("EP")])],1),t._v(" "),n("span",[t._v("EFX Power")])])])])])])])])}),o,!1,null,"a008589c",null);e.default=component.exports;installComponents(component,{Footer:n(181).default})}}]);