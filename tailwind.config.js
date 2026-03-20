/** @type {import('tailwindcss').Config} */
module.exports = {
  // 告诉 Tailwind 在哪些文件中找类名
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 1. 映射颜色：让你可以用 text-brand 或 bg-title
      colors: {
        brand: "rgb(var(--arken-arken-6) / <alpha-value>)", // 品牌蓝
        title: "rgb(var(--gray-neutral-gray-9) / <alpha-value>)", // 标题黑
        primary: "rgb(var(--gray-neutral-gray-8) / <alpha-value>)", // 正文灰
        secondary: "rgb(var(--gray-neutral-gray-6) / <alpha-value>)", // 次要灰
      },
      // 2. 映射背景色：这里通常和上面的 colors 一致，但可以更精细
      backgroundColor: {
        main: "rgb(var(--background-bg-primary) / <alpha-value>)", // 主背景
        sidebar: "rgb(var(--background-bg-slidebar) / <alpha-value>)", // 侧边栏
      },
      // 3. 映射圆角：让你可以用 rounded-2xl
      borderRadius: {
        'md': 'var(--radius-md)', // 8px
        '2xl': 'var(--radius-2xl)', // 16px
        '4xl': 'var(--radius-4xl)', // 24px
      },
      // 4. 映射间距：让你可以用 p-24 或 gap-8
      spacing: {
        '8': 'var(--spacing-8)', // 8px
        '24': 'var(--spacing-24)', // 24px
      },
      // 5. 映射字体
      fontFamily: {
        text: ['var(--font-family-text)', 'sans-serif'], // 苹方
      }
    },
  },
  plugins: [],
}