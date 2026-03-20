const fs = require('fs');

// 1. 读取你的设计变量 JSON 文件
const fileName = 'AI-MaaS 视觉重构-variables-full.json'; 

try {
    const rawData = fs.readFileSync(fileName, 'utf8');
    const variablesData = JSON.parse(rawData);

    // 辅助函数：将颜色比例转换为 255 格式
    function toRgbString(colorObj) {
        if (!colorObj || colorObj.type === 'VARIABLE_ALIAS') return null;
        const r = Math.round(colorObj.r * 255);
        const g = Math.round(colorObj.g * 255);
        const b = Math.round(colorObj.b * 255);
        return `${r} ${g} ${b}`;
    }

    let cssContent = `/* 自动生成自设计变量库 */\n:root {\n`;

    // 2. 遍历 JSON 中的每一个变量集合
    variablesData.collections.forEach(collection => {
        cssContent += `  /* --- ${collection.name} --- */\n`;
        const lightModeId = collection.defaultModeId; // 使用默认模式

        collection.variables.forEach(variable => {
            const cssVarName = `--${variable.name.replace(/\//g, '-')}`;
            const value = variable.valuesByMode[lightModeId];

            if (variable.resolvedType === 'COLOR') {
                const rgb = typeof value === 'object' && value.r !== undefined ? toRgbString(value) : null;
                if (rgb) cssContent += `  ${cssVarName}: ${rgb};\n`;
            } else if (variable.resolvedType === 'FLOAT') {
                const unit = variable.name.includes('radius') || variable.name.includes('spacing') ? 'px' : '';
                cssContent += `  ${cssVarName}: ${value}${unit};\n`;
            }
        });
    });

    cssContent += `}\n`;

    // 3. 输出成 CSS 文件
    fs.writeFileSync('./globals.css', cssContent);
    console.log('🎉 成功！globals.css 文件已出现在你的文件夹中。');

} catch (err) {
    console.error('❌ 出错啦：请确认 JSON 文件名是否正确，或者文件是否在同一文件夹。', err);
}