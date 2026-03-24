import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import headerBgImage from '../images/header-background.png';
import StandardTable, { StandardActionButtons, StatusBadge } from '../components/common/StandardTable';
import Button from '../components/common/Button';

// Import Logos
// Import Logos (DataSet specialized)
import logoData from '../images/DataSetFolder.png';

/**
 * Dataset Management Page - 数据集管理
 */
function DatasetManager({ currentPage, onNavigate }) {
    const { getVar } = useTheme();

    const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';
    const bgSecondary = getVar('background/bg-secondary') || '#F9FAFB';
    const bgSlidebar = getVar('background/bg-slidebar') || '#F7F9FF';
    const textTitle = getVar('text/text-title') || '#181D27';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const borderNormal = getVar('border-normal') || '#D5D7DA';
    const borderWeak = getVar('border-weak') || '#F3F4F6';

    const metrics = [
        { title: '数据集总数', value: '8', unit: '个' },
        { title: '总数据条目', value: '12.5', unit: 'w' },
        { title: '存储占用', value: '45.2', unit: 'GB' },
        { title: '关联训练任务', value: '3', unit: '个' },
    ];

    const datasets = [
        { id: 1, name: 'DeepSeek-V3-SFT-Data', logo: logoData, type: '对话/SFT', count: '50,000', creator: 'Admin', status: '成功' },
        { id: 2, name: 'Qwen-7B-Pretrain-Dataset', logo: logoData, type: '预训练', count: '2,500,000', creator: 'Research_Team', status: '成功' },
        { id: 3, name: 'Kimi-Long-Context-Ref', logo: logoData, type: 'RAG/长文本', count: '12,000', creator: 'Product_Dev', status: '进行中' },
        { id: 4, name: 'Llama-3-8B-FineTune-Mix', logo: logoData, type: '指令微调', count: '85,000', creator: 'Admin', status: '成功' },
        { id: 5, name: 'ZhiPu-GLM4-Domain-Data', logo: logoData, type: '行业垂直', count: '320,000', creator: 'Partner_01', status: '失败' },
    ];

    const columns = [
        { 
            title: '数据集名称', 
            dataIndex: 'name', 
            style: { fontWeight: 500, color: textTitle } 
        },
        { title: '数据集类型', dataIndex: 'type' },
        { title: '数据条目数', dataIndex: 'count' },
        { title: '创建人', dataIndex: 'creator' },
        { title: '状态', dataIndex: 'status' },
        { title: '操作', dataIndex: 'actions', align: 'left' },
    ];

    const renderCell = (dataIndex, value, row) => {
        if (dataIndex === 'name') {
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src={row.logo} 
                      alt={value} 
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        objectFit: 'contain',
                        flexShrink: 0 
                      }} 
                    />
                    <span>{value}</span>
                </div>
            );
        }
        if (dataIndex === 'type') {
            return (
                <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    backgroundColor: '#F5F8FF', 
                    color: '#4D6AFF', 
                    fontSize: '12px',
                    fontWeight: 500
                }}>
                    {value}
                </span>
            );
        }
        if (dataIndex === 'status') {
            return <StatusBadge status={value} />;
        }
        if (dataIndex === 'actions') {
            return (
                <StandardActionButtons 
                    actions={[
                        { icon: 'ri-eye-line', title: '查看详情' },
                        { icon: 'ri-download-2-line', title: '下载源码' },
                        { icon: 'ri-delete-bin-line', title: '删除数据集' }
                    ]} 
                />
            );
        }
        return value;
    };

    const containerStyle = { display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', backgroundColor: bgSecondary, overflow: 'hidden', fontFamily: "'PingFang SC', sans-serif" };
    const mainBodyStyle = { display: 'flex', flex: 1, overflow: 'hidden' };
    const contentAreaStyle = { flex: 1, overflow: 'auto', backgroundColor: bgSlidebar, position: 'relative' };
    const headerBgStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '240px', backgroundImage: `url(${headerBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center top', zIndex: 0, WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' };
    const innerContentStyle = { position: 'relative', zIndex: 1, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '20px' };
    const textAccent = getVar('text/text-accent') || '#4D6AFF';

    return (
        <div style={containerStyle}>
            <Header />
            <div style={mainBodyStyle}>
                <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
                <main style={contentAreaStyle}>
                    <div style={headerBgStyle} />
                    <div style={innerContentStyle}>
                        {/* Title & Action */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <h1 style={{ fontSize: '24px', fontWeight: 600, color: textTitle, margin: 0 }}>数据集管理</h1>
                                <p style={{ fontSize: '14px', color: textSecondary, margin: 0 }}>统一管理模型训练、评估及推理所需的各类型数据集。</p>
                            </div>
                            <Button variant="primary" icon="ri-add-line">创建数据集</Button>
                        </div>

                        {/* Metrics Area */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                            {metrics.map((m, idx) => (
                                <div key={idx} style={{ 
                                    padding: '16px', 
                                    backgroundColor: 'white', 
                                    borderRadius: '12px', 
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderColor: borderNormal,
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '8px',
                                    height: 'auto'
                                }}>
                                    <span style={{ fontSize: '14px', color: textSecondary }}>{m.title}</span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                        <span style={{ fontSize: '28px', fontWeight: 600, color: textTitle }}>{m.value}</span>
                                        <span style={{ fontSize: '14px', color: textSecondary }}>{m.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Table Card */}
                        <div style={{ 
                            backgroundColor: 'white', 
                            borderRadius: '12px', 
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: borderNormal,
                            padding: '0', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            overflow: 'hidden'
                        }}>
                            <div style={{ 
                                padding: '16px 20px', 
                                borderBottom: `1px solid ${borderWeak}`, 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center' 
                            }}>
                                <span style={{ fontSize: '16px', fontWeight: 600, color: textTitle }}>数据集列表</span>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '8px', 
                                        padding: '0 12px', 
                                        height: '36px', 
                                        borderRadius: '8px', 
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderColor: borderNormal,
                                        width: '240px' 
                                    }}>
                                        <i className="ri-search-line" style={{ color: textSecondary }}></i>
                                        <input type="text" placeholder="搜索数据集名称..." style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }} />
                                    </div>
                                </div>
                            </div>
                            
                            <StandardTable 
                                columns={columns} 
                                dataSource={datasets} 
                                renderCell={renderCell} 
                            />

                            {/* Pagination footer (Standardized to ModelService) */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px 20px',
                                borderTop: `1px solid ${borderWeak}`,
                                color: textSecondary,
                                fontSize: '14px'
                            }}>
                                <div>显示 1 到 5，共 5 条记录</div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <button style={{ border: `1px solid ${borderNormal}`, background: 'white', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        <i className="ri-arrow-left-s-line"></i>
                                    </button>
                                    <button style={{ border: `1px solid ${textAccent}`, background: '#F5F8FF', color: textAccent, borderRadius: '6px', width: '32px', height: '32px', fontWeight: 600, cursor: 'pointer' }}>1</button>
                                    <button style={{ border: `1px solid ${borderNormal}`, background: 'white', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        <i className="ri-arrow-right-s-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DatasetManager;
