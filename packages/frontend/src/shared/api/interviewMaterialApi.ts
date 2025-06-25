import { InterviewMaterial } from '../../features/knowledge-base/types/InterviewMaterial';
import { api } from './api';

interface deleteRes {
    success: boolean;
    message: string;
}



export const interviewMaterialApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getinterviewMaterials: builder.query<InterviewMaterial[], void>({
            query: () => ({
                url: '/interviewMaterial',
                method: 'GET',
            }),
        }),
   
        deleteinterviewMaterial: builder.mutation<deleteRes, number>({
            query: (id) => ({
                url: `/interview-material/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
        }),
      
    }),
});

export const { useDeleteinterviewMaterialMutation,useGetinterviewMaterialsQuery } = interviewMaterialApi;
