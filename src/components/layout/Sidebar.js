import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../common/Icon';

/**
 * Sidebar navigation component matching Figma design.
 * Features flat nav groups with active state highlighting.
 */

const navData = [
    {
        type: 'group',
        groupTitle: '模型供给',
        items: [
            { id: 'overview', label: '概览', icon: 'overview' },
            { id: 'model-square', label: '模型广场', icon: 'model-square' },
            { id: 'experience-center', label: '体验中心', icon: 'experience-center' },
            { id: 'model-service', label: '模型服务', icon: 'model-service' },
        ],
    },
    {
        type: 'group',
        groupTitle: '模型推理',
        items: [
            { id: 'model-inference', label: '推理服务', icon: 'model-inference' },
        ],
    },
    {
        type: 'group',
        groupTitle: '数据管理',
        items: [
            { id: 'data-management', label: '数据集管理', icon: 'data-management' },
        ],
    },
];

function Sidebar({ currentPage, onNavigate }) {
    const { getVar } = useTheme();

    const bgSlidebar = getVar('background/bg-slidebar') || '#F7F9FF';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const borderNormal = getVar('border/border-normal') || '#D5D7DA';

    const sidebarStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        minWidth: '200px',
        height: '100%',
        backgroundColor: bgSlidebar,
        borderRight: `1px solid ${borderNormal}`,
        padding: '12px 0',
        gap: '4px',
        overflowY: 'auto',
        boxSizing: 'border-box',
        fontFamily: "'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    };

    const groupTitleStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '8px 16px',
        userSelect: 'none',
    };

    const groupTitleTextStyle = {
        fontSize: '12px',
        lineHeight: '18px',
        fontWeight: 400,
        color: textSecondary,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    };

    return (
        <nav style={sidebarStyle}>
            <div style={{ height: '8px' }} />
            {navData.map((group, groupIndex) => {
                return (
                    <div key={groupIndex} style={{ marginBottom: '8px' }}>
                        {/* Group Title (Non-interactive) */}
                        <div style={groupTitleStyle}>
                            <span style={groupTitleTextStyle}>{group.groupTitle}</span>
                        </div>

                        {/* Nav Items (Always shown) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 8px' }}>
                            {group.items.map((item) => (
                                <NavItem
                                    key={item.id}
                                    item={item}
                                    isActive={currentPage === item.id}
                                    onClick={() => onNavigate && onNavigate(item.id)}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </nav>
    );
}

function NavItem({ item, isActive, onClick }) {
    const { getVar } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    const textPrimary = getVar('text/text-primary') || '#414651';
    const textAccent = getVar('text/text-accent') || '#4D6AFF';
    const accentBg = getVar('accent/1') || '#EBF1FF';

    const itemStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '8px 12px',
        gap: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        backgroundColor: isActive ? accentBg : (isHovered ? 'rgba(0, 0, 0, 0.03)' : 'transparent'),
    };

    const textStyle = {
        fontSize: '14px',
        lineHeight: '22px',
        fontWeight: isActive ? 500 : 400,
        color: isActive ? textAccent : textPrimary,
        whiteSpace: 'nowrap',
    };

    return (
        <div
            style={itemStyle}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Icon
                name={item.icon}
                size={16}
                color={isActive ? textAccent : textPrimary}
            />
            <span style={textStyle}>{item.label}</span>
        </div>
    );
}

export default Sidebar;
