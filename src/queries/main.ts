import axios from 'axios';
import { useQuery, useQueries } from '@tanstack/react-query';

import { useCigarette } from '../stores/cigarette';
import type { StoryType, HNItem, HNUser, AlgoliaSearchResult } from '../types';

const API_BASE = import.meta.env.VITE_API_HOST || 'https://hacker-news.firebaseio.com/v0/';
const ALGOLIA_BASE = 'https://hn.algolia.com/api/v1';

const STORY_ENDPOINTS: Record<StoryType, string> = {
  top: 'topstories',
  new: 'newstories',
  best: 'beststories',
  ask: 'askstories',
  show: 'showstories',
  job: 'jobstories',
};

export const getStoryIds = async (type: StoryType): Promise<number[]> => {
  const url = `${API_BASE}/${STORY_ENDPOINTS[type]}.json`;
  const { data } = await axios.get<number[]>(url);
  return data;
};

export const getItem = async (id: string | number): Promise<HNItem> => {
  const url = `${API_BASE}/item/${id}.json`;
  const { data } = await axios.get<HNItem>(url);
  return data;
};

export const getUser = async (username: string): Promise<HNUser> => {
  const url = `${API_BASE}/user/${username}.json`;
  const { data } = await axios.get<HNUser>(url);
  return data;
};

export const searchStories = async (query: string, page: number = 0): Promise<AlgoliaSearchResult> => {
  const url = `${ALGOLIA_BASE}/search?query=${encodeURIComponent(query)}&page=${page}&tags=story`;
  const { data } = await axios.get<AlgoliaSearchResult>(url);
  return data;
};

export const useStoryIds = (type: StoryType) => {
  const { totalSmoked } = useCigarette();
  return useQuery({
    queryKey: ['storyIds', type, totalSmoked],
    queryFn: () => getStoryIds(type),
  });
};

export const useItem = (id: string | number) => {
  return useQuery({
    queryKey: ['item', String(id)],
    queryFn: () => getItem(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useItems = (ids: (string | number)[] = []) => {
  return useQueries({
    queries: ids.map(id => ({
      queryKey: ['item', String(id)],
      queryFn: () => getItem(id),
      staleTime: 5 * 60 * 1000,
    }))
  });
};

export const useUser = (username: string) => {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => getUser(username),
    staleTime: 5 * 60 * 1000,
    enabled: !!username,
  });
};

export const useSearch = (query: string, page: number = 0) => {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchStories(query, page),
    enabled: query.length > 0,
  });
};
