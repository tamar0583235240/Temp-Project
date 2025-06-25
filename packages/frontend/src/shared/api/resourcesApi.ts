// services/resourcesApi.ts
import { Resource } from '../../features/knowledge-base/types/Source';
import { api } from './api';

interface deleteRes {
    success: boolean;
    message: string;
}
interface updateRes {
    success: boolean;
    resource: Resource;
}


export const resourcesApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getResources: builder.query<Resource[], void>({
            query: () => ({
                url: '/resources',
                method: 'GET',
            }),
        }),
        deleteResource: builder.mutation<deleteRes, number>({
            query: (id) => ({
                url: `/resources/${id}`,
                method: 'DELETE',
            }),
        }),
      
    }),
});

export const {useGetResourcesQuery, useDeleteResourceMutation } = resourcesApi;
