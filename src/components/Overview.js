import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Icon from './Icon';
import headerBgImage from '../header-background.png';

// ─── Figma Design Tokens (exact values from MCP get_design_context) ────────────
// Colors: --text/text-title: #111927, --text/text-primary: #384250,
//         --text/text-secondary: #6c737f, --text/text-placeholder: #9da4ae
//         --background/bg-primary_alt: white, --background/bg-secondary: #f9fafb
//         --border/border-normal: #e5e7eb, --border/border-strong: #d2d6db
//         --border/border-weak: #f3f4f6, --accent/1: #ebf1ff
// Spacing: --spacing-xl: 16px, --spacing-20: 20px, --spacing-lg: 12px
//          --spacing-md: 8px, --spacing-sm: 6px, --spacing-2: 2px, --spacing-6: 6px
// Radius:  --radius-md: 8px, --5: 12px, --3: 6px

const F = "'PingFang SC', -apple-system, sans-serif";

// ─── Figma icon & chart SVG assets (served by Figma Desktop MCP localhost) ──
const IMG = {
    pieSlice0: "http://localhost:3845/assets/280141870f5871731364f8749a491657783973d8.svg",
    pieSlice1: "http://localhost:3845/assets/72006b6bc9e95f8166459dd4077f7a34765d8ee7.svg",
    pieSlice2: "http://localhost:3845/assets/f7b6b450b150f7a2fb1c87ac9f1db6e885c8c761.svg",
    pieSlice3: "http://localhost:3845/assets/65b4b4ec40dcdbff79151bd5aa8bcf7056663ef3.svg",
    pieSlice4: "http://localhost:3845/assets/99e20f6ad3569a4b6dc58cab1f33f05970990b7a.svg",
    dot0: "http://localhost:3845/assets/e3ac2105e30a282eb965c70c59f99a290171549e.svg",
    dot1: "http://localhost:3845/assets/e8290a4b0bb8e7fa7aaa5a4786d2c70d7ddaa686.svg",
    dot2: "http://localhost:3845/assets/fa5e748608469bf67cc1b7a36e21887a792a39fb.svg",
    dot3: "http://localhost:3845/assets/71b4555f5332eadef63653d12c7c33250cd792ce.svg",
    dot4: "http://localhost:3845/assets/8ea9c8d10505002aeb563730787a6c9720d2121e.svg",
    chevronDown: "http://localhost:3845/assets/8d6779e5b38c4c47671e198e66066ea71dc9f05c.svg",
    divider: "http://localhost:3845/assets/49b5ca2d628d712c99ad88a7b1bfd45d16fc2827.svg",
    // Trend chart area+line SVGs from Figma
    areaFill: "http://localhost:3845/assets/c0e9a3dfd115581b9fd9441b49385f3d32e6e67e.svg",
    trendLine: "http://localhost:3845/assets/21e33450f446f4839dc24ff49221245ea046ffc1.svg",
};

const obsMetrics = [
    { title: '总调用次数', value: '18,500', unit: '次' },
    { title: '请求成功率', value: '32.5', unit: '%', isNegative: true },
    { title: '平均响应耗时', value: '256', unit: 'ms' },
    { title: '总错误次数', value: '65', unit: '次' },
];

const obsRows = [
    ['qwen-max', '在线', '8,500', '12', '99.86%', '156ms', '详情'],
    ['qwen-plus', '错误', '4,200', '48', '98.86%', '212ms', '详情'],
    ['deepseek-chat', '在线', '3,800', '3', '99.92%', '45ms', '详情'],
    ['chatglm-pro', '在线', '2,000', '2', '99.90%', '120ms', '详情'],
];

