import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../common/Icon';
import Button from '../common/Button';

/**
 * Model Card component matching Figma design.
 * States:
 *   - Default: normal border, white bg, shows metadata footer
 *   - Hover: gradient bg (#EDF0FF→#FFFFFF top-right to bottom-left), blue border, show action buttons
 *   - Card height stays the same in default and hover states
 */
function ModelCard({
    // Shared props
    variant = 'default', // 'default' or 'metric'
    onSelect,

    // Default variant props
    name = '通义千问Max',
    provider = 'qwen-max',
    tags = ['旗舰', '高性能'],
    description = '通义千问系列最新旗舰模型。具备卓越的理解、生成和推理能力，适用于复杂任务的处理。',
    modelSource = '通义千问',
    size = '32K',
    versions = 3,
    isSelected = false,

    // Metric variant props
    title,
    value,
    total,
    unit,
    percent,
    image, // Added image prop
}) {
    const { getVar } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';
    const borderNormal = getVar('border/border-normal') || '#D5D7DA';
    const borderBrand = getVar('border/border-brand') || '#4D6AFF';
    const textTitle = getVar('text/text-title') || '#181D27';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const accent1 = getVar('accent/1') || '#EBF1FF';
    const textAccent = getVar('text/text-accent') || '#4D6AFF';

    // Determine visual state: hover and selected both show blue border + action buttons
    const isActive = isSelected || isHovered;

    // Background: hover/selected = gradient from #EDF0FF (top-right) to #FFFFFF (bottom-left)
    const cardBackground = isActive
        ? 'linear-gradient(to bottom left, #EDF0FF, #FFFFFF)'
        : bgPrimary;

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        gap: '12px',
        borderRadius: '12px',
        border: `1px solid ${isActive ? borderBrand : borderNormal}`,
        background: cardBackground,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box',
        fontFamily: "'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    };

    const headerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
    };

    const modelIconStyle = {
        width: '44px',
        height: '44px',
        flexShrink: 0,
        backgroundColor: accent1,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Ensure image stays in bounds
    };

    const titleStyle = {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 600,
        color: textTitle,
        margin: 0,
    };

    const providerStyle = {
        fontSize: '12px',
        lineHeight: '18px',
        color: textSecondary,
        margin: 0,
    };

    const tagStyle = (color) => ({
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        lineHeight: '18px',
        fontWeight: 400,
        backgroundColor: color === 'brand' ? accent1 : '#F0F1F3',
        color: color === 'brand' ? textAccent : textSecondary,
    });

    const descriptionStyle = {
        fontSize: '13px',
        lineHeight: '20px',
        color: textSecondary,
        margin: 0,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    const footerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
        // Match button row height so card height stays consistent
        minHeight: '36px',
        alignSelf: 'stretch',
    };

    const metaStyle = {
        fontSize: '12px',
        lineHeight: '18px',
        color: textSecondary,
    };

    const handleClick = () => {
        if (onSelect) {
            onSelect();
        }
    };

    if (variant === 'metric') {
        const metricStyle = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            borderRadius: '12px',
            border: `1px solid ${borderNormal}`,
            background: bgPrimary,
            flex: '1 0 0',
            boxSizing: 'border-box',
            fontFamily: "'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        };

        const radius = 28;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        return (
            <div style={metricStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <p style={{
                        fontSize: '14px',
                        lineHeight: '22px',
                        color: textSecondary,
                        fontWeight: 400,
                        margin: 0,
                    }}>{title}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{
                            fontSize: '24px',
                            fontWeight: 600,
                            color: textTitle,
                        }}>{value}</span>
                        {(total || unit) && (
                            <span style={{
                                fontSize: '12px',
                                color: getVar('text/text-placeholder') || '#9DA4AE',
                            }}>{total ? `/${total}` : unit}</span>
                        )}
                    </div>
                </div>

                {percent !== undefined && (
                    <div style={{ width: '64px', height: '64px', position: 'relative' }}>
                        <svg width="64" height="64" viewBox="0 0 64 64">
                            <defs>
                                <linearGradient id="metric-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#EE9AE5" />
                                    <stop offset="100%" stopColor="#5961F9" />
                                </linearGradient>
                            </defs>
                            {/* Background circle */}
                            <circle
                                cx="32"
                                cy="32"
                                r={radius}
                                fill="transparent"
                                stroke={getVar('background/bg-secondary') || '#F9FAF7'}
                                strokeWidth="6"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="32"
                                cy="32"
                                r={radius}
                                fill="transparent"
                                stroke="url(#metric-gradient)"
                                strokeWidth="6"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                                transform="rotate(-90 32 32)"
                            />
                            {/* Center text */}
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dy=".3em"
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    fontFamily: "'Roboto', sans-serif",
                                    fill: textTitle,
                                }}
                            >
                                {percent}%
                            </text>
                        </svg>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            style={cardStyle}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header: icon + name + provider */}
            <div style={headerStyle}>
                <div style={modelIconStyle}>
                    {image ? (
                        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <Icon name="model-logo" size={26} color={getVar('accent/6')} />
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <p style={titleStyle}>{name}</p>
                    <p style={providerStyle}>{provider}</p>
                </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                {tags.map((tag, index) => (
                    <span key={index} style={tagStyle(index === 0 ? 'brand' : 'default')}>
                        {tag}
                    </span>
                ))}
            </div>

            {/* Description */}
            <p style={descriptionStyle}>{description}</p>

            {/* Footer: action buttons (hover/selected) or metadata (default) */}
            {isActive ? (
                <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', marginTop: 'auto', minHeight: '36px' }}>
                    <Button variant="secondary" style={{ flex: 1 }}>
                        立即部署
                    </Button>
                    <Button variant="primary" style={{ flex: 1 }}>
                        立即体验
                    </Button>
                </div>
            ) : (
                <div style={footerStyle}>
                    <span style={metaStyle}>{modelSource} | {size}</span>
                    <span style={metaStyle}>版本数量：{versions}</span>
                </div>
            )}
        </div>
    );
}

export default ModelCard;
