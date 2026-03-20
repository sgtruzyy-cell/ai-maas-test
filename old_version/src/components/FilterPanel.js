import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

/**
 * Filter panel for model categories and providers.
 * Matches the left sidebar filter section in the Figma design.
 */
function FilterPanel({ onFilterChange }) {
    const { getVar } = useTheme();

    const textTitle = getVar('text/text-title') || '#181D27';
    const textPrimary = getVar('text/text-primary') || '#414651';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const textAccent = getVar('text/text-accent') || '#4D6AFF';
    const accentBg = getVar('accent/1') || '#EBF1FF';

    const [selectedCategories, setSelectedCategories] = useState(['文本生成']);
    const [selectedProviders, setSelectedProviders] = useState(['通义千问']);

    const categories = [
        { name: '文本生成', count: 8 },
        { name: '图像生成', count: 0 },
        { name: '视频生成', count: 0 },
        { name: '语音生成', count: 0 },
        { name: '向量模型', count: 0 },
        { name: '多模态', count: 4 },
    ];

    const providers = [
        { name: '通义千问', count: 3 },
        { name: 'DeepSeek', count: 2 },
        { name: '百度文心一言', count: 1 },
        { name: '智谱GLM', count: 2 },
    ];

    const font = "'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    const sectionTitleStyle = {
        fontSize: '14px',
        lineHeight: '22px',
        fontWeight: 600,
        color: textTitle,
        margin: '0 0 8px 0',
        fontFamily: font,
    };

    const toggleCategory = (name) => {
        setSelectedCategories(prev =>
            prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
        );
    };

    const toggleProvider = (name) => {
        setSelectedProviders(prev =>
            prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
        );
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '168px',
            minWidth: '168px',
            gap: '24px',
            fontFamily: font,
        }}>
            {/* 模型类别 */}
            <div>
                <p style={sectionTitleStyle}>模型类别</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {categories.map((cat) => (
                        <FilterItem
                            key={cat.name}
                            label={cat.name}
                            count={cat.count}
                            isSelected={selectedCategories.includes(cat.name)}
                            onClick={() => toggleCategory(cat.name)}
                            textPrimary={textPrimary}
                            textSecondary={textSecondary}
                            textAccent={textAccent}
                            accentBg={accentBg}
                        />
                    ))}
                </div>
            </div>

            {/* 模型供应商 */}
            <div>
                <p style={sectionTitleStyle}>模型供应商</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {providers.map((prov) => (
                        <FilterItem
                            key={prov.name}
                            label={prov.name}
                            count={prov.count}
                            isSelected={selectedProviders.includes(prov.name)}
                            onClick={() => toggleProvider(prov.name)}
                            textPrimary={textPrimary}
                            textSecondary={textSecondary}
                            textAccent={textAccent}
                            accentBg={accentBg}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function FilterItem({ label, count, isSelected, onClick, textPrimary, textSecondary, textAccent, accentBg }) {
    const [isHovered, setIsHovered] = useState(false);

    const itemStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 8px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
        backgroundColor: isSelected ? accentBg : (isHovered ? '#F5F6F7' : 'transparent'),
    };

    const labelStyle = {
        fontSize: '13px',
        lineHeight: '20px',
        fontWeight: isSelected ? 500 : 400,
        color: isSelected ? textAccent : textPrimary,
    };

    const countStyle = {
        fontSize: '12px',
        lineHeight: '18px',
        color: textSecondary,
    };

    return (
        <div
            style={itemStyle}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span style={labelStyle}>{label}</span>
            <span style={countStyle}>{count}</span>
        </div>
    );
}

export default FilterPanel;
