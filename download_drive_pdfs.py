import re
import urllib.request
import os
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

with open(r'C:\Users\omara\.gemini\antigravity-ide\brain\6152ac3a-7c1b-4528-abb7-0e44b1ebbc52\.system_generated\steps\2139\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract file IDs and titles
files = re.findall(r'<div class="flip-entry" id="entry-([a-zA-Z0-9_-]+)".*?<div class="flip-entry-title">(.*?)</div>', html)

out_dir = os.path.join('public', 'docs', 'new_pdfs')
os.makedirs(out_dir, exist_ok=True)

with open('downloaded_files.txt', 'w', encoding='utf-8') as log_file:
    for file_id, name in files:
        if name == "اللوائح والسياسات الجانبية ":
            continue
        
        clean_name = name.replace('.docx', '').strip()
        pdf_name = clean_name.replace(' ', '-') + '.pdf'
        print(f'Downloading {file_id}...')
        url = f'https://docs.google.com/document/d/{file_id}/export?format=pdf'
        
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(os.path.join(out_dir, pdf_name), 'wb') as out_file:
                data = response.read()
                out_file.write(data)
            print(f'Downloaded {file_id}')
            log_file.write(f'{clean_name}|{pdf_name}\n')
        except Exception as e:
            print(f'Error downloading {file_id}: {e}')
