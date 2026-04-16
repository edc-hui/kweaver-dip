// @ts-nocheck
import styles from './index.module.less';
import type { DipChatItemContentProgressType } from '@decision-agent/components/DipChat/interface';
import ToolIcon from '@decision-agent/assets/icons/toolIcon.svg?react';
import AgentImg from '@decision-agent/assets/icons/agent3.svg?react';
import MCPIcon from '@decision-agent/assets/icons/mcp.svg?react';
import { useDipChatStore } from '@decision-agent/components/DipChat/store';
import DipIcon from '@decision-agent/components/DipIcon';
import SkillBar from '@decision-agent/components/DipChat/components/SkillBar';

type CommonToolPanelProps = {
  progressItem: DipChatItemContentProgressType;
  chatItemIndex: number;
  progressIndex: number;
  readOnly: boolean;
};

const CommonToolPanel = ({ progressItem, chatItemIndex, progressIndex, readOnly }: CommonToolPanelProps) => {
  const {
    dipChatStore: { streamGenerating, chatList, activeProgressIndex },
    openSideBar,
    setDipChatStore,
  } = useDipChatStore();
  const skillInfo = progressItem.skillInfo;
  const loading = streamGenerating && chatItemIndex === chatList.length - 1;
  const view = () => {
    openSideBar(chatItemIndex);
    setDipChatStore({
      activeProgressIndex: progressIndex,
    });
  };
  const renderSkillIcon = () => {
    if (skillInfo.name === 'graph_qa') {
      return <DipIcon type="icon-dip-color-graph" className="dip-font-16" />;
    }
    if (skillInfo.type === 'TOOL') {
      return <ToolIcon style={{ width: '16px', height: '16px' }} />;
    }
    if (skillInfo.type === 'AGENT') {
      return <AgentImg style={{ width: '16px', height: '16px' }} />;
    }
    if (skillInfo.type === 'MCP') {
      return <MCPIcon style={{ width: '16px', height: '16px' }} />;
    }
  };
  return (
    <div className={styles.container}>
      <SkillBar
        icon={renderSkillIcon()}
        title={progressItem.title}
        status={progressItem.status}
        readOnly={readOnly}
        loading={loading}
        consumeTime={progressItem.consumeTime}
        onView={view}
        active={progressIndex === activeProgressIndex}
      />
    </div>
  );
};

export default CommonToolPanel;
