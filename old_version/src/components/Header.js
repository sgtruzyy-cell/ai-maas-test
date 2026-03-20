import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import Icon from './Icon';
import LogoSystem from '../images/LogoSystem.svg';

/**
 * Top header/navigation bar matching Figma design.
 * Contains logo, menu tabs, and user profile area.
 */
function Header() {
    const { getVar } = useTheme();
    const [activeTab, setActiveTab] = useState(0);

    const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';
    const textTitle = getVar('text/text-title') || '#181D27';
    const textPrimary = getVar('text/text-primary') || '#414651';
    const textSecondary = getVar('text/text-secondary') || '#6C737F';
    const brandColor = getVar('background/bg-brand') || '#4D6AFF';

    const tabs = ['菜单名称', '菜单名称', '菜单名称', '菜单名称', '菜单名称'];

    const headerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '56px',
        padding: '0 24px',
        backgroundColor: bgPrimary,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
        fontFamily: "'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        flexShrink: 0,
    };

    const logoAreaStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '8px',
        marginRight: '32px',
        flexShrink: 0,
    };

    const logoTextStyle = {
        fontSize: '18px',
        fontWeight: 700,
        color: textTitle,
        letterSpacing: '0.5px',
    };

    const tabContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0',
        flex: 1,
        height: '100%',
    };

    const tabStyle = (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
        height: '100%',
        fontSize: '14px',
        lineHeight: '22px',
        fontWeight: isActive ? 500 : 400,
        color: isActive ? brandColor : textSecondary,
        borderBottom: isActive ? `2px solid ${brandColor}` : '2px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
    });

    const userAreaStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '8px',
        marginLeft: 'auto',
        flexShrink: 0,
        cursor: 'pointer',
    };

    const userNameStyle = {
        fontSize: '14px',
        lineHeight: '22px',
        color: textPrimary,
        fontWeight: 400,
    };

    return (
        <header style={headerStyle}>
            {/* Logo */}
            <div style={logoAreaStyle}>
                <img src={LogoSystem} alt="Logo" style={{ width: '180px', height: '32px' }} />
            </div>

            {/* Tabs */}
            <div style={tabContainerStyle}>
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        style={tabStyle(index === activeTab)}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* User profile */}
            <div style={userAreaStyle}>
                <span style={userNameStyle}>MaaS Admin</span>
                <Icon name="chevron-down" size={16} color={textSecondary} />
            </div>
        </header>
    );
}

export default Header;
