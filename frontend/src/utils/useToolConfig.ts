import { useLocation } from '@solidjs/router';
import { toolConfig, ToolKey } from '../toolConfig';
import { createMemo } from 'solid-js';

export function useActiveToolConfig() {
  const location = useLocation();
  const activeKey = createMemo(() => location.pathname.split('/')[1] as ToolKey);
  const config = createMemo(() => toolConfig[activeKey()] ?? null);

  return { activeKey, config };
}
