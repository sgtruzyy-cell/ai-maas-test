import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import FilterPanel from './FilterPanel';
import ModelCard from './ModelCard';
import Icon from './Icon';
import headerBgImage from '../images/header-background.png';

/**
 * ModelSquare page - 模型广场
 * Main page layout matching the Figma design with header, sidebar, content area.
 */
function ModelSquare({ currentPage, onNavigate }) {
  const { getVar } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState(['文本生成', '通义千问']);
  const [selectedCardId, setSelectedCardId] = useState(null); // No card is selected by default

  // Resolve Figma variables
  const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';
  const bgSecondary = getVar('background/bg-secondary') || '#F9FAFB';
  const bgPrimaryAlt = getVar('background/bg-slidebar') || '#F7F9FF';
  const textTitle = getVar('text/text-title') || '#181D27';
  const textPrimary = getVar('text/text-primary') || '#414651';
  const textSecondary = getVar('text/text-secondary') || '#6C737F';
  const textPlaceholder = getVar('text/text-placeholder') || '#A4A7AE';
  const borderNormal = getVar('border/border-normal') || '#D5D7DA';
  const borderWeak = getVar('border/border-weak') || '#E9EAEB';

  const font = "'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  // Mock model data
  const models = Array(9).fill(null).map((_, index) => ({
    id: index,
    name: '通义千问Max',
    provider: 'qwen-max',
    tags: ['旗舰', '高性能'],
    description: '通义千问系列最新旗舰模型。具备卓越的理解、生成和推理能力，适用于复杂任务的处理。',
    modelSource: '通义千问',
    size: '32K',
    versions: 3,
  }));

  const handleCardSelect = (cardId) => {
    setSelectedCardId(prev => prev === cardId ? null : cardId);
  };

  const removeFilter = (filter) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const resetFilters = () => {
    setActiveFilters([]);
  };

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
    backgroundColor: bgPrimaryAlt,
    position: 'relative',
  };

  // Header background - using Header background.png
  const headerBgStyle = {
    width: '100%',
    height: '140px',
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
    gap: '20px',
    display: 'flex',
    flexDirection: 'column',
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
    margin: '4px 0 0 0',
  };

  const filterBarStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: `1px solid ${borderWeak}`,
  };

  const filterLabelStyle = {
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 500,
    color: textTitle,
    flexShrink: 0,
  };

  const modelCountStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '6px',
    padding: '0 12px',
    borderLeft: `1px solid ${borderWeak}`,
    flexShrink: 0,
  };

  const activeFilterTagStyle = {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '6px',
    border: `1px solid ${borderNormal}`,
    backgroundColor: bgPrimary,
    fontSize: '13px',
    lineHeight: '20px',
    color: textPrimary,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  };

  const resetButtonStyle = {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    lineHeight: '20px',
    color: textSecondary,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: '4px 0',
    fontFamily: font,
  };

  const searchContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '8px',
    border: `1px solid ${borderNormal}`,
    backgroundColor: bgPrimary,
    marginLeft: 'auto',
    width: '240px',
    boxSizing: 'border-box',
  };

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    flex: 1,
    fontSize: '13px',
    lineHeight: '20px',
    color: textPrimary,
    backgroundColor: 'transparent',
    fontFamily: font,
  };

  const mainContentStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '24px',
    flex: 1,
  };

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    flex: 1,
    alignContent: 'start',
  };

  return (
    <div style={pageStyle}>
      {/* Top Header */}
      <Header />

      <div style={bodyStyle}>
        {/* Sidebar Navigation */}
        <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

        {/* Main Content */}
        <div style={contentAreaStyle}>
          {/* Header background 1 - Banner banner */}
          <div style={{ ...headerBgStyle, height: '140px' }} />

          {/* Content with z-index above banner */}
          <div style={contentInnerStyle}>
            {/* Page Title */}
            <div>
              <h1 style={pageTitleStyle}>模型广场</h1>
              <p style={pageDescStyle}>浏览和发现各类AI模型，支持快速部署和体验。</p>
            </div>

            {/* Main Content Area with filter panel + right content */}
            <div style={mainContentStyle}>
              {/* Left Filter Panel Container */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '168px', minWidth: '168px' }}>
                <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
                  <span style={filterLabelStyle}>模型筛选</span>
                </div>
                <FilterPanel />
              </div>

              {/* Right Content Container */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '16px' }}>
                {/* Top Bar for Tags and Search */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', height: '36px' }}>
                  <div style={{ ...modelCountStyle, borderLeft: 'none', paddingLeft: 0 }}>
                    <span style={{ fontSize: '14px', color: textTitle, fontWeight: 500 }}>模型</span>
                    <span style={{ fontSize: '14px', color: textTitle, fontWeight: 600 }}>35</span>
                  </div>

                  {/* Active filter tags */}
                  {activeFilters.map((filter) => (
                    <div
                      key={filter}
                      style={activeFilterTagStyle}
                      onClick={() => removeFilter(filter)}
                    >
                      <span>{filter}</span>
                      <Icon name="close" size={12} color={textSecondary} />
                    </div>
                  ))}

                  {/* Reset button */}
                  {activeFilters.length > 0 && (
                    <button style={resetButtonStyle} onClick={resetFilters}>
                      <Icon name="refresh" size={14} color={textSecondary} />
                      <span>重置</span>
                    </button>
                  )}

                  {/* Search */}
                  <div style={searchContainerStyle}>
                    <Icon name="search" size={16} color={textPlaceholder} />
                    <input
                      style={searchInputStyle}
                      placeholder="请输入模型名称"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </div>

                {/* Model Card Grid */}
                <div style={cardGridStyle}>
                  {models.map((model) => (
                    <ModelCard
                      key={model.id}
                      name={model.name}
                      provider={model.provider}
                      tags={model.tags}
                      description={model.description}
                      modelSource={model.modelSource}
                      size={model.size}
                      versions={model.versions}
                      isSelected={selectedCardId === model.id}
                      onSelect={() => handleCardSelect(model.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelSquare;