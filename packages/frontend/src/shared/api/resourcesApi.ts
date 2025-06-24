// services/resourcesApi.ts
import { api } from './api';
import { Resource } from '../../features/knowledge-base/types/Resource';


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
        updateResource: builder.mutation<updateRes, Resource>({
            query: (resource) => ({
                url: `/resources/${resource.id}`,
                method: 'put',
                body: resource,

            }),
        }),
    }),
});

export const { useUpdateResourceMutation, useGetResourcesQuery, useDeleteResourceMutation } = resourcesApi;
