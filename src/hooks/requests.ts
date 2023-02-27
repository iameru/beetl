import { PostBeetl, BeetlResponse, BeetlType, BidResponse } from '@/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import appConfig from 'beetl.config';
import PocketBase from 'pocketbase';

const pb = new PocketBase(appConfig.APIURL);

export function useBeetl(slug: string) {

  const query = useQuery<BeetlResponse>(
      ['beetl', slug], 
      () => getBeetl(slug), 
      { enabled: Boolean(slug) }
  )
  return {
    ...query,
    beetl: query.data
  }
}
export function useBids(beetlId) {

  const query = useQuery(
      ['bids', beetlId], 
      () => getBids(beetlId), 
      { enabled: Boolean(beetlId) }
  )
  return {
    ...query,
    bids: query.data
  }
}

export function useAddBeetl({slug, calculationType, create}:PostBeetl & {create: boolean}) {

  const executingFunc = () => createBeetl({slug: slug, calculationType: calculationType})
  const query = useQuery<BeetlResponse>(
    ['beetl', slug], 
    executingFunc,
    { enabled: Boolean(create) }
  )
  return {
    executingFunc,
    ...query,
    beetl: query.data
  }
}

async function createBeetl(data: BeetlType) {
    const record:BeetlResponse = await pb.collection('beetl_beetls').create(data);
    return record;
}

async function updateBeetl(id: string, data: BeetlType) {
    const record:BeetlResponse = await pb.collection('beetl_beetls').update(id, data);
    return record;
}
async function deleteBeetl(id: string) {
    const record = await pb.collection('beetl_beetls').delete(id);
    return record;
}
async function getBeetl(slug: string) {
    const record:BeetlResponse = await pb.collection('beetl_beetls')
          .getFirstListItem(`slug="${slug}"`)
    return record;
} 

async function getBids(beetlId: string) {
  const records:BidResponse[] = await pb.collection('beetl_bid').getFullList(200, {sort: 'created', filter: `beetl.id="${beetlId}"`})
  return records
}
