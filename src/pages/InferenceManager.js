import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/common/Button';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import headerBgImage from '../images/header-background.png';
import StandardTable, { StandardActionButtons, StatusBadge } from '../components/common/StandardTable';

// ─── Mock Data ─────────────────────────────────────────────────────────────
const mockInferenceTasks = [
    {
        id: 1,
        name: 'Qwen-7B-Chat-Inference',
        model: '通义千问-7B',
        status: '运行中',
        resources: '1 * A100',
        createdAt: '2025-03-20 10:00:00'
    },
    {
        id: 2,
        name: 'DeepSeek-V3-Production',
        model: 'DeepSeek-V3',
        status: '运行中',
        resources: '4 * A100',
        createdAt: '2025-03-21 14:30:00'
    },
    {
        id: 3,
        name: 'Llama-3-Lab-Test',
        model: 'Llama-3-70B',
        status: '已停止',
        resources: '2 * A100',
        createdAt: '2025-03-22 09:15:00'
    },
    {
        id: 4,
        name: 'Mistral-Large-API',
        model: 'Mistral-Large',
        status: '错误',
        resources: '1 * A100',
        createdAt: '2025-03-23 11:20:00'
    }
];

// ─── Modal Component ─────────────────────────────────────────────────────────
const CreateTaskModal = ({ isOpen, onClose }) => {
    const { getVar } = useTheme();
    if (!isOpen) return null;

    const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';
    const borderNormal = getVar('border/border-normal') || '#D5D7DA';
    const textTitle = getVar('text/text-title') || '#181D27';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const textPrimary = getVar('text/text-primary') || '#414651';

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{
                width: '480px',
                backgroundColor: bgPrimary,
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: textTitle, margin: 0 }}>新建推理任务</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '20px', color: textSecondary }}><i className="ri-close-line"></i></button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 500, color: textPrimary }}>任务名称</label>
                        <input 
                            type="text" 
                            placeholder="请输入任务名称" 
                            style={{
                                height: '36px',
                                padding: '0 12px',
                                borderRadius: '8px',
                                border: `1px solid ${borderNormal}`,
                                fontSize: '14px',
                                outline: 'none'
                            }} 
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 500, color: textPrimary }}>选择模型</label>
                        <select 
                            style={{
                                height: '36px',
                                padding: '0 12px',
                                borderRadius: '8px',
                                border: `1px solid ${borderNormal}`,
                                fontSize: '14px',
                                outline: 'none',
                                backgroundColor: bgPrimary,
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">请选择模型</option>
                            <option value="qwen-7b">通义千问-7B</option>
                            <option value="deepseek-v3">DeepSeek-V3</option>
                            <option value="llama-3">Llama-3-70B</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 500, color: textPrimary }}>显存分配 (GB)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input 
                                type="range" 
                                min="1" 
                                max="80" 
                                defaultValue="24"
                                style={{ flex: 1, accentColor: getVar('background/bg-brand') || '#4D6AFF' }} 
                            />
                            <span style={{ fontSize: '14px', color: textSecondary, minWidth: '32px' }}>24GB</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                    <Button variant="secondary" onClick={onClose}>取消</Button>
                    <Button variant="primary" onClick={onClose}>确定创建</Button>
                </div>
            </div>
        </div>
    );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const InferenceManager = ({ currentPage, onNavigate }) => {
    const { getVar } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // Resolve Main Theme Tokens
    const bgSlidebar = getVar('background/bg-slidebar') || '#F7F9FF';
    const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';
    const bgSecondary = getVar('background/bg-secondary') || '#F9FAFB';
    const textTitle = getVar('text/text-title') || '#181D27';
    const textPrimary = getVar('text/text-primary') || '#414651';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const borderNormal = getVar('border/border-normal') || '#D5D7DA';
    const borderWeak = getVar('border/border-weak') || '#F3F4F6';
    const textAccent = getVar('text/text-accent') || '#4D6AFF';

    const columns = [
        { title: '任务名称', dataIndex: 'name', style: { fontWeight: 600, color: textTitle } },
        { title: '关联模型', dataIndex: 'model' },
        { title: '状态', dataIndex: 'status' },
        { title: '算力资源', dataIndex: 'resources' },
        { title: '创建时间', dataIndex: 'createdAt', style: { color: textSecondary } },
        { title: '操作', dataIndex: 'actions', align: 'left' }, // Action buttons left aligned
    ];

    const renderCell = (dataIndex, value, row) => {
        if (dataIndex === 'model') {
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="ri-box-3-line" style={{ color: getVar('background/bg-brand') || '#4D6AFF' }}></i>
                    <span style={{ fontSize: '14px', color: textPrimary }}>{value}</span>
                </div>
            );
        }
        if (dataIndex === 'status') {
            return <StatusBadge status={value} />;
        }
        if (dataIndex === 'actions') {
            return (
                <StandardActionButtons 
                    actions={[
                        { icon: 'ri-edit-line', title: '编辑' },
                        { icon: 'ri-file-list-line', title: '详情' },
                        { icon: 'ri-stop-circle-line', title: '停止服务' }
                    ]} 
                />
            );
        }
        return value;
    };

    const pageStyle = { display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', backgroundColor: bgSecondary, fontFamily: "'PingFang SC', sans-serif", overflow: 'hidden' };
    const bodyStyle = { display: 'flex', flexDirection: 'row', flex: 1, overflow: 'hidden' };
    const contentAreaStyle = { display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto', backgroundColor: bgSlidebar, position: 'relative' };
    const headerBgStyle = { width: '100%', height: '240px', backgroundImage: `url(${headerBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', position: 'absolute', top: 0, left: 0, zIndex: 0, WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' };
    const contentInnerStyle = { position: 'relative', zIndex: 1, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' };
    const titleAreaStyle = { display: 'flex', flexDirection: 'column', gap: '4px' };
    const pageTitleStyle = { fontSize: '24px', lineHeight: '32px', fontWeight: 600, color: textTitle, margin: 0 };
    const pageDescStyle = { fontSize: '14px', lineHeight: '22px', color: textSecondary, margin: 0 };
    
    // Updated Card Style with user requirements (removed shadow)
    const tableCardStyle = { 
        backgroundColor: bgPrimary, 
        borderRadius: '12px', 
        border: `1px solid ${borderNormal}`, 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column'
    };
    
    const tableHeaderRowStyle = { padding: '16px 20px', borderBottom: `1px solid ${borderWeak}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
    const searchBoxStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px', height: '36px', borderRadius: '8px', border: `1px solid ${borderNormal}`, backgroundColor: bgPrimary, width: '280px' };

    return (
        <div style={pageStyle}>
            <Header />
            <div style={bodyStyle}>
                <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
                <main style={contentAreaStyle}>
                    <div style={headerBgStyle} />
                    <div style={contentInnerStyle}>
                        <div style={titleAreaStyle}>
                            <h1 style={pageTitleStyle}>推理服务管理</h1>
                            <p style={pageDescStyle}>管理大模型推理任务，实时监控资源分配与运行状态。</p>
                        </div>

                        <div style={tableCardStyle}>
                            {/* Table Header Row */}
                            <div style={tableHeaderRowStyle}>
                                <span style={{ fontSize: '16px', fontWeight: 700, color: textTitle }}>推理任务列表</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={searchBoxStyle}>
                                        <i className="ri-search-line" style={{ color: textSecondary, fontSize: '16px' }}></i>
                                        <input 
                                            type="text" 
                                            placeholder="搜索任务名称..." 
                                            style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '14px', color: textPrimary }} 
                                            value={searchValue} 
                                            onChange={(e) => setSearchValue(e.target.value)} 
                                        />
                                    </div>
                                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                                        <i className="ri-add-line"></i> 新建推理任务
                                    </Button>
                                </div>
                            </div>
                            
                            <StandardTable 
                                columns={columns} 
                                dataSource={mockInferenceTasks} 
                                renderCell={renderCell} 
                            />

                            {/* Pagination */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px 20px',
                                borderTop: `1px solid ${borderWeak}`,
                                color: textSecondary,
                                fontSize: '14px'
                            }}>
                                <div>显示 1 到 4，共 4 条记录</div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <button style={{ border: `1px solid ${borderNormal}`, background: 'white', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <i className="ri-arrow-left-s-line"></i>
                                    </button>
                                    <button style={{ border: `1px solid ${textAccent}`, background: '#F5F8FF', color: textAccent, borderRadius: '6px', width: '32px', height: '32px', fontWeight: 600, cursor: 'pointer' }}>1</button>
                                    <button style={{ border: `1px solid ${borderNormal}`, background: 'white', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <i className="ri-arrow-right-s-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default InferenceManager;
