import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import headerBgImage from '../images/header-background.png';
import StandardTable, { StandardActionButtons, StatusBadge } from '../components/common/StandardTable';

/**
 * Model Service page - 模型服务
 */
function ModelService({ currentPage, onNavigate }) {
    const { getVar } = useTheme();
    const [searchValue, setSearchValue] = useState('');

    const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';
    const bgSecondary = getVar('background/bg-secondary') || '#F9FAFB';
    const bgSlidebar = getVar('background/bg-slidebar') || '#F7F9FF';
    const textTitle = getVar('text/text-title') || '#181D27';
    const textPrimary = getVar('text/text-primary') || '#414651';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const borderNormal = getVar('border/border-normal') || '#D5D7DA';
    const borderWeak = getVar('border/border-weak') || '#F3F4F6';
    const textAccent = getVar('text/text-accent') || '#4D6AFF';

    const services = [
        { id: 1, name: 'Qwen-Max-Service-01', model: '通义千问-Max', status: '运行中', unit: 'GPU-Cluster-A', addr: 'https://api.maas.com/v1/qwen-max', date: '2025-03-10' },
        { id: 2, name: 'Deepseek-V3-API', model: 'Deepseek-V3', status: '运行中', unit: 'GPU-Cluster-B', addr: 'https://api.maas.com/v1/deepseek-v3', date: '2025-03-12' },
        { id: 3, name: 'Llama-3-Lab-Test', model: 'Llama-3-70B', status: '已停止', unit: 'Private-Cloud', addr: 'https://internal.maas.com/llama3', date: '2025-03-15' },
        { id: 4, name: 'Mistral-Large-Prod', model: 'Mistral-Large', status: '运行中', unit: 'GPU-Cluster-A', addr: 'https://api.maas.com/v1/mistral', date: '2025-03-18' },
    ];

    const columns = [
        { title: '服务名称', dataIndex: 'name', style: { fontWeight: 500, color: textTitle } },
        { title: '关联模型', dataIndex: 'model' },
        { title: '运行状态', dataIndex: 'status' },
        { title: '部署单元', dataIndex: 'unit' },
        { title: '接口地址', dataIndex: 'addr', style: { color: textSecondary, fontSize: '13px' } },
        { title: '创建时间', dataIndex: 'date', style: { color: textSecondary } },
        { title: '操作', dataIndex: 'actions', align: 'center' },
    ];

    const renderCell = (dataIndex, value, row) => {
        if (dataIndex === 'status') {
            return <StatusBadge status={value} />;
        }
        if (dataIndex === 'actions') {
            return (
                <StandardActionButtons 
                    actions={[
                        { icon: 'ri-eye-line', title: '查看详情' },
                        { icon: 'ri-link', title: '接入服务' },
                        { icon: 'ri-delete-bin-line', title: '删除服务' }
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
    const tableCardStyle = { backgroundColor: bgPrimary, borderRadius: '12px', border: `1px solid ${borderNormal}`, overflow: 'hidden', display: 'flex', flexDirection: 'column' };
    const tableHeaderRowStyle = { padding: '16px 20px', borderBottom: `1px solid ${borderWeak}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
    const searchBoxStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px', height: '36px', borderRadius: '8px', border: `1px solid ${borderNormal}`, backgroundColor: bgPrimary, width: '300px' };

    return (
        <div style={pageStyle}>
            <Header />
            <div style={bodyStyle}>
                <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
                <main style={contentAreaStyle}>
                    <div style={headerBgStyle} />
                    <div style={contentInnerStyle}>
                        <div style={titleAreaStyle}>
                            <h1 style={pageTitleStyle}>模型服务</h1>
                            <p style={pageDescStyle}>管理和调度已部署的模型服务，支撑下游应用快速平稳接入。</p>
                        </div>
                        <div style={tableCardStyle}>
                            <div style={tableHeaderRowStyle}>
                                <span style={{ fontSize: '16px', fontWeight: 600, color: textTitle }}>模型服务列表</span>
                                <div style={searchBoxStyle}>
                                    <i className="ri-search-line" style={{ color: textSecondary, fontSize: '16px' }}></i>
                                    <input type="text" placeholder="搜索服务名称或项目..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '14px', color: textPrimary }} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                </div>
                            </div>
                            
                            <StandardTable 
                                columns={columns} 
                                dataSource={services} 
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
        </div>
    );
}

export default ModelService;
