import axios from 'axios';

export type Estimate = {
  serviceType: string;
  status: string;
  customerName: string;
  movingDate: string;
  departure: string;
  destination: string;
  isConfirmed: boolean;
  requestDate: string;
  price: number;
  id: string;
};

export type SentEstimatesResponse = {
  list: Estimate[];
  totalCount: number;
};

export const getSentEstimatesServer = async (
  page: number,
  pageSize: number,
  accessToken: string
): Promise<SentEstimatesResponse> => {
  const res = await axios.get(`${process.env.API_URL}/estimate/sent`, {
    params: { page, pageSize },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return res.data;
};
