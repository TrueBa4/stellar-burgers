import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeed, selectFeed, selectFeedStatus, getIngredients } from '@slices';
import { useDispatch, useSelector } from '@store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectFeed);
  const feedStatus = useSelector(selectFeedStatus);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getFeed());
      dispatch(getIngredients());
    }
  }, [orders]);

  if (feedStatus) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
