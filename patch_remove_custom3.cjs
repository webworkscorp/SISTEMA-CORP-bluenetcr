const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/const \[isCustomAssignee, setIsCustomAssignee\] = useState\(false\);\s*const \[customAssigneeVal, setCustomAssigneeVal\] = useState\(''\);/, '');
code = code.replace(/const isKnown = availableMembers\.some\(m => m\.name\.toLowerCase\(\) === \(data\.assignee \|\| ''\)\.toLowerCase\(\)\);\s*if \(data\.assignee && !isKnown\) \{\s*setIsCustomAssignee\(true\);\s*setCustomAssigneeVal\(data\.assignee\);\s*\} else \{\s*setCustomAssigneeVal\(''\);\s*\}/, '');
code = code.replace(/setCustomAssigneeVal\(''\);/g, '');
code = code.replace(/const finalAssignee = isCustomAssignee \? customAssigneeVal : formData\.assignee;/, 'const finalAssignee = formData.assignee;');

fs.writeFileSync('src/App.tsx', code);
