"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[207],{9207:(C,u,a)=>{a.r(u),a.d(u,{BasketModule:()=>g});var c=a(6895),m=a(9838),t=a(1571),d=a(5866),l=a(5053),p=a(8795);function v(e,o){1&e&&(t.TgZ(0,"div")(1,"p"),t._uU(2,"There are no items in your basket"),t.qZA()())}function k(e,o){if(1&e){const s=t.EpF();t.ynx(0),t.TgZ(1,"div",2)(2,"div",3)(3,"app-basket-summary",4),t.NdJ("addItem",function(r){t.CHM(s);const i=t.oxw();return t.KtG(i.incrementQuantity(r))})("removeItem",function(r){t.CHM(s);const i=t.oxw();return t.KtG(i.removeItem(r))}),t.qZA()(),t.TgZ(4,"div",3)(5,"div",5),t._UZ(6,"app-order-totals"),t.TgZ(7,"div",6)(8,"a",7),t._uU(9," Proceed to checkout "),t.qZA()()()()(),t.BQk()}}const B=[{path:"",component:(()=>{var e;class o{constructor(n){this.basketService=n}incrementQuantity(n){this.basketService.addItemToBasket(n)}removeItem(n){this.basketService.removeItemFromBasket(n.id,n.quantity)}}return(e=o).\u0275fac=function(n){return new(n||e)(t.Y36(d.v))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-basket"]],decls:5,vars:6,consts:[[1,"container","mt-5"],[4,"ngIf"],[1,"container"],[1,"row"],[3,"addItem","removeItem"],[1,"col-6","offset-6"],[1,"d-grid"],["routerLink","/checkout",1,"btn","btn-outline-primary","py-2"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0),t.YNc(1,v,3,0,"div",1),t.ALo(2,"async"),t.YNc(3,k,10,0,"ng-container",1),t.ALo(4,"async"),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngIf",null===t.lcZ(2,2,r.basketService.basketSource$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(4,4,r.basketService.basketSource$)))},dependencies:[c.O5,m.rH,l.S,p.b,c.Ov]}),o})()}];let f=(()=>{var e;class o{}return(e=o).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[c.ez,m.Bz.forChild(B),m.Bz]}),o})();var y=a(4466);let g=(()=>{var e;class o{}return(e=o).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[c.ez,f,y.m]}),o})()}}]);