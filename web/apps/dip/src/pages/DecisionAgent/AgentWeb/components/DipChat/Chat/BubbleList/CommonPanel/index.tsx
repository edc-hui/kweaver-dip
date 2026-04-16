// @ts-nocheck
import styles from './index.module.less';
import { useDipChatStore } from '@decision-agent/components/DipChat/store';
import PanelFooter from '@decision-agent/components/DipChat/Chat/BubbleList/PanelFooter';
import classNames from 'classnames';
import SqlToolPanel from './SqlToolPanel';
import ChartToolPanel from './ChartToolPanel';
import CodeToolPanel from './CodeToolPanel';
import NGQLToolPanel from './NGQLToolPanel';
import Markdown from '@decision-agent/components/Markdown';
import { Collapse, Skeleton } from 'antd';
import ShinyText from '@decision-agent/components/animation/ShinyText';
import type { ChatBody, DipChatItemContentProgressType, DipChatItemContentType } from '@decision-agent/components/DipChat/interface';
import DipIcon from '@decision-agent/components/DipIcon';
import _ from 'lodash';
import InterruptFormPanel from './InterruptFormPanel';
import CommonToolPanel from './CommonToolPanel';
import DocQaToolPanel from './DocQaToolPanel';
import NetSearchToolPanel from './NetSearchToolPanel';
import MetricToolPanel from './MetricToolPanel';
import AgentIcon from '@decision-agent/components/AgentIcon';
import { nanoid } from 'nanoid';
import intl from 'react-intl-universal';
import LLMPanel from './LLMPanel';
import dayjs from 'dayjs';

