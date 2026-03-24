import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/common/Button';
import headerBgImage from '../images/header-background.png';
import ModelPhotoQwen from '../images/ModelPhoto_Qwen.png';
import ModelPhotoDeepSeek from '../images/ModelPhoto_DeepSeek.png';
import ModelPhotoLlama from '../images/ModelPhoto_Llama.png';

/**
 * Experience Center page - 体验中心
 */
function ExperienceCenter({ currentPage, onNavigate }) {
    const { getVar } = useTheme();
    const [selectedService, setSelectedService] = useState(1);

    const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';
    const bgSecondary = getVar('background/bg-secondary') || '#F9FAFB';
    const bgSlidebar = getVar('background/bg-slidebar') || '#F7F9FF';
    const textTitle = getVar('text/text-title') || '#181D27';
    const textPrimary = getVar('text/text-primary') || '#414651';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const borderNormal = getVar('border/border-normal') || '#D5D7DA';
    const borderAccent = getVar('border/border-accent') || '#4D6AFF';
    const accentBg = getVar('accent/1') || '#EBF1FF';
    const textAccent = getVar('text/text-accent') || '#4D6AFF';

    const font = "'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    const services = [
        {
            id: 1,
            name: '通义千问-Max',
            desc: '极致体验，理解能力超群。适用于复杂业务场景的逻辑推理与内容创作。',
            tags: ['旗舰', '多模态', '超长上下文'],
            image: ModelPhotoQwen
        },
        {
            id: 2,
            name: 'Deepseek-V3',
            desc: '高性价比，极致推理。在代码生成、数学逻辑等垂直领域表现卓越。',
            tags: ['高性能', '开源', '高吞吐'],
            image: ModelPhotoDeepSeek
        },
        {
            id: 3,
            name: 'Llama-3-70B',
            desc: '生态最广，由于开源生态支持，模型微调与私有化部署非常友好。',
            tags: ['国际共识', '高性能', '低延迟'],
            image: ModelPhotoLlama
        }
    ];

    // Styles
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        backgroundColor: bgSecondary,
        fontFamily: font,
        overflow: 'hidden',
    };

    const bodyStyle = {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        overflow: 'hidden',
    };

    const contentAreaStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'auto',
        backgroundColor: bgSlidebar,
        position: 'relative',
    };

    const headerBgStyle = {
        width: '100%',
        height: '240px',
        backgroundImage: `url(${headerBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
    };

    const contentInnerStyle = {
        position: 'relative',
        zIndex: 1,
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    };

    const titleAreaStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    };

    const pageTitleStyle = {
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: 600,
        color: textTitle,
        margin: 0,
    };

    const pageDescStyle = {
        fontSize: '14px',
        lineHeight: '22px',
        color: textSecondary,
        margin: 0,
    };

    const heroContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 48px 80px',
        gap: '44px',
    };

    const heroTitleStyle = {
        fontSize: '36px',
        lineHeight: '48px',
        fontWeight: 700,
        background: 'linear-gradient(to right, #181D27 0%, #3D2291 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        margin: '0 0 10px 0',
        letterSpacing: '-0.02em',
    };

    const cardGroupStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        width: '100%',
        maxWidth: '1100px',
    };

    const cardStyle = (id, isHover) => ({
        backgroundColor: bgPrimary,
        borderRadius: '16px',
        border: `1px solid ${selectedService === id || isHover ? borderAccent : borderNormal}`,
        background: selectedService === id ? 'linear-gradient(to bottom left, #EDF0FF, #FFFFFF)' : bgPrimary,
        padding: '28px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        transform: selectedService === id ? 'translateY(-4px)' : (isHover ? 'translateY(-2px)' : 'none'),
        boxShadow: selectedService === id
            ? '0 12px 32px -12px rgba(77, 106, 255, 0.25)'
            : (isHover ? '0 8px 16px -8px rgba(0,0,0,0.08)' : 'none'),
    });

    const buttonGroupStyle = {
        display: 'flex',
        gap: '16px',
        marginTop: '20px',
    };

    const footerDisclaimerStyle = {
        marginTop: '60px',
        color: '#9DA4AE',
        fontSize: '12px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        opacity: 0.8,
    };

    return (
        <div style={pageStyle}>
            <Header />
            <div style={bodyStyle}>
                <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
                <main style={contentAreaStyle}>
                    <div style={headerBgStyle} />
                    <div style={contentInnerStyle}>
                        {/* Page Header (Standard) */}
                        <div style={titleAreaStyle}>
                            <h2 style={pageTitleStyle}>体验中心</h2>
                            <p style={pageDescStyle}>立即体验最新、最前沿的 AI 模型服务，探索无限可能。</p>
                        </div>

                        {/* Hero Section */}
                        <div style={heroContainerStyle}>
                            <h1 style={heroTitleStyle}>选择模型服务 立即开启体验</h1>

                            <div style={cardGroupStyle}>
                                {services.map((item) => (
                                    <ServiceCard
                                        key={item.id}
                                        item={item}
                                        isSelected={selectedService === item.id}
                                        onClick={() => setSelectedService(item.id)}
                                        cardStyle={cardStyle}
                                        accentBg={accentBg}
                                        textAccent={textAccent}
                                        textTitle={textTitle}
                                        textSecondary={textSecondary}
                                        borderAccent={borderAccent}
                                        borderNormal={borderNormal}
                                        bgSecondary={bgSecondary}
                                    />
                                ))}
                            </div>

                            <div style={buttonGroupStyle}>
                                <Button
                                    variant="primary"
                                    size="large"
                                    style={{ padding: '0 40px', height: '48px', borderRadius: '8px' }}
                                >
                                    立即开始体验
                                    <i className="ri-arrow-right-line" style={{ marginLeft: '4px' }} />
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="large"
                                    style={{ padding: '0 40px', height: '48px', borderRadius: '8px' }}
                                >
                                    选择更多服务
                                </Button>
                            </div>

                            <div style={footerDisclaimerStyle}>
                                <p>内容由 AI 生成、不代表平台立场，以及相关的费用参考。</p>
                                <p style={{ opacity: 0.7 }}>付费模式参考：按 Token 计费 0.01 元 / 1k Tokens 或 订阅包月 199 元起</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function ServiceCard({ item, isSelected, onClick, cardStyle, accentBg, textAccent, textTitle, textSecondary, borderAccent, borderNormal, bgSecondary }) {
    const [isHover, setIsHover] = React.useState(false);

    return (
        <div
            style={cardStyle(item.id, isHover)}
            onClick={onClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'transparent', // Using image instead of icon bg
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                overflow: 'hidden'
            }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: textTitle }}>{item.name}</h3>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '22px', color: textSecondary }}>{item.desc}</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {item.tags.map((tag, i) => (
                    <span key={i} style={{
                        fontSize: '12px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: bgSecondary,
                        color: textSecondary,
                        border: `0.5px solid ${borderNormal}`,
                    }}>{tag}</span>
                ))}
            </div>
        </div>
    );
}

export default ExperienceCenter;
