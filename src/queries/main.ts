import axios from 'axios';
import { useQuery, useQueries } from '@tanstack/react-query';

import { useCigarette } from '../stores/cigarette';

const API_BASE = import.meta.env.VITE_API_HOST || 'https://hacker-news.firebaseio.com/v0/';

export const getTopItems = async () => {
  const url = `${API_BASE}/topstories.json`;
  const { data } = await axios.get<any>(url);
  return data;
};

export const getNewItems = async () => {
  const url = `${API_BASE}/newstories.json`;
  const { data } = await axios.get<any>(url);
  return data;
};

export const getBestItems = async () => {
  const url = `${API_BASE}/beststories.json`;
  const { data } = await axios.get<any>(url);
  return data;
};

export const getItem = async (item: string) => {
  const url = `${API_BASE}/item/${item}.json`;
  const { data } = await axios.get<any>(url);
  return data;
};

export const useTopItems = () => {
  const { totalSmoked } = useCigarette();
  return useQuery({
    queryKey: ['topItems', totalSmoked],
    queryFn: () => getTopItems(),
  });
};

export const useNewItems = () => {
  const { totalSmoked } = useCigarette();
  return useQuery({
    queryKey: ['newItems', totalSmoked],
    queryFn: () => getNewItems(),
  });
};

export const useBestItems = () => {
  const { totalSmoked } = useCigarette();
  return useQuery({
    queryKey: ['bestItems', totalSmoked],
    queryFn: () => getBestItems(),
  });
};

export const useItem = (item: string) => {
  return useQuery({
    queryKey: ['item', item],
    queryFn: () => getItem(item),
    staleTime: 5 * 60 * 1000,
  });
};

export const useItems = (items: string[] = []) => {
  return useQueries({
    queries: items.map(item => ({
      queryKey: ['item', item],
      queryFn: () => getItem(item),
      staleTime: 5 * 60 * 1000,
    }))
  });
};

