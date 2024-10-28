(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1204:function(t,e,o){"use strict";o.r(e);o(70),o(271),o(60),o(127),o(183),o(40),o(269),o(410),o(9),o(737),o(34),o(128),o(411),o(417),o(69),o(61),o(47);var n=o(3),r=o(748);var c=o(905).submissions.sort((function(a,b){return Math.random()-.5}));!function(t){for(var i=t.length-1;i>0;i--){var e=Math.floor(Math.random()*(i+1)),o=[t[e],t[i]];t[i]=o[0],t[e]=o[1]}}(c);var l={filters:{formatBytes:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(0===t)return"0 Bytes";var o=1024,n=e<0?0:e,r=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],i=Math.floor(Math.log(t)/Math.log(o));return parseFloat((t/Math.pow(o,i)).toFixed(n))+" "+r[i]}},data:function(){return{quorum:0,ipfsExplorer:"https://ipfs.effect.ai",loading:!1,modalVisible:!1,proposal:void 0,hideComment:!0,proposalCycle:null,id:"2",cycle:3,vote_type:null,comment:null,submissions:c,votes_list:[],voteTypes:[{value:1,name:"Y",fullName:"Yes"},{value:0,name:"A",fullName:"Abstain"},{value:2,name:"N",fullName:"No"}],votes:null,categories:{0:"Governance Proposal",1:"Hackathon"}}},computed:{wallet:function(){return this.$wallet?this.$wallet.wallet:null},isMyProposal:function(){return this.proposal&&this.wallet&&this.wallet.auth&&this.wallet.auth.accountName===this.proposal.author},voteResults:function(){var t=[{type:1,votes:0,weight:0},{type:2,votes:0,weight:0},{type:0,votes:0,weight:0}];return this.votes&&this.votes.forEach((function(e){var o=t.find((function(t){return t.type===parseInt(e.type)}));o.votes++,o.weight+=e.weight})),t},totalVoteWeight:function(){return Object.values(this.voteResults).reduce((function(t,e){return t+e.weight}),0)},totalVotes:function(){return Object.values(this.voteResults).reduce((function(t,e){return t+e.votes}),0)},myVote:function(){var t=this;if(!this.votes||!this.wallet||!this.wallet.auth)return null;var e=this.votes.find((function(e){return e.voter===t.wallet.auth.accountName}));return e&&null===this.vote_type&&(this.vote_type=e.type),e},currentCycle:function(){return this.$dao.hackathonConfig?this.$dao.hackathonConfig.current_cycle:null},signedLastConstitution:function(){return this.$wallet.signedConstitutionVersion===(this.$dao.lastTerms?this.$dao.lastTerms.version:0)},proposalComment:function(){return void 0===this.$route.params.id||void 0===r[this.$route.params.id]?void 0:r[this.$route.params.id].text}},watch:{currentCycle:function(){this.getProposal(this.id)}},created:function(){this.getProposal(this.id),console.log("hackathonConfig",this.$dao.hackathonConfig)},methods:{assignToNextCycle:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.$dao.hackathonConfig||!t.proposal){e.next=11;break}return o=[{account:"effectvotess",name:"updateprop",authorization:[{actor:t.wallet.auth.accountName,permission:t.wallet.auth.permission}],data:{id:t.proposal.id,pay:t.proposal.pay,content_hash:t.proposal.content_hash,category:t.proposal.category,cycle:t.$dao.hackathonConfig.current_cycle+1,transaction_hash:t.proposal.transaction_hash}}],e.prev=2,e.next=5,t.$wallet.handleTransaction(o);case 5:t.$modal.show({color:"success",title:"Transaction Sent",persistent:!0,text:"Your transaction to assign proposal to next cycle is sent!",cancel:!1,onConfirm:function(){return t.getProposal(t.id),!0}}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),t.$modal.show({color:"danger",title:"Error",persistent:!0,text:e.t0});case 11:case"end":return e.stop()}}),e,null,[[2,8]])})))()},getQuorum:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var data;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(t&&0!==t.id){o.next=4;break}e.quorum=0,o.next=8;break;case 4:return o.next=6,e.$eos.rpc.get_table_rows({json:!0,code:"effectvotess",scope:"effectvotess",table:"cycle",limit:1,lower_bound:t.id});case 6:data=o.sent,e.quorum=data.rows[0].quorum;case 8:case"end":return o.stop()}}),o)})))()},getProposal:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var data,n,r;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(e.loading=!0,!e.$dao.hackathonConfig){o.next=31;break}return o.prev=2,o.next=5,e.$eos.rpc.get_table_rows({code:"effectvotess",scope:"effectvotess",table:"proposal",lower_bound:0,limit:100}).catch((function(t){return console.error("hackathon, getproposal error: ".concat(t))}));case 5:return data=o.sent,e.proposal=data.rows[parseInt(t)],o.next=9,e.$dao.getHackathonCycleConfig(e.proposal.cycle);case 9:return e.proposalCycle=o.sent,e.loading=!1,n="CLOSED",1===e.proposal.state?n="ACCEPTED":2===e.proposal.state?n="REJECTED":3===e.proposal.state?n="EXECUTED":0===e.proposal.state&&(n=e.proposal.cycle?e.proposalCycle&&e.proposal.cycle===e.$dao.hackathonConfig.current_cycle&&e.$moment(e.proposalCycle.start_time+"Z").add(e.$dao.hackathonConfig.cycle_voting_duration_sec,"seconds").isAfter()?"ACTIVE":e.proposalCycle&&e.$moment(e.proposalCycle.start_time+"Z").add(e.$dao.hackathonConfig.cycle_voting_duration_sec,"seconds").isBefore()||e.proposalCycle&&e.proposalCycle.id<e.$dao.hackathonConfig.current_cycle?"PROCESSING":"PENDING":"DRAFT"),e.$set(e.proposal,"status",n),o.next=16,e.$dao.getIpfsContent(e.proposal.content_hash);case 16:return r=o.sent,e.$set(e.proposal,"title",r.title),e.$set(e.proposal,"body",r.body),e.$set(e.proposal,"files",r.files?r.files:[]),o.next=22,e.getVotes(parseInt(e.id));case 22:return o.next=24,e.getQuorum(e.proposalCycle);case 24:o.next=30;break;case 26:o.prev=26,o.t0=o.catch(2),console.error("ERROR",o.t0),e.$modal.show({color:"danger",title:"Error",persistent:!0,text:o.t0});case 30:e.loading=!1;case 31:case"end":return o.stop()}}),o,null,[[2,26]])})))()},createCommentHash:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o,n,r,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=t.comment&&""!==t.comment){e.next=2;break}return e.abrupt("return",null);case 2:if(t.comment=t.sanitize(t.comment),o=new Blob([JSON.stringify(t.comment)],{type:"text/json"}),(n=new FormData).append("file",o),!(o.size>500)){e.next=11;break}t.$modal.show({color:"danger",title:"Error",persistent:!0,text:"Comment cannot contain more than 500 characters."}),t.modalVisible=!0,e.next=26;break;case 11:return e.prev=11,e.next=14,fetch("".concat("https://ipfs.effect.ai","/api/v0/add?pin=true"),{method:"POST",body:n});case 14:return r=e.sent,e.next=17,r.json();case 17:return c=e.sent,e.abrupt("return",c.Hash);case 21:return e.prev=21,e.t0=e.catch(11),t.$modal.show({color:"danger",title:"Error",persistent:!0,text:e.t0}),t.modalVisible=!0,e.abrupt("return","");case 26:case"end":return e.stop()}}),e,null,[[11,21]])})))()},sanitize:function(t){return t.trim().split(" ").filter((function(t){return t})).join(" ")},getVotes:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var n,data;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(!e.$dao.hackathonConfig){o.next=14;break}return o.prev=1,n={code:"effectvotess",scope:"effectvotess",table:"vote",index_position:4,key_type:"i64",limit:-1,lower_bound:t,upper_bound:t},o.next=5,e.$eos.rpc.get_table_rows(n);case 5:data=o.sent,e.moreVotes=data.more,e.nextKey=data.next_key,e.votes=data.rows,o.next=14;break;case 11:o.prev=11,o.t0=o.catch(1),e.$modal.show({color:"danger",title:"Error",persistent:!0,text:o.t0});case 14:case"end":return o.stop()}}),o,null,[[1,11]])})))()},commentModal:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var n;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(null==t.comment_hash){o.next=5;break}return o.next=3,e.$dao.getIpfsContent(t.comment_hash);case 3:n=o.sent,e.$modal.show({color:"default",title:"Comment | ".concat(t.voter),persistent:!1,text:n});case 5:case"end":return o.stop()}}),o)})))()},mapList:function(){var t=this.votes_list.map((function(t){return t.id})).join(",");return console.log("CommentList: ".concat(t)),t},vote:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(7!==t.votes_list.length){e.next=13;break}if(o=[{account:"effectvotess",name:"addvote",authorization:[{actor:t.wallet.auth.accountName,permission:t.wallet.auth.permission}],data:{voter:t.wallet.auth.accountName,prop_id:t.proposal.id,vote_type:1,comment_hash:t.mapList()}}],e.prev=2,t.modalVisible){e.next=7;break}return e.next=6,t.$wallet.handleTransaction(o);case 6:t.$modal.show({color:"success",title:"Vote Submitted",persistent:!1,text:"Your vote for the proposal is sent!",cancel:!1,onConfirm:function(){return t.getProposal(t.id),!0}});case 7:setTimeout((function(){return t.getVotes(t.id)}),5e3),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),t.$modal.show({color:"danger",title:"Error",persistent:!0,text:e.t0});case 13:case"end":return e.stop()}}),e,null,[[2,10]])})))()},addVoteToList:function(t){7!==this.votes_list.length?this.votes_list.includes(t)||(this.votes_list.push(t),this.mapList()):alert("You can only choose 7 candidates, remember; the order matters.")},clearVotesList:function(){this.votes_list=[]}},head:function(){return{title:"Proposal "+this.id}}},h=(o(906),o(25)),component=Object(h.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"content"},[t.loading?o("div",[t._v("\n    Loading Proposal..\n  ")]):t.proposal?o("div",{staticClass:"columns"},[o("div",{staticClass:"column is-two-thirds"},[void 0!==t.proposalComment?o("div",{staticClass:"message is-dark"},[o("div",{staticClass:"message-header"},[t._v("\n          High Guard Comment\n        ")]),t._v(" "),o("div",{staticClass:"message-body",domProps:{innerHTML:t._s(t.proposalComment)}})]):t._e(),t._v(" "),t.proposal.title?o("div",{staticClass:"title is-4"},[t._v("\n        #"+t._s(t.proposal.id)+": "+t._s(t.proposal.title)+"\n      ")]):o("div",{staticClass:"title is-4"},[t._v("\n        ...\n      ")]),t._v(" "),o("small",[t.proposal.body?o("div",{domProps:{innerHTML:t._s(t.$md.render(t.proposal.body))}}):o("div",[t._v("Loading content..")])]),t._v(" "),o("div",{staticClass:"box mt-5"},[o("h2",[t._v("Launchathon Submissions")]),t._v(" "),t._l(t.submissions,(function(e){return o("div",{key:e.group_name},[o("div",{staticClass:"card"},[o("div",{staticClass:"card-content"},[o("div",{staticClass:"media"},[o("div",{staticClass:"image is-32x32 media-left"},[o("avatar",{attrs:{"account-name":e.group_name}})],1),t._v(" "),o("div",{staticClass:"title is-3"},[t._v("\n                  "+t._s(e.group_name)+"\n                ")])]),t._v(" "),o("hr"),t._v(" "),o("div",{staticClass:"subtitle is-6"},[t._v("\n                "+t._s(e.description)+"\n              ")]),t._v(" "),e.github_url?o("div",[o("a",{attrs:{href:e.github_url,target:"_blank"}},[t._v("🞄 GitHub")]),t._v(" "),o("br")]):t._e(),t._v(" "),e.campaign_url?o("div",[o("a",{attrs:{href:e.campaign_url,target:"_blank"}},[t._v("🞄 Campaign")]),t._v(" "),o("br")]):t._e(),t._v(" "),e.website?o("div",[o("a",{attrs:{href:e.website,target:"_blank",rel:"noopener noreferrer"}},[t._v("🞄 Website")]),t._v(" "),o("br")]):t._e(),t._v(" "),e.youtube_url?o("div",[o("a",{attrs:{href:e.youtube_url,target:"_blank",rel:"noopener noreferrer"}},[t._v("🞄 YouTube")]),t._v(" "),o("br")]):t._e(),t._v(" "),e.devpost?o("div",[o("a",{attrs:{href:e.devpost,target:"_blank",rel:"noopener noreferrer"}},[t._v("🞄 Devpost")]),t._v(" "),o("hr")]):t._e(),t._v(" "),o("hr"),t._v(" "),t.votes_list.find((function(t){return t.id===e.id}))?o("button",{staticClass:"button is-centered is-fullwidth",attrs:{disabled:""}},[t._v("\n                Added: #"+t._s(t.votes_list.indexOf(t.votes_list.find((function(t){return t.id===e.id})))+1)+"\n              ")]):o("button",{staticClass:"button is-centered is-primary is-fullwidth",on:{click:function(o){return t.addVoteToList(e)}}},[t._v("\n                Add to VoteList\n              ")])])]),t._v(" "),o("br")])}))],2),t._v(" "),o("div",{staticClass:"box mt-5 has-text-centered"},[o("h5",[t._v("Selection List")]),t._v(" "),o("ul",t._l(t.votes_list,(function(e,n){return o("li",{key:e.group_name},[t._v("\n            "+t._s(n+1)+" - "+t._s(e.group_name)+"\n          ")])})),0),t._v(" "),o("button",{staticClass:"button is-warning",on:{click:function(e){return t.clearVotesList()}}},[t._v("\n          Clear\n        ")])]),t._v(" "),"ACTIVE"===t.proposal.status||"CLOSED"===t.proposal.status?o("div",{staticClass:"box mt-5"},[o("h5",{staticClass:"box-title"},[t._v("\n          Cast your vote\n        ")]),t._v(" "),t.proposalCycle?o("div",{staticClass:"has-text-centered mb-4"},[t.$moment(t.proposalCycle.start_time+"Z").add(t.$dao.hackathonConfig.cycle_voting_duration_sec,"seconds").isBefore()?o("span",[t._v("\n            Voting Closed\n          ")]):o("span",[t._v("\n            Voting ends "+t._s(t.$moment(t.proposalCycle.start_time+"Z").add(t.$dao.hackathonConfig.cycle_voting_duration_sec,"seconds").fromNow())+"\n          ")])]):t.myVote&&"CLOSED"===t.proposal.status?o("div",[o("b",[t._v("You voted "+t._s(t.myVote.voter)+":")]),t._v(" "+t._s(t.voteTypes.find((function(e){return e.value===t.myVote.type})).name)+" - "+t._s(t.myVote.weight)+"\n        ")]):t._e(),t._v(" "),"ACTIVE"===t.proposal.status&&t.proposalCycle&&t.$moment(t.proposalCycle.start_time+"Z").add(t.$dao.hackathonConfig.cycle_voting_duration_sec,"seconds").isAfter()?o("div"):t._e(),t._v(" "),o("div",[t.wallet&&t.wallet.auth&&!t.signedLastConstitution?o("NuxtLink",{attrs:{to:"/dao"}},[o("button",{staticClass:"button is-primary is-fullwidth"},[t._v("\n              Sign new constitution\n            ")])]):o("button",{staticClass:"button is-success is-outlined is-fullwidth",attrs:{disabled:!t.wallet||!t.wallet.auth||t.wallet.nfxStillClaimable||t.$wallet.calculateVotePower(this.$wallet.power,this.$wallet.nfxStaked)<1||this.votes_list.length<7},on:{click:function(e){return t.vote()}}},[t.wallet&&t.wallet.auth?t.$wallet.calculateVotePower(this.$wallet.power,this.$wallet.nfxStaked)<1?o("span",[t._v("No voting power")]):t.wallet.nfxStillClaimable?o("span",[t._v("Claim NFX before you can vote")]):o("span",[t._v("Vote")]):o("span",[t._v("Not connected to wallet")]),t._v(" "),o("span",{staticClass:"icon"},[o("font-awesome-icon",{attrs:{icon:["fas","check"]}})],1)])],1)]):o("div",{staticClass:"box mt-5 faded"},[o("h5",{staticClass:"box-title"},[t._v("\n          Cast your vote\n        ")]),t._v(" "),"PENDING"===t.proposal.status||"PROCESSING"===t.proposal.status?o("p",{staticClass:"has-text-centered"},[t.proposal.cycle<t.currentCycle||"PROCESSING"===t.proposal.status?o("span",[t._v("\n            Voting closed.\n          ")]):o("span",[t._v("\n            Voting will be possible once cycle "+t._s(t.proposal.cycle)+" is active.\n          ")])]):"DRAFT"===t.proposal.status?o("p",{staticClass:"has-text-centered"},[t._v("\n          This proposal is currently in draft. It can be voted on once it is pushed to a cycle by the author and that cycle is live.\n        ")]):t._e()]),t._v(" "),o("div",{staticClass:"box mt-5"},[o("h5",{staticClass:"box-title"},[t._v("\n          Votes ("+t._s(t.totalVotes)+")\n        ")]),t._v(" "),t.votes&&t.votes.length?o("div",t._l(t.votes,(function(e){return o("div",{key:e.id+e.voter,staticClass:"columns is-vcentered is-mobile"},[o("div",{staticClass:"column is-5"},[o("div",{staticClass:"is-flex is-align-items-center"},[o("div",{staticClass:"image is-32x32 is-rounded mr-2"},[o("avatar",{attrs:{"account-name":e.voter}})],1),t._v(" "),o("nuxt-link",{attrs:{to:"/account/"+e.voter}},[o("b",[t._v(t._s(e.voter))])])],1)]),t._v(" "),o("div",{staticClass:"column is-3 has-text-centered"},[o("b",{class:{"has-text-success":1===e.type,"has-text-danger":2===e.type}},[t._v(t._s(t.voteTypes.find((function(t){return t.value===e.type})).name))])]),t._v(" "),o("div",{staticClass:"column is-2 has-text-centered",attrs:{"data-tooltip":"Vote-weight: "+e.weight}},[o("b",[t._v(t._s(t.$wallet.formatNumber(e.weight)))])])])})),0):t.votes?o("div",{staticClass:"has-text-centered"},[t._v("\n          No votes yet\n        ")]):o("div",{staticClass:"has-text-centered"},[t._v("\n          Loading votes..\n        ")])])]),t._v(" "),o("div",{staticClass:"column is-one-third"},[o("div",{staticClass:"box"},[o("h5",{staticClass:"box-title"},[t._v("\n          Information\n        ")]),t._v(" "),o("div",{staticClass:"block"},[o("i",[t._v("author")]),o("br"),t._v(" "),o("nuxt-link",{attrs:{to:"/account/"+t.proposal.author}},[o("b",[t._v(t._s(t.proposal.author))])])],1),t._v(" "),o("div",{staticClass:"block"},[o("i",[t._v("Status")]),o("br"),t._v(" "),o("b",{staticClass:"tag",class:{"is-success":"ACTIVE"===t.proposal.status||"EXECUTED"===t.proposal.status||"ACCEPTED"==t.proposal.status,"is-warning":"DRAFT"===t.proposal.status,"is-link":"PENDING"===t.proposal.status,"is-dark":"WARNING"===t.proposal.status,"is-danger":"REJECTED"===t.proposal.status}},[t._v(t._s(t.proposal.status))])]),t._v(" "),o("div",{staticClass:"block"},[t._v("\n          IPFS Hash\n          "),o("div",{staticClass:"hash"},[o("a",{attrs:{target:"_blank",href:t.ipfsExplorer+"/ipfs/"+t.proposal.content_hash}},[t._v(t._s(t.proposal.content_hash))])])]),t._v(" "),o("div",{staticClass:"block"},[o("i",[t._v("Category")]),o("br"),t._v(" "),o("b",[t._v(t._s(t.categories[t.proposal.category]))])]),t._v(" "),t.isMyProposal?o("div",{staticClass:"mt-2"},[o("nuxt-link",{staticClass:"button is-primary is-fullwidth",attrs:{to:"/proposals/"+t.id+"/edit"}},[o("b",[t._v("Edit")])])],1):t._e(),t._v(" "),t.isMyProposal&&t.$dao.hackathonConfig&&3===t.proposal.cycle?o("div",{staticClass:"mt-2"},[o("button",{staticClass:"button is-primary is-outlined is-fullwidth",on:{click:function(e){return e.preventDefault(),t.assignToNextCycle()}}},[o("b",[t._v("Assign to next cycle")])])]):t._e()]),t._v(" "),o("div",{staticClass:"box"},[o("h5",{staticClass:"box-title",attrs:{"data-tooltip":"Total vote-weight: "+this.totalVoteWeight}},[t._v("\n          Results: "+t._s(t.$wallet.formatNumber(this.totalVoteWeight))+"\n        ")]),t._v(" "),o("div",{staticClass:"has-text-centered is-italic mt-4 is-size-7"},[t._v("\n          Quorum: "+t._s(this.quorum)+"\n        ")])])])]):o("h4",{staticClass:"has-text-centered subtitle"},[t._v("\n    Could not retrieve proposal\n  ")])])}),[],!1,null,"c0ced4ac",null);e.default=component.exports;installComponents(component,{Avatar:o(727).default})},727:function(t,e,o){"use strict";o.r(e);var n=o(130),r=(o(47),o(3)),c={props:{accountName:{type:String,required:!0}},data:function(){return{imgsrc:null,isLoading:!1}},computed:{avatar_src:function(){return this.imgsrc||"https://ui-avatars.com/api/?name=".concat(this.accountName,"&size=100")}},created:function(){this.getCurrentAvatar()},methods:{fallbackAvatar:function(t){t.target.src="https://ui-avatars.com/api/?name=".concat(this.accountName,"&size=100")},getCurrentAvatar:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o,r,c,l,h,d,v;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,o={json:!0,code:"theeffectdao",scope:t.accountName,table:"avatar",limit:1},e.next=5,t.$eos.rpc.get_table_rows(o);case 5:if(!((r=e.sent).rows&&r.rows.length>0)){e.next=28;break}return c=Object(n.a)(r.rows,1),l=c[0],h=l.asset_id,e.next=11,t.$atomic.getAsset(t.accountName,h);case 11:return d=e.sent,e.next=14,d.data();case 14:if(!(v=e.sent)){e.next=27;break}if(!v.img){e.next=20;break}t.imgsrc="https://atomichub-ipfs.com/ipfs/".concat(v.img),e.next=25;break;case 20:if(!v.video){e.next=24;break}t.imgsrc="https://atomichub-ipfs.com/ipfs/".concat(v.video),e.next=25;break;case 24:throw new Error("Asset has no image or video");case 25:e.next=28;break;case 27:throw new Error("Error retrieving asset");case 28:e.next=33;break;case 30:e.prev=30,e.t0=e.catch(1),console.error(e.t0);case 33:t.loading=!1;case 34:case"end":return e.stop()}}),e,null,[[1,30]])})))()}}},l=o(25),component=Object(l.a)(c,(function(){var t=this.$createElement;return(this._self._c||t)("img",{attrs:{src:this.avatar_src,alt:"Atomic Asset NFT"}})}),[],!1,null,null,null);e.default=component.exports},737:function(t,e,o){var n=o(2),r=o(413).values;n({target:"Object",stat:!0},{values:function(t){return r(t)}})},748:function(t){t.exports=JSON.parse('{"28":{"text":"This proposal was rejected by a resolution of the High Guard. It was identified to be in conflict with other developments in the network. The author will revisit this proposal with the given feedback."}}')},806:function(t,e,o){var content=o(907);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(59).default)("edb9fbaa",content,!0,{sourceMap:!1})},905:function(t){t.exports=JSON.parse('{"submissions":[{"id":1,"group_name":"Delos","description":"Delos allows anyone to submit a Document and using the amazing Effect Workforce, we categorize the data from the image and validate if it is in fact a useful document.","github_url":" https://github.com/jgarciajovel/delos/tree/master ","youtube_url":"https://youtu.be/VOw77SIIBHE","voteWeight":""},{"id":4,"group_name":"ChessForce","description":"Play chess against workers on Effect Force!","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/chessforce","youtube_url":"https://youtu.be/3xVAG3cCZr8","voteWeight":""},{"id":5,"group_name":"QuickCat","description":"QuickCat is an app built on Shopify, a platform used by over 1.7M merchants to run their online stores. The goal is to help merchants save time and increase sales by organizing their online product listing with the help of a global human workforce.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/catalogue","youtube_url":"https://youtu.be/9ah7O1HCpcs","voteWeight":""},{"id":11,"group_name":"Vibelyze","description":"Vibelyze is an app that investigates music nuance. Vibelyze obtains information suitable for training your music-related machine algorithm or designing your DJ setlist by handing songs to thousands of Effect Network workers.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/vibelyze","youtube_url":"https://www.youtube.com/watch?v=O6vbbiE918Y","voteWeight":""},{"id":12,"group_name":"Gitstar","description":"Have the Github users from the Effect Network interact and with you open source repositories to get more traction. The Effect workforce allows projects to easily tap into a fitting audience for their Github pages.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/gitstar","youtube_url":"https://youtu.be/kUSMbex6qz8","voteWeight":""},{"id":13,"group_name":"Ergasia","description":"It is a task distribution platform powered by Effect Network. It allows companies and individuals to upload tasks and get them done quickly. It currently has 5 campaigns which are Converting handwritten images to text, Editing Images, Technical Code Debug, Feedback for posters and asking Academic Course related questions.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/ergasia","youtube_url":"https://youtu.be/LSPXKT6H_gQ","voteWeight":""},{"id":15,"group_name":"EYEFX","description":"EYEFX measures where the users are looking on the computer screen, for how long, and where do they go next. This provides valuable insights into the perception and interaction of users of these digital assets which can be used to optimize design towards specific targets. Through the Effect Force platform, a requester can submit their design and have it trialled by a number of users, throughout the world, otherwise impossible to reach in a practical fashion. Moreover, pooling thousands of users\' interactions enables Machine Learning techniques to validate and combine the data in order to improve detection algorithms over time.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/EYEFX","youtube_url":"https://www.youtube.com/watch?v=uXlsayVKdrA","voteWeight":""},{"id":17,"group_name":"Youtube Chapters","description":"Chapters in videos help us to get idea of the content of video without watching it completely. Chapters save us lot of time when we watch tutorial videos. It inspired me to find a solution to easily create chapters. This application add chapters to videos by using Effect Network.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/chapterfy","youtube_url":"https://youtu.be/Rmw6JJqs2z8","voteWeight":""}]}')},906:function(t,e,o){"use strict";o(806)},907:function(t,e,o){(e=o(58)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),e.push([t.i,"@import url(https://use.typekit.net/kej5qyk.css);"]),e.push([t.i,".hash[data-v-c0ced4ac]{white-space:nowrap;overflow:hidden;font-family:monospace;text-overflow:ellipsis;max-width:100%}.progress[data-v-c0ced4ac]{margin-top:-22px;margin-bottom:12px}small .comment-button[data-v-c0ced4ac]{font-size:.7em}textarea[data-v-c0ced4ac]{width:100%}",""]),t.exports=e}}]);