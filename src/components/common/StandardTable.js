import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Shared Status Badge for StandardTable.
 * Renders a colored dot and status text.
 */
export const StatusBadge = ({ status, statusMap }) => {
    const { getVar } = useTheme();

    const defaultMap = {
        '运行中': { dot: getVar('success/success-6') || '#12B76A', text: '#414651' },
        '已停止': { dot: getVar('gray/gray-5') || '#98A2B3', text: '#6C737F' },
        '错误': { dot: getVar('error/error-6') || '#F04438', text: '#F04438' },
        '进行中': { dot: getVar('brand/brand-6') || '#4D6AFF', text: '#414651' }
    };

    const map = statusMap || defaultMap;
    const config = map[status] || { dot: '#98A2B3', text: '#6C737F' };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: config.dot, flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: config.text, lineHeight: '22px' }}>{status}</span>
        </div>
    );
};

/**
 * Individual Action Icon with custom Tooltip.
 */
const ActionIcon = ({ action, color }) => {
    const { getVar } = useTheme();
    const [isHover, setIsHover] = useState(false);

    // Tooltip mapping based on icon name as requested
    const tooltipMap = {
        'ri-eye-line': '查看详情',
        'ri-link': '复制接口地址',
        'ri-delete-bin-line': '删除服务',
        'ri-edit-line': '编辑',
        'ri-file-list-line': '查看日志',
        'ri-stop-circle-line': '停止服务'
    };

    const tooltipText = action.title || tooltipMap[action.icon] || '';
    const tooltipBg = getVar('ark-neutral-bg-tooltip') || '#1D2939';
    const tooltipTextCol = getVar('ark-neutral-text-tooltip') || '#FFFFFF';

    return (
        <div 
            style={{ position: 'relative', display: 'inline-flex' }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    action.onClick && action.onClick();
                }}
                style={{
                    border: 'none',
                    background: 'transparent',
                    padding: '4px',
                    cursor: 'pointer',
                    color: color,
                    fontSize: '16px', // Requirement: size=16
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s',
                    outline: 'none',
                    opacity: isHover ? 0.7 : 1
                }}
            >
                <i className={action.icon}></i>
            </button>
            {isHover && tooltipText && (
                <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translate(-50%, -8px)',
                    padding: '4px 8px',
                    backgroundColor: tooltipBg,
                    color: tooltipTextCol,
                    fontSize: '11px',
                    lineHeight: '16px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                    pointerEvents: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}>
                    {tooltipText}
                    {/* Triangle */}
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        marginLeft: '-4px',
                        borderWidth: '4px',
                        borderStyle: 'solid',
                        borderColor: `${tooltipBg} transparent transparent transparent`
                    }} />
                </div>
            )}
        </div>
    );
};

/**
 * Standard Action Buttons for icon-based table actions.
 */
export const StandardActionButtons = ({ actions }) => {
    const { getVar } = useTheme();
    // Resolving specific tokens requested
    const brandAccent = getVar('ark-brand-text-accent') || '#4D6AFF';
    const errorAccent = getVar('ark-error-text-accent') || '#F04438';

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px' }}>
            {actions.map((action, idx) => {
                const isLast = idx === actions.length - 1;
                const color = isLast && actions.length > 2 ? errorAccent : brandAccent;
                return <ActionIcon key={idx} action={action} color={color} />;
            })}
        </div>
    );
};

/**
 * Standard Table Row with hover interaction.
 */
function TableRow({ children, isHeader = false, bgSecondary }) {
    const [isHover, setIsHover] = useState(false);
    return (
        <tr
            style={{
                backgroundColor: isHeader ? bgSecondary : (isHover ? bgSecondary : 'white'),
                transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={() => !isHeader && setIsHover(true)}
            onMouseLeave={() => !isHeader && setIsHover(false)}
        >
            {children}
        </tr>
    );
}

/**
 * Standard reusable table component matching ModelService.js design.
 */
const StandardTable = ({ columns, dataSource, renderCell }) => {
    const { getVar } = useTheme();

    const bgSecondary = getVar('background/bg-secondary') || '#F9FAFB';
    const textPrimary = getVar('text/text-primary') || '#414651';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const borderWeak = getVar('border/border-weak') || '#F3F4F6';

    const tableStyle = { 
        width: '100%', 
        borderCollapse: 'collapse' 
    };

    const thStyle = { 
        padding: '12px 20px', 
        fontSize: '12px', 
        fontWeight: 500, 
        color: textSecondary, 
        backgroundColor: bgSecondary, 
        borderBottom: `1px solid ${borderWeak}`, 
        whiteSpace: 'nowrap' 
    };

    const tdStyle = { 
        padding: '16px 20px', 
        fontSize: '14px', 
        color: textPrimary, 
        borderBottom: `1px solid ${borderWeak}` 
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
                <thead>
                    <TableRow isHeader={true} bgSecondary={bgSecondary}>
                        {columns.map((col, idx) => (
                            <th 
                                key={idx} 
                                style={{ 
                                    ...thStyle, 
                                    textAlign: col.align || 'left' 
                                }}
                            >
                                {col.title}
                            </th>
                        ))}
                    </TableRow>
                </thead>
                <tbody>
                    {dataSource && dataSource.length > 0 ? (
                        dataSource.map((item, rowIdx) => (
                            <TableRow key={item.id || rowIdx} bgSecondary={bgSecondary}>
                                {columns.map((col, colIdx) => {
                                    const value = item[col.dataIndex];
                                    const cellContent = renderCell ? renderCell(col.dataIndex, value, item) : value;
                                    
                                    return (
                                        <td 
                                            key={colIdx} 
                                            style={{ 
                                                ...tdStyle, 
                                                ...col.style, 
                                                textAlign: col.align || 'left' 
                                            }}
                                        >
                                            {cellContent}
                                        </td>
                                    );
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <tr>
                            <td 
                                colSpan={columns.length} 
                                style={{ ...tdStyle, textAlign: 'center', padding: '40px' }}
                            >
                                暂无数据
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StandardTable;
