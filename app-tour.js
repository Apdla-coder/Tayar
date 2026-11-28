/* جولة تعريفية لتطبيق Tamara — تظهر أول مرة فقط لكل حساب
   بتتحفظ "شاف الجولة" جوه cfg في جدول profiles (من غير أي تعديل في الداتا بيز) */
(function () {
  const STEPS = [
    {
      title: 'أهلاً بيك في Tamara 🛵',
      text: 'التطبيق بيسجّل أوردراتك وورديّاتك وبيحسب صافي مكسبك لوحده:\nالشحن + التيبس − عمولة المطعم.\nالجولة دي دقيقة وتشرح كل حاجة. تقدر تتخطاها، وتعيدها بعد كده من ⚙️.'
    },
    {
      target: '#shb',
      title: 'الشفت (الوردية)',
      text: 'أول خطوة في يومك: اضغط "▶ ابدأ الشفت". من غير شفت شغال مش هتقدر تسجل أوردر.\nالشفت مش بيخلص لوحده ولا بيبدأ يوم جديد تلقائي: بيفضل شغال لحد ما تضغط "⏹ إنهاء الشفت"، حتى بعد نص الليل.\nبيحسب مدة شغلك، ولما تنهيه بيجيلك إشعار بملخصه. ولو نسيته شغال هينبهك كل ٤ ساعات. (اسمح بالإشعارات لما يطلبها.)'
    },
    {
      target: '#add',
      title: 'أوردر جديد',
      text: 'كل ما تستلم أوردر اضغط هنا واكتب:\n• رقم العميل (إجباري)، ورقم تاني لو عنده.\n• العنوان وملاحظات (زي: الدور التالت).\n• سعر الطلب وسعر الشحن.\n• العمولة: بتتحسب لوحدها من إعداداتك، وتقدر تعدّلها بإيدك.\nتحت الخانات بتشوف الإجمالي على العميل وصافي مكسبك من الأوردر.'
    },
    {
      target: '#list',
      title: 'كارت الأوردر',
      text: 'كل أوردر بيظهر هنا بعنوانه ورقمه، والإجمالي (الطلب + الشحن) على اليمين.\nتحتهم التفاصيل: العمولة والتيبس والوقت.\nالأزرار: 📞 اتصال بالعميل، 💬 واتساب بيفتح محادثة برقمه، وزرار ثاني لرقمه التاني لو سجلته.'
    },
    {
      target: '#list',
      title: 'التسليم والتيبس',
      text: 'لما توصّل اضغط "تم التسليم". هيسألك: استلمت تيبس؟ لو آه اكتب القيمة، ولو لا اضغط تسليم من غير تيبس.\n"تراجع" بيرجّع الأوردر غير مسلّم ويمسح التيبس المسجل.\n✏️ تعديل بيصحّح أي بيانات (حتى العمولة والتيبس)، و🗑 بيحذف الأوردر لو سجلته بالغلط.'
    },
    {
      target: '#qs',
      title: 'الملخص السريع',
      text: 'ملخص الفترة اللي إنت فيها: عدد الأوردرات، كام اتسلّم منهم، وصافي مكسبك.'
    },
    {
      target: '#tabs',
      title: 'اختار الفترة',
      text: '• الشفت: الشفت الحالي (أو آخر شفت لو مفيش شغال).\n• آخر ٧ أيام.\n• 📅 يوم: تختار أي تاريخ، وتقدر تفلتر على شفت معين جواه.\n• الكل: كل شغلك من الأول.\nكل الأرقام في الشاشة بتتغير حسب اللي تختاره.'
    },
    {
      target: '#vt',
      title: 'الأوردرات والإحصائيات',
      text: 'بدّل بين 📦 الأوردرات و📊 الإحصائيات.\nالإحصائيات فيها: صافي مكسبك، ساعات وأيام الشغل، مكسب الساعة، عمولة المطعم، مجموع الشحن والطلبات، إجمالي التيبس ومتوسطه وأعلى تيبس، ورسم لعدد الأوردرات آخر ٧ أيام، وقائمة بورديّاتك.'
    },
    {
      target: '#gb',
      title: 'الإعدادات ⚙️',
      text: 'من هنا بتضبط:\n• اسمك وصورتك ولوجو المطعم.\n• العمولة: اسم الجهة، ونوعها (نسبة % من الشحن أو من سعر الطلب، أو مبلغ ثابت لكل أوردر).\n• تغيير كلمة السر وتسجيل الخروج.\nالعمولة بتتسجل على كل أوردر وقت إضافته، فتغيير الإعدادات مش بيغيّر أوردراتك القديمة.\nكل ده محفوظ على حسابك وبيظهر على أي جهاز.'
    },
    {
      title: 'خلصنا ✅',
      text: 'جاهز تبدأ. أول حاجة: ابدأ الشفت.\nلو احتجت الشرح تاني هتلاقي زر "❓ شرح التطبيق" جوه ⚙️.'
    }
  ];

  // "شاف الجولة" بيتخزن في cfg بتاع البروفايل (profiles.cfg) مع باقي إعدادات الحساب
  const hooks = {
    isDone: async () => !!(window.cfg && window.cfg.tour_done),
    markDone: async () => {
      if (!window.cfg || window.cfg.tour_done) return;
      window.cfg.tour_done = true;
      try { await window.saveProf(); } catch (e) {}
    }
  };

  const css = `
  .tour-block{position:fixed;inset:0;z-index:99997}
  .tour-hole{position:fixed;z-index:99998;border-radius:10px;pointer-events:none;
    box-shadow:0 0 0 9999px rgba(0,0,0,.7);transition:all .25s ease}
  .tour-tip{position:fixed;z-index:99999;width:min(340px,92vw);background:#fff;color:#1b1f27;border-radius:16px;
    padding:16px;box-shadow:0 10px 30px rgba(0,0,0,.4);direction:rtl;font-family:inherit;line-height:1.7;
    max-height:80vh;overflow:auto}
  .tour-tip h3{margin:0 0 6px;font-size:17px}
  .tour-tip p{margin:0 0 14px;font-size:14px;white-space:pre-line}
  .tour-tip .tour-meta{font-size:12px;color:#6b7280;margin-bottom:6px}
  .tour-tip .tour-row{display:flex;gap:8px;align-items:center}
  .tour-tip button{font:inherit;font-size:14px;border:0;border-radius:10px;padding:10px 14px;cursor:pointer}
  .tour-next{background:#ff6b1a;color:#fff;flex:1;font-weight:700}
  .tour-prev{background:#e5e7eb;color:#1b1f27}
  .tour-skip{background:none;color:#6b7280;padding:10px 4px!important}
  @media (prefers-color-scheme:dark){
    .tour-tip{background:#1a1d24;color:#f1f3f6}.tour-prev{background:#2a2f3a;color:#f1f3f6}}
  `;

  let block, hole, tip, idx = 0, running = false;

  function visible(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  async function show(i) {
    idx = i;
    const s = STEPS[i];
    const el = s.target ? document.querySelector(s.target) : null;
    const ok = visible(el);
    if (ok) {
      const r0 = el.getBoundingClientRect();
      const tall = r0.height > window.innerHeight * 0.5;
      el.scrollIntoView({ block: tall ? 'start' : 'center', behavior: 'smooth' });
      await new Promise(r => setTimeout(r, 350));
    }

    tip.innerHTML =
      `<div class="tour-meta">${i + 1} / ${STEPS.length}</div><h3></h3><p></p>` +
      `<div class="tour-row">` +
      (i > 0 ? `<button class="tour-prev">السابق</button>` : '') +
      `<button class="tour-next">${i === STEPS.length - 1 ? 'تم' : 'التالي'}</button>` +
      (i < STEPS.length - 1 ? `<button class="tour-skip">تخطي</button>` : '') +
      `</div>`;
    tip.querySelector('h3').textContent = s.title;
    tip.querySelector('p').textContent = s.text;
    tip.querySelector('.tour-next').onclick = () => (i === STEPS.length - 1 ? finish() : show(i + 1));
    const pv = tip.querySelector('.tour-prev'); if (pv) pv.onclick = () => show(i - 1);
    const sk = tip.querySelector('.tour-skip'); if (sk) sk.onclick = finish;

    const vw = window.innerWidth, vh = window.innerHeight;
    tip.style.visibility = 'hidden';
    const th = tip.offsetHeight, tw = tip.offsetWidth;

    if (ok) {
      const r = el.getBoundingClientRect(), p = 6;
      // العناصر الطويلة (زي قائمة الأوردرات) نظلّل أول جزء منها بس
      const h = Math.min(r.height, vh * 0.35);
      Object.assign(hole.style, {
        left: r.left - p + 'px', top: r.top - p + 'px',
        width: r.width + p * 2 + 'px', height: h + p * 2 + 'px'
      });
      const bottom = r.top + h;
      const below = bottom + 12 + th < vh;
      const top = below ? bottom + 12 + p : Math.max(8, r.top - 12 - th);
      const left = Math.min(Math.max(8, r.left + r.width / 2 - tw / 2), vw - tw - 8);
      Object.assign(tip.style, { top: top + 'px', left: left + 'px' });
    } else {
      Object.assign(hole.style, { left: vw / 2 + 'px', top: vh / 2 + 'px', width: '0px', height: '0px' });
      Object.assign(tip.style, { top: Math.max(8, (vh - th) / 2) + 'px', left: (vw - tw) / 2 + 'px' });
    }
    tip.style.visibility = 'visible';
  }

  async function finish() {
    running = false;
    block.remove(); hole.remove(); tip.remove();
    window.removeEventListener('resize', onResize);
    await hooks.markDone();
  }
  const onResize = () => running && show(idx);

  function start() {
    if (running) return;
    if (!document.getElementById('tour-css')) {
      const st = document.createElement('style'); st.id = 'tour-css'; st.textContent = css;
      document.head.appendChild(st);
    }
    block = document.createElement('div'); block.className = 'tour-block';
    hole = document.createElement('div'); hole.className = 'tour-hole';
    tip = document.createElement('div'); tip.className = 'tour-tip';
    document.body.append(block, hole, tip);
    running = true;
    window.addEventListener('resize', onResize);
    show(0);
  }

  async function maybeStart() {
    if (!(await hooks.isDone())) start();
  }

  window.AppTour = { start, maybeStart, hooks, steps: STEPS };
})();
