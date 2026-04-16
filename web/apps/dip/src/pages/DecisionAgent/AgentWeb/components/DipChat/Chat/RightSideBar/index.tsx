// @ts-nocheck
import styles from './index.module.less';
import classNames from 'classnames';
import { useDipChatStore } from '@decision-agent/components/DipChat/store';
import { useState } from 'react';
import NetSearchList from './NetSearchList';
import _ from 'lodash';
import FadeInFromRight from '@decision-agent/components/animation/FadeInFromRight';
import FilePreview from '../../components/FilePreview';
import SqlToolSide from './SqlToolSide';
import ChartToolSide from './ChartToolSide';
import CodeToolSide from './CodeToolSide';
import NGQLToolSide from './NGQLToolSide';
import CommonToolSide from './CommonToolSide';
import DocQAToolSide from './DocQAToolSide';
import MetricToolSide from './MetricToolSide';
import type { PreviewFileType } from '@decision-agent/components/DipChat/interface';

const RightSideBar = () => {
  const {
    dipChatStore: { activeChatItemIndex, chatList, activeProgressIndex },
  } = useDipChatStore();
  const chatItem = chatList[activeChatItemIndex];
  const activeContent = chatItem?.content || {};
  const citeList = Array.isArray(activeContent.cites) ? activeContent.cites : [];
  const progressList = Array.isArray(activeContent.progress) ? activeContent.progress : [];
  const activeProgressItem = activeProgressIndex !== -1 ? progressList[activeProgressIndex] : undefined;
  const isOpen = activeChatItemIndex !== -1;
  const [previewFile, setPreviewFile] = useState<PreviewFileType>();

  const renderContent = () => {
    if (citeList.length > 0) {
      return <NetSearchList />;
    }
    if (activeProgressItem) {
      const renderSide = () => {
        if (activeProgressItem.type === 'common_tool') {
          return <CommonToolSide />;
        }
        if (activeProgressItem.type === 'metric_tool') {
          return <MetricToolSide />;
        }
        if (activeProgressItem.type === 'sql_tool') {
          return <SqlToolSide />;
        }
        if (activeProgressItem.type === 'chart_tool') {
          return <ChartToolSide />;
        }
        if (activeProgressItem.type === 'code_tool') {
          return <CodeToolSide />;
        }
        if (activeProgressItem.type === 'ngql_tool') {
          return <NGQLToolSide />;
        }
        if (activeProgressItem.type === 'docQa_tool') {
          return (
            <DocQAToolSide
              onPreview={(file: PreviewFileType) => {
                setPreviewFile(file);
              }}
            />
          );
        }
        if (activeProgressItem.type === 'net_search_tool') {
          return <NetSearchList citesList={activeProgressItem.netSearchResult?.cites} />;
        }
      };
      return <div className={styles.bg}>{renderSide()}</div>;
    }
    return null;
  };

  const renderPreviewFile = () => {
    if (!_.isEmpty(previewFile)) {
      return (
        <FadeInFromRight className={styles.previewFile}>
          <FilePreview
            file={previewFile}
            onClose={() => {
              setPreviewFile(undefined);
            }}
          />
        </FadeInFromRight>
      );
    }
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.open]: isOpen,
      })}
    >
      {isOpen && (
        <div className="dip-full dip-position-r">
          {renderContent()}
          {renderPreviewFile()}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
