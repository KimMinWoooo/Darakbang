import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function fetchitems({ signal, searchTerm, max }) {        // 상품 검색 api 연결
  let url = 'http://localhost:8000/items';   // 나중에 상품 게시물 동작하면 거기서 가져오기

  if (searchTerm && max) {
    url += '?search=' + searchTerm + '&max=' + max;         // http://localhost:3000/events?search=example&max=10 -> example 검색시 10개의 결과 값 나온 주소
  } else if (searchTerm) {
    url += '?search=' + searchTerm;
  } else if (max) {
    url += '?max=' + max
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error('연결 오류');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { example } = await response.json();         //응답 값에서 {} 값 추출 하여 반환 

  return example;
}