import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import FilterPanel from '../components/common/FilterPanel';
import ModelCard from '../components/cards/ModelCard';
import Icon from '../components/common/Icon';
import headerBgImage from '../images/header-background.png';
import ModelPhotoQwen from '../images/ModelPhoto_Qwen.png';
import ModelPhotoDeepSeek from '../images/ModelPhoto_DeepSeek.png';
import ModelPhotoLlama from '../images/ModelPhoto_Llama.png';
import ModelPhotoKimi from '../images/ModelPhoto_Kimi.png';
import ModelPhotoZhiPu from '../images/ModelPhoto_ZhiPu.png';

/**
 * ModelSquare page - 模型广场
 * Main page layout matching the Figma design with header, sidebar, content area.
 */
function ModelSquare({ currentPage, onNavigate }) {
  const { getVar } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Define full lists for groups to enable AND logic filtering
  const categoryList = ['文本生成', '图像生成', '视频生成', '语音生成', '向量模型', '多模态'];
  const providerDisplayMap = {
    '通义千问': 'qwen',
    'DeepSeek': 'deepseek',
    '百度文心一言': 'baidu',
    '智谱GLM': 'zhipuai',
    'Llama': 'meta',
    'Moonshot': 'moonshot'
  };
  const providerList = Object.keys(providerDisplayMap);

  // Resolve Figma variables
  const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';
  const bgSecondary = getVar('background/bg-secondary') || '#F9FAFB';
  const bgPrimaryAlt = getVar('background/bg-slidebar') || '#F7F9FF';
  const textTitle = getVar('text/text-title') || '#181D27';
  const textPrimary = getVar('text/text-primary') || '#414651';
  const textSecondary = getVar('text/text-secondary') || '#6C737F';
  const textPlaceholder = getVar('text/text-placeholder') || '#A4A7AE';
  const borderNormal = getVar('border-normal') || '#D5D7DA';
  const borderWeak = getVar('border-weak') || '#E9EAEB';
  const brandColor = getVar('ark-brand-color') || '#4D6AFF'; // Assuming brand blue

  const font = "'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  // 1. Data Cleaning & Mock Generation
  const modelAssets = [
    { name: '通义千问-Max', provider: 'qwen', category: '文本生成', image: ModelPhotoQwen },
    { name: 'Deepseek-V3', provider: 'deepseek', category: '文本生成', image: ModelPhotoDeepSeek },
    { name: 'Llama-3-70B', provider: 'meta', category: '文本生成', image: ModelPhotoLlama },
    { name: 'Kimi-K2-Instruct', provider: 'moonshot', category: '文本生成', image: ModelPhotoKimi },
    { name: 'GLM-4-9B', provider: 'zhipuai', category: '文本生成', image: ModelPhotoZhiPu },
    { name: '通义千问-VL', provider: 'qwen', category: '多模态', image: ModelPhotoQwen },
    { name: 'Stable Diffusion', provider: 'stability', category: '图像生成', image: ModelPhotoZhiPu }, // Reuse an image
  ];

  // Generate a larger set of models
  const allModels = Array(12).fill(null).map((_, index) => {
    const asset = modelAssets[index % modelAssets.length];
    return {
      id: index,
      name: asset.name,
      provider: asset.provider,
      category: asset.category,
      image: asset.image,
      description: '基于最新一代大模型架构，具备卓越的理解、生成及复杂逻辑推理能力。',
      modelSource: asset.name.split('-')[0],
      size: '32K',
      versions: 3,
    };
  });

  // 2. Filtering Logic
  const filteredModels = allModels.filter(model => {
    // Search filter
    if (searchValue && !model.name.toLowerCase().includes(searchValue.toLowerCase())) return false;

    // Active filters logic
    if (activeFilters.length === 0) return true;

    // Split active filters into groups
    const activeCategories = activeFilters.filter(f => categoryList.includes(f));
    const activeProviders = activeFilters.filter(f => providerList.includes(f));

    // Internal group logic: OR (at least one must match)
    const categoryMatch = activeCategories.length === 0 || activeCategories.includes(model.category);
    
    // Provider matching logic (comparing display name in filter vs model.provider ID)
    const providerMatch = activeProviders.length === 0 || 
                         activeProviders.some(p => providerDisplayMap[p] === model.provider);

    // Cross group logic: AND (both active groups must be satisfied)
    return categoryMatch && providerMatch;
  });

  const handleCardSelect = (cardId) => {
    setSelectedCardId(prev => prev === cardId ? null : cardId);
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
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
    fontSize: '16px',
    lineHeight: '24px',
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
                <FilterPanel activeFilters={activeFilters} onToggleFilter={toggleFilter} />
              </div>

              {/* Right Content Container */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '16px' }}>
                {/* Top Bar for Tags and Search */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', height: '36px' }}>
                  <div style={{ ...modelCountStyle, borderLeft: 'none', paddingLeft: 0, gap: '4px' }}>
                    <span style={{ fontSize: '16px', color: textTitle, fontWeight: 500 }}>模型</span>
                    <span style={{ fontSize: '16px', color: textTitle, fontWeight: 500 }}>{filteredModels.length}</span>
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
                  {filteredModels.map((model) => (
                    <ModelCard
                      key={model.id}
                      name={model.name}
                      provider={model.provider}
                      image={model.image}
                      tags={[model.category]}
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