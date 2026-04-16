// @ts-nocheck
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Spin } from 'antd';
import Markdown from '@decision-agent/components/Markdown';
import LoadFailed from '@decision-agent/components/LoadFailed';
import { getDecisionAgentPublicAssetPath } from '@/pages/DecisionAgent/utils';
import './style.less';

enum LoadStatusEnum {
  Loading = 'loading',
  Failed = 'failed',
  Success = 'success',
}
const DolphinLanguageDoc = () => {
  const [loadStatus, setLoadStatus] = useState<LoadStatusEnum>(LoadStatusEnum.Loading);
  const [content, setContent] = useState('');
  useEffect(() => {
    getMdContent();
  }, []);

  const getMdContent = async () => {
    try {
      const res = await fetch(getDecisionAgentPublicAssetPath('/dolphin/syntax.md'));
      const data = await res.text();
      setContent(data);
      setLoadStatus(LoadStatusEnum.Success);
    } catch {
      setLoadStatus(LoadStatusEnum.Failed);
    }
  };

  return loadStatus === LoadStatusEnum.Loading ? (
    <div className="dip-position-center">
      <Spin size="large" />
    </div>
  ) : loadStatus === LoadStatusEnum.Failed ? (
    <div className="dip-position-center dip-text-align-center ">
      <LoadFailed onRetry={getMdContent} />
    </div>
  ) : (
    <div className={classNames('dip-overflowY-auto dip-h-100')}>
      <Markdown className="DolphinLanguageDoc" value={content} readOnly />
    </div>
  );
};

export default DolphinLanguageDoc;
