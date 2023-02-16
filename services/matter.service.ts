import { AxiosResponse } from 'axios';
import { getMatterService } from '../helpers/api-helper';
import { CreateMatterRequest, MatterResponse, MattersResponse, UpdateMatterRequest } from '../openapi';

export const getMatters = async (accessToken: string, limit: number = 10, offset: number = 0, search?: string) => {
  try {
    const service = await getMatterService(accessToken);
    const response: AxiosResponse<MattersResponse> = await service.getMatters();
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getMatter = async (accessToken: string, matterId: number) => {
  if (accessToken) {
    try {
      const service = await getMatterService(accessToken);
      const response: AxiosResponse<MatterResponse> = await service.getMatter(matterId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
};

export const createMatter = async (accessToken: string, matter: CreateMatterRequest) => {
  if (accessToken) {
    try {
      const service = await getMatterService(accessToken);
      const response = await service.createMatter(matter);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
};

export const updateMatter = async (accessToken: string, matterId: number, matter: UpdateMatterRequest) => {
  try {
    const service = await getMatterService(accessToken);
    const response = await service.updateMatter(matterId, matter);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
