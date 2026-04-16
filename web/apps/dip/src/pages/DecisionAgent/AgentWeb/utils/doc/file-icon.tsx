// @ts-nocheck
import FileArchiveColored from '@decision-agent/assets/icons/file-archive-colored.svg?react';
import FileImageColored from '@decision-agent/assets/icons/file-image-colored.svg?react';
import FolderColored from '@decision-agent/assets/icons/folder-colored.svg?react';
import FileAiColored from '@decision-agent/assets/icons/file-ai-colored.svg?react';
import FileWordColored from '@decision-agent/assets/icons/file-word-colored.svg?react';
import FileCadColored from '@decision-agent/assets/icons/file-cad-colored.svg?react';
import FileExcelColored from '@decision-agent/assets/icons/file-excel-colored.svg?react';
import FileExeColored from '@decision-agent/assets/icons/file-exe-colored.svg?react';
import FileHtmlColored from '@decision-agent/assets/icons/file-html-colored.svg?react';
import FileAudioColored from '@decision-agent/assets/icons/file-audio-colored.svg?react';
import FileVideoColored from '@decision-agent/assets/icons/file-video-colored.svg?react';
import FilePdfColored from '@decision-agent/assets/icons/file-pdf-colored.svg?react';
import FilePptColored from '@decision-agent/assets/icons/file-ppt-colored.svg?react';
import FilePhotoshopColored from '@decision-agent/assets/icons/file-photoshop-colored.svg?react';
import FileTextColored from '@decision-agent/assets/icons/file-text-colored.svg?react';
import FileDrawioColored from '@decision-agent/assets/icons/file-drawio-colored.svg?react';
import FileUnknownColored from '@decision-agent/assets/icons/file-unknown-colored.svg?react';
import FolderUserColored from '@decision-agent/assets/icons/folder-user-colored.svg?react';
import FolderGroupColored from '@decision-agent/assets/icons/folder-group-colored.svg?react';
import FolderCustomColored from '@decision-agent/assets/icons/folder-custom-colored.svg?react';
import FolderKcColored from '@decision-agent/assets/icons/folder-kc-colored.svg?react';
import { DocLibType, DocType } from './types';
import styles from './file-icon.module.less';

export const FILE_ICONS = {
  '.7z': FileArchiveColored,
  '.ai': FileAiColored,
  '.bmp': FileImageColored,
  '.dmg': FileArchiveColored,
  '.doc': FileWordColored,
  '.docm': FileWordColored,
  '.docx': FileWordColored,
  '.dotm': FileWordColored,
  '.dotx': FileWordColored,
  '.dot': FileWordColored,
  '.dwg': FileCadColored,
  '.dwt': FileCadColored,
  '.dxf': FileCadColored,
  '.et': FileExcelColored,
  '.exe': FileExeColored,
  '.msi': FileExeColored,
  '.bat': FileExeColored,
  '.gif': FileImageColored,
  '.gz': FileArchiveColored,
  '.html': FileHtmlColored,
  '.jpg': FileImageColored,
  '.jpeg': FileImageColored,
  '.wmf': FileImageColored,
  '.emf': FileImageColored,
  '.tga': FileImageColored,
  '.mp3': FileAudioColored,
  '.aac': FileAudioColored,
  '.wav': FileAudioColored,
  '.wma': FileAudioColored,
  '.flac': FileAudioColored,
  '.m4a': FileAudioColored,
  '.ape': FileAudioColored,
  '.ogg': FileAudioColored,
  '.mp4': FileVideoColored,
  '.avi': FileVideoColored,
  '.rmvb': FileVideoColored,
  '.rm': FileVideoColored,
  '.3gp': FileVideoColored,
  '.mkv': FileVideoColored,
  '.mov': FileVideoColored,
  '.mpg': FileVideoColored,
  '.mpeg': FileVideoColored,
  '.wmv': FileVideoColored,
  '.flv': FileVideoColored,
  '.asf': FileVideoColored,
  '.h264': FileVideoColored,
  '.x264': FileVideoColored,
  '.mts': FileVideoColored,
  '.m2ts': FileVideoColored,
  '.m4v': FileVideoColored,
  '.ods': FileExcelColored,
  '.odt': FileWordColored,
  '.pdf': FilePdfColored,
  '.png': FileImageColored,
  '.svg': FileImageColored,
  '.ppt': FilePptColored,
  '.pps': FilePptColored,
  '.pot': FilePptColored,
  '.pptx': FilePptColored,
  '.ppsx': FilePptColored,
  '.dps': FilePptColored,
  '.potm': FilePptColored,
  '.ppsm': FilePptColored,
  '.potx': FilePptColored,
  '.pptm': FilePptColored,
  '.odp': FilePptColored,
  '.psd': FilePhotoshopColored,
  '.psb': FilePhotoshopColored,
  '.rar': FileArchiveColored,
  '.txt': FileTextColored,
  '.tif': FileImageColored,
  '.wps': FileWordColored,
  '.xls': FileExcelColored,
  '.xlsb': FileExcelColored,
  '.xlsm': FileExcelColored,
  '.xlsx': FileExcelColored,
  '.csv': FileExcelColored,
  '.xlt': FileExcelColored,
  '.xla': FileExcelColored,
  '.xltm': FileExcelColored,
  '.xltx': FileExcelColored,
  '.zip': FileArchiveColored,
  '.tgz': FileArchiveColored,
  '.tar': FileArchiveColored,
  '.cab': FileArchiveColored,
  '.uue': FileArchiveColored,
  '.jar': FileArchiveColored,
  '.ace': FileArchiveColored,
  '.lzh': FileArchiveColored,
  '.arj': FileArchiveColored,
  '.gzip': FileArchiveColored,
  '.gz2': FileArchiveColored,
  '.bz': FileArchiveColored,
  '.bz2': FileArchiveColored,
  '.iso': FileArchiveColored,
  '.rpm': FileArchiveColored,
  '.drawio': FileDrawioColored,
  '*': FileUnknownColored,
  user: FolderUserColored,
  department: FolderGroupColored,
  custom: FolderCustomColored,
  knowledge: FolderKcColored,
  folder: FolderColored,
};

const getFileType = (size?: number, extension?: string, doc_lib_type?: string, doc_type?: string[]) => {
  const type = size === -1 && doc_type?.length && doc_type.indexOf(DocType.DocLib) >= 0;

  if (type && doc_lib_type === DocLibType.UserDocLib) {
    return 'user';
  }
  if (type && doc_lib_type === DocLibType.DepartmentDocLib) {
    return 'department';
  }
  if (type && doc_lib_type === DocLibType.CustomDocLib) {
    return 'custom';
  }
  if (type && doc_lib_type === DocLibType.KnowledgeDocLib) {
    return 'knowledge';
  }
  if (size === -1) {
    return 'folder';
  }

  return extension ? extension.toLocaleLowerCase() : '*';
};

const iconWrapper = (Icon: React.FC) => {
  return () => (
    <span className={styles.anticon}>
      <Icon />
    </span>
  );
};

export const getFileIcon = ({
  size,
  extension,
  doc_lib_type,
  doc_type,
}: {
  size?: number;
  extension?: string;
  doc_lib_type?: string;
  doc_type?: string[];
}) => {
  const type = getFileType(size, extension, doc_lib_type, doc_type);
  // @ts-ignore
  return iconWrapper(FILE_ICONS[type] || FILE_ICONS['*']);
};
