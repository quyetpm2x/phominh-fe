export interface TrendPoint {
  day: string;
  percent: number | null;
}

const W = 600;
const H = 120;

// Đường xu hướng % theo ngày, trục tung cố định 0–100. Ngày không có dữ liệu thì đứt đoạn, không nối qua hay coi là 0.
export function TrendLine({ points, label }: { points: readonly TrendPoint[]; label: string }) {
  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last || points.every((point) => point.percent === null)) {
    return <p className="text-sm text-stone-600">Chưa có dữ liệu xu hướng.</p>;
  }
  const x = (index: number) => (points.length < 2 ? W / 2 : (index / (points.length - 1)) * W);
  const y = (percent: number) => H - (percent / 100) * H;
  const path = points.reduce((d, point, index) => {
    if (point.percent === null) return d;
    const startsSegment = index === 0 || points[index - 1]?.percent === null;
    return `${d}${startsSegment ? 'M' : 'L'}${x(index).toFixed(1)} ${y(point.percent).toFixed(1)} `;
  }, '');
  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${label}, từ ${first.day} đến ${last.day}`}
        className="h-28 w-full"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          x2={W}
          y1={H / 2}
          y2={H / 2}
          stroke="#E7E5E4"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={path}
          fill="none"
          stroke="#1C1917"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((point, index) =>
          point.percent === null ? null : (
            <circle key={point.day} cx={x(index)} cy={y(point.percent)} r="2" fill="#1C1917" />
          ),
        )}
      </svg>
      <figcaption className="mt-1 flex justify-between text-xs text-stone-500">
        <span>{first.day}</span>
        <span>{label} · vạch giữa là 50%</span>
        <span>{last.day}</span>
      </figcaption>
    </figure>
  );
}
