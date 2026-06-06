import os, glob

pages_dir = r'c:\Users\omara\Music\mama list\Darrow\Mathwaa\FrontendReact\src\pages'
files = glob.glob(os.path.join(pages_dir, '*.jsx'))

count = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    if "|| 'en')" in content:
        new_content = content.replace("|| 'en')", "|| 'ar')")
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new_content)
        count += 1
        print(f'Fixed: {os.path.basename(f)}')

print(f'\nTotal files fixed: {count}')
