import { FilterReceivedEstimateList } from '@/types/dtos/estimate.dto';

const RECEIVED_ESTIMATES: FilterReceivedEstimateList[] = ['전체', '확정한 견적서'];

const constantOptions = {
  RECEIVED_ESTIMATES,
};

export const MAX_FILE_SIZE_MB = 1;
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

export default constantOptions;
