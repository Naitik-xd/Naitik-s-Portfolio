import sys

def fix_file(path):
    with open(path, 'r') as f:
        content = f.read()
    
    # We want to replace "\\n" with "\n" in the exact locations where it was introduced by edit_file earlier.
    content = content.replace("split('\\\\n')", "split('\\n')")
    content = content.replace(" + '\\\\n'", " + '\\n'")
    content = content.replace("\"\\\\nError: \"", "\"\\nError: \"")
    content = content.replace("\"\\\\n**Email:**", "\"\\n**Email:**")
    content = content.replace("\"\\\\n**Message:**", "\"\\n**Message:**")
    content = content.replace("\"\\\\n**Query:**", "\"\\n**Query:**")
    content = content.replace("\"\\\\n\" +", "\"\\n\" +")
    
    with open(path, 'w') as f:
        f.write(content)

fix_file('api/ask-naitik.js')
fix_file('public/js/inline.js')
