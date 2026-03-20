import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import Icon from './Icon';
import LogoSystem from '../images/LogoSystem.svg';

/**
 * Sidebar navigation component matching Figma design.
 * Features collapsible nav groups with active state highlighting.
 */

const navData = [
    {
        type: 'group',
        groupTitle: '模型供给',
        expanded: true,
        items: [
            { id: 'overview', label: '概览', icon: 'overview' },
            { id: 'model-square', label: '模型广场', icon: 'model-square' },
            { id: 'experience-center', label: '体验中心', icon: 'experience-center' },
            { id: 'model-warehouse', label: '模型仓库', icon: 'model-warehouse' },
            { id: 'model-deploy', label: '模型部署', icon: 'model-deploy' },
            { id: 'model-service', label: '模型服务', icon: 'model-service' },
            { id: 'model-security', label: '模型安全', icon: 'model-security' },
        ],
    },
    {
        type: 'group',
        groupTitle: '应用实验室',
        expanded: false,
        items: [
            { id: 'app-lab', label: '应用工作台', icon: 'app-lab' },
        ],
    },
    {
        type: 'group',
        groupTitle: 'Prompt实验室',
        expanded: false,
        items: [
            { id: 'prompt-lab', label: '提示词优化', icon: 'prompt-lab' },
        ],
    },
    {
        type: 'group',
        groupTitle: '模型推理',
        expanded: false,
        items: [
            { id: 'model-inference', label: '推理服务', icon: 'model-inference' },
        ],
    },
    {
        type: 'group',
        groupTitle: '模型定制',
        expanded: false,
        items: [
            { id: 'model-custom', label: '模型微调', icon: 'model-custom' },
        ],
    },
    {
        type: 'group',
        groupTitle: '数据管理',
        expanded: false,
        items: [
            { id: 'data-management', label: '数据集管理', icon: 'data-management' },
        ],
    },
    {
        type: 'group',
        groupTitle: '系统管理',
        expanded: false,
        items: [
            { id: 'system-management', label: '账号设置', icon: 'system-management' },
        ],
    },
];

function Sidebar({ currentPage, onNavigate }) {
    const { getVar } = useTheme();
    const [groups, setGroups] = useState(navData);

    const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';
    const bgSlidebar = getVar('background/bg-slidebar') || '#F7F9FF';
    const textPrimary = getVar('text/text-primary') || '#414651';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const borderNormal = getVar('border/border-normal') || '#D5D7DA';
    const accentBg = getVar('accent/1') || '#EBF1FF';
    const textAccent = getVar('text/text-accent') || '#4D6AFF';

    const toggleGroup = (index) => {
        setGroups(prev => prev.map((g, i) => {
            if (i === index && g.type !== 'item') {
                return { ...g, expanded: !g.expanded };
            }
            return g;
        }));
    };

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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        cursor: 'pointer',
        userSelect: 'none',
    };

    const groupTitleTextStyle = {
        fontSize: '12px',
        lineHeight: '18px',
        fontWeight: 400,
        color: textSecondary,
    };

    return (
        <nav style={sidebarStyle}>
            <div style={{ height: '8px' }} />
            {groups.map((group, groupIndex) => {
                if (group.type === 'item') {
                    return (
                        <div key={groupIndex} style={{ padding: '0 8px', marginBottom: '2px' }}>
                            <NavItem
                                item={group}
                                isActive={currentPage === group.id}
                                onClick={() => onNavigate && onNavigate(group.id)}
                                textPrimary={textPrimary}
                                textAccent={textAccent}
                                accentBg={accentBg}
                                bgPrimary={bgPrimary}
                            />
                        </div>
                    );
                }

                return (
                    <div key={groupIndex} style={{ marginBottom: '4px' }}>
                        {/* Group Title */}
                        <div
                            style={groupTitleStyle}
                            onClick={() => toggleGroup(groupIndex)}
                        >
                            <span style={groupTitleTextStyle}>{group.groupTitle}</span>
                            <Icon
                                name={group.expanded ? 'chevron-up' : 'chevron-down'}
                                size={12}
                                color={textSecondary}
                            />
                        </div>

                        {/* Nav Items */}
                        {group.expanded && group.items && group.items.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 8px' }}>
                                {group.items.map((item) => (
                                    <NavItem
                                        key={item.id}
                                        item={item}
                                        isActive={currentPage === item.id}
                                        onClick={() => onNavigate && onNavigate(item.id)}
                                        textPrimary={textPrimary}
                                        textAccent={textAccent}
                                        accentBg={accentBg}
                                        bgPrimary={bgPrimary}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

function NavItem({ item, isActive, onClick, textPrimary, textAccent, accentBg, bgPrimary }) {
    const [isHovered, setIsHovered] = useState(false);

    const itemStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '8px 12px',
        gap: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
        backgroundColor: (isActive || isHovered) ? accentBg : 'transparent',
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

