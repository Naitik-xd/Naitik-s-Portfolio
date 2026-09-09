import re

for path in ['api/ask-naitik.js', 'public/js/inline.js']:
    with open(path, 'r') as f:
        content = f.read()
    
    # sed -i "s|\\\\n|\\n|g" replaced literally '\\n' with a newline character.
    # So we look for split('<newline>') and change it to split('\\n')
    content = content.replace("split('\\\n')", "split('\\\\n')")
    content = content.replace(" + '\\\n'", " + '\\\\n'")
    content = content.replace('"\\\nError: "', '"\\\\nError: "')
    content = content.replace('"\\\n**Email:**', '"\\\\n**Email:**')
    content = content.replace('"\\\n**Message:**', '"\\\\n**Message:**')
    content = content.replace('"\\\n**Query:**', '"\\\\n**Query:**')
    content = content.replace('"\\\n" +', '"\\\\n" +')
    
    with open(path, 'w') as f:
        f.write(content)
