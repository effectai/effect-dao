(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{696:function(t,e,o){var n=o(2),r=o(393).values;n({target:"Object",stat:!0},{values:function(t){return r(t)}})},718:function(t,e,o){var content=o(759);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(58).default)("44fdb82e",content,!0,{sourceMap:!1})},758:function(t,e,o){"use strict";o(718)},759:function(t,e,o){(e=o(57)(!1)).push([t.i,".hash[data-v-7637f33e]{white-space:nowrap;overflow:hidden;font-family:monospace;text-overflow:ellipsis;max-width:100%}.progress[data-v-7637f33e]{margin-top:-22px;margin-bottom:12px}",""]),t.exports=e},779:function(t,e,o){"use strict";o.r(e);o(255),o(59),o(254),o(390),o(696),o(70),o(44);var n=o(3),r={filters:{formatBytes:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(0===t)return"0 Bytes";var o=1024,n=e<0?0:e,r=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],i=Math.floor(Math.log(t)/Math.log(o));return parseFloat((t/Math.pow(o,i)).toFixed(n))+" "+r[i]}},data:function(){return{quorum:0,ipfsExplorer:"https://ipfs.effect.ai",loading:!1,proposal:null,proposalCycle:null,id:this.$route.params.id,vote_type:null,voteTypes:[{value:1,name:"Yes"},{value:0,name:"Abstain"},{value:2,name:"No"}],votes:null,categories:{0:"Governance Proposal",1:"Marketing",2:"Design",3:"Technical",4:"Other"}}},computed:{wallet:function(){return this.$wallet?this.$wallet.wallet:null},isMyProposal:function(){return this.proposal&&this.wallet&&this.wallet.auth&&this.wallet.auth.accountName===this.proposal.author},voteResults:function(){var t=[{type:1,votes:0,weight:0},{type:2,votes:0,weight:0},{type:0,votes:0,weight:0}];return this.votes&&this.votes.forEach((function(e){var o=t.find((function(t){return t.type===parseInt(e.type)}));o.votes++,o.weight+=e.weight})),t},totalVoteWeight:function(){return Object.values(this.voteResults).reduce((function(t,e){return t+e.weight}),0)},totalVotes:function(){return Object.values(this.voteResults).reduce((function(t,e){return t+e.votes}),0)},myVote:function(){var t=this;if(!this.votes||!this.wallet||!this.wallet.auth)return null;var e=this.votes.find((function(e){return e.voter===t.wallet.auth.accountName}));return e&&null===this.vote_type&&(this.vote_type=e.type),e},currentCycle:function(){return this.$dao.proposalConfig?this.$dao.proposalConfig.current_cycle:null},signedLastConstitution:function(){return this.$wallet.signedConstitutionVersion===(this.$dao.lastTerms?this.$dao.lastTerms.version:0)}},watch:{currentCycle:function(){this.getProposal(this.id)}},created:function(){this.getProposal(this.id),this.getQuorum()},methods:{assignToNextCycle:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.$dao.proposalConfig||!t.proposal){e.next=11;break}return o=[{account:"daoproposals",name:"updateprop",authorization:[{actor:t.wallet.auth.accountName,permission:t.wallet.auth.permission}],data:{id:t.proposal.id,pay:t.proposal.pay,content_hash:t.proposal.content_hash,category:t.proposal.category,cycle:t.$dao.proposalConfig.current_cycle+1,transaction_hash:t.proposal.transaction_hash}}],e.prev=2,e.next=5,t.$wallet.handleTransaction(o);case 5:t.$modal.show({color:"success",title:"Transaction Sent",persistent:!0,text:"Your transaction to assign proposal to next cycle is sent!",cancel:!1,onConfirm:function(){return t.getProposal(t.id),!0}}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),t.$modal.show({color:"danger",title:"Error",persistent:!0,text:e.t0});case 11:case"end":return e.stop()}}),e,null,[[2,8]])})))()},getQuorum:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$eos.rpc.get_table_rows({code:"daoproposals",scope:"daoproposals",table:"config",limit:1});case 2:data=e.sent,t.quorum=data.rows[0].quorum;case 4:case"end":return e.stop()}}),e)})))()},getProposal:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var data,n,r;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(e.loading=!0,!e.$dao.proposalConfig){o.next=28;break}return o.prev=2,o.next=5,e.$eos.rpc.get_table_rows({code:"daoproposals",scope:"daoproposals",table:"proposal",lower_bound:t,limit:1});case 5:return data=o.sent,e.proposal=data.rows[0],o.next=9,e.$dao.getCycleConfig(e.proposal.cycle);case 9:return e.proposalCycle=o.sent,e.loading=!1,n="CLOSED",1===e.proposal.state?n="ACCEPTED":2===e.proposal.state?n="REJECTED":3===e.proposal.state?n="EXECUTED":0===e.proposal.state&&(n=e.proposal.cycle?e.proposalCycle&&e.proposal.cycle===e.$dao.proposalConfig.current_cycle&&e.$moment(e.proposalCycle.start_time+"Z").add(e.$dao.proposalConfig.cycle_voting_duration_sec,"seconds").isAfter()?"ACTIVE":e.proposalCycle&&e.$moment(e.proposalCycle.start_time+"Z").add(e.$dao.proposalConfig.cycle_voting_duration_sec,"seconds").isBefore()||e.proposalCycle&&e.proposalCycle.id<e.$dao.proposalConfig.current_cycle?"PROCESSING":"PENDING":"DRAFT"),e.$set(e.proposal,"status",n),o.next=16,e.$dao.getIpfsProposal(e.proposal.content_hash);case 16:return r=o.sent,e.$set(e.proposal,"title",r.title),e.$set(e.proposal,"body",r.body),e.$set(e.proposal,"files",r.files?r.files:[]),o.next=22,e.getVotes(parseInt(t));case 22:o.next=27;break;case 24:o.prev=24,o.t0=o.catch(2),console.log(o.t0);case 27:e.loading=!1;case 28:case"end":return o.stop()}}),o,null,[[2,24]])})))()},getVotes:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var n,data;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(!e.$dao.proposalConfig){o.next=12;break}return o.prev=1,n={code:"daoproposals",scope:"daoproposals",table:"vote",index_position:4,key_type:"i64",limit:100,lower_bound:t,upper_bound:t},o.next=5,e.$eos.rpc.get_table_rows(n);case 5:data=o.sent,e.votes=data.rows,o.next=12;break;case 9:o.prev=9,o.t0=o.catch(1),console.log(o.t0);case 12:case"end":return o.stop()}}),o,null,[[1,9]])})))()},vote:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.proposal||null===t.vote_type){e.next=11;break}return o=[{account:"daoproposals",name:"addvote",authorization:[{actor:t.wallet.auth.accountName,permission:t.wallet.auth.permission}],data:{voter:t.wallet.auth.accountName,prop_id:t.proposal.id,vote_type:t.vote_type}}],e.prev=2,e.next=5,t.$wallet.handleTransaction(o);case 5:t.$modal.show({color:"success",title:"Vote Submitted",persistent:!1,text:"Your vote for the proposal is sent!",cancel:!1,onConfirm:function(){return t.getProposal(t.id),!0}}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),t.$modal.show({color:"danger",title:"Error",persistent:!0,text:e.t0});case 11:case"end":return e.stop()}}),e,null,[[2,8]])})))()}}},l=(o(758),o(21)),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"mb-2"},[o("nuxt-link",{staticClass:"is-size-7",attrs:{to:"/proposals"}},[t._v("\n      < All Proposals\n    ")])],1),t._v(" "),t.loading?o("div",[t._v("\n    Loading Proposal..\n  ")]):t.proposal?o("div",{staticClass:"columns"},[o("div",{staticClass:"column is-two-thirds"},[o("div",{staticClass:"is-pulled-right"},[o("span",{staticClass:"tag",class:{"is-success":"ACTIVE"===t.proposal.status||"EXECUTED"===t.proposal.status||"ACCEPTED"==t.proposal.status,"is-warning":"DRAFT"===t.proposal.status,"is-link":"PENDING"===t.proposal.status,"is-dark":"WARNING"===t.proposal.status,"is-danger":"REJECTED"===t.proposal.status}},[t._v(t._s(t.proposal.status))])]),t._v(" "),t.proposal.title?o("div",{staticClass:"title is-4"},[t._v("\n        #"+t._s(t.proposal.id)+": "+t._s(t.proposal.title)+"\n      ")]):o("div",{staticClass:"title is-4"},[t._v("\n        ...\n      ")]),t._v(" "),o("div",{staticClass:"subtitle is-6"},[o("b",[t._v(t._s(t.categories[t.proposal.category]))])]),t._v(" "),o("small",[t.proposal.body?o("div",{domProps:{innerHTML:t._s(t.$md.render(t.proposal.body))}}):o("div",[t._v("Loading content..")])]),t._v(" "),o("div",{staticClass:"box mt-5"},[o("h4",{staticClass:"box-title"},[t._v("\n          Attachments\n        ")]),t._v(" "),t.proposal.files?o("table",{staticClass:"table"},[t.proposal.files.length>0?o("tbody",t._l(t.proposal.files,(function(e){return o("tr",{key:e.Hash},[o("td",[o("a",{attrs:{href:t.ipfsExplorer+"/ipfs/"+e.Hash,target:"_blank"}},[t._v(t._s(e.Name))])]),t._v(" "),o("td",[t._v(t._s(t._f("formatBytes")(e.Size)))])])})),0):o("tbody",[t._m(0)])]):o("div",[t._v("\n          Loading attachments..\n        ")])]),t._v(" "),"ACTIVE"===t.proposal.status||"CLOSED"===t.proposal.status?o("div",{staticClass:"box mt-5"},[o("h5",{staticClass:"box-title"},[t._v("\n          Cast your vote\n        ")]),t._v(" "),t.proposalCycle?o("div",{staticClass:"has-text-centered mb-4"},[t.$moment(t.proposalCycle.start_time+"Z").add(t.$dao.proposalConfig.cycle_voting_duration_sec,"seconds").isBefore()?o("span",[t._v("\n            Voting Closed\n          ")]):o("span",[t._v("\n            Voting ends "+t._s(t.$moment(t.proposalCycle.start_time+"Z").add(t.$dao.proposalConfig.cycle_voting_duration_sec,"seconds").fromNow())+"\n          ")])]):t.myVote&&"CLOSED"===t.proposal.status?o("div",[o("b",[t._v("You voted "+t._s(t.myVote.voter)+":")]),t._v(" "+t._s(t.voteTypes.find((function(e){return e.value===t.myVote.type})).name)+" - "+t._s(t.myVote.weight)+"\n        ")]):t._e(),t._v(" "),"ACTIVE"===t.proposal.status&&t.proposalCycle&&t.$moment(t.proposalCycle.start_time+"Z").add(t.$dao.proposalConfig.cycle_voting_duration_sec,"seconds").isAfter()?o("div",{staticClass:"columns"},t._l(t.voteTypes,(function(e){return o("div",{key:e.value,staticClass:"control column"},[o("button",{staticClass:"button is-fullwidth",class:{"is-dark":0===e.value,"is-danger":2===e.value,"is-success":1===e.value,"is-outlined":t.vote_type!==e.value},on:{click:function(o){o.preventDefault(),t.vote_type=e.value}}},[o("span",{staticClass:"icon"},[0===e.value?o("font-awesome-icon",{attrs:{icon:["fas","hand-paper"]}}):2===e.value?o("font-awesome-icon",{attrs:{icon:["fas","times"]}}):1===e.value?o("font-awesome-icon",{attrs:{icon:["fas","check"]}}):t._e()],1),t._v(" "),o("span",[t._v(t._s(e.name))])])])})),0):t._e(),t._v(" "),o("div",[t.wallet&&t.wallet.auth&&!t.signedLastConstitution?o("NuxtLink",{attrs:{to:"/dao"}},[o("button",{staticClass:"button is-primary is-fullwidth"},[t._v("\n              Sign new constitution\n            ")])]):o("button",{staticClass:"button is-primary is-fullwidth",attrs:{disabled:!t.votes||null===t.vote_type||!t.wallet||!t.wallet.auth||t.wallet.nfxStillClaimable||!t.$wallet.rank||!t.$wallet.rank.currentRank},on:{click:function(e){return e.preventDefault(),t.vote(e)}}},[t.wallet&&t.wallet.auth?t.$wallet.rank&&t.$wallet.rank.currentRank?t.wallet.nfxStillClaimable?o("span",[t._v("Claim NFX before you can vote")]):o("span",[t._v("Vote")]):o("span",[t._v("Not a Guardian")]):o("span",[t._v("Not connected to wallet")])])],1)]):o("div",{staticClass:"box mt-5 faded"},[o("h5",{staticClass:"box-title"},[t._v("\n          Cast your vote\n        ")]),t._v(" "),"PENDING"===t.proposal.status||"PROCESSING"===t.proposal.status?o("p",{staticClass:"has-text-centered"},[t.proposal.cycle<t.currentCycle||"PROCESSING"===t.proposal.status?o("span",[t._v("\n            Voting closed.\n          ")]):o("span",[t._v("\n            Voting will be possible once cycle "+t._s(t.proposal.cycle)+" is active.\n          ")])]):"DRAFT"===t.proposal.status?o("p",{staticClass:"has-text-centered"},[t._v("\n          This proposal is currently in draft. It can be voted on once it is pushed to a cycle by the author and that cycle is live.\n        ")]):t._e()]),t._v(" "),o("div",{staticClass:"box mt-5"},[o("h5",{staticClass:"box-title"},[t._v("\n          Votes ("+t._s(t.totalVotes)+")\n        ")]),t._v(" "),t.votes&&t.votes.length?o("div",t._l(t.votes,(function(e){return o("div",{key:e.id+e.voter,staticClass:"columns is-vcentered is-mobile"},[o("div",{staticClass:"column is-8"},[o("div",{staticClass:"is-flex is-align-items-center"},[o("div",{staticClass:"image is-32x32 is-rounded mr-2"},[o("avatar",{attrs:{"account-name":e.voter}})],1),t._v(" "),o("nuxt-link",{attrs:{to:"/account/"+e.voter}},[o("b",[t._v(t._s(e.voter))])])],1)]),t._v(" "),o("div",{staticClass:"column is-2 has-text-centered"},[o("b",{class:{"has-text-success":1===e.type,"has-text-danger":2===e.type}},[t._v(t._s(t.voteTypes.find((function(t){return t.value===e.type})).name))])]),t._v(" "),o("div",{staticClass:"column is-2 has-text-centered"},[o("b",[t._v(t._s(e.weight))])])])})),0):t.votes?o("div",{staticClass:"has-text-centered"},[t._v("\n          No votes yet\n        ")]):o("div",{staticClass:"has-text-centered"},[t._v("\n          Loading votes..\n        ")])])]),t._v(" "),o("div",{staticClass:"column is-one-third"},[o("div",{staticClass:"box"},[o("h5",{staticClass:"box-title"},[t._v("\n          Information\n        ")]),t._v(" "),o("div",{staticClass:"block"},[o("i",[t._v("author")]),o("br"),t._v(" "),o("nuxt-link",{attrs:{to:"/account/"+t.proposal.author}},[o("b",[t._v(t._s(t.proposal.author))])])],1),t._v(" "),t._l(t.proposal.pay,(function(e,n){return o("div",{key:n,staticClass:"block"},[o("i",[t._v("requesting")]),o("br"),t._v(" "),o("b",[t._v(t._s(e.field_0.quantity))]),o("br"),t._v(" "),t._e(),t._v(" "),t._e()])})),t._v(" "),o("div",{staticClass:"block"},[t._v("\n          IPFS Hash\n          "),o("div",{staticClass:"hash"},[o("a",{attrs:{target:"_blank",href:t.ipfsExplorer+"/ipfs/"+t.proposal.content_hash}},[t._v(t._s(t.proposal.content_hash))])])]),t._v(" "),o("div",{staticClass:"block"},[o("i",[t._v("cycle")]),o("br"),t._v(" "),o("b",[t._v(t._s(t.proposal.cycle))])]),t._v(" "),t.isMyProposal?o("div",{staticClass:"mt-2"},[o("nuxt-link",{staticClass:"button is-primary is-fullwidth",attrs:{to:"/proposals/"+t.id+"/edit"}},[o("b",[t._v("Edit")])])],1):t._e(),t._v(" "),t.isMyProposal&&t.$dao.proposalConfig&&0===t.proposal.cycle?o("div",{staticClass:"mt-2"},[o("button",{staticClass:"button is-primary is-outlined is-fullwidth",on:{click:function(e){return e.preventDefault(),t.assignToNextCycle()}}},[o("b",[t._v("Assign to next cycle")])])]):t._e()],2),t._v(" "),o("div",{staticClass:"box"},[o("h5",{staticClass:"box-title"},[t._v("\n          Results ("+t._s(this.totalVoteWeight)+"/"+t._s(this.quorum)+")\n        ")]),t._v(" "),t._l(t.voteResults,(function(e){return o("div",{key:e.type},[o("div",{staticClass:"columns is-vcentered is-mobile"},[o("div",{staticClass:"column is-4"},[o("b",{class:{"has-text-success":1===e.type,"has-text-danger":2===e.type}},[t._v(t._s(t.voteTypes.find((function(t){return t.value==e.type})).name))])]),t._v(" "),o("div",{staticClass:"column is-6"},[o("small",[t._v("# votes: ")]),t._v(" "),o("span",[t._v(t._s(e.votes))])]),t._v(" "),o("div",{staticClass:"column is-2"},[o("b",[t._v(t._s(e.weight))])])]),t._v(" "),o("progress",{class:["progress","is-small","progress-type-"+e.type,{"is-danger":2===e.type},{"is-success":1===e.type}],attrs:{max:t.totalVoteWeight},domProps:{value:e.weight}})])}))],2)])]):o("h4",{staticClass:"has-text-centered"},[t._v("\n    Could not retrieve proposal\n  ")])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{attrs:{colspan:"2"}},[this._v("\n                No files attached\n              ")])])}],!1,null,"7637f33e",null);e.default=component.exports;installComponents(component,{Avatar:o(176).default})}}]);