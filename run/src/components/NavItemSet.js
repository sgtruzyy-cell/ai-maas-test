import React, { useState } from 'react';
import { getVariableByName } from '../figma-variables-resolver';
import { useTheme } from './ThemeContext';

const NavItemSet = () => {
  const { mode } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  const containerStyle = {
    boxSizing: 'border-box',
    position: 'relative',
    width: '216px',
    height: '429px',
    left: '100px',
    top: '100px',
    background: getVariableByName('background/bg-primary', { '_Primitives': mode }) || '#FFFFFF',
    border: '1px dashed #9747FF',
    borderRadius: '5px',
  };

  const openContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px',
    gap: '4px',
    position: 'absolute',
    width: '176px',
    height: '316px',
    left: '20px',
    top: '20px',
    borderRadius: '4px',
  };

  const closedContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 8px',
    gap: '8px',
    position: 'absolute',
    width: '176px',
    height: '36px',
    left: '20px',
    top: '363px',
    borderRadius: '4px',
  };

  const navItems = [
    {
      id: 1,
      text: '模型广场',
      icon: 'presentation-chart-01',
      isActive: true,
      textColor: '#4D6AFF',
      iconColor: '#4D6AFF',
      background: '#EBF1FF',
    },
    {
      id: 2,
      text: '模型管理',
      icon: 'package',
      isActive: false,
      textColor: '#414651',
      iconColor: '#384250',
    },
    {
      id: 3,
      text: '收藏夹',
      icon: 'stars-02',
      isActive: false,
      textColor: '#384250',
      iconColor: '#384250',
    },
    {
      id: 4,
      text: '数据源',
      icon: 'data',
      isActive: false,
      textColor: '#384250',
      iconColor: '#384250',
    },
    {
      id: 5,
      text: '工作流',
      icon: 'dataflow-04',
      isActive: false,
      textColor: '#384250',
      iconColor: '#384250',
    },
    {
      id: 6,
      text: '应用',
      icon: 'layers-three-01',
      isActive: false,
      textColor: '#384250',
      iconColor: '#384250',
    },
    {
      id: 7,
      text: '安全',
      icon: 'shield-zap',
      isActive: false,
      textColor: '#384250',
      iconColor: '#384250',
    },
  ];

  return (
    <div style={containerStyle}>
      {isOpen ? (
        <div style={openContainerStyle}>
          {navItems.map((item) => (
            <NavItem key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div style={closedContainerStyle}>
          <span style={{
            width: '48px',
            height: '20px',
            fontFamily: "'PingFang SC'",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '20px',
            color: '#6C737F',
          }}>
            导航
          </span>
          <div style={{
            width: '12px',
            height: '12px',
            position: 'relative',
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#6C737F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        Toggle {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
};

const NavItem = ({ text, icon, isActive, textColor, iconColor, background }) => {
  const itemStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0px 8px',
    gap: '8px',
    width: '176px',
    height: '36px',
    background: background || 'transparent',
    borderRadius: '8px',
  };

  const iconContainerStyle = {
    width: '14px',
    height: '14px',
    position: 'relative',
  };

  const textStyle = {
    width: text === '模型广场' ? '28px' : '56px',
    height: '22px',
    fontFamily: "'PingFang SC'",
    fontStyle: 'normal',
    fontWeight: text === '模型广场' ? 500 : 400,
    fontSize: '14px',
    lineHeight: '22px',
    color: textColor,
  };

  return (
    <div style={itemStyle}>
      <div style={iconContainerStyle}>
        <Icon name={icon} color={iconColor} />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        gap: '10px',
        width: text === '模型广场' ? '28px' : '56px',
        height: '22px',
      }}>
        <span style={textStyle}>{text}</span>
      </div>
    </div>
  );
};

const Icon = ({ name, color }) => {
  const icons = {
    'presentation-chart-01': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1.75 9.625L4.375 7L7 9.625L9.625 7L12.25 9.625" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.75 4.375L4.375 1.75L7 4.375L9.625 1.75L12.25 4.375" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'package': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1.75 4.375L7 1.75L12.25 4.375V9.625L7 12.25L1.75 9.625V4.375Z" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 12.25V7" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.75 4.375L7 7L12.25 4.375" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'stars-02': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.75L8.75 5.25L12.25 7L8.75 8.75L7 12.25L5.25 8.75L1.75 7L5.25 5.25L7 1.75Z" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'data': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1.75" y="1.75" width="10.5" height="10.5" rx="2" stroke={color} strokeWidth="1"/>
        <path d="M4.375 4.375H9.625" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <path d="M4.375 7H9.625" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <path d="M4.375 9.625H7" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    'dataflow-04': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.25" stroke={color} strokeWidth="1"/>
        <circle cx="7" cy="7" r="2.625" stroke={color} strokeWidth="1"/>
      </svg>
    ),
    'layers-three-01': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1.75 4.375L7 7L12.25 4.375" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.75 7L7 9.625L12.25 7" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.75 9.625L7 12.25L12.25 9.625" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'shield-zap': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.75L10.5 3.5C11.0523 3.5 11.5 3.94772 11.5 4.5V7.5C11.5 9.5 9.5 11.5 7 12.25C4.5 11.5 2.5 9.5 2.5 7.5V4.5C2.5 3.94772 2.94772 3.5 3.5 3.5L7 1.75Z" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.25 7L7 5.25L8.75 7L7 8.75L5.25 7Z" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };

  return icons[name] || null;
};

export default NavItemSet;