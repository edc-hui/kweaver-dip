// @ts-nocheck
import { get } from '@decision-agent/utils/http';

const baseUrl = '/api/manager/v1';

export const getSwaggerDoc = () => get(`${baseUrl}/swaggerDoc`);
