import { useMemo } from 'react';
import { paths } from 'src/routes/paths';
import { ICONS } from 'src/config-icons';

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [],
    []
  );

  return data;
}