// ─── Metric Card ─────────────────────────────────────────────────────────────
// Figma: bg-primary_alt, border-[0.5px] border-strong, p-[16px], rounded-[12px],
//        flex-col gap-[6px], value font: Roboto Medium 24px text-title
function MetricCard({ title, value, unit, isNegative }) {
    const { getVar } = useTheme();
    return (
        <div style={{
            background: 'white',
            border: '0.5px solid #d2d6db',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            flex: '1 0 0',
            minWidth: 0,
            overflow: 'hidden',
            fontFamily: F,
        }}>
            <p style={{
                fontSize: '14px',
                lineHeight: '22px',
                color: '#384250',
                fontFamily: "'PingFang SC', sans-serif",
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}>{title}</p>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', whiteSpace: 'nowrap' }}>
                <p style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    fontSize: '24px',
                    lineHeight: 'normal',
                    color: isNegative ? getVar('red/red-6') : '#111927',
                    margin: 0,
                }}>{value}</p>
                {unit && (
                    <p style={{
                        fontFamily: F,
                        fontSize: '12px',
                        lineHeight: '20px',
                        color: isNegative ? getVar('red/red-6') : '#6c737f',
                        margin: 0,
                    }}>{unit}</p>
                )}
            </div>
        </div>
    );
}

// ─── Segmented Tabs (Figma: "Tabs" component) ────────────────────────────────
// active: bg-accent/1 (#ebf1ff), rounded-[6px], px-3 h-8
// inactive: transparent
function SegmentedTabs({ tabs, active, onChange }) {
    return (
        <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '2px',
            display: 'flex',
            gap: '0',
            height: '36px',
            alignItems: 'center',
        }}>
            {tabs.map(tab => {
                const isActive = active === tab.id;
                return (
                    <div
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '32px',
                            padding: '0 12px',
                            borderRadius: '6px',
                            background: isActive ? '#ebf1ff' : 'transparent',
                            cursor: 'pointer',
                            transition: 'background 0.15s',
                        }}
                    >
                        <span style={{
                            fontFamily: F,
                            fontSize: '14px',
                            lineHeight: '22px',
                            color: isActive ? '#111927' : '#384250',
                            fontWeight: isActive ? 500 : 400,
                            whiteSpace: 'nowrap',
                        }}>{tab.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Horizontal Tabs (time selector) ─────────────────────────────────────────
// Figma: bg-secondary border-normal rounded-md w-[203px], active tab: bg-primary_alt border-strong shadow
function HorizontalTabs({ tabs, active, onChange }) {
    return (
        <div style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            height: '36px',
            overflow: 'hidden',
        }}>
            {tabs.map(tab => {
                const isActive = active === tab.id;
                return (
                    <div
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        style={{
                            flex: '1 0 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '6px 12px',
                            background: isActive ? 'white' : 'transparent',
                            border: isActive ? '1px solid #d2d6db' : '1px solid transparent',
                            borderRadius: isActive ? '8px' : '0',
                            boxShadow: isActive ? '0px 1px 2px 0px rgba(17,25,39,0.05)' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            margin: isActive ? '2px' : '0',
                        }}
                    >
                        <span style={{
                            fontFamily: F,
                            fontSize: '14px',
                            lineHeight: '22px',
                            color: isActive ? '#384250' : '#6c737f',
                            fontWeight: isActive ? 500 : 400,
                            whiteSpace: 'nowrap',
                        }}>{tab.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Trend Chart (using Figma SVG assets) ────────────────────────────────────
function TrendChart() {
    const yLabels = ['1', '0.8', '0.6', '0.4', '0.2', '0'];
    const xLabels = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: F }}>
            <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
                {/* Y axis labels */}
                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    paddingRight: '8px', paddingBottom: '0', width: '28px',
                }}>
                    {yLabels.map(l => (
                        <span key={l} style={{ fontSize: '12px', lineHeight: '20px', color: '#6c737f', textAlign: 'right' }}>{l}</span>
                    ))}
                </div>
                {/* Chart area */}
                <div style={{ flex: 1, position: 'relative', borderLeft: '1px solid #d2d6db', borderBottom: '1px solid #d2d6db' }}>
                    {/* Horizontal grid lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} style={{
                            position: 'absolute', left: 0, right: 0,
                            top: `${(i / 5) * 100}%`,
                            borderTop: '1px dashed #f3f4f6',
                        }} />
                    ))}
                    {/* Area fill + trend line SVG */}
                    <svg
                        viewBox="0 0 800 180"
                        preserveAspectRatio="none"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                    >
                        <defs>
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>
                        {/* Area fill */}
                        <path
                            d="M0,160 C80,130 160,80 240,90 C320,100 380,40 480,55 C560,68 640,100 720,80 C760,70 800,60 800,60 L800,180 L0,180 Z"
                            fill="url(#areaGrad)"
                        />
                        {/* Trend line */}
                        <path
                            d="M0,160 C80,130 160,80 240,90 C320,100 380,40 480,55 C560,68 640,100 720,80 C760,70 800,60 800,60"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                        />
                    </svg>
                </div>
            </div>
            {/* X axis labels */}
            <div style={{ display: 'flex', paddingLeft: '36px', marginTop: '4px' }}>
                {xLabels.map((l, i) => (
                    <div key={l} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <span style={{ fontSize: '12px', lineHeight: '20px', color: '#6c737f' }}>{l}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Donut / Pie Chart ────────────────────────────────────────────────────────
function DonutChart({ totalLabel, totalValue, data }) {
    const { getVar } = useTheme();
    // Calculate percentages for conic-gradient
    const total = data.reduce((acc, item) => acc + (parseFloat(item.value.replace(/,/g, '')) || 0), 0);
    let currentPercentage = 0;
    const colors = [
        getVar('arken/arken-6') || '#4D6AFF',
        getVar('skyblue/skyblue-6') || '#36BFFA',
        getVar('red/red-6') || '#FF3A4B',
        getVar('yellow/yellow-6') || '#FFBF00',
        getVar('gray/neutral-gray-4') || '#D2D6DB'
    ];

    const gap = 0.5; // Gap in percentage for white border
    const gradientSegments = data.map((item, i) => {
        const val = parseFloat(item.value.replace(/,/g, '')) || 0;
        const percent = (val / total) * 100;
        const start = currentPercentage;
        currentPercentage += percent;

        // Color block
        const segmentEnd = i === data.length - 1 ? currentPercentage : currentPercentage - gap;
        const colorBlock = `${colors[i % colors.length]} ${start.toFixed(1)}% ${segmentEnd.toFixed(1)}%`;

        // White border (except for the very last bit of the very last segment to avoid overlap)
        const border = i === data.length - 1 ? '' : `, #ffffff ${segmentEnd.toFixed(1)}% ${currentPercentage.toFixed(1)}%`;

        return i === data.length - 1 ? colorBlock : colorBlock + border;
    }).join(', ');

    return (
        <div style={{ position: 'relative', width: '140px', height: '140px', flexShrink: 0 }}>
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: `conic-gradient(${gradientSegments})`,
                display: 'block'
            }} />
            {/* Center label with white hole/mask */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0',
                zIndex: 2,
            }}>
                <span style={{ fontFamily: F, fontSize: '12px', lineHeight: '20px', color: '#6c737f' }}>{totalLabel}</span>
                <span style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#111927' }}>{totalValue}</span>
            </div>
        </div>
    );
}

// ─── Pie Legend Table ─────────────────────────────────────────────────────────
function PieLegend({ items }) {
    const { getVar } = useTheme();
    const colors = [
        getVar('arken/arken-6') || '#4D6AFF',
        getVar('skyblue/skyblue-6') || '#36BFFA',
        getVar('red/red-6') || '#FF3A4B',
        getVar('yellow/yellow-6') || '#FFBF00',
        getVar('gray/neutral-gray-4') || '#D2D6DB'
    ];
    return (
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {/* Name column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontFamily: F, fontSize: '12px', lineHeight: '20px', color: '#6c737f' }}>模型名称</span>
                {items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors[i % colors.length] }} />
                        <span style={{ fontFamily: F, fontSize: '12px', lineHeight: '20px', color: '#384250', whiteSpace: 'nowrap' }}>{item.name}</span>
                    </div>
                ))}
            </div>
            {/* Value column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                <span style={{ fontFamily: F, fontSize: '12px', lineHeight: '20px', color: '#6c737f', textAlign: 'right' }}>调用次数/Tokens</span>
                {items.map((item, i) => (
                    <span key={i} style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '20px', color: '#6c737f', textAlign: 'right' }}>{item.value}</span>
                ))}
            </div>
        </div>
    );
}

// ─── Card Panel Wrapper ───────────────────────────────────────────────────────
// Figma: bg-white, border-[0.5px] border-primary (#d5d7da), p-[20px], rounded-[8px], gap-[16px]
function CardPanel({ title, children, style = {} }) {
    return (
        <div style={{
            background: 'white',
            border: '0.5px solid #d5d7da',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            ...style,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <p style={{
                    fontFamily: F,
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '22px',
                    color: '#181d27',
                    margin: 0,
                    whiteSpace: 'nowrap',
                }}>{title}</p>
            </div>
            {children}
        </div>
    );
}

// ─── Model List Table ─────────────────────────────────────────────────────────
// Exact columns & data from Figma MCP design context
function ObservabilityTable() {
    const { getVar } = useTheme();
    const headers = ['模型名称', '状态', '总调用次数', '错误次数', '请求成功率', '平均耗时', '操作'];
    const colWidths = [180, 80, 120, 100, 120, 120, 80];
    const obsRows = [
        ['qwen-7b-inrerence', '在线', '3,200', '12', '99.63%', '120ms', '详情'],
        ['deepseek-67b-api', '在线', '1,800', '5', '99.72%', '150ms', '详情'],
        ['chatglm-6b-dev', '离线', '1,200', '8', '99.33%', '180ms', '详情'],
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: F }}>
            {/* Header row */}
            <div style={{ display: 'flex', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                {headers.map((h, i) => (
                    <div key={i} style={{
                        width: colWidths[i], minWidth: colWidths[i], flexShrink: 0,
                        padding: '12px 16px',
                    }}>
                        <span style={{ fontWeight: 500, fontSize: '12px', color: '#6c737f' }}>{h}</span>
                    </div>
                ))}
            </div>
            {/* Data rows */}
            {obsRows.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', borderBottom: '1px solid #f3f4f6', alignItems: 'center' }}>
                    {row.map((cell, ci) => (
                        <div key={ci} style={{
                            width: colWidths[ci], minWidth: colWidths[ci], flexShrink: 0,
                            padding: '12px 16px',
                        }}>
                            {ci === 1 ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{
                                        width: '6px', height: '6px', borderRadius: '50%',
                                        backgroundColor: cell === '在线' ? '#10b981' : '#ef4444'
                                    }} />
                                    <span style={{ fontSize: '14px', color: '#111927' }}>{cell}</span>
                                </div>
                            ) : (
                                <span style={{
                                    fontSize: '14px',
                                    color: ci === headers.length - 1 || ci === 0 ? getVar('arken/arken-6') : '#111927',
                                    cursor: ci === headers.length - 1 || ci === 0 ? 'pointer' : 'default',
                                }}>{cell}</span>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ─── Usage DataTable ────────────────────────────────────────────────────────
// Exact columns & data from Figma MCP design context
function UsageDataTable() {
    const headers = ['模型实例名称', '调用次数(次)', '调用失败', '调用失败率', '总Token', '输入Token', '操作'];
    const colWidths = [190, 120, 100, 120, 120, 120, 80];
    const rows = [
        ['qwen-7b-inrerence', '3,200', '12', '0.37%', '1,200,000', '800,000', '详情'],
        ['deepseek-67b-api', '1,800', '5', '0.28%', '900,000', '600,000', '详情'],
        ['chatglm-6b-dev', '1,200', '8', '0.67%', '400,000', '250,000', '详情'],
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: F }}>
            {/* Header row */}
            <div style={{ display: 'flex', background: '#f9fafb', overflow: 'hidden' }}>
                {headers.map((h, i) => (
                    <div key={i} style={{
                        width: colWidths[i], minWidth: colWidths[i], flexShrink: 0,
                        padding: '9px 16px',
                        display: 'flex', alignItems: 'center',
                    }}>
                        <span style={{ fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, fontSize: '12px', lineHeight: '20px', color: '#6c737f' }}>{h}</span>
                    </div>
                ))}
            </div>
            {/* Data rows */}
            {rows.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', borderBottom: '1px solid #f3f4f6' }}>
                    {row.map((cell, ci) => (
                        <div key={ci} style={{
                            width: colWidths[ci], minWidth: colWidths[ci], flexShrink: 0,
                            padding: '10px 16px 9px',
                            display: 'flex', alignItems: 'center',
                        }}>
                            <span style={{
                                fontFamily: "'PingFang SC', sans-serif",
                                fontSize: '14px',
                                lineHeight: '22px',
                                color: ci === headers.length - 1 ? '#3b82f6' : '#111927',
                                cursor: ci === headers.length - 1 ? 'pointer' : 'default',
                            }}>{cell}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ─── Recent Activity Table ────────────────────────────────────────────────────
function RecentActivityTable() {
    const headers = ['时间', '资源名称', '操作类型', '操作详情', '状态'];
    const colWidths = [180, 180, 120, 300, 120];
    const rows = [
        ['2025-03-19 09:21:33', 'qwen-7b-inrerence', '模型调用', 'POST /v1/chat/completions 200 OK', '成功'],
        ['2025-03-19 09:14:21', 'deepseek-67b-api', '模型调用', 'POST /v1/chat/completions 429 Rate Limit', '失败'],
        ['2025-03-19 09:08:44', 'chatglm-6b-dev', '配置更新', '更新并发数限制：20 → 50', '成功'],
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: F }}>
            <div style={{ display: 'flex', background: '#f9fafb' }}>
                {headers.map((h, i) => (
                    <div key={i} style={{ width: colWidths[i], minWidth: colWidths[i], flexShrink: 0, padding: '9px 16px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, fontSize: '12px', lineHeight: '20px', color: '#6c737f' }}>{h}</span>
                    </div>
                ))}
            </div>
            {rows.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', borderBottom: '1px solid #f3f4f6' }}>
                    {row.map((cell, ci) => (
                        <div key={ci} style={{ width: colWidths[ci], minWidth: colWidths[ci], flexShrink: 0, padding: '10px 16px 9px', display: 'flex', alignItems: 'center' }}>
                            <span style={{
                                fontFamily: "'PingFang SC', sans-serif",
                                fontSize: '14px',
                                lineHeight: '22px',
                                color: '#111927',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>{cell}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ─── Model Input (Dropdown selector) ─────────────────────────────────────────
// Figma: bg-primary border-normal border rounded-md h-9 w-60 px-3 gap-2
function ModelSelector() {
    return (
        <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            height: '36px',
            width: '240px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '8px',
            cursor: 'pointer',
            overflow: 'hidden',
        }}>
            <span style={{ flex: '1 0 0', fontFamily: F, fontSize: '14px', lineHeight: '22px', color: '#9da4ae', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                选择模型
            </span>
            <Icon name="chevron-down" size={16} color="#6c737f" />
        </div>
    );
}

// ─── Main Overview Component ──────────────────────────────────────────────────
function Overview({ currentPage, onNavigate }) {
    const { getVar } = useTheme();
    const [activeTab, setActiveTab] = useState('usage');
    const [timeTab, setTimeTab] = useState('day');

    const bgSlide = getVar('background/bg-slidebar') || '#F7F9FF';

    const mainTabs = [
        { id: 'usage', label: '模型用量' },
        { id: 'obs', label: '运维监控' },
    ];
    const timeTabs = [
        { id: 'day', label: '当日' },
        { id: 'week', label: '近7天' },
        { id: 'two', label: '近14天' },
    ];

    const top5CallData = [
        { name: 'qwen-7b', value: '3,200', dotImg: IMG.dot0 },
        { name: 'deepseek-67b', value: '1,800', dotImg: IMG.dot1 },
        { name: 'chatglm-6b', value: '1,200', dotImg: IMG.dot2 },
        { name: 'ernie-4 Ads', value: '800', dotImg: IMG.dot3 },
        { name: 'bge-large Ads', 'value': '500', dotImg: IMG.dot4 },
    ];
    const top5TokenData = [
        { name: 'qwen-7b', value: '1,200,000', dotImg: IMG.dot0 },
        { name: 'deepseek-67b', value: '900,000', dotImg: IMG.dot1 },
        { name: 'chatglm-6b', value: '400,000', dotImg: IMG.dot2 },
        { name: 'ernie-4 Ads', value: '200,000', dotImg: IMG.dot3 },
        { name: 'bge-large Ads', 'value': '100,000', dotImg: IMG.dot4 },
    ];
    const piePieces = [
        { img: IMG.pieSlice0 },
        { img: IMG.pieSlice1 },
        { img: IMG.pieSlice2 },
        { img: IMG.pieSlice3 },
        { img: IMG.pieSlice4 },
    ];

    const obsMetrics = [
        { title: '在线模型', value: '2', unit: '个' },
        { title: '总调用次数', value: '6,200', unit: '次' },
        { title: '错误次数', value: '25', unit: '次', isNegative: true },
        { title: '平均耗时', value: '150', unit: 'ms' },
        { title: '请求成功率', value: '99.6%', unit: '' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden', background: '#f9fafb' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

                {/* Main content area */}
                <div style={{ flex: 1, overflow: 'auto', background: bgSlide, position: 'relative' }}>
                    {/* Header background image */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '140px',
                        backgroundImage: `url(${headerBgImage})`,
                        backgroundSize: 'cover', backgroundPosition: 'center top',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                        zIndex: 0,
                    }} />

                    {/* Content */}
                    <div style={{
                        position: 'relative', zIndex: 1,
                        padding: '24px 32px',
                        display: 'flex', flexDirection: 'column', gap: '16px',
                    }}>

                        {/* ① Page title */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <h1 style={{
                                fontFamily: "'PingFang SC', sans-serif", fontWeight: 600,
                                fontSize: '24px', lineHeight: '32px', color: '#181d27',
                                margin: 0,
                            }}>概览</h1>
                            <p style={{
                                fontFamily: F, fontSize: '14px', lineHeight: '22px',
                                color: '#6c737f', margin: 0,
                            }}>浏览和发现各类AI模型，支持快速部署和体验。</p>
                        </div>

                        {/* ② Filter bar: tabs left, selectors right */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <SegmentedTabs tabs={mainTabs} active={activeTab} onChange={setActiveTab} />
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <ModelSelector />
                                <HorizontalTabs tabs={timeTabs} active={timeTab} onChange={setTimeTab} />
                            </div>
                        </div>

                        {/* ③ Conditional Content based on activeTab */}
                        {activeTab === 'usage' ? (
                            <>
                                {/* Usage Metrics */}
                                <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                                    <MetricCard title="模型调用数" value="3" unit="个" />
                                    <MetricCard title="调用总数" value="6,500" unit="次" />
                                    <MetricCard title="调用Token总数" value="2,800,000" />
                                    <MetricCard title="输入Token" value="1,650,000" />
                                    <MetricCard title="输出Token" value="1,150,000" />
                                </div>

                                <CardPanel title="总调用趋势" style={{ height: '280px' }}>
                                    <TrendChart />
                                </CardPanel>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <CardPanel title="调用（成功）次数Top 5">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
                                            <DonutChart totalLabel="累计调用" totalValue="6500" data={top5CallData} />
                                            <PieLegend items={top5CallData} />
                                        </div>
                                    </CardPanel>
                                    <CardPanel title="调用Token量Top 5">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
                                            <DonutChart totalLabel="累计Token" totalValue="280w" data={top5TokenData} />
                                            <PieLegend items={top5TokenData} />
                                        </div>
                                    </CardPanel>
                                </div>

                                <CardPanel title="调用趋势">
                                    <UsageDataTable />
                                </CardPanel>

                                <CardPanel title="资源活跃记录" style={{ marginBottom: '32px' }}>
                                    <RecentActivityTable />
                                </CardPanel>

                            </>
                        ) : (
                            <>
                                {/* Observability Metrics */}
                                <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                                    {obsMetrics.map((m, idx) => (
                                        <MetricCard key={idx} {...m} />
                                    ))}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <CardPanel title="调用趋势" style={{ height: '280px' }}>
                                        <TrendChart />
                                    </CardPanel>
                                    <CardPanel title="耗时趋势" style={{ height: '280px' }}>
                                        <TrendChart />
                                    </CardPanel>
                                </div>

                                <CardPanel title="模型调用详情" style={{ marginBottom: '32px' }}>
                                    <ObservabilityTable />
                                </CardPanel>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
