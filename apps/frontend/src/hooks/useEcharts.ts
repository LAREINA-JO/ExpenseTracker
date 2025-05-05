import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as echarts from 'echarts';

const useEcharts = (
  ref: RefObject<HTMLDivElement>,
  option: echarts.EChartsOption,
  theme?: string | object | null,
  initialOpts?: echarts.EChartsInitOpts,
) => {
  const chartRef = useRef<echarts.ECharts | null>(null);

  const memoizedInitialOpts = useMemo(() => initialOpts, []);

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    chartRef.current = echarts.init(ref.current, theme, memoizedInitialOpts);
    chartRef.current.setOption(option);

    return () => {
      chartRef.current?.dispose();
    };
  }, [ref, theme, memoizedInitialOpts, option]);

  return chartRef.current;
};

export default useEcharts;
