import { useQuery } from '@tanstack/react-query';
import { ModalComponentData } from '../store/useModalStore';

async function fetchModalConfig(): Promise<ModalComponentData> {
  const response = await fetch('/modalConfig.json');
  if (!response.ok) throw new Error('Failed to fetch modal config');
  return response.json();
}

export default function useModalConfigQuery() {
  return useQuery({
    queryKey: ['modal-config'],
    queryFn: fetchModalConfig,
  });
}
