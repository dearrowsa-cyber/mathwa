const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const docs = [
  { filename: 'Conflict-of-Interest-Policy.pdf', title: 'سياسة تعارض المصالح', content: '<p>تهدف هذه السياسة إلى منع أي تعارض بين المصالح الشخصية لأعضاء مجلس الإدارة والعاملين وبين مصالح الجمعية.</p><ul><li>الإفصاح عن أي مصلحة شخصية.</li><li>الامتناع عن التصويت في حالة وجود تعارض.</li></ul>' },
  { filename: 'Whistleblowing-Policy.pdf', title: 'سياسة الإبلاغ عن المخالفات', content: '<p>توفر آلية آمنة وسرية للإبلاغ عن أي مخالفات أو سلوكيات غير أخلاقية داخل الجمعية.</p><ul><li>قنوات إبلاغ سرية.</li><li>حماية المُبلّغ من الانتقام.</li></ul>' },
  { filename: 'Privacy-Policy.pdf', title: 'سياسة الخصوصية وحماية البيانات', content: '<p>تحمي خصوصية البيانات الشخصية لطالبي الخدمة والمتبرعين والعاملين والمتطوعين.</p><ul><li>تخزين البيانات بشكل آمن ومشفّر.</li><li>عدم مشاركة البيانات مع أطراف ثالثة دون إذن.</li></ul>' },
  { filename: 'Fundraising-Policy.pdf', title: 'سياسة جمع التبرعات', content: '<p>تنظم عمليات جمع التبرعات والهبات والأوقاف لضمان الشفافية والامتثال للأنظمة.</p><ul><li>الشفافية في عرض أوجه الصرف للمتبرعين.</li><li>إصدار إيصالات لجميع التبرعات.</li></ul>' },
  { filename: 'Risk-Management-Policy.pdf', title: 'سياسة إدارة المخاطر', content: '<p>تحدد إطار العمل لتحديد وتقييم وإدارة المخاطر التي قد تواجه الجمعية.</p><ul><li>تصنيف المخاطر (مالية، تشغيلية، قانونية، سمعة).</li><li>خطط الاستجابة والتخفيف لكل فئة مخاطر.</li></ul>' },
  { filename: 'Document-Retention-Policy.pdf', title: 'سياسة الاحتفاظ بالوثائق', content: '<p>تنظم آليات حفظ وأرشفة وإتلاف الوثائق والسجلات الرسمية للجمعية.</p><ul><li>فترات الاحتفاظ المحددة لكل نوع من الوثائق.</li><li>إجراءات الأرشفة الإلكترونية والورقية.</li></ul>' },
  { filename: 'Beneficiary-Relations-Policy.pdf', title: 'سياسة العلاقة مع طالبي الخدمة', content: '<p>تحدد إطار التعامل مع طالبي خدمات الجمعية بما يضمن الكرامة والعدالة والشمولية.</p><ul><li>معايير واضحة وعادلة لأهلية الاستفادة.</li><li>آلية تلقي الشكاوى والاقتراحات من طالبي الخدمة.</li></ul>' },
  { filename: 'AML-CFT-Policy.pdf', title: 'سياسة مكافحة غسل الأموال وتمويل الإرهاب', content: '<p>تهدف إلى حماية الجمعية من الاستغلال في عمليات غسل الأموال أو تمويل الإرهاب.</p><ul><li>التحقق من هوية المتبرعين والمستفيدين والجهات المانحة.</li><li>الإبلاغ الفوري عن العمليات المشتبه بها.</li></ul>' },
  { filename: 'Financial-Regulations.pdf', title: 'اللائحة المالية', content: '<p>تحدد القواعد والأسس التي تحكم العمليات المالية والمحاسبية في الجمعية لضمان كفاءة الإنفاق.</p><ul><li>إعداد الموازنات التقديرية السنوية واعتمادها.</li><li>ضوابط المشتريات وإدارة العقود والمنافسات.</li></ul>' },
  { filename: 'HR-Regulations.pdf', title: 'لائحة الموارد البشرية', content: '<p>تنظم العلاقة التعاقدية والوظيفية بين الجمعية وموظفيها لضمان بيئة عمل عادلة ومحفزة.</p><ul><li>إجراءات التوظيف والاختيار والمفاضلة بعدالة.</li><li>سلم الرواتب والمكافآت والبدلات.</li></ul>' },
  { filename: 'Volunteering-Policy.pdf', title: 'سياسة التطوع وإدارة المتطوعين', content: '<p>تؤطر العمل التطوعي في الجمعية وتحمي حقوق المتطوعين وتنظم مهامهم ومسؤولياتهم.</p><ul><li>إجراءات استقطاب واختيار المتطوعين.</li><li>ميثاق شرف العمل التطوعي وإقرارات الالتزام.</li></ul>' },
  { filename: 'Donation-Refund-Policy.pdf', title: 'سياسة استرداد التبرعات', content: '<p>تحدد الحالات والشروط التي يحق فيها للمتبرع استرداد مبلغ التبرع، لضمان حماية المتبرعين.</p><ul><li>استرداد التبرع في حال التحويل بالخطأ المبرر.</li><li>عدم استرداد التبرعات بعد صرفها على المستفيدين.</li></ul>' },
  { filename: 'Redirecting-Donations-Policy.pdf', title: 'سياسة توجيه التبرع لمشروع آخر', content: '<p>تنظم آلية تحويل ونقل التبرعات من مشروع إلى آخر في حال اكتمال تمويل المشروع الأول.</p><ul><li>أخذ موافقة المتبرع في حال التبرع المشروط أو المقيد.</li><li>الإعلان بشفافية عن اكتمال التمويل للمشاريع المحددة.</li></ul>' },
  { filename: 'Investment-Policy.pdf', title: 'سياسة الاستثمار', content: '<p>تحدد المعايير والضوابط الخاصة باستثمار أموال وفائض إيرادات الجمعية بما يحقق الاستدامة المالية.</p><ul><li>الالتزام بأحكام الشريعة الإسلامية في كافة الاستثمارات.</li><li>تجنب الاستثمارات عالية المخاطر أو المضاربة.</li></ul>' },
  { filename: 'Authorities-Matrix.pdf', title: 'مصفوفة الصلاحيات', content: '<p>توضح توزيع الصلاحيات الإدارية والمالية والتشغيلية بين الجمعية العمومية، مجلس الإدارة، والمدير التنفيذي.</p><ul><li>تحديد صلاحيات الاعتماد المالي وفق مستويات متدرجة.</li><li>حصر القرارات الاستراتيجية بمجلس الإدارة.</li></ul>' },
];

