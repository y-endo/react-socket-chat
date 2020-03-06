const profileRenderCallback = (
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
  interactions: Set<any>
) => {
  console.groupCollapsed(`React.Profiler: ${id}`);
  console.log('フェーズ:', phase);
  console.log('現在の更新でレンダーに要した時間:', actualDuration);
  console.log('直近のレンダーに要した時間:', baseDuration);
  console.log('trace interaction:', interactions);
  console.groupEnd();
};

export default profileRenderCallback;
