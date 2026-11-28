/* ملء بيانات العميل القديم تلقائي (إضافة فقط - مش بيغير أي كود موجود) */
(function(){
 var ph=document.getElementById('ph'),ad=document.getElementById('ad'),ph2=document.getElementById('ph2');
 if(!ph||!ad||!ph2)return;
 function nd(x){return String(x||'').replace(/[٠-٩]/g,function(c){return c.charCodeAt(0)-1632}).replace(/\D/g,'')}
 var h=document.createElement('div');h.className='note';h.id='phn';
 ph.parentNode.insertBefore(h,ph.nextSibling);
 function lookup(){
  var d=nd(ph.value);
  if(d.length<11){h.textContent='';return}
  var list=(typeof orders!=='undefined'&&orders)||[];
  var m=list.filter(function(o){return nd(o.phone)===d||nd(o.phone2)===d}).sort(function(a,b){return b.ts-a.ts});
  if(!m.length){h.textContent='عميل جديد';return}
  var o=m[0],other=nd(o.phone)===d?o.phone2:o.phone;
  if(!ad.value&&o.addr)ad.value=o.addr;
  if(!ph2.value&&other)ph2.value=other;
  h.textContent='👋 عميل قديم، عنده '+m.length+' أوردر سابق، اتملى العنوان والرقم التاني'}
 ph.addEventListener('input',lookup);
 var add=document.getElementById('add');
 if(add)add.addEventListener('click',function(){h.textContent=''});
})();
