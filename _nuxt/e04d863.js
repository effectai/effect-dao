(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1152:function(t,n,o){"use strict";o.r(n);o(9),o(47);var e=o(3),c=o(67),r={components:{},head:function(){return{title:"Constitution"}},data:function(){return{loading:!1,constitution:"",constitutionHash:""}},computed:{},beforeMount:function(){this.downloadConstitution()},methods:{downloadConstitution:function(){var t=this;return Object(e.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,fetch("https://raw.githubusercontent.com/effectai/effect-network-eos/9522a000cf96269912a47fdd4653c14ac26bbf61/constitution/constitution.md").then((function(data){return data.text()})).then((function(data){t.constitution=data,t.constitutionHash=Object(c.sha256)(data)})).finally((function(){t.loading=!1}));case 3:case"end":return n.stop()}}),n)})))()}}},d=o(25),component=Object(d.a)(r,(function(){var t=this.$createElement,n=this._self._c||t;return this.loading?n("span",[this._v("Loading constitution..")]):n("div",{domProps:{innerHTML:this._s(this.$md.render(this.constitution))}})}),[],!1,null,null,null);n.default=component.exports}}]);