async function generatePDFs() {
  const browser = await puppeteer.launch({ channel: 'chrome' });
  const dir = path.join(__dirname, 'public', 'docs');
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  for (const doc of docs) {
    console.log('Generating:', doc.filename);
    const page = await browser.newPage();
    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px;
            color: #333;
            line-height: 1.8;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #0E4B33;
            padding-bottom: 20px;
            margin-bottom: 40px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #C89B3C;
            margin-bottom: 10px;
          }
          h1 {
            color: #0E4B33;
            font-size: 28px;
            margin: 0;
          }
          h2 {
            color: #0E4B33;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-top: 30px;
          }
          ul {
            padding-right: 20px;
          }
          li {
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 80px;
            text-align: center;
            font-size: 12px;
            color: #888;
            border-top: 1px solid #eee;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">جمعية مثوى الأهلية</div>
          <h1>\${doc.title}</h1>
        </div>
        
        <div class="content">
          \${doc.content}
        </div>
        
        <div class="footer">
          تم اعتماد هذه الوثيقة من قبل مجلس الإدارة - جمعية مثوى الأهلية (ترخيص رقم 1000827300)
        </div>
      </body>
      </html>
    `;
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: path.join(dir, doc.filename),
      format: 'A4',
      margin: { top: '20px', bottom: '20px' },
      printBackground: true
    });
    await page.close();
  }

  await browser.close();
  console.log('Done!');
}

generatePDFs().catch(console.error);
