import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

/**
 * Button component matching Figma design variants.
 * Variants: primary (filled brand), secondary (outlined/ghost)
 * States: default, hover, pressed, disabled
 */
function Button({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  style: customStyle = {},
  fullWidth = false
}) {
  const { getVar } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Resolve colors from Figma variables
  const brandColor = getVar('background/bg-brand') || '#4D6AFF';
  const brandHoverColor = getVar('background/bg-brand-hover') || '#3D57E5';
  const textWhite = getVar('text/text-white') || '#FFFFFF';
  const textPrimary = getVar('text/text-primary') || '#414651';
  const borderNormal = getVar('border/border-normal') || '#D5D7DA';
  const borderStrong = getVar('border/border-strong') || '#9B9EA6';
  const bgPrimary = getVar('background/bg-primary') || '#FFFFFF';

  // Size configurations from Figma
  const sizeConfig = {
    small: { height: 28, padding: '4px 12px', fontSize: 12, lineHeight: '20px' },
    medium: { height: 36, padding: '8px 16px', fontSize: 14, lineHeight: '20px' },
    large: { height: 40, padding: '10px 20px', fontSize: 14, lineHeight: '20px' },
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  // Determine current state
  const getButtonState = () => {
    if (disabled) return 'disabled';
    if (isPressed) return 'pressed';
    if (isHovered) return 'hover';
    return 'default';
  };

  const state = getButtonState();

  // Style mappings based on variant and state
  const getStyles = () => {
    if (variant === 'primary') {
      const baseStyle = {
        backgroundColor: brandColor,
        color: textWhite,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'transparent',
      };
      switch (state) {
        case 'hover':
          return { ...baseStyle, backgroundColor: brandHoverColor };
        case 'pressed':
          return { ...baseStyle, backgroundColor: brandHoverColor, opacity: 0.9 };
        case 'disabled':
          return { ...baseStyle, opacity: 0.4, cursor: 'not-allowed' };
        default:
          return baseStyle;
      }
    } else {
      // secondary / outlined variant
      const baseStyle = {
        backgroundColor: bgPrimary,
        color: textPrimary,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: borderNormal,
      };
      switch (state) {
        case 'hover':
          const hoverBg = getVar('background/bg-secondary') || '#F9FAFB';
          return { ...baseStyle, borderColor: borderStrong, backgroundColor: hoverBg };
        case 'pressed':
          const pressedBg = getVar('background/bg-tertiary') || '#F0F1F3';
          return { ...baseStyle, borderColor: borderStrong, backgroundColor: pressedBg };
        case 'disabled':
          return { ...baseStyle, opacity: 0.4, cursor: 'not-allowed' };
        default:
          return baseStyle;
      }
    }
  };

  const variantStyles = getStyles();

  const buttonStyle = {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
    height: `${config.height}px`,
    padding: config.padding,
    borderRadius: '8px',
    fontSize: `${config.fontSize}px`,
    lineHeight: config.lineHeight,
    fontFamily: "'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
    outline: 'none',
    whiteSpace: 'nowrap',
    width: fullWidth ? '100%' : 'auto',
    boxSizing: 'border-box',
    ...variantStyles,
    ...customStyle,
  };

  return (
    <button
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
}

export default Button;