(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{1169:function(t,e,o){t.exports=o.p+"img/delos.63d2b03.jpg"},1170:function(t,e,o){t.exports=o.p+"img/catalogue.ef52c7b.png"},1171:function(t,e,o){t.exports=o.p+"img/effect_notebooks.a5f575a.jpg"},1180:function(t,e,o){"use strict";o(870)},1181:function(t,e,o){(e=o(58)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),e.push([t.i,"@import url(https://use.typekit.net/kej5qyk.css);"]),e.push([t.i,"table{font-size:.7em}table .tag{font-size:.9em;height:inherit}table .column{display:flex}",""]),t.exports=e},1209:function(t,e,o){"use strict";o.r(e);o(1172),o(60),o(72),o(40),o(1174),o(269),o(1175),o(55),o(280),o(181),o(9),o(34),o(41),o(411),o(69),o(42);var n=o(794),r=(o(47),o(3)),c=o(869),h=o(771);console.log(h);var l={components:{PieChart:c.default},data:function(){return{loadingBalances:!1,totalVoteWeight:0,totalMembers:0,totalHackathonVoteWeight:0,totalVotes:0,checkTotalVotes:0,sortedVotesList:null,sortedVotesMap:null,nextCycleStartDate:"...",membersLowerBound:"13528614985990483600",chartOptions:{cutoutPercentage:10}}},computed:{stats:function(){var t,e,o;return[{name:"Total DAO Members",description:"Including members with no vote-power",value:this.totalMembers},{name:"Total DAO Voting Members",description:"Members with voting power",value:247},{name:"Total Vote Weight",description:"Sum of all vote-weight of members who participated",value:null!==(t=parseInt(this.totalHackathonVoteWeight))&&void 0!==t?t:""},{name:"Total Votes",description:"Total Members who voted",value:null!==(e=this.totalVotes)&&void 0!==e?e:""},{name:"Total vote per Member",description:"",value:null!==(o=this.checkTotalVotes)&&void 0!==o?o:""}]},chartData:function(){return{labels:this.chartLabels,datasets:[{name:"Token Map",backgroundColor:["#0dd925","#499166","#fce68d","#394dfa","#d6fca4","#7aa7ff","#A4B8BB","#0dd925","#499166","#fce68d","#394dfa","#d6fca4","#7aa7ff","#A4B8BB","#0dd925","#499166","#fce68d","#394dfa","#d6fca4","#7aa7ff","#A4B8BB"],weight:.55,meta:h.submissions,data:this.innerChartBalances,labels:this.chartLabels}]}},innerChartBalances:function(){return this.sortedVotesList?this.sortedVotesList.map((function(t){return t[1].voteWeight})):null},chartLabels:function(){return console.log(this.sortedList),this.sortedVotesList?this.sortedVotesList.map((function(t){return t[1].name})):null}},watch:{"$dao.cycleConfig":function(t){console.log("cycle config ready"),t&&this.getTotalVoteWeight()}},created:function(){this.calculateVotePower()},mounted:function(){this.getTotalVoteWeight(),this.getDaoMembers()},methods:{getVotes:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o={code:"effectvotess",scope:"effectvotess",table:"vote",limit:-1},e.next=3,t.$eos.rpc.get_table_rows(o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))()},applyVoteWeight:function(element,t,e){switch(t){case 0:return{id:element,voteweight:parseInt(.26*Number(e))};case 1:return{id:element,voteweight:parseInt(.2*Number(e))};case 2:return{id:element,voteweight:parseInt(.16*Number(e))};case 3:return{id:element,voteweight:parseInt(.13*Number(e))};case 4:return{id:element,voteweight:parseInt(.1*Number(e))};case 5:return{id:element,voteweight:parseInt(.08*Number(e))};case 6:return{id:element,voteweight:parseInt(.07*Number(e))};default:return{id:element,voteweight:parseInt(0*Number(e))}}},applyName:function(element){switch(element){case"1":return"Delos";case"3":return"Haiku Generator";case"4":return"ChessForce";case"5":return"Catalogue";case"6":return"Effect Notebooks";case"7":return"Ask a stranger";case"8":return"DStudio";case"9":return"Simple UI";case"10":return"Effect Research";case"11":return"Vibelyze";case"12":return"Gitstar";case"13":return"Ergasia";case"14":return"BlockSage";case"15":return"EYEFX";case"16":return"Authentic";case"17":return"Youtube Chapters";case"18":return"Effect Android Wallet";case"19":return"Effect Voice";case"20":return"EffectQA";default:return"Not Named"}},getTotalVoteWeight:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$eos.rpc.get_table_rows({code:"daoproposals",scope:"daoproposals",table:"cycle"});case 2:(o=e.sent)&&o.rows.length>0&&(t.totalVoteWeight=o.rows[0].total_vote_weight);case 4:case"end":return e.stop()}}),e)})))()},getDaoMembers:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null==t.membersLowerBound){e.next=8;break}return e.next=3,t.$eos.rpc.get_table_rows({code:"theeffectdao",scope:"theeffectdao",table:"member",limit:-1});case 3:(o=e.sent)&&o.rows.length>0&&(t.totalMembers+=o.rows.length),t.membersLowerBound=o.next_key.length>0?o.next_key:null,e.next=0;break;case 8:case"end":return e.stop()}}),e)})))()},calculateVotePower:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o,r,c,h,l,f,d,m,v;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getVotes();case 2:o=e.sent,r=o.rows.map((function(e){return Array.of.apply(Array,Object(n.a)(e.comment_hash.split(","))).map((function(element,o){return t.applyVoteWeight(element,o,e.weight)}))})),c=r.flat(),h=r.length,l=c.length/h,f=c.reduce((function(t,e){return e.voteweight+t}),0),d=new Map,c.map((function(element){if(d.has(element.id)){var e=d.get(element.id).voteWeight;d.set(element.id,{voteWeight:element.voteweight+=e,name:t.applyName(element.id)})}else d.set(element.id,{voteWeight:element.voteweight,name:t.applyName(element.id)})})),m=new Map(Object(n.a)(d.entries()).sort((function(a,b){return b[1].voteWeight-a[1].voteWeight}))),v=[],Array.from(m.entries()).forEach((function(t,e){v.push(t)})),t.totalHackathonVoteWeight=f,t.totalVotes=h,t.checkTotalVotes=l,t.sortedVotesMap=m,t.sortedVotesList=v;case 18:case"end":return e.stop()}}),e)})))()}},head:function(){return{title:"Hackathon Winners"}}},f=(o(1180),o(25)),component=Object(f.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"content"},[n("h1",{staticClass:"has-text-centered"},[t._v("\n      Effect Network Hackathon Winner\n    ")]),t._v(" "),n("img",{attrs:{src:"https://effect.network/_nuxt/img/coins.00f8b5f.png",alt:""}}),t._v(" "),n("section",{staticClass:"section"},[n("div",{staticClass:"container is-fullheight"},[t._m(0),t._v(" "),t._m(1),t._v(" "),n("p",[t._v("\n            It's been an exciting hackathon and it was difficult to choose between all of the great submissions.\n            We would like to thank all of the participants of the Effect Network Hackathon for their hardwork, creativity and late nights. You have helped us achieve a new mile stone with this new direction for Effect Network.\n          ")]),t._v(" "),n("p",[t._v("\n            The official judges from Devpost have announced the winners of Effect Network's first hackathon! We are really proud of these participants and wish them the best of luck in their future endeavors on the Effect Network platform.\n          ")]),t._v(" "),n("div",{staticClass:"my-6"},[n("div",{staticClass:"columns is-multiline mt-6 is-fullheight"},[n("div",{staticClass:"column has-special-hover is-fullheight"},[n("a",{attrs:{target:"_blank",href:"https://devpost.com/software/delos"}},[n("div",{staticClass:"card has-text-centered has-gradient"},[n("div",{staticClass:"card-content"},[n("div",{staticClass:"content"},[t._m(2),t._v(" "),n("div",{staticClass:"block"},[n("img",{staticClass:"is-icon-size-medium has-radius",staticStyle:{height:"128px"},attrs:{src:o(1169)}})]),t._v(" "),t._m(3),t._v(" "),t._m(4)])])])])]),t._v(" "),n("div",{staticClass:"column has-special-hover is-large"},[n("a",{attrs:{target:"_blank",href:"https://devpost.com/software/catalogue-16tlek"}},[n("div",{staticClass:"card has-text-centered has-gradient"},[n("div",{staticClass:"card-content"},[n("div",{staticClass:"content"},[t._m(5),t._v(" "),n("div",{staticClass:"block"},[n("img",{staticClass:"is-icon-size-medium has-radius",staticStyle:{height:"128px"},attrs:{src:o(1170)}})]),t._v(" "),t._m(6),t._v(" "),t._m(7)])])])])]),t._v(" "),n("div",{staticClass:"column has-special-hover"},[n("a",{attrs:{target:"_blank",href:"https://devpost.com/software/effect-notebooks"}},[n("div",{staticClass:"card has-text-centered has-gradient"},[n("div",{staticClass:"card-content"},[n("div",{staticClass:"content"},[t._m(8),t._v(" "),n("div",{staticClass:"block"},[n("img",{staticClass:"is-icon-size-medium has-radius",staticStyle:{height:"128px"},attrs:{src:o(1171)}})]),t._v(" "),t._m(9),t._v(" "),t._m(10)])])])])])])])])]),t._v(" "),t._m(11),t._v(" "),n("div",{staticClass:"box"},[n("h4",{staticClass:"box-title subtitle"},[t._v("\n        Catagory 2: DAO Distribution\n      ")]),t._v(" "),n("div",{staticClass:"table-container"},[n("table",{staticClass:"table is-striped is-hoverable is-fullwidth"},[t._m(12),t._v(" "),n("tbody",t._l(t.sortedVotesList,(function(label,e){return n("tr",{key:label},[n("td",[t._v(t._s(e+1))]),t._v(" "),n("td",[t._v("\n                "+t._s(label[1].name)+"\n              ")]),t._v(" "),n("td",{staticClass:"has-text-centered"},[t._v("\n                "+t._s(parseInt(label[1].voteWeight))+"\n              ")]),t._v(" "),0===e?n("td",{staticClass:"has-text-centered"},[t._v("\n                $8K\n              ")]):1===e?n("td",{staticClass:"has-text-centered"},[t._v("\n                $6K\n              ")]):[2,3,4,5,6].includes(e)?n("td",{staticClass:"has-text-centered"},[t._v("\n                $2.5K\n              ")]):n("td",{staticClass:"has-text-centered"},[t._v("\n                0\n              ")])])})),0)])]),t._v(" "),t.innerChartBalances?n("pie-chart",{attrs:{data:t.chartData,options:t.chartOptions}}):t._e()],1)]),t._v(" "),n("div",{staticClass:"box"},[n("h4",{staticClass:"box-title subtitle"},[t._v("\n      Stats\n    ")]),t._v(" "),n("div",{staticClass:"table-container"},[n("table",{staticClass:"table is-striped is-hoverable is-fullwidth"},[t._m(13),t._v(" "),n("tbody",t._l(t.stats,(function(e){return n("tr",{key:e.id},[n("td",[t._v(t._s(e.name))]),t._v(" "),n("td",[t._v(t._s(e.value))]),t._v(" "),n("td",[t._v(t._s(e.description))])])})),0)])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{staticClass:"title has-text-centered"},[this._v("Category 1:"),e("br"),this._v(" Devpost Jury Winners")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("a",{attrs:{href:"https://effect-network-hackathon.devpost.com/"}},[this._v("Effect Network's first hackathon")]),this._v(" has finally come to a close.\n            This has been an incredible hackathon! 🔥\n          ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"block"},[e("p",{staticClass:"has-text-weight-bold is-size-5"},[e("strong",[this._v("1st 🥇")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"block"},[e("span",{staticClass:"is-5 mt-1 has-text-weight-bold"},[this._v("Delos")]),this._v(" "),e("p",{staticClass:"has-text-accent"},[this._v("$8,000 in USDT and $8,000 in EFX")]),this._v(" "),e("div",{staticClass:"is-divider"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"block"},[e("p",{staticClass:"is-5"},[this._v(" Delos 💥 an Effect Network UI, specifically thought for image labeling tasks. ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"block"},[e("p",{staticClass:"has-text-weight-bold is-size-5"},[e("strong",[this._v("2nd 🥈")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"block"},[e("span",{staticClass:"is-5 mt-1 has-text-weight-bold"},[this._v("Catalogue")]),this._v(" "),e("p",{staticClass:"has-text-accent"},[this._v("$5,000 in USDT and $5,000 in EFX")]),this._v(" "),e("div",{staticClass:"is-divider"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"block"},[e("p",{staticClass:"is-5 is-link"},[this._v("Catalogue is an app built on Shopify, a platform used by 1.7M+ merchants.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"block"},[e("p",{staticClass:"has-text-weight-bold is-size-5"},[e("strong",[this._v("3rd 🥉")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"block"},[e("span",{staticClass:"is-5 mt-1 has-text-weight-bold"},[this._v("Effect Notebooks")]),this._v(" "),e("p",{staticClass:"has-text-accent"},[this._v("$2,500 in USDT and $2,500 in EFX")]),this._v(" "),e("div",{staticClass:"is-divider"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"block"},[e("p",{staticClass:"is-5 is-link"},[this._v("Effect Notebooks is a campaign for workers to automate the cleaning of data. ")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("div",{staticClass:"content"},[o("h2",{staticClass:"has-text-centered"},[t._v("Category 2:"),o("br"),t._v("DAO Winners")]),t._v(" "),o("p",[t._v("\n          The DAO is a corner stone of our platform and it's our great honor that we would like to present to you the judgment of the DAO.\n          The votes have been tallied, and there are 7 winners that can win a prize from the DAO.\n        ")]),t._v(" "),o("p",[t._v("\n          First prize gets $8K in EFX, second prize gets $6K in EFX, third up to seventh get $2.5K in EFX.\n          We would like to thank all of our DAO member who voted on this proposal and who are involved in seeing Effect Network continue growing in this new direction.\n        ")]),t._v(" "),o("p",[t._v("\n          With this hackathon announcing the new Effect Network as a truly decentralized platform for one and all.\n          The voting page is availale at: "),o("a",{attrs:{href:"/hackathon"}},[t._v("hackathon")]),t._v(".\n        ")]),t._v(" "),o("p",{staticClass:"has-text-centered"},[t._v("\n          So drumroll please! 🥁\n        ")]),t._v(" "),o("br")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th"),this._v(" "),e("th",[this._v("Name")]),this._v(" "),e("th",{staticClass:"has-text-centered"},[this._v("\n                VoteWeight\n              ")]),this._v(" "),e("th",{staticClass:"has-text-centered"},[this._v("\n                Prize (in EFX)\n              ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("Name")]),this._v(" "),e("th",[this._v("Value")]),this._v(" "),e("th",[this._v("Description")])])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{PieChart:o(869).default})},771:function(t){t.exports=JSON.parse('{"submissions":[{"id":1,"group_name":"Delos","description":"Delos allows anyone to submit a Document and using the amazing Effect Workforce, we categorize the data from the image and validate if it is in fact a useful document. When visiting the website use the email: efx@delos.co and password: delos09","github_url":" https://github.com/jgarciajovel/delos/tree/master ","campaign_url":"https://testnet.effect.network/campaigns/81","youtube_url":"https://youtu.be/VOw77SIIBHE","website":"https://delos-dashboard.herokuapp.com/","devpost":"https://effect-network-hackathon.devpost.com/submissions/289471-delos","voteWeight":""},{"id":3,"group_name":"Haiku Generator","description":"One of the most beautiful art forms is poetry. One special format for this is the Japanese Haiku. These poems consist of three lines having 5, 7 and 5 syllables, respectively. The purpose of this app is to collect an international collection of haiku\'s about certain topics (e.g. love, childhood, death, etc.).","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/Haiku%20Generator","campaign_url":"https://testnet.effect.network/campaigns/105","youtube_url":"https://youtu.be/80dVEoivHmc","website":"","devpost":"https://effect-network-hackathon.devpost.com/submissions/291937-haiku","voteWeight":""},{"id":4,"group_name":"ChessForce","description":"Play chess against workers on Effect Force!","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/chessforce","campaign_url":"https://testnet.effect.network/campaigns/151","youtube_url":"https://youtu.be/3xVAG3cCZr8","website":"https://kevinlaan.github.io/hackathon-submission-repo/","devpost":"https://effect-network-hackathon.devpost.com/submissions/294465-chessforce","voteWeight":""},{"id":5,"group_name":"Catalogue","description":"Catalogue is an app built on Shopify, a platform used by over 1.7M merchants to run their online stores. The goal is to help merchants save time and increase sales by organizing their online product listing with the help of a global human workforce.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/catalogue","campaign_url":"https://testnet.effect.network/campaigns/190","youtube_url":"https://youtu.be/4-a0LISRtrs","website":"","devpost":"https://effect-network-hackathon.devpost.com/submissions/293030-catalogue","voteWeight":""},{"id":6,"group_name":"Effect Notebooks","description":"Effect Notebooks is a campaign where workers can earn EFX tokens for writing code that will automate the cleaning of data, the way a task specifies.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/Effect_Notebooks","campaign_url":"https://testnet.effect.network/campaigns/230 ","youtube_url":"https://youtu.be/9Yzuc54X5Po","website":"","devpost":"https://effect-network-hackathon.devpost.com/submissions/287525-effect-notebooks","voteWeight":""},{"id":7,"group_name":"Ask A Stranger","description":"Ask any question, and wait for the answer from Effect Force!","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/askastranger","campaign_url":"https://testnet.effect.network/campaigns/178","youtube_url":"","website":"https://askastranger.github.io/","devpost":"https://effect-network-hackathon.devpost.com/submissions/295751-askastranger","voteWeight":""},{"id":8,"group_name":"DStudio","description":"DStudio is a platform to Create Surveys, Test QA and Market Reasearch form in Seconds on Effect Network. Powered by Decentralized WorkForce !","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/Dstudio","campaign_url":"https://testnet.effect.network/campaigns/290 ","youtube_url":"https://youtu.be/5_egxCq2urg","website":"https://dstudio.b-cdn.net/","devpost":"https://effect-network-hackathon.devpost.com/submissions/295281-dstudio","voteWeight":""},{"id":9,"group_name":"Simple UI","description":"A simple ui for both tasker an task giver; a mechanism to create campaign without any coding knowledge","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/gisam_submit","campaign_url":"https://testnet.effect.network/campaigns/127 ","youtube_url":"https://www.youtube.com/watch?v=Q_kkfMrDra0&feature=youtu.be","website":"https://hackaton-finale.vercel.app/","devpost":"https://effect-network-hackathon.devpost.com/submissions/291171-simple-ux","voteWeight":""},{"id":10,"group_name":"Effect Research","description":"EffectResearch helps students, scholars and researchers to get quality data for their ongoing research.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/EffectResearch","campaign_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/EffectResearch","youtube_url":"https://youtu.be/VVIShfU1TNg","website":"","devpost":"https://effect-network-hackathon.devpost.com/submissions/295286-effect-research","voteWeight":""},{"id":11,"group_name":"Vibelyze","description":"Vibelyze is an app that investigates music nuance. Vibelyze obtains information suitable for training your music-related machine algorithm or designing your DJ setlist by handing songs to thousands of Effect Network workers.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/vibelyze","campaign_url":"https://testnet.effect.network/campaigns/198","youtube_url":"https://www.youtube.com/watch?v=O6vbbiE918Y","website":"https://vibelyze.github.io/vibelyze/","devpost":"https://effect-network-hackathon.devpost.com/submissions/295633-vibelyze","voteWeight":""},{"id":12,"group_name":"Gitstar","description":"Have the Github users from the Effect Network interact and with you open source repositories to get more traction. The Effect workforce allows projects to easily tap into a fitting audience for their Github pages.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/gitstar","campaign_url":"https://testnet.effect.network/campaigns/130/ ","youtube_url":"https://youtu.be/kUSMbex6qz8","website":"https://gitstar.dev/","devpost":"https://devpost.com/software/gitstar","voteWeight":""},{"id":13,"group_name":"Ergasia","description":"It is a task distribution platform powered by Effect Network. It allows companies and individuals to upload tasks and get them done quickly. It currently has 5 campaigns which are Converting handwritten images to text, Editing Images, Technical Code Debug, Feedback for posters and asking Academic Course related questions.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/ergasia","campaign_url":"https://testnet.effect.network/campaigns/205","youtube_url":"https://youtu.be/LSPXKT6H_gQ","website":"https://ergasia.vercel.app/","devpost":"https://effect-network-hackathon.devpost.com/submissions/295276-ergasia","voteWeight":""},{"id":14,"group_name":"BlockSage","description":"BlockSage tries to utilise the Effect Network to solve the Billion dollar challenge of Content Moderation and making the web a safe place, while creating more opportunities for Effect Workforce. With BlockSage focus is on helping companies leverage BlockSage for content moderation even if they don\'t have any Web3 expertise.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/blocksage","campaign_url":"https://testnet.effect.network/campaigns/354 ","youtube_url":"https://youtu.be/2QDypnL8Fog","website":"http://blocksage.github.io/web-app","devpost":"https://effect-network-hackathon.devpost.com/submissions/291860-blocksage","voteWeight":""},{"id":15,"group_name":"EYEFX","description":"EYEFX measures where the users are looking on the computer screen, for how long, and where do they go next. This provides valuable insights into the perception and interaction of users of these digital assets which can be used to optimize design towards specific targets. Through the Effect Force platform, a requester can submit their design and have it trialled by a number of users, throughout the world, otherwise impossible to reach in a practical fashion. Moreover, pooling thousands of users\' interactions enables Machine Learning techniques to validate and combine the data in order to improve detection algorithms over time.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/EYEFX","campaign_url":"https://testnet.effect.network/campaigns/84 ","youtube_url":"https://www.youtube.com/watch?v=uXlsayVKdrA","website":"","devpost":"https://effect-network-hackathon.devpost.com/submissions/290789-eyefx","voteWeight":""},{"id":16,"group_name":"Authentic","description":"An idea bulb to collaboratively manage and restructure and restrict false information to improve the quality of online presence.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/EFX-Authentic","campaign_url":"https://testnet.effect.network/campaigns/359 ","youtube_url":"https://youtu.be/nVpD5xGjrkI","website":"https://efx-authentic.herokuapp.com","devpost":"https://effect-network-hackathon.devpost.com/submissions/295461-authentic","voteWeight":""},{"id":17,"group_name":"Youtube Chapters","description":"Chapters in videos help us to get idea of the content of video without watching it completely. Chapters save us lot of time when we watch tutorial videos. It inspired me to find a solution to easily create chapters. This application add chapters to videos by using Effect Network.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/chapterfy","campaign_url":"https://testnet.effect.network/campaigns/351/1507533520896 ","youtube_url":"https://youtu.be/Rmw6JJqs2z8","website":"","devpost":"https://effect-network-hackathon.devpost.com/submissions/292602-youtube-chapters","voteWeight":""},{"id":18,"group_name":"EffectAndroidWallet","description":"Android Wallet for Effect Network. EffectWallet allows campaign creation directly from the app.","github_url":"https://github.com/bobguy101/EffectAndroidWallet","campaign_url":"https://testnet.effect.network/campaigns/329/1413044240384","youtube_url":"https://youtu.be/90Coagi08_Y","website":"","devpost":"https://effect-network-hackathon.devpost.com/submissions/295479-effect-android-wallet","voteWeight":""},{"id":19,"group_name":"Effect Voice","description":"Effect Voice is an Effect Network template that allow worker to complete tasks with their voice and earn EFX rewards. Freedom to work from anywhere at anytime with your voice, even stuck in traffic jams, exercising or doing any relaxation and time consuming activity.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/EffectVoice","campaign_url":"https://testnet.effect.network/campaigns/358","youtube_url":"https://youtu.be/vMRXovfpY6Y","website":"http://47.242.55.212:8080/campaign.html","devpost":"https://effect-network-hackathon.devpost.com/submissions/295268-effect-voice","voteWeight":""},{"id":20,"group_name":"EffectQA","description":"Effect Voice is an Effect Network template that allow worker to complete tasks with their voice and earn EFX rewards. Freedom to work from anywhere at anytime with your voice, even stuck in traffic jams, exercising or doing any relaxation and time consuming activity.","github_url":"https://github.com/effectai/hackathon-submission-repo/tree/main/EffectQA ","campaign_url":"https://testnet.effect.network/campaigns/144 ","youtube_url":"https://youtu.be/E32y-08ZYrg","website":"","devpost":"https://effect-network-hackathon.devpost.com/submissions/290748-effectqa-tokenized-product-feedback","voteWeight":""}]}')},869:function(t,e,o){"use strict";o.r(e);o(1176);var n=o(1196);e.default={extends:n.a,props:["data","options"],mounted:function(){this.renderChart(this.data,{responsive:!0,maintainAspectRatio:!1,onClick:this.clickHandle,legend:{onClick:function(){}},tooltips:{callbacks:{label:function(t,data){var e=data.datasets[t.datasetIndex],o=t.index;return e.labels[o]+": "+e.data[o]}}}})},methods:{clickHandle:function(t,e){var o=e[0];o&&window.open(this.data.datasets[o._datasetIndex].meta[o._index].link,"_blank")}}}},870:function(t,e,o){var content=o(1181);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(59).default)("75c4353a",content,!0,{sourceMap:!1})}}]);