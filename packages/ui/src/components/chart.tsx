import * as React from 'react';
import { ResponsiveContainer } from 'recharts';

import { cn } from '../lib/utils';

// Wrapper tối giản quanh Recharts — đồng bộ theme qua CSS variables của @pho-minh/design-tokens
// thay vì cấu hình màu tách rời như Chart.js (lý do chọn trong mục 4 tài liệu FE).
export type ChartConfig = Record<string, { label: string; color: string }>;

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactElement;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    const style = Object.fromEntries(
      Object.entries(config).map(([key, value]) => [`--color-${key}`, value.color]),
    ) as React.CSSProperties;

    return (
      <div ref={ref} className={cn('aspect-video w-full', className)} style={style} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    );
  },
);
ChartContainer.displayName = 'ChartContainer';

export { ChartContainer };
