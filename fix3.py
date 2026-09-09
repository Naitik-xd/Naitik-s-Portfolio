import re

for path in ['api/ask-naitik.js', 'public/js/inline.js']:
    with open(path, 'r') as f:
        content = f.read()
    
    # We want to replace the literal two-character string "\\n" with "\n" in the javascript strings.
    # So split('\\n') becomes split('\n')
    
    content = content.replace("split('\\\\n')", "split('\\n')")
    content = content.replace(" + '\\\\n'", " + '\\n'")
    content = content.replace('"\\\\nError: "', '"\\nError: "')
    content = content.replace('"\\\\n**Email:**', '"\\n**Email:**')
    content = content.replace('"\\\\n**Message:**', '"\\n**Message:**')
    content = content.replace('"\\\\n**Query:**', '"\\n**Query:**')
    content = content.replace('"\\\\n" +', '"\\n" +')
    
    with open(path, 'w') as f:
        f.write(content)
