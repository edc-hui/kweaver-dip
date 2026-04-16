// @ts-nocheck
import { get } from '@decision-agent/utils/http';

export function getUserAvatarsByIds(userIds: string[]) {
  return get(`/api/user-management/v1/avatars/${userIds.join(',')}`);
}
