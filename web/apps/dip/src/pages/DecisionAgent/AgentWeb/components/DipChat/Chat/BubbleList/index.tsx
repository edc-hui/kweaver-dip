import { Bubble } from '@ant-design/x';
import styles from './index.module.less';
import UserPanel from './UserPanel';
import ErrorPanel from './ErrorPanel';
import CommonPanel from './CommonPanel';
import { useDipChatStore } from '@decision-agent/components/DipChat/store';
import type { DipChatItem } from '@decision-agent/components/DipChat/interface';
import type { BubbleItemType, BubbleListProps as XBubbleListProps, BubbleProps } from '@ant-design/x';

type DipBubbleListProps = {
  readOnly?: boolean;
};

const getChatItemIndex = (chatList: DipChatItem[], key: string) => chatList.findIndex(item => item.key === key);

const BubbleList = ({ readOnly = false }: DipBubbleListProps) => {
  const {
    dipChatStore: { chatList },
  } = useDipChatStore();
  const roles: NonNullable<XBubbleListProps['role']> = {
    user: chatItem => ({
      placement: 'end',
      variant: 'borderless',
      contentRender: () => {
        const chatItemIndex = getChatItemIndex(chatList, String(chatItem.key));
        return <UserPanel chatItemIndex={chatItemIndex} readOnly={readOnly} />;
      },
    }),
    common: chatItem => ({
      placement: 'start',
      variant: 'borderless',
      contentRender: () => {
        const chatItemIndex = getChatItemIndex(chatList, String(chatItem.key));
        return <CommonPanel chatItemIndex={chatItemIndex} readOnly={readOnly} />;
      },
    }),
  };

  const getBubbleProps = (chatItem: DipChatItem): Partial<BubbleProps<any>> => {
    if (chatItem.error) {
      return {
        placement: 'start',
        variant: 'borderless',
        contentRender: () => {
          const chatItemIndex = getChatItemIndex(chatList, chatItem.key);
          return <ErrorPanel chatItemIndex={chatItemIndex} readOnly={readOnly} />;
        },
      };
    }
    return {};
  };

  const bubbleItems: BubbleItemType[] = chatList.map(item => {
    const { status: _status, ...restItem } = item;
    return {
      ...restItem,
      ...getBubbleProps(item),
    };
  });

  return (
    <div className={styles.bubbleList}>
      <Bubble.List items={bubbleItems} role={roles} />
    </div>
  );
};

export default BubbleList;
