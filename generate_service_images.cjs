const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const getBase64Uri = (absolutePath) => {
  if (!fs.existsSync(absolutePath)) {
    console.error('File not found:', absolutePath);
    return '';
  }
  const ext = path.extname(absolutePath).toLowerCase();
  let mimeType = 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
  const base64Data = fs.readFileSync(absolutePath).toString('base64');
  return `data:${mimeType};base64,${base64Data}`;
};

const getLocalUri = (relativePath) => {
  return getBase64Uri(path.join(__dirname, relativePath));
};

const brainDir = 'C:\\\\Users\\\\omara\\\\.gemini\\\\antigravity-ide\\\\brain\\\\745f5f9b-58eb-481d-a73a-bedd97482d00';

const services = [
  { id: '1', title: 'كفالة أيتام', bg: getBase64Uri(path.join(brainDir, 'service_orphan_sponsorship_1783428973430.png')) },
  { id: '2', title: 'أكفان', bg: getBase64Uri(path.join(brainDir, 'saudi_service_shrouds_1783429007624.png')) },
  { id: '3', title: 'تبرعات بناء وتطوير المقبرة', bg: getBase64Uri(path.join(brainDir, 'saudi_service_cemetery_1783429017751.png')) },
  { id: '4', title: 'صدقات', bg: getBase64Uri(path.join(brainDir, 'saudi_service_charity_1783429030536.png')) },
  { id: '5', title: 'أدوات حفر القبور', bg: getBase64Uri(path.join(brainDir, 'saudi_service_digging_1783429065277.png')) },
  { id: '6', title: 'أدوات تغسيل المتوفى', bg: getBase64Uri(path.join(brainDir, 'saudi_service_washing_1783429075764.png')) },
  { id: '7', title: 'تبرع لعمليات نقل الجنازات', bg: getBase64Uri(path.join(brainDir, 'saudi_service_transport_1783429254738.png')) },
  { id: '8', title: 'تبرع لشراء إسعاف نقل', bg: getBase64Uri(path.join(brainDir, 'saudi_service_ambulance_1783429265014.png')) },
  { id: '9', title: 'تبرع لماء الشرب بالمقابر', bg: getBase64Uri(path.join(brainDir, 'saudi_service_water_1783429274389.png')) },
  { id: '10', title: 'دعم لموظفين الجمعية', bg: getBase64Uri(path.join(brainDir, 'saudi_service_employees_1783429300085.png')) },
  { id: '11', title: 'كفارة حلف', bg: getBase64Uri(path.join(brainDir, 'saudi_service_oath_1783429314633.png')) }
];

const logoUri = getLocalUri('cropped_logo.png');
const outputDir = path.join(__dirname, 'public', 'services');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    executablePath: 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });

  for (const service of services) {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@400;700;900&display=swap');
          body {
            margin: 0;
            padding: 0;
            width: 800px;
            height: 600px;
            font-family: 'Alexandria', sans-serif;
            background-color: #0E4B33;
            background-image: url('${service.bg}');
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
          }
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to top, rgba(14, 75, 51, 0.95) 0%, rgba(14, 75, 51, 0.4) 50%, rgba(0, 0, 0, 0.4) 100%);
            z-index: 1;
          }
          .top-bar {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            padding: 30px;
            background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%);
          }
          .logo {
            width: 150px;
            height: 150px;
            object-fit: contain;
            background: #FFFFFF;
            padding: 15px;
            border-radius: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          }
          .content {
            position: relative;
            z-index: 2;
            padding: 40px;
            text-align: center;
          }
          .service-title {
            font-size: 56px;
            font-weight: 900;
            color: white;
            margin: 0;
            text-shadow: 2px 4px 8px rgba(0,0,0,0.6);
            line-height: 1.4;
          }
          .decoration {
            width: 150px;
            height: 6px;
            background-color: #C89B3C;
            margin: 20px auto 0;
            border-radius: 3px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          }
        </style>
      </head>
      <body>
        <div class="overlay"></div>
        <div class="top-bar">
          <img src="${logoUri}" class="logo" />
        </div>
        <div class="content">
          <h2 class="service-title">${service.title}</h2>
          <div class="decoration"></div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'load', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));
    const outputPath = path.join(outputDir, `service_${service.id}.png`);
    await page.screenshot({ path: outputPath });
    console.log(`Generated image for: ${service.title}`);
  }

  await browser.close();
  console.log('All images generated successfully.');
})();