const CommonPanel = ({ chatItemIndex, readOnly }: any) => {
  const {
    dipChatStore: { chatList, streamGenerating, agentDetails },
    openSideBar,
    sendChat,
  } = useDipChatStore();
  const chatItem = chatList[chatItemIndex];
  const { generating, interrupt, cancel } = chatItem;
  const content: DipChatItemContentType = chatItem.content || { progress: [], cites: [], related_queries: [] };
  const progressList = Array.isArray(content?.progress) ? content.progress : [];
  const citeList = Array.isArray(content?.cites) ? content.cites : [];
  const relatedQueries = Array.isArray(content?.related_queries) ? content.related_queries : [];
  const skeletonLoading = progressList.length === 0 && streamGenerating && chatItemIndex === chatList.length - 1;
  const renderFooter = () => {
    if (!generating && !readOnly) {
      return <PanelFooter className="dip-mt-8" chatItemIndex={chatItemIndex} />;
    }
  };
  const renderStopGenerate = () => {
    if (chatItem.cancel) {
      return (
        <div
          className={classNames(' dip-mt-16', {
            'dip-text-color-45': true,
          })}
        >
          {intl.get('dipChat.stoppedOutput')}
        </div>
      );
    }
  };

  const renderDeepThink = (thinkText: string, loading: boolean) => {
    if (thinkText) {
      return (
        <div className="dip-mb-12">
          <Collapse
            expandIconPosition="end"
            defaultActiveKey={['1']}
            ghost
            items={[
              {
                key: '1',
                label: (
                  <div className="dip-flex-align-center">
                    <DipIcon className="dip-text-color-45" type="icon-dip-think" />
                    <ShinyText
                      loading={loading ?? false}
                      className="dip-ml-8"
                      text={loading ? intl.get('dipChat.thinking') : intl.get('dipChat.deepThinking')}
                    />
                  </div>
                ),
                children: (
                  <div>
                    <Markdown className={styles.deepThinkMarkdown} value={thinkText ?? ''} readOnly />
                  </div>
                ),
              },
            ]}
          />
        </div>
      );
    }
  };

  const renderCites = () => {
    if (citeList.length > 0) {
      let total: number = 0;
      citeList.forEach((item: any) => {
        if (item.children && Array.isArray(item.children)) {
          total += item.children.length;
          return;
        }
        total += 1;
      });
      const loading = streamGenerating && chatItemIndex === chatList.length - 1;
      return (
        <div
          onClick={() => {
            if (total > 0 && !readOnly) {
              openSideBar(chatItemIndex);
            }
          }}
          className={classNames(styles.title, 'dip-mb-16 dip-flex-align-center dip-flex-item-full-width')}
        >
          <DipIcon className="dip-font-16" type="icon-dip-net" />
          <ShinyText
            loading={loading}
            className="dip-ml-8 dip-flex-item-full-width dip-ellipsis"
            text={
              loading
                ? intl.get('dipChat.readingDocs', { count: total })
                : intl.get('dipChat.foundDocs', { count: total })
            }
          />
        </div>
      );
    }
  };

  const renderIcon = () => {
    return (
      <AgentIcon
        avatar_type={agentDetails.avatar_type}
        avatar={agentDetails.avatar}
        size={30}
        name={agentDetails.name}
      />
    );
  };

  const renderInterrupt = () => {
    if (!_.isEmpty(interrupt) && interrupt.data && chatItemIndex === chatList.length - 1 && !cancel) {
      return (
        <div className="dip-mt-16">
          <InterruptFormPanel chatItemIndex={chatItemIndex} />
        </div>
      );
    }
  };

  const renderContent = () => {
    if (skeletonLoading) {
      return (
        <div>
          <div className="dip-flex-align-center">
            {renderIcon()}
            <ShinyText
              loading={streamGenerating && chatItemIndex === chatList.length - 1}
              className="dip-ml-8"
              text={intl.get('dipChat.generating')}
            />
          </div>
          <div className="dip-pl-20">
            <Skeleton className="dip-mt-16" loading={skeletonLoading} active>
              <Markdown value={''} readOnly />
            </Skeleton>
          </div>
        </div>
      );
    }

    /** 渲染相关问题 */
    const renderRelatedQueries = () => {
      if (!skeletonLoading && !readOnly && relatedQueries.length > 0 && chatItemIndex === chatList.length - 1) {
        return (
          <div className="dip-mt-16">
            {relatedQueries.map((item: string, index: number) => (
              <div
                key={index}
                title={item}
                className={classNames(styles.relatedQueries, 'dip-ellipsis dip-flex-align-center')}
                onClick={() => {
                  const cloneChatList = _.cloneDeep(chatList);
                  cloneChatList.push({
                    key: nanoid(),
                    role: 'user',
                    content: item,
                    loading: false,
                    updateTime: dayjs().valueOf(),
                  });
                  cloneChatList.push({
                    key: nanoid(),
                    role: 'common',
                    content: '',
                    loading: true,
                  });
                  const body: ChatBody = { query: item };
                  sendChat({
                    chatList: cloneChatList,
                    body,
                    activeChatItemIndex: -1,
                  });
                }}
              >
                {item}
              </div>
            ))}
          </div>
        );
      }
    };

    return (
      <div className="dip-flex">
        {renderIcon()}
        <div className={classNames('dip-ml-16 dip-flex-item-full-width')}>
          {renderCites()}
          {progressList.map((item: DipChatItemContentProgressType, progressIndex: number) => {
            let toolResult: any;
            switch (item.type) {
              case 'metric_tool':
                toolResult = (
                  <MetricToolPanel
                    key={progressIndex}
                    chatItemIndex={chatItemIndex}
                    progressIndex={progressIndex}
                    progressItem={item}
                    readOnly={readOnly}
                  />
                );
                break;
              case 'sql_tool':
                toolResult = (
                  <SqlToolPanel
                    key={progressIndex}
                    chatItemIndex={chatItemIndex}
                    progressIndex={progressIndex}
                    progressItem={item}
                    readOnly={readOnly}
                  />
                );
                break;
              case 'chart_tool':
                toolResult = (
                  <ChartToolPanel
                    key={progressIndex}
                    chatItemIndex={chatItemIndex}
                    progressIndex={progressIndex}
                    progressItem={item}
                    readOnly={readOnly}
                  />
                );
                break;
              case 'code_tool':
                toolResult = (
                  <CodeToolPanel
                    key={progressIndex}
                    chatItemIndex={chatItemIndex}
                    progressIndex={progressIndex}
                    progressItem={item}
                    readOnly={readOnly}
                  />
                );
                break;
              case 'ngql_tool':
                toolResult = (
                  <NGQLToolPanel
                    key={progressIndex}
                    chatItemIndex={chatItemIndex}
                    progressIndex={progressIndex}
                    progressItem={item}
                    readOnly={readOnly}
                  />
                );
                break;
              case 'docQa_tool':
                toolResult = (
                  <DocQaToolPanel
                    key={progressIndex}
                    chatItemIndex={chatItemIndex}
                    progressIndex={progressIndex}
                    progressItem={item}
                    readOnly={readOnly}
                  />
                );
                break;
              case 'common_tool':
                toolResult = (
                  <CommonToolPanel
                    key={progressIndex}
                    chatItemIndex={chatItemIndex}
                    progressIndex={progressIndex}
                    progressItem={item}
                    readOnly={readOnly}
                  />
                );
                break;
              case 'net_search_tool':
                toolResult = (
                  <NetSearchToolPanel
                    key={progressIndex}
                    chatItemIndex={chatItemIndex}
                    progressIndex={progressIndex}
                    progressItem={item}
                    readOnly={readOnly}
                  />
                );
                break;
              default: {
                const loading = streamGenerating && chatItemIndex === chatList.length - 1 && !item.llmResult?.text;
                const { netSearchResult } =
                  progressList.find(
                    progressItem =>
                      progressItem.type === 'net_search_tool' &&
                      progressItem.skillInfo?.name === 'online_search_cite_tool'
                  ) || {};
                toolResult = (
                  <div key={progressIndex}>
                    {renderDeepThink(item.llmResult?.thinking || '', loading)}
                    <LLMPanel
                      isLLMProcess={!item.llmResult?.thinking && !item.llmResult?.text}
                      status={item.status}
                      text={item.llmResult?.text}
                      cites={netSearchResult?.cites ?? []}
                      consumeTime={item.consumeTime}
                    />
                  </div>
                );
                break;
              }
            }

            return toolResult;
          })}
          {renderInterrupt()}
          {renderStopGenerate()}
          {renderFooter()}
          {renderRelatedQueries()}
        </div>
      </div>
    );
  };
  return <div className={styles.container}>{renderContent()}</div>;
};

export default CommonPanel;
