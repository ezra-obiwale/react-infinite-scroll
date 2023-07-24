import React from 'react';
import { watchScroll } from './watchScroll';

type Props = {
  [index: string]: any;
  children: JSX.Element;
  fetchData: (page: number) => Promise<boolean>;
  id: string;
  reset?: () => void;
  url: string;
};

const urlPages: Record<string, any> = {};

export const InfiniteScroll = ({ children, fetchData, reset, id, url, ...otherProps }: Props) => {
  const el = React.useRef(null);

  const canLoadMore = React.useRef(true);
  let shouldWaitForScroll = () => false;

  const doFetchData = React.useCallback(async () => {
    if (!canLoadMore.current) {
      return;
    }

    canLoadMore.current = false;

    const nextPage = (urlPages[id] || 0) + 1;
    canLoadMore.current = await fetchData(nextPage);

    urlPages[id] = nextPage;

    if (canLoadMore.current && !shouldWaitForScroll()) {
      setTimeout(doFetchData);
    }
  }, [canLoadMore, fetchData, id]);
  const refreshData = React.useCallback(async () => {
    urlPages[id] = 0;
    canLoadMore.current = true;

    reset?.();

    await doFetchData();
  }, [doFetchData, id, reset]);

  React.useEffect(() => {
    refreshData();
  }, [url]);

  React.useEffect(() => {
    // get method to call that checks if there's room to scroll of at least the provided offset
    shouldWaitForScroll = watchScroll(el.current as unknown as HTMLElement, doFetchData).watchIsActive;
  }, [el]);

  return (
    <div ref={el} {...otherProps}>
      {children}
    </div>
  );
};
